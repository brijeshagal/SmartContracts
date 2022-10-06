// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Lottery {
    address public manager;
    address [] public players;

    constructor (){
        manager = msg.sender;
    }

    modifier isManager(){
        require(msg.sender == manager);
        _;
    }

    function enter() public payable{
        require(msg.value > 0.01 ether);
        players.push(msg.sender);
    }

    function pickWinner() public isManager {
        uint index = _random()%players.length;        
        payable(players[index]).transfer(address(this).balance);
        players = new address[](0);
    }

    function _random() private view returns (uint256){
      //keccak256(abi.encodePacked(_str)
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }
}