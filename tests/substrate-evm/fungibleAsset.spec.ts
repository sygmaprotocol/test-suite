import {
  ERC20PresetMinterPauser,
  ERC20PresetMinterPauser__factory,
} from "@buildwithsygma/sygma-contracts";
import {
  Config,
  Environment,
  EVMAssetTransfer,
  EvmResource,
  Fungible,
  SubstrateAssetTransfer,
  SubstrateParachain,
  SubstrateResource,
  Transfer,
} from "@buildwithsygma/sygma-sdk-core";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";
import { KeyringPair } from "@polkadot/keyring/types";
import { expect } from "chai";
import { ethers } from "ethers";

import { ADMIN_KEY } from "../../src/tools/evm/consts";
import { getSigner } from "../../src/tools/evm/signer";
import { BRIDGE_CONFIG, EVM_1_RPC, SUBSTRATE_RPC } from "../consts";

describe("Substrate-EVM fungible asset", function () {
  let destinationAssetTransfer: EVMAssetTransfer;
  let assetTransfer: SubstrateAssetTransfer;

  let account: KeyringPair;
  let api: ApiPromise;

  const destinationAddress = "0x4f48405B503C5557533bcb413ACDE36CF8A7e4E3";

  let fungibleAssetResource: SubstrateResource;
  let destinationErc20LR18Contract: ERC20PresetMinterPauser;
  let destinationErc20LR18: EvmResource;

  before(async function () {
    const destinationProvider = new ethers.providers.JsonRpcProvider(EVM_1_RPC);
    const wsProvider = new WsProvider(SUBSTRATE_RPC);
    api = await ApiPromise.create({
      provider: wsProvider,
    });

    const keyring = new Keyring({ type: "sr25519" });
    account = keyring.addFromUri("//Alice");

    assetTransfer = new SubstrateAssetTransfer();
    await assetTransfer.init(api, SubstrateParachain.LOCAL, Environment.DEVNET);
    assetTransfer.config = new Config();
    assetTransfer.config.chainId = SubstrateParachain.LOCAL;
    assetTransfer.config.environment = BRIDGE_CONFIG;

    destinationAssetTransfer = new EVMAssetTransfer();
    await destinationAssetTransfer.init(
      destinationProvider,
      Environment.DEVNET
    );
    destinationAssetTransfer.config = new Config();
    destinationAssetTransfer.config.chainId = (
      await destinationProvider.getNetwork()
    ).chainId;
    destinationAssetTransfer.config.environment = BRIDGE_CONFIG;

    const resources = assetTransfer.config.getDomainResources();
    fungibleAssetResource = resources.find(
      (res) =>
        res.resourceId ==
        "0x0000000000000000000000000000000000000000000000000000000000000300"
    ) as SubstrateResource;
    await new Promise((resolve) => {
      api.tx.assets
        .mint(fungibleAssetResource.assetId, account.address, "10000")
        .signAndSend(account, {}, ({ status }) => {
          if (status.isFinalized) {
            resolve("");
          }
        });
    });

    const destinationResources =
      destinationAssetTransfer.config.getDomainResources();
    destinationErc20LR18 = destinationResources.find(
      (res) =>
        res.resourceId ==
        "0x0000000000000000000000000000000000000000000000000000000000000300"
    ) as EvmResource;

    const adminWallet = getSigner(ADMIN_KEY, destinationProvider);
    destinationErc20LR18Contract = new ERC20PresetMinterPauser__factory(
      adminWallet
    ).attach(destinationErc20LR18.address);
  });

  it("Should successfully transfer 12 decimal fungible asset with basic fee to erc20 token with 18 decimals", async function () {
    const balanceBefore = await destinationErc20LR18Contract.balanceOf(
      destinationAddress
    );

    const domains = assetTransfer.config.getDomains();
    const transfer: Transfer<Fungible> = {
      from: domains[2],
      to: domains[0],
      resource: fungibleAssetResource,
      amount: {
        amount: "10",
      },
      sender: account.address,
      recipient: destinationAddress,
    };
    const fee = await assetTransfer.getFee(transfer);
    const transferTx = assetTransfer.buildTransferTransaction(transfer, fee);
    await transferTx.signAndSend(account);
    await new Promise((resolve) => setTimeout(resolve, 150000));

    const balanceAfter = await destinationErc20LR18Contract.balanceOf(
      destinationAddress
    );
    expect(balanceAfter.sub(balanceBefore).toString()).eq(
      // 9 tokens in 18 decimals (1 was used for fee)
      "9000000000000000000"
    );
  });
});
