import { SygmaBridgeSetup } from "@buildwithsygma/sygma-sdk-core";

import { ADMIN_KEY } from "./consts";
import { getBridgeContract } from "./contract";
import { setMPCAddress } from "./keygen";
import { getProvider, getSigner } from "./signer";

export async function setupEVMChain(
  domain: SygmaBridgeSetup,
  mpcAddress: string
): Promise<void> {
  const provider = getProvider(domain.rpcUrl, undefined);
  const signer = getSigner(ADMIN_KEY, provider);
  const bridge = getBridgeContract(domain.bridgeAddress, signer);

  console.log("Setting up EVM chain ", domain.domainId);

  await setMPCAddress(bridge, mpcAddress);
}
