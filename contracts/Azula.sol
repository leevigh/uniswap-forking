// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Azula is ERC20("Azula Token","AZT") {
    address owner;

    constructor() {
        owner = msg.sender;
        _mint(msg.sender, 100000e9);
    }

    function mint(uint256 _amount) external {
        require(msg.sender == owner, "not owner");
        _mint(msg.sender, _amount * 1e9);
    }

    function createTokenPair(address tokenA, address tokenB) external {

    }

    function handleSwapTokenforCustomToken(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external {

        IERC20(path[0]).transferFrom(msg.sender, address(this), amountInMax);

        // require(IERC20(path[0]).approve(uniswapRouter, amountInMax), "approve failed.");
    }
}
