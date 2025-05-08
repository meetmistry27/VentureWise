import { JsonRpcProvider, Wallet, parseEther, isAddress } from 'ethers';

const provider = new JsonRpcProvider('http://127.0.0.1:8545');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { walletAddress, tokenRewards } = body;

    if (!walletAddress || !isAddress(walletAddress)) {
      return new Response(JSON.stringify({ message: 'Invalid wallet address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const amount = parseEther(String(tokenRewards || '0.1'))
    const hardhatPrivateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

    const sender = new Wallet(hardhatPrivateKey, provider);

    const tx = await sender.sendTransaction({
      to: walletAddress,
      value: amount,
    });

    await tx.wait();

    return new Response(
      JSON.stringify({
        message: `Sent ${tokenRewards || '0.1'} ETH to ${walletAddress}`,
        transactionHash: tx.hash,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('ETH transfer failed:', error);
    return new Response(JSON.stringify({ message: 'Transfer failed', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
