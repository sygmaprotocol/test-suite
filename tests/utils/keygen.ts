import fs from "fs";

import { Bridge } from "@buildwithsygma/sygma-contracts";
import { ec } from "elliptic";
import { ethers } from "ethers";
import { parse } from "lossless-json";

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
// export async function executeKeygen(bridge: Bridge): Promise<string> {
export async function executeKeygen(bridge: Bridge): Promise<string> {
  await bridge.startKeygen();
  return await getMPCAddress();
}

/**
 *
 * @param address MPC address
 * @param bridge bridge contract instance
 */
export async function endKeygen(
  address: string,
  bridge: Bridge
): Promise<void> {
  await bridge.endKeygen(address);
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
      x: ethers
        .toBigInt((keyshare.Key.ECDSAPub.Coords as Array<string>)[0].toString())
        .toString(16),
      y: ethers
        .toBigInt((keyshare.Key.ECDSAPub.Coords as Array<string>)[1].toString())
        .toString(16),
    },
    "hex"
  );

  return ethers.computeAddress(
    "0x" + kp.getPublic().encodeCompressed("hex").toString()
  );
}
