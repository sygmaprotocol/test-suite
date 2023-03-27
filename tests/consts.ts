import { EvmBridgeSetupList } from "@buildwithsygma/sygma-sdk-core";

export const BRIDGE_CONFIG: EvmBridgeSetupList = [
  {
    domainId: "1",
    networkId: 1337,
    name: "Local EVM 1",
    decimals: 18,
    bridgeAddress: "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550",
    erc20HandlerAddress: "0xD833215cBcc3f914bD1C9ece3EE7BF8B14f841bb",
    erc721HandlerAddress: "0x9561C133DD8580860B6b7E504bC5Aa500f0f06a7",
    rpcUrl: "http://localhost:8545",
    type: "Ethereum",
    tokens: [
      {
        type: "erc20",
        address: "0x630589690929E9cdEFDeF0734717a9eF3Ec7Fcfe",
        name: "ERC20LRTST",
        decimals: 18,
        resourceId:
          "0x0000000000000000000000000000000000000000000000000000000000000300",
        feeSettings: {
          type: "basic",
          address: "0x78E5b9cEC9aEA29071f070C8cC561F692B3511A6",
        },
      },
      {
        type: "erc20",
        address: "0xFC628dd79137395F3C9744e33b1c5DE554D94882",
        name: "ERC20TST",
        decimals: 18,
        resourceId:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        feeSettings: {
          type: "feeOracle",
          address: "0x9b1f7F645351AF3631a656421eD2e40f2802E6c0",
        },
      },
      {
        type: "erc20",
        address: "0x86072CbFF48dA3C1F01824a6761A03F105BCC697",
        name: "ERC20LRTest_14Dec",
        decimals: 14,
        resourceId:
          "0x0000000000000000000000000000000000000000000000000000000000000600",
        feeSettings: {
          type: "basic",
          address: "0x78E5b9cEC9aEA29071f070C8cC561F692B3511A6",
        },
      },
      {
        type: "erc20",
        address: "0xaf5C4C6C7920B4883bC6252e9d9B8fE27187Cf68",
        name: "ERC20Test_14Dec",
        decimals: 14,
        resourceId:
          "0x0000000000000000000000000000000000000000000000000000000000000700",
        feeSettings: {
          type: "feeOracle",
          address: "0x9b1f7F645351AF3631a656421eD2e40f2802E6c0",
        },
      },
      {
        type: "erc20",
        address: "0xFcCeD5E997E7fb1D0594518D3eD57245bB8ed17E",
        name: "ERC20LRTest_20Dec",
        decimals: 20,
        resourceId:
          "0x0000000000000000000000000000000000000000000000000000000000000800",
        feeSettings: {
          type: "basic",
          address: "0x78E5b9cEC9aEA29071f070C8cC561F692B3511A6",
        },
      },
      {
        type: "erc20",
        address: "0xCeeFD27e0542aFA926B87d23936c79c276A48277",
        name: "ERC20Test_20Dec",
        decimals: 20,
        resourceId:
          "0x0000000000000000000000000000000000000000000000000000000000000900",
        feeSettings: {
          type: "feeOracle",
          address: "0x9b1f7F645351AF3631a656421eD2e40f2802E6c0",
        },
      },
      {
        type: "erc721",
        address: "0x8914a9E5C5E234fDC3Ce9dc155ec19F43947ab59",
        name: "ERC20TST",
        decimals: 18,
        resourceId:
          "0x0000000000000000000000000000000000000000000000000000000000000200",
        feeSettings: {
          type: "feeOracle",
          address: "0x9b1f7F645351AF3631a656421eD2e40f2802E6c0",
        },
      },
    ],
  },
  {
    domainId: "2",
    networkId: 1338,
    name: "Local EVM 2",
    decimals: 18,
    bridgeAddress: "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550",
    erc20HandlerAddress: "0xD833215cBcc3f914bD1C9ece3EE7BF8B14f841bb",
    erc721HandlerAddress: "0x9561C133DD8580860B6b7E504bC5Aa500f0f06a7",
    rpcUrl: "http://localhost:8547",
    type: "Ethereum",
    tokens: [
      {
        type: "erc20",
        address: "0x630589690929E9cdEFDeF0734717a9eF3Ec7Fcfe",
        name: "ERC20LRTST",
        decimals: 18,
        resourceId:
          "0x0000000000000000000000000000000000000000000000000000000000000300",
        feeSettings: {
          type: "basic",
          address: "0x78E5b9cEC9aEA29071f070C8cC561F692B3511A6",
        },
      },
      {
        type: "erc20",
        address: "0xFC628dd79137395F3C9744e33b1c5DE554D94882",
        name: "ERC20TST",
        decimals: 18,
        resourceId:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        feeSettings: {
          type: "feeOracle",
          address: "0x9b1f7F645351AF3631a656421eD2e40f2802E6c0",
        },
      },
      {
        type: "erc20",
        address: "0x86072CbFF48dA3C1F01824a6761A03F105BCC697",
        name: "ERC20LRTest_14Dec",
        decimals: 14,
        resourceId:
          "0x0000000000000000000000000000000000000000000000000000000000000600",
        feeSettings: {
          type: "basic",
          address: "0x78E5b9cEC9aEA29071f070C8cC561F692B3511A6",
        },
      },
      {
        type: "erc20",
        address: "0xaf5C4C6C7920B4883bC6252e9d9B8fE27187Cf68",
        name: "ERC20Test_14Dec",
        decimals: 14,
        resourceId:
          "0x0000000000000000000000000000000000000000000000000000000000000700",
        feeSettings: {
          type: "feeOracle",
          address: "0x9b1f7F645351AF3631a656421eD2e40f2802E6c0",
        },
      },
      {
        type: "erc20",
        address: "0xFcCeD5E997E7fb1D0594518D3eD57245bB8ed17E",
        name: "ERC20LRTest_20Dec",
        decimals: 20,
        resourceId:
          "0x0000000000000000000000000000000000000000000000000000000000000800",
        feeSettings: {
          type: "basic",
          address: "0x78E5b9cEC9aEA29071f070C8cC561F692B3511A6",
        },
      },
      {
        type: "erc20",
        address: "0xCeeFD27e0542aFA926B87d23936c79c276A48277",
        name: "ERC20Test_20Dec",
        decimals: 20,
        resourceId:
          "0x0000000000000000000000000000000000000000000000000000000000000900",
        feeSettings: {
          type: "feeOracle",
          address: "0x9b1f7F645351AF3631a656421eD2e40f2802E6c0",
        },
      },
      {
        type: "erc721",
        address: "0x8914a9E5C5E234fDC3Ce9dc155ec19F43947ab59",
        name: "ERC20TST",
        decimals: 18,
        resourceId:
          "0x0000000000000000000000000000000000000000000000000000000000000200",
        feeSettings: {
          type: "feeOracle",
          address: "0x9b1f7F645351AF3631a656421eD2e40f2802E6c0",
        },
      },
    ],
  },
];
