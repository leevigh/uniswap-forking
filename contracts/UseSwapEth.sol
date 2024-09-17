// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;
import "./interfaces/IUniswapV2Router.sol";
import "./interfaces/IERC20.sol";

contract UseSwapEth {

    address public uniswapRouter;
    address public owner;
    uint public swapCount;
    // uint public swapCountToken;


    constructor(address _uniswapRouter) {
        uniswapRouter = _uniswapRouter;
        owner = msg.sender;
    }

    function handleSwapforEth(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external {

        IERC20(path[0]).transferFrom(msg.sender, address(this), amountInMax);

        require(IERC20(path[0]).approve(uniswapRouter, amountInMax), "approve failed.");
        
        IUniswapV2Router(uniswapRouter).swapTokensForExactETH(
            amountOut,
            amountInMax,
            path,
            to,
            deadline
        );

        swapCount += 1;
    }

    // function handleSwapToken(
    //     uint amountIn,
    //     uint amountOutMin,
    //     address[] calldata path,
    //     address to,
    //     uint deadline
    // ) external {

    //     IERC20(path[0]).transferFrom(msg.sender, address(this), amountIn);

    //     require(IERC20(path[0]).approve(uniswapRouter, amountOutMin), "approve failed.");
        
    //     IUniswapV2Router(uniswapRouter).swapExactTokensForTokens(
    //         amountIn,
    //         amountOutMin,
    //         path,
    //         to,
    //         deadline
    //     );

    //     swapCountToken += 1;
    // }
}