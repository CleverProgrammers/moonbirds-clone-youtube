const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
module.exports = {
  mocha: {},
  compilers: {
    solc: {
      version: '0.8.15'
    }
  },
  networks: {
    'inf_Public-NFT-Drop_goerli': {
      network_id: 5,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(fs.readFileSync('/Users/davidrakosi/dev-wallet/dev-wallet.env', 'utf-8'), 'https://goerli.infura.io/v3/52476e6a60c849609706f817df40ba36')
    },
    loc_development_development: {
      network_id: "*",
      port: 7545,
      host: "127.0.0.1"
    }
  }
};
