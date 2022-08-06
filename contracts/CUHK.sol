//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract CUHK is ERC20("CUHK Token", "CUT") {
    address public owner;
    uint32 public num_users;
    uint256 public token_per_decimal = 10**18;
    uint256 public price_per_token = 0.0001 ether;
    uint256 public MAX_SUPPLY = 1000 * token_per_decimal;

    constructor(uint256 _initMint) {
        owner = msg.sender;
        uint256 total_num = _initMint * token_per_decimal;
        _mint(msg.sender, total_num);  
        num_users += 1;
    }

    function buyTokens(uint256 amt) external payable {
        uint256 total_num = amt * token_per_decimal;
        require(totalSupply() + total_num <= MAX_SUPPLY, 'Max Supply reached!!');
        uint256 total_value = amt * price_per_token;
        require(msg.value >= total_value, 'Insufficient price paid for the tokens!!');
        _mint(msg.sender, total_num);
    }

    function balance() public view returns (uint256) {
        return address(this).balance;
    }
}