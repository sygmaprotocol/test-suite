import { ethers } from "ethers";

export function getProvider(
  url: string,
  network: ethers.Networkish | undefined
): ethers.Provider {
  return new ethers.JsonRpcProvider(url, network);
}

export function getSigner(
  key: string,
  provider: ethers.Provider
): ethers.Signer {
  return new ethers.Wallet(key, provider);
}
