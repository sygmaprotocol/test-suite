import { expect } from "chai";
import { BigNumber, ethers, Wallet } from "ethers";
import { NonceManager } from "@ethersproject/experimental";

import { Config, Environment, EVMAssetTransfer, EvmResource, Fungible, Resource, Transfer } from "@buildwithsygma/sygma-sdk-core";

import { BRIDGE_CONFIG, EVM_1_RPC, EVM_2_RPC } from "../consts";
import { ERC20PresetMinterPauser, ERC20PresetMinterPauser__factory } from "@buildwithsygma/sygma-contracts";
import { getSigner } from "../../src/tools/evm/signer";
import { ADMIN_KEY } from "../../src/tools/evm/consts";

describe("EVM-EVM ERC20", function () {
  let assetTransfer: EVMAssetTransfer;
  let destinationAssetTransfer: EVMAssetTransfer;

  let wallet: ethers.Signer;

  let erc20LR18: Resource;
  let sourceErc20LR18Contract: ERC20PresetMinterPauser;
  let destinationErc20LR18Contract: ERC20PresetMinterPauser;


  before(async function () {
    const sourceProvider = new ethers.providers.JsonRpcProvider(EVM_1_RPC);
    const destinationProvider = new ethers.providers.JsonRpcProvider(EVM_2_RPC);

    wallet = Wallet.fromMnemonic(
      "black toward wish jar twin produce remember fluid always confirm bacon slush",
      "m/44'/60'/0'/0/7"
    );
    wallet = wallet.connect(sourceProvider);
    wallet = new NonceManager(wallet);
    wallet = wallet.connect(sourceProvider);

    const adminWallet = getSigner(ADMIN_KEY, sourceProvider);
    const destAdminWallet = getSigner(ADMIN_KEY, destinationProvider);

    assetTransfer = new EVMAssetTransfer();
    await assetTransfer.init(sourceProvider, Environment.DEVNET);
    assetTransfer.config = new Config();
    assetTransfer.config.chainId = (await sourceProvider.getNetwork()).chainId;
    assetTransfer.config.environment = BRIDGE_CONFIG;

    destinationAssetTransfer = new EVMAssetTransfer();
    await destinationAssetTransfer.init(destinationProvider, Environment.DEVNET);
    destinationAssetTransfer.config = new Config();
    destinationAssetTransfer.config.chainId = (await destinationProvider.getNetwork()).chainId;
    destinationAssetTransfer.config.environment = BRIDGE_CONFIG;

    const resources = assetTransfer.config.getDomainResources();
    erc20LR18 = resources.find((res) => res.symbol == "ERC20LR18") as Resource;

    const destinationResources = destinationAssetTransfer.config.getDomainResources();
    const destErc20LR18 = destinationResources.find((res) => res.symbol == "ERC20LR18") as Resource;

    sourceErc20LR18Contract = new ERC20PresetMinterPauser__factory(adminWallet).attach((erc20LR18 as EvmResource).address);
    await sourceErc20LR18Contract.mint(await wallet.getAddress(), "10000")

    destinationErc20LR18Contract = new ERC20PresetMinterPauser__factory(destAdminWallet).attach((destErc20LR18 as EvmResource).address);
  });

  it("Should successfully transfer erc20 lock/release token with basic fee", async function () {
    const balanceBefore = await destinationErc20LR18Contract.balanceOf(await wallet.getAddress())

    const domains = assetTransfer.config.getDomains();
    const transfer: Transfer<Fungible> = {
      from: domains[0],
      to: domains[1],
      resource: erc20LR18,
      amount: {
        amount: "1000"
      },
      sender: await wallet.getAddress(),
      recipient: await wallet.getAddress(),
    }
    const fee = await assetTransfer.getFee(transfer);
    const approvals = await assetTransfer.buildApprovals(transfer, fee);
    for (const approval of approvals) {
      await wallet.sendTransaction(approval as ethers.providers.TransactionRequest);
    }
    const transferTx = await assetTransfer.buildTransferTransaction(transfer, fee);
    const txResponse = await wallet.sendTransaction(transferTx);
    await txResponse.wait(20)

    const balanceAfter = await destinationErc20LR18Contract.balanceOf(await wallet.getAddress())

    expect(balanceAfter.sub(balanceBefore).toString()).eq("1000");
  });
});
