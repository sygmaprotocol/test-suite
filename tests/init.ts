import { executeKeygen } from "../tools/evm/keygen";
import { setupEVMChain } from "../tools/evm/setup";
import { setupSubstrateChain } from "../tools/substrate/setup";

import { BRIDGE_CONFIG } from "./consts";

export const mochaHooks = {
  beforeAll: [
    async function (): Promise<void> {
      const mpcAddress = await executeKeygen(BRIDGE_CONFIG[0]);

      for (const domain of BRIDGE_CONFIG) {
        if (domain.name == "substrate") {
          await setupSubstrateChain(domain, mpcAddress);
        } else {
          await setupEVMChain(domain, mpcAddress);
        }
      }
    },
  ],
};
