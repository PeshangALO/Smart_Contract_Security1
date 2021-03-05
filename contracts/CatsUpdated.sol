pragma solidity ^0.5.2;

import "./Storage.sol";

contract CatsUpdated is Storage{

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }
 
    constructor() public{
        initialize(msg.sender);
    }

    // have to be sure to run it once.
    function initialize(address _owner) public{
        require(!_initialized);
        owner = _owner;
        _initialized = true;
    }

    function getNumberOFCats()public view returns(uint256){
        return _uintStorage["Cats"];
    }
    function setNumberOfCats(uint256 _toSet)public onlyOwner{
        _uintStorage["Cats"] = _toSet;
    }
}