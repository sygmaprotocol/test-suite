import { ApiPromise } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";

export async function setMpcAddress(
  api: ApiPromise,
  sudo: KeyringPair,
  mpcAddr: string
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const nonce = Number((await api.query.system.account(sudo.address)).nonce);
  return new Promise((resolve, reject) => {
    api.tx.sudo
      .sudo(api.tx.sygmaBridge.setMpcAddress(mpcAddr))
      .signAndSend(sudo, { nonce: nonce, era: 0 }, (result) => {
        if (result.isError || result.dispatchError) {
          reject(result.dispatchError);
        }
        if (result.status.isFinalized) {
          resolve();
        }
      });
  });
}
