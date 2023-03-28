import {
  Bridge,
  Bridge__factory as BridgeFactory,
} from "@buildwithsygma/sygma-contracts";
import { Signer } from "ethers";

export function getBridgeContract(
  bridgeAddress: string,
  signer: Signer
): Bridge {
  return BridgeFactory.connect(bridgeAddress, signer);
}
