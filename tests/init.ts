import { EthereumConfig } from "@buildwithsygma/sygma-sdk-core";

import { executeKeygen } from "../src/tools/evm/keygen";
import { setupEVMChain } from "../src/tools/evm/setup";
import { setupSubstrateChain } from "../src/tools/substrate/setup";

import { BRIDGE_CONFIG, RPCS } from "./consts";

async function setMpcAddresses(): Promise<void> {
  const mpcAddress = await executeKeygen(
    BRIDGE_CONFIG.domains[0] as EthereumConfig,
    RPCS[BRIDGE_CONFIG.domains[0].id.toString()]
  );

  for (const domain of BRIDGE_CONFIG.domains) {
    if (domain.type == "substrate") {
      await setupSubstrateChain(RPCS[domain.id.toString()], mpcAddress);
    } else {
      await setupEVMChain(
        domain as EthereumConfig,
        RPCS[domain.id.toString()],
        mpcAddress
      );
    }
  }
}

export const mochaHooks = {
  beforeAll: [
    async function (): Promise<void> {
      await setMpcAddresses();
    },
  ],
};
