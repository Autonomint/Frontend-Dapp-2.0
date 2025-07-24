export const borrowLibAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [],
    name: "BorrowLiq_AlreadyLiquidated",
    type: "error",
  },
  {
    inputs: [],
    name: "BorrowLiq_AlreadySwapped",
    type: "error",
  },
  {
    inputs: [],
    name: "BorrowLiq_ApproveFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "BorrowLiq_BorrowHealthHigh",
    type: "error",
  },
  {
    inputs: [],
    name: "BorrowLiq_LiquidateBurnFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "BorrowLiq_RequiredApprovalsNotMetToSet",
    type: "error",
  },
  {
    inputs: [],
    name: "BorrowLiq_SlippageExceeded",
    type: "error",
  },
  {
    inputs: [],
    name: "BorrowLiq_TransferFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "ERC1967InvalidImplementation",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1967NonPayable",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [],
    name: "UUPSUnauthorizedCallContext",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "slot",
        type: "bytes32",
      },
    ],
    name: "UUPSUnsupportedProxiableUUID",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "index",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "liquidationAmount",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "profits",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "ethAmount",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "availableLiquidationAmount",
        type: "uint256",
      },
    ],
    name: "Liquidate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "UPGRADE_INTERFACE_VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "closeThePositionInSynthetix",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "priceUpdateData",
        type: "bytes[]",
      },
      {
        internalType: "bool",
        name: "closeExecution",
        type: "bool",
      },
      {
        internalType: "uint128",
        name: "usdcFromOdos",
        type: "uint128",
      },
      {
        internalType: "bytes",
        name: "odosAssembledData",
        type: "bytes",
      },
    ],
    name: "executeOrdersInSynthetix",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "borrowingAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "cdsAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "usdaAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "abondAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "globalVariablesAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "multiSignAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "wethAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "wrapperAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "synthetixPerpsV2Address",
        type: "address",
      },
      {
        internalType: "address",
        name: "synthetixAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "oneInchAggregatorV6RouterAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "multiAccountAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "usdcAddressMode",
        type: "address",
      },
      {
        internalType: "address",
        name: "susdTokenAddress",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "index",
        type: "uint64",
      },
      {
        internalType: "uint128",
        name: "tokenAmountFromOdos",
        type: "uint128",
      },
      {
        internalType: "enum IBorrowing.LiquidationType",
        name: "liquidationType",
        type: "uint8",
      },
      {
        internalType: "bytes",
        name: "odosAssembledData",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "expiredETHAmount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "oneInchSwapData",
        type: "bytes",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "solver",
            type: "address",
          },
          {
            internalType: "bytes4[]",
            name: "selectors",
            type: "bytes4[]",
          },
        ],
        internalType: "struct IBorrowLiquidation.ModeLiquidationParams",
        name: "modeParams",
        type: "tuple",
      },
    ],
    name: "liquidateBorrowPosition",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "adminAddress",
        type: "address",
      },
    ],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "treasuryAddress",
        type: "address",
      },
    ],
    name: "setTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IBorrowing.AssetName",
        name: "",
        type: "uint8",
      },
    ],
    name: "swapAmounts",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_usdcAddress",
        type: "address",
      },
    ],
    name: "updateUSDC",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "subAccount",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "index",
        type: "uint64",
      },
      {
        internalType: "uint128",
        name: "usdcFromOdos",
        type: "uint128",
      },
      {
        internalType: "bytes",
        name: "odosAssembledData",
        type: "bytes",
      },
    ],
    name: "withdrawFromSubAccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
