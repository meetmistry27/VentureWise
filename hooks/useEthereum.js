import { useState, useEffect } from "react";
import { ethers } from "ethers";
import tokenAbi from "../abis/VentureToken.json";

export function useTokenContract() {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    const signer = provider.getSigner(); // assumes MetaMask or injected provider
    const tokenAddr = process.env.NEXT_PUBLIC_TOKEN_ADDRESS;
    setContract(new ethers.Contract(tokenAddr, tokenAbi, signer));
  }, []);

  return contract;
}
