var accounts;
var factoryInstance;
var defaultGas = 4700000;
var userAccounts = [];

var scientistAccount, physicianAccount, currentAccount;

//var hostName = mariaIpfsHost;
//var ipfs = window.IpfsApi(hostName, 5001);
//var ipfs = window.IpfsApi();
var ipfs = window.IpfsApi(`${mariaIpfsProt}${mariaIpfsAPIHost}`, mariaIpfsAPIPort);
//var ipfs = window.IpfsApi(`${mariaIpfsAPIHost}`, mariaIpfsAPIPort);
var ipfs = window.IpfsApi(`${mariaIpfsAPIHost}`, mariaIpfsAPIPort,{protocol: mariaIpfsProt});

function deployCompetitionFactory() {
    CompetitionFactory.new({ from: currentAccount, gas: defaultGas }).then(
        function(facInstance) {
            factoryInstance = facInstance;
            $("#deployContractSuccess").html('<i class="fa fa-check"</i>' + " Competition Factory Contract mined!");
            initializeFactoryEvents();            
        });
}

function initializeFactoryEvents() {
    var events = factoryInstance.allEvents();
    events.watch(function(error, result) {
        if (error) {
            console.log("Error: " + error);
        } else {
            $('#audittrailbody').append('<tr><td>' + result.event +
                '</td><td>' + parseInt(result.args._competitionId) +
                '</td><td>' + result.args._person +
                '</td><td>' + "<a target='_blank' href='" + mariaProt + mariaIpfsGatewayHost + mariaIpfsGatewayPort + "/ipfs/" + result.args._hash + "'>" + result.args._hash + "</a>" +
                '</td><td>' + result.args._cost +
                '</td><td>' + Date(result.args._time) + '</td>');
        }
    });
}

function readCompetitionById(_competitionId) {
    document.getElementById("competitionId").style.display = "block";
    document.getElementById('theCompetitionId').innerHTML = _competitionId;
    factoryInstance.getPrize.call(_competitionId).then(function(data) {
        document.getElementById('thePrize').innerHTML = data.toString(10);
      
    });
    factoryInstance.getDeadline.call(_competitionId).then(function(data) {
        //document.getElementById('theDeadline').innerHTML = data.toString(10);
        $("#theDeadline").html(moment.unix(data.c[0]).format("MM/DD/YYYY"));
    });    
}

function store() {
    const file = document.getElementById('source').files[0]
    const reader = new FileReader()
    reader.onload = function() {
        var toStore = buffer.Buffer(reader.result);
        ipfs.add(toStore, function(err, res) {
            if (err || !res) {
                return console.error('ipfs add error', err, res)
            }

            res.forEach(function(file) {
                console.log('successfully stored', file);
                submitPhysicianDataset(file.path);
                readCompetitionById(0);
                display(file.path);
            })
        })
    }
    reader.readAsArrayBuffer(file)
}

function submitPhysicianDataset(docHash) {
    console.log(docHash);
    var prize = $("#inputPrize").val();
    var deadline = $("#inputDeadline").val();
    var deadlineTs = (moment(deadline, "M/D/YYYY").valueOf()) / 1000;
    factoryInstance.createCompetition.sendTransaction(docHash, deadlineTs, {from:physicianAccount, gas:defaultGas, value:prize}).then(
        function(txHash) {
            console.log("Submitting dataset hash into competition ", txHash);
            $("#uploadIpfsSuccess").html('<i class="fa fa-check"</i>' + ' IPFS Training Set Hash ' + docHash + " added to IPFS");
            $("#uploadDatasetSuccess").html('<i class="fa fa-check"</i>' + ' Transaction ' + txHash + " added to the blockchain");
        }
    );
}

function storeb() {
    const file = document.getElementById('sourceb').files[0]
    const reader = new FileReader()
    reader.onload = function() {
        var toStore = buffer.Buffer(reader.result);
        ipfs.add(toStore, function(err, res) {
            if (err || !res) {
                return console.error('ipfs add error', err, res)
            }

            res.forEach(function(file) {
                console.log('successfully stored', file);
                console.log(file.path);
                $("#uploadIpfsSuccessB").html('<i class="fa fa-check"</i>' + ' IPFS Test Set Hash ' + file.path + " added to IPFS");
            })
        })
    }
    reader.readAsArrayBuffer(file)
}

function storec() {
    const file = document.getElementById('sourcec').files[0]
    const reader = new FileReader()
    reader.onload = function() {
        var toStore = buffer.Buffer(reader.result);
        ipfs.add(toStore, function(err, res) {
            if (err || !res) {
                return console.error('ipfs add error', err, res)
            }

            res.forEach(function(file) {
                console.log('successfully stored', file);
                console.log(file.path);
                $("#uploadIpfsSuccessC").html('<i class="fa fa-check"</i>' + ' IPFS Test Outcome Hash ' + file.path + " added to IPFS");
            })
        })
    }
    reader.readAsArrayBuffer(file)
}


function store2() {
    const file = document.getElementById('source2').files[0]
    const reader = new FileReader()
    reader.onload = function() {
        var toStore = buffer.Buffer(reader.result);
        ipfs.add(toStore, function(err, res) {
            if (err || !res) {
                return console.error('ipfs add error', err, res)
            }

            res.forEach(function(file) {
                console.log('successfully stored', file);
                submitScientistModel(file.path);
            })
        })
    }
    reader.readAsArrayBuffer(file)
}

function submitScientistModel(docHash) {
    console.log(docHash);
    factoryInstance.submitIPFSHash.sendTransaction(docHash, 0, { from: scientistAccount, gas: defaultGas }).then(
        function(txHash) {
            console.log("Submitting model hash into competition ", txHash);
            $("#uploadIpfsSuccess2").html('<i class="fa fa-check"</i>' + ' IPFS Model Hash ' + docHash + " added to IPFS");
            $("#uploadDatasetSuccess2").html('<i class="fa fa-check"</i>' + ' Transaction ' + txHash + " added to the blockchain");
        }
    );
}

function display(hash) {
    document.getElementById('hash').innerHTML =
        "<a target='_blank' href='" + mariaProt + mariaIpfsGatewayHost + mariaIpfsGatewayPort +"/ipfs/" + hash + "'>" + hash + "</a>";
        //"<a target='_blank' href='" + mariaProt + hostName + ":8080/ipfs/" + hash + "'>" + hash + "</a>";
}

function doPayouts() {
    factoryInstance.executePayouts.sendTransaction(0, scientistAccount, { from: physicianAccount, gas: defaultGas}).then(
        function(txHash) {
            console.log("Doing payouts ", txHash);
            $("#payoutSuccess").html('<i class="fa fa-check"</i>' + ' Payouts ' + txHash + " added to the blockchain");
        }
    );
    factoryInstance.getPrize.call(0).then(function(data) {
        $('#competitionsbody').append('</td><td>' + parseInt(0) + '</td><td>' + data.toString(10));
    });
    factoryInstance.getWinner.call(0).then(function(data) {
        $('#competitionsbody').append('</td><td>' + data.toString(10) + '</td>');
    });
}

$(function() {
    $("#inputDeadline").datepicker();    
});

function getBlockDetails(blockNo) {
    var block = web3.eth.getBlock(blockNo);
    $('#blkNum').html(block.number);
    $('#transactionCount').html(block.transactions.length);
    $('#transactions').html(block.transactions[0]);
    $('#timestamp').html(Date(block.timestamp));
    $('#difficulty').html(("" + block.difficulty).replace(/['"]+/g, ''));
    $('#nonce').html(block.nonce);
    $('#size').html(block.size);
    $('#miner').html(block.miner);
    $('#gasLimit').html(block.gasLimit);
    $('#gasUsed').html(block.gasUsed);
    $('#receiptRoot').html(block.receiptRoot);
    $('#stateRoot').html(block.stateRoot);
    $('#sha3Uncles').html(block.sha3Uncles);

    $('#modalBlockDetails').modal({
        keyboard: true,
        backdrop: "static"
    });
}

function getBlockInfo() {
    var maxBlocks = 100;
    var blockNum = parseInt(web3.eth.blockNumber, 10);
    if (maxBlocks > blockNum) {
        maxBlocks = blockNum + 1;
    }    
    blocks = [];
    for (var i = 0; i < maxBlocks; ++i) {
        blocks.push(web3.eth.getBlock(blockNum - i));
    }
    $("#”transactions tbody").empty();
    blocks.forEach(function(block) {
        for (var index = 0; index < block.transactions.length; index++) {
            var t = block.transactions[index];
            $('#transactionsbody').append('<tr><td><a  target="#" onclick="getBlockDetails(' + block.number + ');return false;" href="' + t.blockNumber +
                ' ">' + block.number + '</a></td><td>' + block.hash +
                '</td><td>' + block.parentHash +
                '</td>');
        }
    });

}

window.onload = function() {
    if (typeof web3 !== 'undefined') {
        // Use the Mist/wallet provider.
        web3 = new Web3(web3.currentProvider);
    }
    else {
        // Use the provider from the config.
        web3 = new Web3(new Web3.providers.HttpProvider(`${mariaProt}${mariaTestRpcHost}${mariaTestRpcPort}`));
    }  
    web3.eth.getAccounts(function(err, accs) {
        if (err != null) {
            alert("There was an error fetching your accounts.");
            return;
        }
        if (accs.length == 0) {
            alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
            return;
        }
        accounts = accs;

        physicianAccount = accounts[0];
        currentAccount = accounts[0];
        scientistAccount = accounts[1];
        web3.eth.defaultAccount=web3.eth.accounts[0]

        userAccounts.push(physicianAccount);
        userAccounts.push(scientistAccount);
        $('#physicianAccount').html('User Account : ' + physicianAccount);
        $('#physicianBalance').html('User Balance : ' + web3.eth.getBalance(physicianAccount));
    });

    $("#accountSelect").change(function(e) {
        e.preventDefault();
        currentAccount = $("#accountSelect option:selected").val();
        currentAccountText = $("#accountSelect option:selected").text();
        var fields = currentAccountText.split('-');
        $('#actor').text(fields[1]);
        if (currentAccount == physicianAccount) {
            $('#mytabs a[href="#sectionA"]').tab('show');
        } else if (currentAccount == scientistAccount) {
            $('#mytabs a[href="#sectionB"]').tab('show');
        }

    });

    $("#deployContract").click(function() {
        deployCompetitionFactory();
    });

    $("#doPayouts").click(function() {
        doPayouts();
    });

    $("#modalClose").click(function() {
        $('#modalBlockDetails').modal('hide');
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var target = $(e.target).attr("href") // activated tab
        if (target == "#sectionA") {
            $('#actor').text("Physician");
            currentAccount = physicianAccount;
            $('#physicianAccount').html('User Account : ' + physicianAccount);
            $('#physicianBalance').html('User Balance : ' + web3.eth.getBalance(physicianAccount));
        } else if (target == "#sectionB") {
            $('#actor').text("Scientist");
            currentAccount = scientistAccount;
            $('#scientistAccount').html('User Account : ' + scientistAccount);
            $('#scientistBalance').html('User Balance : ' + web3.eth.getBalance(scientistAccount));
        }
    });
};

function demoLogin() {
    $( "#loginStatus" ).show();  
    
}