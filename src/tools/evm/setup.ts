import { EthereumConfig } from "@buildwithsygma/sygma-sdk-core";

import { ADMIN_KEY } from "./consts";
import { getBridgeContract } from "./contract";
import { setMPCAddress } from "./keygen";
import { getProvider, getSigner } from "./signer";

export async function setupEVMChain(
  domain: EthereumConfig,
  rpcUrl: string,
  mpcAddress: string
): Promise<void> {
  const provider = getProvider(rpcUrl, undefined);
  const signer = getSigner(ADMIN_KEY, provider);
  const bridge = getBridgeContract(domain.bridge, signer);

  await setMPCAddress(bridge, mpcAddress);
}
