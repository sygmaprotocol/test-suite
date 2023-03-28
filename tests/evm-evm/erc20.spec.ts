import { FeeDataResult, Sygma } from "@buildwithsygma/sygma-sdk-core";
import { expect } from "chai";
import { ContractReceipt, ethers, Wallet } from "ethers";

import { BRIDGE_CONFIG } from "../consts";

describe("EVM-EVM ERC20", function () {
  let sygma: Sygma;
  let wallet: Wallet;

  before(async function () {
    const provider = new ethers.providers.JsonRpcProvider(
      BRIDGE_CONFIG[0].rpcUrl
    );
    wallet = ethers.Wallet.fromMnemonic(
      "black toward wish jar twin produce remember fluid always confirm bacon slush",
      "m/44'/60'/0'/0/0"
    );
    wallet.connect(provider);
    sygma = new Sygma({
      bridgeSetupList: BRIDGE_CONFIG,
    });
    sygma.initializeConnectionRPC(wallet.address);
  });

  it("Should successfully transfer erc20 lock/release token with basic fee", async function () {
    const amount = "1000";
    sygma.setSelectedToken("0x630589690929E9cdEFDeF0734717a9eF3Ec7Fcfe");
    sygma.setDestination("2");
    const feeRate = await sygma.fetchFeeData({
      amount: amount,
      recipientAddress: wallet.address,
    });
    await sygma.approve({ amountOrIdForApproval: amount });
    const depositTx = await sygma.deposit({
      amount: amount,
      recipientAddress: wallet.address,
      feeData: feeRate as FeeDataResult,
    });
    const depositEvent = await sygma.getDepositEventFromReceipt(
      depositTx as ContractReceipt
    );
    const { depositNonce } = depositEvent.args;
    const isDone = new Promise((resolve) => {
      sygma.destinationProposalExecutionEventListener(
        depositNonce.toNumber(),
        () => {
          console.log("DONE");
          resolve("GENERATED");
        }
      );
    });
    await isDone;
    console.log("DONE");
  });
});
