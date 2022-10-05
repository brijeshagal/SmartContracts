const assert = require('assert');
const ganache = require('ganache-cli');
const { isTypedArray } = require('util/types');
const Web3 = require('web3');//Use it capital as it is constructor library
const web3 = new Web3(ganache.provider());
const { abi, bytecode } = require('../compile');

let accounts;
let inbox;
const INITIAL_STRING = 'Hi There!';
beforeEach(async () => {
  // Get a list of all the accounts.
  accounts = await web3.eth.getAccounts()
  // .then(fetchedAccounts => {
  //   console.log(fetchedAccounts);
  // });
  //Use accounts to deploy the contract.
  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: '1000000' })

});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, 'Hi There!');
      // .setMessage("test message")
      // .send({ from: accounts[0], gas: "1000000" });
  });
  it("can change a default message", async () => {
    //Don't set this to a variable.
    await inbox.methods.setMessage('Hey Ab!').send({from : accounts[0]});
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, 'Hey Ab!');
  });
});