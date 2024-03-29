import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
import { cryptoWaitReady } from "@polkadot/util-crypto";

import { setMpcAddress } from "./keygen";

export async function setupSubstrateChain(
  rpcUrl: string,
  mpcAddress: string
): Promise<void> {
  const sygmaPalletProvider = new WsProvider(rpcUrl);
  const api = await ApiPromise.create({
    provider: sygmaPalletProvider,
  });
  await cryptoWaitReady();

  const keyring = new Keyring({ type: "sr25519" });
  const sudo = keyring.addFromUri("//Alice");
  await setMpcAddress(api, sudo, mpcAddress);
  await api.disconnect();
}
