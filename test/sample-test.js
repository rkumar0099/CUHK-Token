const { expect } = require("chai");
const { ethers } = require("hardhat");

let token_per_decimal = '000000000000000000';

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
  });
  

  it ('Transfer some tokens', async () => {
    const [s1, s2] = await ethers.getSigners();
    console.log(s1.address);
    const contractFactory = await ethers.getContractFactory("CUHK");
    const contract = await contractFactory.connect(s2).deploy(10);
    await contract.deployed();
    const token = contract;
    let res = await token.owner();
    console.log(res);
    let val = 10*0.0001;
    const options = {
      value: ethers.utils.parseEther(val.toString()),
    }
    await token.buyTokens(10, options);
    await token.transferTokens(5, s1.address);
    
    console.log(await token.balanceOf(s2.address));
    console.log(await token.balanceOf(s1.address));
    expect(await token.balanceOf(s2.address)).to.equal('15' + token_per_decimal);
    expect(await token.balanceOf(s1.address)).to.equal('5' + token_per_decimal);
    
  });

});
