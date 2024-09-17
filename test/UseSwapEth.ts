import {
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { expect } from "chai";
  import hre from "hardhat";
  import { ethers } from "hardhat";
  const helpers = require("@nomicfoundation/hardhat-network-helpers");
  
  describe("UseSwapEth", function () {
    
    async function deployUseSwapEth() {
  
  
      const [owner] = await hre.ethers.getSigners();
      const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  
      const UseSwapEth = await hre.ethers.getContractFactory("UseSwapEth");
      const useSwapEth = await UseSwapEth.deploy(ROUTER_ADDRESS);
  
      return { useSwapEth, owner, ROUTER_ADDRESS };
    }
  
    describe("Deployment", function () {
      it("Should set the right router address", async function () {
        const { useSwapEth, ROUTER_ADDRESS } = await loadFixture(deployUseSwapEth);
  
        const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
        const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

        const TOKEN_HOLDER = "0xf584F8728B874a6a5c7A8d4d387C9aae9172D621";
  
        await helpers.impersonateAccount(TOKEN_HOLDER);
        const impersonatedSigner = await ethers.getSigner(TOKEN_HOLDER);
  
        const amountOutWETH = ethers.parseEther("1");
        const amountInMaxUSDC = ethers.parseUnits("4000", 6);
  
        const USDC_Contract = await ethers.getContractAt("IERC20", USDC, impersonatedSigner);
        // const WETH_Contract = await ethers.getContractAt("IERC20", WETH);

        const ROUTER = await ethers.getContractAt("IUniswapV2Router", ROUTER_ADDRESS);

        const deadline = Math.floor(Date.now() / 1000) + (60 * 10);
  
        await USDC_Contract.approve(useSwapEth, amountInMaxUSDC);
  
        const tx = await useSwapEth.connect(impersonatedSigner).handleSwapforEth(
            amountOutWETH, 
            amountInMaxUSDC, 
            [USDC, WETH], 
            impersonatedSigner.address, 
            deadline
        );
  
        tx.wait();
  
        await USDC_Contract.approve(useSwapEth, amountInMaxUSDC);
        
        const tx1 = await useSwapEth.connect(impersonatedSigner).handleSwapforEth(
            amountOutWETH, 
            amountInMaxUSDC, 
            [USDC, WETH], 
            impersonatedSigner.address, 
            deadline
        );
  
        tx1.wait();
  
        expect(await useSwapEth.uniswapRouter()).to.equal(ROUTER_ADDRESS);
        expect(await useSwapEth.swapCount()).to.equal(2);
  
      });
    });
  });
  