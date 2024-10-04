import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const router = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"

const UseSwapEthModule = buildModule("UseSwapEthModule", (m) => {
  const uniswapRouter = m.getParameter("uniswapRouter", router);

  const useSwapEth = m.contract("UseSwapEth", [uniswapRouter]);

  return { useSwapEth };
});

export default UseSwapEthModule;
