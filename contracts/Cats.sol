pragma solidity ^0.5.2;

import "./Storage.sol";

contract Cats is Storage{

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }
    
constructor() public{
    owner = msg.sender;
}

    function getNumberOFCats()public view returns(uint256){
        return _uintStorage["Cats"];
    }
    function setNumberOfCats(uint256 _toSet)public {
        _uintStorage["Cats"] = _toSet;
    }
}