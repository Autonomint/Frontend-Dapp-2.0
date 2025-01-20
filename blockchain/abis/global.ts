/**
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x86C632E8D1fc82eef3801EFB37cbE0ad93D9755b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xA687412e7De672a5F945B15Db24c50F91512A19C)
 */
export const globalAbi = [
  {
    type: "error",
    inputs: [{ name: "target", internalType: "address", type: "address" }],
    name: "AddressEmptyCode",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "AddressInsufficientBalance",
  },
  {
    type: "error",
    inputs: [
      { name: "implementation", internalType: "address", type: "address" },
    ],
    name: "ERC1967InvalidImplementation",
  },
  { type: "error", inputs: [], name: "ERC1967NonPayable" },
  { type: "error", inputs: [], name: "EndPointUnavailable" },
  { type: "error", inputs: [], name: "FailedInnerCall" },
  { type: "error", inputs: [], name: "InvalidDelegate" },
  { type: "error", inputs: [], name: "InvalidEndpointCall" },
  { type: "error", inputs: [], name: "InvalidInitialization" },
  {
    type: "error",
    inputs: [{ name: "optionType", internalType: "uint16", type: "uint16" }],
    name: "InvalidOptionType",
  },
  { type: "error", inputs: [], name: "LzTokenUnavailable" },
  {
    type: "error",
    inputs: [{ name: "eid", internalType: "uint32", type: "uint32" }],
    name: "NoPeer",
  },
  {
    type: "error",
    inputs: [{ name: "msgValue", internalType: "uint256", type: "uint256" }],
    name: "NotEnoughNative",
  },
  { type: "error", inputs: [], name: "NotInitializing" },
  {
    type: "error",
    inputs: [{ name: "addr", internalType: "address", type: "address" }],
    name: "OnlyEndpoint",
  },
  {
    type: "error",
    inputs: [
      { name: "eid", internalType: "uint32", type: "uint32" },
      { name: "sender", internalType: "bytes32", type: "bytes32" },
    ],
    name: "OnlyPeer",
  },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  { type: "error", inputs: [], name: "ReentrancyGuardReentrantCall" },
  {
    type: "error",
    inputs: [
      { name: "bits", internalType: "uint8", type: "uint8" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "SafeCastOverflowedUintDowncast",
  },
  {
    type: "error",
    inputs: [{ name: "token", internalType: "address", type: "address" }],
    name: "SafeERC20FailedOperation",
  },
  { type: "error", inputs: [], name: "UUPSUnauthorizedCallContext" },
  {
    type: "error",
    inputs: [{ name: "slot", internalType: "bytes32", type: "bytes32" }],
    name: "UUPSUnsupportedProxiableUUID",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "version",
        internalType: "uint64",
        type: "uint64",
        indexed: false,
      },
    ],
    name: "Initialized",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "eid", internalType: "uint32", type: "uint32", indexed: false },
      {
        name: "peer",
        internalType: "bytes32",
        type: "bytes32",
        indexed: false,
      },
    ],
    name: "PeerSet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "implementation",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "Upgraded",
  },
  {
    type: "function",
    inputs: [],
    name: "UPGRADE_INTERFACE_VERSION",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "origin",
        internalType: "struct Origin",
        type: "tuple",
        components: [
          { name: "srcEid", internalType: "uint32", type: "uint32" },
          { name: "sender", internalType: "bytes32", type: "bytes32" },
          { name: "nonce", internalType: "uint64", type: "uint64" },
        ],
      },
    ],
    name: "allowInitializePath",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "endpoint",
    outputs: [
      {
        name: "",
        internalType: "contract ILayerZeroEndpointV2",
        type: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getOmniChainData",
    outputs: [
      {
        name: "",
        internalType: "struct IGlobalVariables.OmniChainData",
        type: "tuple",
        components: [
          {
            name: "normalizedAmount",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "ethVaultValue", internalType: "uint256", type: "uint256" },
          { name: "cdsPoolValue", internalType: "uint256", type: "uint256" },
          { name: "totalCDSPool", internalType: "uint256", type: "uint256" },
          {
            name: "ethRemainingInWithdraw",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "ethValueRemainingInWithdraw",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "noOfLiquidations",
            internalType: "uint128",
            type: "uint128",
          },
          { name: "nonce", internalType: "uint64", type: "uint64" },
          { name: "cdsCount", internalType: "uint64", type: "uint64" },
          {
            name: "totalCdsDepositedAmount",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "totalCdsDepositedAmountWithOptionFees",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "totalAvailableLiquidationAmount",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "usdtAmountDepositedTillNow",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "burnedUSDaInRedeem",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "lastCumulativeRate",
            internalType: "uint128",
            type: "uint128",
          },
          {
            name: "totalVolumeOfBorrowersAmountinWei",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "totalVolumeOfBorrowersAmountinUSD",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "noOfBorrowers", internalType: "uint128", type: "uint128" },
          { name: "totalInterest", internalType: "uint256", type: "uint256" },
          { name: "abondUSDaPool", internalType: "uint256", type: "uint256" },
          {
            name: "ethProfitsOfLiquidators",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "usdaGainedFromLiquidation",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "totalInterestFromLiquidation",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "interestFromExternalProtocolDuringLiquidation",
            internalType: "uint256",
            type: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_usda", internalType: "address", type: "address" },
      { name: "_cds", internalType: "address", type: "address" },
      { name: "_endpoint", internalType: "address", type: "address" },
      { name: "_delegate", internalType: "address", type: "address" },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "",
        internalType: "struct Origin",
        type: "tuple",
        components: [
          { name: "srcEid", internalType: "uint32", type: "uint32" },
          { name: "sender", internalType: "bytes32", type: "bytes32" },
          { name: "nonce", internalType: "uint64", type: "uint64" },
        ],
      },
      { name: "", internalType: "bytes", type: "bytes" },
      { name: "_sender", internalType: "address", type: "address" },
    ],
    name: "isComposeMsgSender",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_origin",
        internalType: "struct Origin",
        type: "tuple",
        components: [
          { name: "srcEid", internalType: "uint32", type: "uint32" },
          { name: "sender", internalType: "bytes32", type: "bytes32" },
          { name: "nonce", internalType: "uint64", type: "uint64" },
        ],
      },
      { name: "_guid", internalType: "bytes32", type: "bytes32" },
      { name: "_message", internalType: "bytes", type: "bytes" },
      { name: "_executor", internalType: "address", type: "address" },
      { name: "_extraData", internalType: "bytes", type: "bytes" },
    ],
    name: "lzReceive",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "uint32", type: "uint32" },
      { name: "", internalType: "bytes32", type: "bytes32" },
    ],
    name: "nextNonce",
    outputs: [{ name: "nonce", internalType: "uint64", type: "uint64" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "oAppVersion",
    outputs: [
      { name: "senderVersion", internalType: "uint64", type: "uint64" },
      { name: "receiverVersion", internalType: "uint64", type: "uint64" },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_functionToDo",
        internalType: "enum IGlobalVariables.FunctionToDo",
        type: "uint8",
      },
      {
        name: "_oftTransferData",
        internalType: "struct IGlobalVariables.USDaOftTransferData",
        type: "tuple",
        components: [
          { name: "recipient", internalType: "address", type: "address" },
          { name: "tokensToSend", internalType: "uint256", type: "uint256" },
        ],
      },
      {
        name: "_nativeTokenTransferData",
        internalType: "struct IGlobalVariables.NativeTokenTransferData",
        type: "tuple",
        components: [
          { name: "recipient", internalType: "address", type: "address" },
          {
            name: "nativeTokensToSend",
            internalType: "uint256",
            type: "uint256",
          },
        ],
      },
      { name: "_refundAddress", internalType: "address", type: "address" },
    ],
    name: "oftOrNativeReceiveFromOtherChains",
    outputs: [
      {
        name: "receipt",
        internalType: "struct MessagingReceipt",
        type: "tuple",
        components: [
          { name: "guid", internalType: "bytes32", type: "bytes32" },
          { name: "nonce", internalType: "uint64", type: "uint64" },
          {
            name: "fee",
            internalType: "struct MessagingFee",
            type: "tuple",
            components: [
              { name: "nativeFee", internalType: "uint256", type: "uint256" },
              { name: "lzTokenFee", internalType: "uint256", type: "uint256" },
            ],
          },
        ],
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "eid", internalType: "uint32", type: "uint32" }],
    name: "peers",
    outputs: [{ name: "peer", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_functionToDo",
        internalType: "enum IGlobalVariables.FunctionToDo",
        type: "uint8",
      },
      { name: "_options", internalType: "bytes", type: "bytes" },
      { name: "_payInLzToken", internalType: "bool", type: "bool" },
    ],
    name: "quote",
    outputs: [
      {
        name: "fee",
        internalType: "struct MessagingFee",
        type: "tuple",
        components: [
          { name: "nativeFee", internalType: "uint256", type: "uint256" },
          { name: "lzTokenFee", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_functionToDo",
        internalType: "enum IGlobalVariables.FunctionToDo",
        type: "uint8",
      },
      {
        name: "_fee",
        internalType: "struct MessagingFee",
        type: "tuple",
        components: [
          { name: "nativeFee", internalType: "uint256", type: "uint256" },
          { name: "lzTokenFee", internalType: "uint256", type: "uint256" },
        ],
      },
      { name: "_options", internalType: "bytes", type: "bytes" },
      { name: "_refundAddress", internalType: "address", type: "address" },
    ],
    name: "send",
    outputs: [
      {
        name: "receipt",
        internalType: "struct MessagingReceipt",
        type: "tuple",
        components: [
          { name: "guid", internalType: "bytes32", type: "bytes32" },
          { name: "nonce", internalType: "uint64", type: "uint64" },
          {
            name: "fee",
            internalType: "struct MessagingFee",
            type: "tuple",
            components: [
              { name: "nativeFee", internalType: "uint256", type: "uint256" },
              { name: "lzTokenFee", internalType: "uint256", type: "uint256" },
            ],
          },
        ],
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_functionToDo",
        internalType: "enum IGlobalVariables.FunctionToDo",
        type: "uint8",
      },
      { name: "_liqIndex", internalType: "uint128", type: "uint128" },
      {
        name: "_liquidationInfo",
        internalType: "struct CDSInterface.LiquidationInfo",
        type: "tuple",
        components: [
          {
            name: "liquidationAmount",
            internalType: "uint128",
            type: "uint128",
          },
          { name: "profits", internalType: "uint128", type: "uint128" },
          { name: "ethAmount", internalType: "uint128", type: "uint128" },
          {
            name: "availableLiquidationAmount",
            internalType: "uint256",
            type: "uint256",
          },
        ],
      },
      {
        name: "_fee",
        internalType: "struct MessagingFee",
        type: "tuple",
        components: [
          { name: "nativeFee", internalType: "uint256", type: "uint256" },
          { name: "lzTokenFee", internalType: "uint256", type: "uint256" },
        ],
      },
      { name: "_options", internalType: "bytes", type: "bytes" },
      { name: "_refundAddress", internalType: "address", type: "address" },
    ],
    name: "sendForLiquidation",
    outputs: [
      {
        name: "receipt",
        internalType: "struct MessagingReceipt",
        type: "tuple",
        components: [
          { name: "guid", internalType: "bytes32", type: "bytes32" },
          { name: "nonce", internalType: "uint64", type: "uint64" },
          {
            name: "fee",
            internalType: "struct MessagingFee",
            type: "tuple",
            components: [
              { name: "nativeFee", internalType: "uint256", type: "uint256" },
              { name: "lzTokenFee", internalType: "uint256", type: "uint256" },
            ],
          },
        ],
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [{ name: "_borrowLiq", internalType: "address", type: "address" }],
    name: "setBorrowLiq",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_borrow", internalType: "address", type: "address" }],
    name: "setBorrowing",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_delegate", internalType: "address", type: "address" }],
    name: "setDelegate",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_eid", internalType: "uint32", type: "uint32" }],
    name: "setDstEid",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_globalVariables", internalType: "address", type: "address" },
    ],
    name: "setDstGlobalVariablesAddress",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_omniChainData",
        internalType: "struct IGlobalVariables.OmniChainData",
        type: "tuple",
        components: [
          {
            name: "normalizedAmount",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "ethVaultValue", internalType: "uint256", type: "uint256" },
          { name: "cdsPoolValue", internalType: "uint256", type: "uint256" },
          { name: "totalCDSPool", internalType: "uint256", type: "uint256" },
          {
            name: "ethRemainingInWithdraw",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "ethValueRemainingInWithdraw",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "noOfLiquidations",
            internalType: "uint128",
            type: "uint128",
          },
          { name: "nonce", internalType: "uint64", type: "uint64" },
          { name: "cdsCount", internalType: "uint64", type: "uint64" },
          {
            name: "totalCdsDepositedAmount",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "totalCdsDepositedAmountWithOptionFees",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "totalAvailableLiquidationAmount",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "usdtAmountDepositedTillNow",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "burnedUSDaInRedeem",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "lastCumulativeRate",
            internalType: "uint128",
            type: "uint128",
          },
          {
            name: "totalVolumeOfBorrowersAmountinWei",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "totalVolumeOfBorrowersAmountinUSD",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "noOfBorrowers", internalType: "uint128", type: "uint128" },
          { name: "totalInterest", internalType: "uint256", type: "uint256" },
          { name: "abondUSDaPool", internalType: "uint256", type: "uint256" },
          {
            name: "ethProfitsOfLiquidators",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "usdaGainedFromLiquidation",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "totalInterestFromLiquidation",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "interestFromExternalProtocolDuringLiquidation",
            internalType: "uint256",
            type: "uint256",
          },
        ],
      },
    ],
    name: "setOmniChainData",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_eid", internalType: "uint32", type: "uint32" },
      { name: "_peer", internalType: "bytes32", type: "bytes32" },
    ],
    name: "setPeer",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_treasury", internalType: "address", type: "address" }],
    name: "setTreasury",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "newImplementation", internalType: "address", type: "address" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
  },
  { type: "receive", stateMutability: "payable" },
] as const;
