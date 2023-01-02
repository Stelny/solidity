// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SimpleStorage {
	uint256 favoriteNumber;

	struct People {
		uint256 favoriteNumber;
		string name;
	}

	People[] public people;

	mapping(string => uint256) public nameToFavoriteNumber;

	function store(uint256 _favoriteNumber) public {
		favoriteNumber = _favoriteNumber;
	}

	function retrieve() public view returns (uint256) {
		return favoriteNumber;
	}

	function addPerson(string memory _name, uint256 _favoriteNumber) public {
		people.push(People(_favoriteNumber, _name));
		nameToFavoriteNumber[_name] = _favoriteNumber;
	}

	function getPersonList(string memory _name) public view returns (uint256) {
		for (uint i = 0; i < people.length; i++) {
			if ((keccak256(abi.encodePacked(people[i].name))) == (keccak256(abi.encodePacked(_name)))) {
				return people[i].favoriteNumber;
			}
		} 
		return 0;
	}

	function getPersonMap(string memory _name) public view returns (uint256) {
		return nameToFavoriteNumber[_name];
	} 
}