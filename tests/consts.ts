import { SygmaBridgeSetupList } from "@buildwithsygma/sygma-sdk-core";

export const BRIDGE_CONFIG: SygmaBridgeSetupList = [
  {
    domainId: "1",
    networkId: 1337,
    name: "Local EVM 1",
    decimals: 18,
    bridgeAddress: "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550",
    erc20HandlerAddress: "0x1ED1d77911944622FCcDDEad8A731fd77E94173e",
    erc721HandlerAddress: "0x481f97f9C82a971B3844a422936a4d3c4082bF84",
    rpcUrl: "http://localhost:8545",
    tokens: [
      {
        type: "erc20",
        address: "0x1CcB4231f2ff299E1E049De76F0a1D2B415C563A",
        name: "ERC20LRTST",
        decimals: 18,
        resourceId:
          "0x0000000000000000000000000000000000000000000000000000000000000300",
        feeSettings: {
          type: "basic",
          address: "0x78E5b9cEC9aEA29071f070C8cC561F692B3511A6",
        },
      },
    ],
  },
];

export const EVM_ADMIN_KEY =
  "4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d";
