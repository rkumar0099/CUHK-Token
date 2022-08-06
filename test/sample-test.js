const { expect } = require("chai");
const { ethers } = require("hardhat");

const randomSigners = (amount) => {
  const signers = []
  for (let i = 0; i < amount; i++) {
    signers.push(ethers.Wallet.createRandom())
  }
  return signers
}

describe("CUHK", function () {

  it("Check the owner of contract", async () => {
    const contract = await ethers.getContractFactory("CUHK");
    const token = await contract.deploy(10);
    await token.deployed();

    const owner = await token.owner();
    const [expected] = await ethers.getSigners();
    expect(owner).to.equal(expected.address);
  });

  it ('Checking the total supply', async () => {
    const contract = await ethers.getContractFactory("CUHK");
    const token = await contract.deploy(10);
    await token.deployed();

    const total = await token.totalSupply();
    const expected = "10000000000000000000";
    expect(total).to.equal(expected);
    console.log(total);

  });

  it ('Buy some tokens', async () => {
    const contract = await ethers.getContractFactory("CUHK");
    const token = await contract.deploy(10);
    await token.deployed();

    let val = 10*0.0001;
    const options = {
      value: ethers.utils.parseEther(val.toString()),
    }

    await token.buyTokens(10, options);
    const bal = await token.balance();
    console.log("The contract balance is " + bal);
    const expected = "1000000000000000";
    expect(bal).to.equal(expected);
  })


  /*
  it ('Check Owner Balance', async function () {
    const contract = await ethers.getContractFactory("RK");
    const rk_token = await contract.deploy(1000);
    await rk_token.deployed();

    const bal = await rk_token.getOwnerBalance();
    expect(bal).to.equal(1000);

  });

  it ('Register crowd sale and redeem', async () => {
    const contract = await ethers.getContractFactory("RK");
    const rk_token = await contract.deploy(1000);
    await rk_token.deployed();

    const [eo, addr1, addr2] = await ethers.getSigners();

    const owner = await rk_token.getOwner();

    await expect(rk_token.crowdSale(addr1.address)).to.emit(rk_token, 'Approval')
    .withArgs(owner, addr1.address, 100);

    await expect(rk_token.connect(addr1).redeemCrowdSale()).to.emit(rk_token, 'Transfer') 
    .withArgs(owner, addr1.address, 100);

  })
  */
});
