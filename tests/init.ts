import { getBridgeContract } from "../tools/evm/contract";
import { getProvider, getSigner } from "../tools/evm/signer";

import { BRIDGE_CONFIG, EVM_ADMIN_KEY } from "./consts";
import { executeKeygen, setMPCAddress } from "./utils/keygen";

export const mochaHooks = {
  beforeAll: [
    async function (): Promise<void> {
      const keygenDomain = BRIDGE_CONFIG[0];
      const provider = getProvider(keygenDomain.rpcUrl, undefined);
      const signer = getSigner(EVM_ADMIN_KEY, provider);
      const bridge = getBridgeContract(keygenDomain.bridgeAddress, signer);
      const mpcAddress = executeKeygen(bridge);

      for (const domain of BRIDGE_CONFIG) {
        const provider = getProvider(domain.rpcUrl, undefined);
        const signer = getSigner(EVM_ADMIN_KEY, provider);
        const bridge = getBridgeContract(domain.bridgeAddress, signer);
        await setMPCAddress(bridge, mpcAddress);
      }
    },
  ],
};
