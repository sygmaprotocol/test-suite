import { getBridgeContract } from "../tools/evm/contract";
import { getProvider, getSigner } from "../tools/evm/signer";

import { BRIDGE_CONFIG, EVM_ADMIN_KEY } from "./consts";
import { executeKeygen } from "./utils/keygen";

export const mochaHooks = {
  beforeAll: [
    async function (): Promise<void> {
      for (const domain of BRIDGE_CONFIG) {
        const provider = getProvider(domain.rpcUrl, undefined);
        const signer = getSigner(EVM_ADMIN_KEY, provider);
        const bridge = getBridgeContract(domain.bridgeAddress, signer);
        await executeKeygen(bridge);
      }
    },
  ],
};
