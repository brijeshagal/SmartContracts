// const path = require('path');
// const fs = require('fs');
// const solc = require('solc');

// const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
// const source = fs.readFileSync(inboxPath, 'utf8');
// module.exports = solc.compile(source, 1).contracts[':Inbox'];
//1 denotes number of contracts we are going to deploy.


const path = require('path');
const fs = require('fs');
const solc = require('solc');



const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'UTF-8');

var input = {
    language: 'Solidity',
    sources: {
        [inboxPath] : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 
var output = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(output.contracts[[inboxPath]]["Inbox"].abi);

module.exports = {
  abi: output.contracts[[inboxPath]]["Inbox"].abi,
  bytecode: output.contracts[[inboxPath]]["Inbox"].evm.bytecode.object,
};


