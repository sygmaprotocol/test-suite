import fs from "fs";

import { Bridge } from "@buildwithsygma/sygma-contracts";
import { ec } from "elliptic";
import { BigNumber, ethers } from "ethers";
import { parse } from "lossless-json";

import { ADMIN_KEY } from "./consts";
import { getBridgeContract } from "./contract";
import { getProvider, getSigner } from "./signer";
import { EthereumConfig } from "@buildwithsygma/sygma-sdk-core";

export type Keyshare = {
  Key: {
    ECDSAPub: {
      Coords: [];
    };
  };
};

const KEYSHARE_LOCATION = "./cfg/relayer/keyshares/0.keyshare";

/**
 * Executes keygen process and returns generated MPC address.
 *
 * @param bridge bridge contract instance
 * @returns MPC address
 */
export async function executeKeygen(domain: EthereumConfig, rpcUrl: string): Promise<string> {
  const provider = getProvider(rpcUrl, undefined);
  const signer = getSigner(ADMIN_KEY, provider);
  const bridge = getBridgeContract(domain.bridge, signer);

  const tx = await bridge.startKeygen();
  await tx.wait();

  return await getMPCAddress();
}

/**
 * Sets MPC address on chain after keygen.
 *
 * @param bridge bridge contract instance
 */
export async function setMPCAddress(
  bridge: Bridge,
  address: string
): Promise<void> {
  const tx = await bridge.endKeygen(address);
  await tx.wait();
}

async function getMPCAddress(): Promise<string> {
  const addressGenerated = new Promise(function (resolve) {
    const id = setInterval(() => {
      const exists = fs.existsSync(KEYSHARE_LOCATION);
      if (exists) {
        resolve("address generated");
        clearInterval(id);
      }
    }, 1000);
  });
  await addressGenerated;

  const rawKeyshare = fs.readFileSync(KEYSHARE_LOCATION);
  const keyshare = parse(rawKeyshare.toString()) as Keyshare;
  return computeAddress(keyshare);
}

function computeAddress(keyshare: Keyshare): string {
  const curve = new ec("secp256k1");
  const kp = curve.keyFromPublic(
    {
      x: BigNumber.from(
        (keyshare.Key.ECDSAPub.Coords as Array<string>)[0].toString()
      )
        .toBigInt()
        .toString(16),
      y: BigNumber.from(
        (keyshare.Key.ECDSAPub.Coords as Array<string>)[1].toString()
      )
        .toBigInt()
        .toString(16),
    },
    "hex"
  );

  return ethers.utils.computeAddress(
    "0x" + kp.getPublic().encodeCompressed("hex").toString()
  );
}
