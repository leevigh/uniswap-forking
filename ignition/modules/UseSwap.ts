import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const router = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"

const UseSwapModule = buildModule("UseSwapModule", (m) => {
  const uniswapRouter = m.getParameter("uniswapRouter", router);

  const useSwap = m.contract("UseSwap", [uniswapRouter]);

  return { useSwap };
});

export default UseSwapModule;
