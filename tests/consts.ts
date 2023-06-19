import {
  FeeHandlerType,
  Network,
  RawConfig,
  ResourceType,
} from "@buildwithsygma/sygma-sdk-core";

export const EVM_1_RPC = "http://localhost:8545";
export const EVM_2_RPC = "http://localhost:8547";
export const SUBSTRATE_RPC = "ws://localhost:9944";
export const RPCS: { [key: string]: string } = {
  "1": EVM_1_RPC,
  "2": EVM_2_RPC,
  "3": SUBSTRATE_RPC,
};
export const SUBSTRATE_TRANSFER_RESERVER_ACCOUNT =
  "5EMepC39b7E2zfM9g6CkPp8KCAxGTh7D4w4T2tFjmjpd4tPw";

export const BRIDGE_CONFIG: RawConfig = {
  domains: [
    {
      id: 1,
      chainId: 1337,
      name: "EVM 1",
      nativeTokenName: "Ether",
      nativeTokenSymbol: "ETH",
      nativeTokenDecimals: BigInt(18),
      bridge: "0x6CdE2Cd82a4F8B74693Ff5e194c19CA08c2d1c68",
      type: Network.EVM,
      handlers: [],
      feeHandlers: [
        {
          type: FeeHandlerType.BASIC,
          address: "0x8dA96a8C2b2d3e5ae7e668d0C94393aa8D5D3B94",
        },
        {
          type: FeeHandlerType.DYNAMIC,
          address: "0x30d704A60037DfE54e7e4D242Ea0cBC6125aE497",
        },
      ],
      startBlock: BigInt(1),
      blockConfirmations: 2,
      feeRouter: "0x1CcB4231f2ff299E1E049De76F0a1D2B415C563A",
      resources: [
        {
          type: ResourceType.FUNGIBLE,
          address: "0x78E5b9cEC9aEA29071f070C8cC561F692B3511A6",
          symbol: "ERC20LR18",
          decimals: 18,
          resourceId:
            "0x0000000000000000000000000000000000000000000000000000000000000300",
        },
        {
          type: ResourceType.FUNGIBLE,
          address: "0x37356a2B2EbF65e5Ea18BD93DeA6869769099739",
          decimals: 18,
          symbol: "ERC20DYN18",
          resourceId:
            "0x0000000000000000000000000000000000000000000000000000000000000000",
        },
        {
          type: ResourceType.FUNGIBLE,
          address: "0x318C18708CCA8f1f73C17997b29f9a073702c52c",
          decimals: 14,
          resourceId:
            "0x0000000000000000000000000000000000000000000000000000000000000600",
        },
        {
          type: ResourceType.FUNGIBLE,
          address: "0x8f5b7716a0A5f94Ea10590F9070442f285a31116",
          decimals: 20,
          resourceId:
            "0x0000000000000000000000000000000000000000000000000000000000000700",
        },
        {
          type: ResourceType.NON_FUNGIBLE,
          address: "0xb61bd8740F60e0Bfc1b5C3fA2Bb9810e4AEf8938",
          resourceId:
            "0x0000000000000000000000000000000000000000000000000000000000000200",
        },
        {
          type: ResourceType.PERMISSIONED_GENERIC,
          address: "0xF956Ba663bd563f585e00D5973E06b443E5C4D65",
          resourceId:
            "0x0000000000000000000000000000000000000000000000000000000000000100",
        },
        {
          type: ResourceType.PERMISSIONLESS_GENERIC,
          address: "0x156fA85e1df5d69B0F138dcEbAa5a14ca640FaED",
          resourceId:
            "0x0000000000000000000000000000000000000000000000000000000000000500",
        },
      ],
    },
    {
      id: 2,
      chainId: 1338,
      name: "EVM 2",
      nativeTokenName: "Ether",
      nativeTokenSymbol: "ETH",
      nativeTokenDecimals: BigInt(18),
      bridge: "0x6CdE2Cd82a4F8B74693Ff5e194c19CA08c2d1c68",
      handlers: [],
      feeHandlers: [
        {
          type: FeeHandlerType.BASIC,
          address: "0x8dA96a8C2b2d3e5ae7e668d0C94393aa8D5D3B94",
        },
        {
          type: FeeHandlerType.DYNAMIC,
          address: "0x30d704A60037DfE54e7e4D242Ea0cBC6125aE497",
        },
      ],
      startBlock: BigInt(1),
      blockConfirmations: 2,
      feeRouter: "0x59d3631c86BbE35EF041872d502F218A39FBa150",
      type: Network.EVM,
      resources: [
        {
          type: ResourceType.FUNGIBLE,
          address: "0x78E5b9cEC9aEA29071f070C8cC561F692B3511A6",
          symbol: "ERC20LR18",
          decimals: 18,
          resourceId:
            "0x0000000000000000000000000000000000000000000000000000000000000300",
        },
        {
          type: ResourceType.FUNGIBLE,
          address: "0x37356a2B2EbF65e5Ea18BD93DeA6869769099739",
          decimals: 18,
          symbol: "ERC20DYN18",
          resourceId:
            "0x0000000000000000000000000000000000000000000000000000000000000000",
        },
        {
          type: ResourceType.FUNGIBLE,
          address: "0x318C18708CCA8f1f73C17997b29f9a073702c52c",
          decimals: 14,
          resourceId:
            "0x0000000000000000000000000000000000000000000000000000000000000700",
        },
        {
          type: ResourceType.FUNGIBLE,
          address: "0x8f5b7716a0A5f94Ea10590F9070442f285a31116",
          decimals: 20,
          resourceId:
            "0x0000000000000000000000000000000000000000000000000000000000000600",
        },
        {
          type: ResourceType.NON_FUNGIBLE,
          address: "0xb61bd8740F60e0Bfc1b5C3fA2Bb9810e4AEf8938",
          resourceId:
            "0x0000000000000000000000000000000000000000000000000000000000000200",
        },
        {
          type: ResourceType.PERMISSIONED_GENERIC,
          address: "0xF956Ba663bd563f585e00D5973E06b443E5C4D65",
          resourceId:
            "0x0000000000000000000000000000000000000000000000000000000000000100",
        },
        {
          type: ResourceType.PERMISSIONLESS_GENERIC,
          address: "0x156fA85e1df5d69B0F138dcEbAa5a14ca640FaED",
          resourceId:
            "0x0000000000000000000000000000000000000000000000000000000000000500",
        },
      ],
    },
    {
      id: 3,
      chainId: 5,
      name: "Substrate",
      type: Network.SUBSTRATE,
      nativeTokenSymbol: "pha",
      nativeTokenName: "pha",
      nativeTokenDecimals: BigInt(18),
      blockConfirmations: 1,
      bridge: "",
      handlers: [],
      startBlock: BigInt(5),
      resources: [
        {
          resourceId:
            "0x0000000000000000000000000000000000000000000000000000000000000300",
          type: ResourceType.FUNGIBLE,
          assetName: "FungibleLR12",
          assetId: 2000,
          xcmMultiAssetId: {
            concrete: {
              parents: 1,
              interior: {
                x3: [
                  { parachain: 2004 },
                  {
                    generalKey: [
                      5,
                      "0x7379676d61000000000000000000000000000000000000000000000000000000",
                    ],
                  },
                  {
                    generalKey: [
                      4,
                      "0x7573646300000000000000000000000000000000000000000000000000000000",
                    ],
                  },
                ],
              },
            },
          },
        },
      ],
    },
  ],
};
