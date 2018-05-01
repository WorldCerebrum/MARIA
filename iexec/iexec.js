module.exports = {
  name: 'RWordcloud',
  app: {
    type: 'DOCKER',
    envvars: 'XWDOCKERIMAGE=iexechub/r-wordcloud',
  },
  work: {
      cmdline: 'Rscript ./iexec/ComputeModule.R',
      cmdline: 'Rscript ./iexec/ComputeModule.R https://ipfs.io/ipfs/QmPT3M5GxBJjy65TBBojpkCKRWD2nCxEd76DGWaxxBZQ5K https://ipfs.io/ipfs/QmQpY849HvDhL8cJMWjBgb4nuG7nLhwStzkrVSckVtR6q5 https://ipfs.io/ipfs/QmSYGHqR9qib7HECpYX5duffTBhHAaRPKRzbT7Enxh5cqu https://ipfs.io/ipfs/QmQQoPjmLu9SNCSvM7nF9f5k1HWoS2FCs1z6xPtXZQi2QN',
      dirinuri: 'https://raw.githubusercontent.com/WorldCerebrum/MARIA/master/iexec/apps/ComputeModule.R',
  }
};
