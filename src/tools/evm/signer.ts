import { ethers } from "ethers";

export function getProvider(
  url: string,
  network: ethers.providers.Networkish | undefined
): ethers.providers.Provider {
  return new ethers.providers.JsonRpcProvider(url, network);
}

export function getSigner(
  key: string,
  provider: ethers.providers.Provider
): ethers.Signer {
  return new ethers.Wallet(key, provider);
}
