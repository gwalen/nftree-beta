// import {ethers} from "hardhat";
// import chai from "chai";   // TODO: ask Johnny why without "{}" ?
// import {solidity} from "ethereum-waffle";

import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";


import {Root} from "../typechain/Root"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

chai.use(solidity);     //TODO: ask Johnny how it works
const {expect} = chai;  //TODO: ask Johnny how it works

describe("Root", () => {
  let root: Root;
  let signer: SignerWithAddress

  beforeEach(async () => {
    const signers = await ethers.getSigners();    
    signer = signers[0];
    const contractFactory = await ethers.getContractFactory("Root", signer);

    root = (await contractFactory.deploy()) as Root;
    await root.deployed();
    const rootCount = await root.getRootCount();

    expect(rootCount).to.eq(0);
    expect(root.address).to.properAddress;
  });


  describe("mintRoot", async () => {
    it("should mint new root", async () => {
      const testHash = "asasdasdas121212120x"
      await root.mintRoot(testHash);
      
      const hasHash = await root.hashes(testHash);
      const rootCount = await root.getRootCount();
      const ownerRoots = await root.getRootsByOwner(signer.address);
      expect(hasHash).to.eq(1);
      expect(rootCount).to.eq(1);
      expect(ownerRoots.length).to.eq(1);
      expect(ownerRoots[0]).to.eq(1);
    });

    it("should fail when minting new root with old hash", async () => {
      const testHash = "asasdasdas121212120x"
      await root.mintRoot(testHash);
      
      await expect(root.mintRoot(testHash)).to.be.revertedWith("VM Exception while processing transaction: revert Can not use the same hash");
    });


  });

});


