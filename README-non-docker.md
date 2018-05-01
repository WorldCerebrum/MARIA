# Cerebrum Alpha 1.0
# MARIA - Artificial Intelligence Research Assitant for Medicine

<p align="center">
  <img src="./logo.png" alt="MARIA Logo"/>
</p>

An application that allows physicians/researchers to create machine learning competitions that are facilitated by smart contracts on a private Ethereum blockchain and IPFS for data sharing. The goal is to show that physicians can use crowdsourced machine learning on medical data to make clinical decisions without sacrificing patient data privacy.

## Technical Requirements

[Node.js v6+ LTS and npm](https://nodejs.org/en/):
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

[Truffle v3.2.1](http://truffleframework.com/):

```
npm install -g truffle@3.2.1
```

[IPFS](https://ipfs.io/docs/install/):

Download the linked ^ package, open terminal, and do:

```
tar xvfz go-ipfs.tar.gz
mv go-ipfs/ipfs /usr/local/bin/ipfs
ipfs init
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization"]'
ipfs config --json API.HTTPHeaders.Access-Control-Expose-Headers '["Location"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
```

[iExec](https://iex.ec/):
```
npm install -g iexec
```

## Setup

### 1. Clone repository and install necessary modules
```
git clone https://github.com/WorldCerebrum/MARIA maria
cd maria
npm install
```
### 2. Initialize the blockchain with test accounts
```
testrpc
```
### 3. Initialize IPFS
In a new terminal window:
```
ipfs daemon
```
### 4. Compile and deploy smart contracts onto the blockchain
In a new terminal window:
```
truffle migrate
```
### 5. Start the web app
```
truffle serve -p 8081
```  
The app will be served at http://localhost:8081, but any web server will work.
    
### 6. Use the web app (follow the manual)

### 7. Use iExec
```
iexec submit
iexec result <txhash> --save
```
### 8. Close the web app

1. Close the application window
2. ```ctrl-c``` in each of the 3 terminal windows

##  Documentation:

http://solidity.readthedocs.io/en/latest/

https://github.com/ipfs/go-ipfs

https://github.com/iExecBlockchainComputing/iexec-sdk

https://github.com/trufflesuite/truffle-default-builder
