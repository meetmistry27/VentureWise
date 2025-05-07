import { ethers } from "ethers"
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
const sender = provider.getSigner(0);        // the first Hardhat account
const recipient = "0xc9d6faB5954779Ffc8cCfdA55dBCC3Bb34A50e7a";   // e.g. 0xABC...
await sender.sendTransaction({
  to: recipient,
  value: ethers.utils.parseEther("100")      // send 100 ETH
});
console.log("Sent 100 ETH to your MetaMask address!");
