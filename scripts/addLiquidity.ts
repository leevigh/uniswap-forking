import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function main() {

    // Get all addresses of tokens and users to interact with
    const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const UniSwapRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const USDCHolder = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";

    // impersonate holder and make holder a signer
    await helpers.impersonateAccount(USDCHolder);
    const impersonatedSigner = await ethers.getSigner(USDCHolder);

    // set parameter values
    const amountUSDCDesired = ethers.parseUnits("1000", 6);
    const amountDAIDesired = ethers.parseUnits("1000", 18);
    const amountUSDCMin = ethers.parseUnits("600", 6);
    const amountDAIMin = ethers.parseUnits("600", 18);

    // set deadline to revert if it takes too long to perform transaction
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

    // get token contract snapshots for the impersonated user to approve spending
    const USDC = await ethers.getContractAt("IERC20", USDCAddress, impersonatedSigner);
    const DAI = await ethers.getContractAt("IERC20", DAIAddress, impersonatedSigner);
    const ROUTER = await ethers.getContractAt("IUniswapV2Router", UniSwapRouter, impersonatedSigner);

    // approve spending on tokens
    await USDC.approve(UniSwapRouter, amountUSDCDesired); // approve -> address to spend -> amount
    await DAI.approve(UniSwapRouter, amountDAIDesired);

    // check balance before swap
    const usdcBefore = await USDC.balanceOf(impersonatedSigner.getAddress());
    const daiBefore = await DAI.balanceOf(impersonatedSigner.getAddress());

    console.log("Balance before adding liquidity:::", "USDC:::", Number(usdcBefore), "DAI:::", Number(daiBefore));

    // Perform addLiquidity transaction
    const tx = await ROUTER.addLiquidity(
        USDCAddress,
        DAIAddress,
        amountUSDCDesired,
        amountDAIDesired,
        amountUSDCMin,
        amountDAIMin,
        impersonatedSigner.getAddress(),
        deadline
    )

    await tx.wait();

    // check balance before swap
    const usdcAfter = await USDC.balanceOf(impersonatedSigner.getAddress());
    const daiAfter = await DAI.balanceOf(impersonatedSigner.getAddress());

    console.log("Balance after adding liquidity:::", "USDC:::", Number(usdcAfter), "DAI:::", Number(daiAfter));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
