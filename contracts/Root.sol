pragma solidity >=0.6.0 <0.8.0;
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Root is ERC721 {

  using Counters for Counters.Counter;
  Counters.Counter private nodesIds;

  // represnts a map of roots for feach owner, one onwer can have many roots
  mapping (address => uint256[]) private rootsByOwner;
  // represents a map node adjacents; root is also a node; each treee strarts with root
  mapping (uint256 => uint256[]) private tree;
  uint256[] private roots;
  // unique nft hashes
  mapping(string => uint8) public hashes;

  //TODO: read about counstructors and inheritance
  constructor () ERC721("Root", "RT") {}

  //TODO: can I use calldata for hahs (as it is immutable) but I need to save it ?
  function mintRoot(string calldata hash) public payable returns (uint256) {
    require(hashes[hash] != 1, "Can not use the same hash");

    hashes[hash] = 1;
    nodesIds.increment();
    uint256 newRootId = nodesIds.current();

    roots.push(newRootId);
    rootsByOwner[msg.sender].push(newRootId);

    _mint(msg.sender, newRootId);
    _setTokenURI(newRootId, hash);
    return newRootId;
  }

  function getRootCount() public view returns(uint) {
    return roots.length;
  }

  function getRootsByOwner(address ownerAddr) public view returns(uint256[] memory) {
    return rootsByOwner[ownerAddr];
  } 

}