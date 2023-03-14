import { ApiPromise } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";

export async function setMpcAddress(
  api: ApiPromise,
  sudo: KeyringPair,
  mpcAddr: string
): Promise<void> {
  const nonce = Number((await api.query.system.account(sudo.address))["nonce"]);
  await api.tx.sudo
    .sudo(api.tx.sygmaBridge.setMpcAddress(mpcAddr))
    .signAndSend(sudo, { nonce: nonce, era: 0 });
}
