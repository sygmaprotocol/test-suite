import { EthereumConfig } from "@buildwithsygma/sygma-sdk-core";
import { executeKeygen } from "../src/tools/evm/keygen";
import { setupEVMChain } from "../src/tools/evm/setup";
import { setupSubstrateChain } from "../src/tools/substrate/setup";

import { BRIDGE_CONFIG, RPCS } from "./consts";

export const mochaHooks = {
  beforeAll: [
    async function (): Promise<void> {
      /*
      const mpcAddress = await executeKeygen(BRIDGE_CONFIG.domains[0], RPCS[BRIDGE_CONFIG.domains[0].id.toString()]);
      // const mpcAddress = "0x7A486E914A89615199eAd76A5d0e6Ae9673bb8E0"

      for (const domain of BRIDGE_CONFIG.domains) {
        if (domain.name == "substrate") {
          // await setupSubstrateChain(domain, mpcAddress);
        } else {
          await setupEVMChain(domain as EthereumConfig, RPCS[domain.id.toString()], mpcAddress);
        }
      }
      */
    },
  ],
};
