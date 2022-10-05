const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { abi, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'ability poet patrol upset outside say jacket poet ball ship salon present',
  'https://rinkeby.infura.io/v3/1f7c83289ab046f8848eb22646597c3f'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attemting to deploy from account: ', accounts[0]);

  const res = await new web3.eth.Contract(abi)
  .deploy( { data: bytecode, arguments: ['Ab'] } )
  .send({from: accounts[0], gas: "1000000"})
    
  console.log('Contract deployed to ', res.options.address);
  // await new web3.eth.message().call();
};
deploy();