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
import { NonceManager } from "@ethersproject/experimental";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";
import { Option } from "@polkadot/types";
import type { AssetBalance } from "@polkadot/types/interfaces";
import { expect } from "chai";
import { ethers, Wallet } from "ethers";

import { ADMIN_KEY } from "../../src/tools/evm/consts";
import { getSigner } from "../../src/tools/evm/signer";
import {
  BRIDGE_CONFIG,
  EVM_1_RPC,
  SUBSTRATE_RPC,
  SUBSTRATE_TRANSFER_RESERVE_ACCOUNT,
} from "../consts";

describe("EVM-Substrate ERC20", function () {
  let assetTransfer: EVMAssetTransfer;
  let destinationAssetTransfer: SubstrateAssetTransfer;

  let wallet: ethers.Signer;
  let destinationApi: ApiPromise;

  const destinationAddress = "5EMepC39b7E2zfM9g6CkPp8KCAxGTh7D4w4T2tFjmjpd4tPw";

  let erc20LR18: EvmResource;
  let destinationFungibleAsset12: SubstrateResource;
  let sourceErc20LR18Contract: ERC20PresetMinterPauser;

  before(async function () {
    const sourceProvider = new ethers.providers.JsonRpcProvider(EVM_1_RPC);
    const wsProvider = new WsProvider(SUBSTRATE_RPC);
    destinationApi = await ApiPromise.create({
      provider: wsProvider,
    });

    wallet = Wallet.fromMnemonic(
      "black toward wish jar twin produce remember fluid always confirm bacon slush",
      "m/44'/60'/0'/0/7"
    );
    wallet = wallet.connect(sourceProvider);
    wallet = new NonceManager(wallet);
    wallet = wallet.connect(sourceProvider);

    const adminWallet = getSigner(ADMIN_KEY, sourceProvider);

    assetTransfer = new EVMAssetTransfer();
    await assetTransfer.init(sourceProvider, Environment.DEVNET);
    assetTransfer.config = new Config();
    assetTransfer.config.chainId = (await sourceProvider.getNetwork()).chainId;
    assetTransfer.config.environment = BRIDGE_CONFIG;

    destinationAssetTransfer = new SubstrateAssetTransfer();
    await destinationAssetTransfer.init(
      destinationApi,
      SubstrateParachain.LOCAL,
      Environment.DEVNET
    );
    destinationAssetTransfer.config = new Config();
    destinationAssetTransfer.config.chainId = SubstrateParachain.LOCAL;
    destinationAssetTransfer.config.environment = BRIDGE_CONFIG;

    const resources = assetTransfer.config.getDomainResources();
    erc20LR18 = resources.find(
      (res) =>
        res.resourceId ==
        "0x0000000000000000000000000000000000000000000000000000000000000300"
    ) as EvmResource;

    const destinationResources =
      destinationAssetTransfer.config.getDomainResources();
    destinationFungibleAsset12 = destinationResources.find(
      (res) =>
        res.resourceId ==
        "0x0000000000000000000000000000000000000000000000000000000000000300"
    ) as SubstrateResource;

    sourceErc20LR18Contract = new ERC20PresetMinterPauser__factory(
      adminWallet
    ).attach(erc20LR18.address);
    await sourceErc20LR18Contract.mint(await wallet.getAddress(), "1000000000");

    const keyring = new Keyring({ type: "sr25519" });
    const account = keyring.addFromUri("//Alice");
    await new Promise((resolve) => {
      destinationApi.tx.assets
        .mint(
          destinationFungibleAsset12.assetId,
          SUBSTRATE_TRANSFER_RESERVE_ACCOUNT,
          "1000000000"
        )
        .signAndSend(account, {}, ({ status }) => {
          if (status.isFinalized) {
            resolve("");
          }
        });
    });
  });

  it("Should successfully transfer erc20 lock/release token with basic fee to fungible asset with 12 decimals", async function () {
    const codedBalanceBefore = await destinationApi.query.assets.account<
      Option<AssetBalance>
    >(destinationFungibleAsset12.assetId, destinationAddress);
    const balanceBefore = codedBalanceBefore.unwrapOrDefault();

    const domains = assetTransfer.config.getDomains();
    const transfer: Transfer<Fungible> = {
      from: domains[0],
      to: domains[2],
      resource: erc20LR18,
      amount: {
        amount: "10000000",
      },
      sender: await wallet.getAddress(),
      recipient: destinationAddress,
    };
    const fee = await assetTransfer.getFee(transfer);
    const approvals = await assetTransfer.buildApprovals(transfer, fee);
    for (const approval of approvals) {
      await wallet.sendTransaction(
        approval as ethers.providers.TransactionRequest
      );
    }
    const transferTx = await assetTransfer.buildTransferTransaction(
      transfer,
      fee
    );
    const txResponse = await wallet.sendTransaction(transferTx);
    await txResponse.wait(20);

    const codedBalanceAfter = await destinationApi.query.assets.account<
      Option<AssetBalance>
    >(destinationFungibleAsset12.assetId, destinationAddress);
    const balanceAfter = codedBalanceAfter.unwrapOrDefault();

    expect(balanceAfter.balance.sub(balanceBefore.balance).toString()).eq("10");
  });
});
