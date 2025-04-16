export const globalAbi = [
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
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressInsufficientBalance",
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
    name: "Global_CallerIsNotAnAdmin",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "Global_CantBeContractOrZeroAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "Global_CantBeEOAOrZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "Global_NeedsMoreThanZero",
    type: "error",
  },
  {
    inputs: [],
    name: "Global_RequiredApprovalsNotMetToSet",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidDelegate",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidEndpointCall",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "optionType",
        type: "uint16",
      },
    ],
    name: "InvalidOptionType",
    type: "error",
  },
  {
    inputs: [],
    name: "LzTokenUnavailable",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "eid",
        type: "uint32",
      },
    ],
    name: "NoPeer",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "msgValue",
        type: "uint256",
      },
    ],
    name: "NotEnoughNative",
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
        name: "addr",
        type: "address",
      },
    ],
    name: "OnlyEndpoint",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "eid",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "sender",
        type: "bytes32",
      },
    ],
    name: "OnlyPeer",
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
    inputs: [
      {
        internalType: "uint8",
        name: "bits",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "SafeCastOverflowedUintDowncast",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
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
        indexed: false,
        internalType: "uint32",
        name: "eid",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "peer",
        type: "bytes32",
      },
    ],
    name: "PeerSet",
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
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "srcEid",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "sender",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
        ],
        internalType: "struct Origin",
        name: "origin",
        type: "tuple",
      },
    ],
    name: "allowInitializePath",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "composeMsgSender",
    outputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "endpoint",
    outputs: [
      {
        internalType: "contract ILayerZeroEndpointV2",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastETHPrice",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IBorrowing.AssetName",
        name: "assetName",
        type: "uint8",
      },
    ],
    name: "getOmniChainCollateralData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "noOfIndices",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalDepositedAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalDepositedAmountInETH",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalLiquidatedAmount",
            type: "uint256",
          },
        ],
        internalType: "struct IGlobalVariables.CollateralData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOmniChainData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "normalizedAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "vaultValue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cdsPoolValue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "collateralRemainingInWithdraw",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "collateralValueRemainingInWithdraw",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "noOfLiquidations",
            type: "uint128",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "cdsCount",
            type: "uint64",
          },
          {
            internalType: "uint256",
            name: "totalCdsDepositedAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalCdsDepositedAmountWithOptionFees",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalAvailableLiquidationAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalAvailableLiquidationAmountForPropCalc",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "usdtAmountDepositedTillNow",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "lastCumulativeRate",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "totalVolumeOfBorrowersAmountinWei",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalVolumeOfBorrowersAmountinUSD",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "noOfBorrowers",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "collateralProfitsOfLiquidators",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalNoOfDepositIndices",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalVolumeOfBorrowersAmountLiquidatedInWei",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "cumulativeValue",
            type: "uint128",
          },
          {
            internalType: "bool",
            name: "cumulativeValueSign",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "downsideProtected",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nativeTokenDepositedTillNow",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "lastRealisedUpsideCr",
            type: "uint128",
          },
          {
            internalType: "bool",
            name: "firstBorrowDeposited",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "totalCdsDepositedAmountForOpFeesCrCalc",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "lastETHPrice",
            type: "uint128",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "liqAmountUsedCV",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "liqCollateralCV",
                type: "uint256",
              },
            ],
            internalType:
              "struct IBorrowLiquidation.LiquidationCumulativeValues",
            name: "liquidationCumulativeValues",
            type: "tuple",
          },
        ],
        internalType: "struct IGlobalVariables.OmniChainData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "usdaAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "cdsAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "multiSignAddress",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "thisChainEid",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "lzEndpoint",
        type: "address",
      },
      {
        internalType: "address",
        name: "delegate",
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
        components: [
          {
            internalType: "uint32",
            name: "srcEid",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "sender",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
        ],
        internalType: "struct Origin",
        name: "_origin",
        type: "tuple",
      },
      {
        internalType: "bytes32",
        name: "_guid",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "_executor",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_extraData",
        type: "bytes",
      },
    ],
    name: "lzReceive",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "nextNonce",
    outputs: [
      {
        internalType: "uint64",
        name: "nonce",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "oAppVersion",
    outputs: [
      {
        internalType: "uint64",
        name: "senderVersion",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "receiverVersion",
        type: "uint64",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IGlobalVariables.FunctionToDo",
        name: "functionToDo",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokensToSend",
            type: "uint256",
          },
        ],
        internalType: "struct IGlobalVariables.USDaOftTransferData",
        name: "oftTransferData",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "ethToSend",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "weETHToSend",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rsETHToSend",
            type: "uint256",
          },
        ],
        internalType: "struct IGlobalVariables.CollateralTokenTransferData",
        name: "collateralTokenTransferData",
        type: "tuple",
      },
      {
        internalType: "enum IGlobalVariables.CallingFunction",
        name: "callingFunction",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "refundAddress",
        type: "address",
      },
    ],
    name: "oftOrCollateralReceiveFromOtherChains",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "guid",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "nativeFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "lzTokenFee",
                type: "uint256",
              },
            ],
            internalType: "struct MessagingFee",
            name: "fee",
            type: "tuple",
          },
        ],
        internalType: "struct MessagingReceipt",
        name: "receipt",
        type: "tuple",
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
    inputs: [
      {
        internalType: "uint32",
        name: "_eid",
        type: "uint32",
      },
    ],
    name: "peers",
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
    inputs: [
      {
        internalType: "enum IGlobalVariables.FunctionToDo",
        name: "functionToDo",
        type: "uint8",
      },
      {
        internalType: "enum IBorrowing.AssetName",
        name: "assetName",
        type: "uint8",
      },
      {
        internalType: "bytes",
        name: "options",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "payInLzToken",
        type: "bool",
      },
    ],
    name: "quote",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "nativeFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lzTokenFee",
            type: "uint256",
          },
        ],
        internalType: "struct MessagingFee",
        name: "fee",
        type: "tuple",
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
        internalType: "enum IGlobalVariables.FunctionToDo",
        name: "functionToDo",
        type: "uint8",
      },
      {
        internalType: "enum IBorrowing.AssetName",
        name: "assetName",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "nativeFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lzTokenFee",
            type: "uint256",
          },
        ],
        internalType: "struct MessagingFee",
        name: "fee",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "options",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "refundAddress",
        type: "address",
      },
    ],
    name: "send",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "guid",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "nativeFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "lzTokenFee",
                type: "uint256",
              },
            ],
            internalType: "struct MessagingFee",
            name: "fee",
            type: "tuple",
          },
        ],
        internalType: "struct MessagingReceipt",
        name: "receipt",
        type: "tuple",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IGlobalVariables.FunctionToDo",
        name: "functionToDo",
        type: "uint8",
      },
      {
        internalType: "enum IBorrowing.AssetName",
        name: "assetName",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "nativeFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lzTokenFee",
            type: "uint256",
          },
        ],
        internalType: "struct MessagingFee",
        name: "fee",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "options",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "refundAddress",
        type: "address",
      },
    ],
    name: "sendForLiquidation",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "guid",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "nativeFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "lzTokenFee",
                type: "uint256",
              },
            ],
            internalType: "struct MessagingFee",
            name: "fee",
            type: "tuple",
          },
        ],
        internalType: "struct MessagingReceipt",
        name: "receipt",
        type: "tuple",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
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
        name: "_borrowLiq",
        type: "address",
      },
    ],
    name: "setBorrowLiq",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_borrow",
        type: "address",
      },
    ],
    name: "setBorrowing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_delegate",
        type: "address",
      },
    ],
    name: "setDelegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "eid",
        type: "uint32",
      },
    ],
    name: "setDstEid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_globalVariables",
        type: "address",
      },
    ],
    name: "setDstGlobalVariablesAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "normalizedAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "vaultValue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cdsPoolValue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "collateralRemainingInWithdraw",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "collateralValueRemainingInWithdraw",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "noOfLiquidations",
            type: "uint128",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "cdsCount",
            type: "uint64",
          },
          {
            internalType: "uint256",
            name: "totalCdsDepositedAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalCdsDepositedAmountWithOptionFees",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalAvailableLiquidationAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalAvailableLiquidationAmountForPropCalc",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "usdtAmountDepositedTillNow",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "lastCumulativeRate",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "totalVolumeOfBorrowersAmountinWei",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalVolumeOfBorrowersAmountinUSD",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "noOfBorrowers",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "collateralProfitsOfLiquidators",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalNoOfDepositIndices",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalVolumeOfBorrowersAmountLiquidatedInWei",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "cumulativeValue",
            type: "uint128",
          },
          {
            internalType: "bool",
            name: "cumulativeValueSign",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "downsideProtected",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nativeTokenDepositedTillNow",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "lastRealisedUpsideCr",
            type: "uint128",
          },
          {
            internalType: "bool",
            name: "firstBorrowDeposited",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "totalCdsDepositedAmountForOpFeesCrCalc",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "lastETHPrice",
            type: "uint128",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "liqAmountUsedCV",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "liqCollateralCV",
                type: "uint256",
              },
            ],
            internalType:
              "struct IBorrowLiquidation.LiquidationCumulativeValues",
            name: "liquidationCumulativeValues",
            type: "tuple",
          },
        ],
        internalType: "struct IGlobalVariables.OmniChainData",
        name: "_omniChainData",
        type: "tuple",
      },
    ],
    name: "setOmniChainData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_eid",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_peer",
        type: "bytes32",
      },
    ],
    name: "setPeer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_treasury",
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
        internalType: "enum IBorrowing.AssetName",
        name: "assetName",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "noOfIndices",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalDepositedAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalDepositedAmountInETH",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalLiquidatedAmount",
            type: "uint256",
          },
        ],
        internalType: "struct IGlobalVariables.CollateralData",
        name: "collateralData",
        type: "tuple",
      },
    ],
    name: "updateCollateralData",
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
    inputs: [],
    name: "viewOmniChainData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "normalizedAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "vaultValue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cdsPoolValue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "collateralRemainingInWithdraw",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "collateralValueRemainingInWithdraw",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "noOfLiquidations",
            type: "uint128",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "cdsCount",
            type: "uint64",
          },
          {
            internalType: "uint256",
            name: "totalCdsDepositedAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalCdsDepositedAmountWithOptionFees",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalAvailableLiquidationAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalAvailableLiquidationAmountForPropCalc",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "usdtAmountDepositedTillNow",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "lastCumulativeRate",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "totalVolumeOfBorrowersAmountinWei",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalVolumeOfBorrowersAmountinUSD",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "noOfBorrowers",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "collateralProfitsOfLiquidators",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalNoOfDepositIndices",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalVolumeOfBorrowersAmountLiquidatedInWei",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "cumulativeValue",
            type: "uint128",
          },
          {
            internalType: "bool",
            name: "cumulativeValueSign",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "downsideProtected",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nativeTokenDepositedTillNow",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "lastRealisedUpsideCr",
            type: "uint128",
          },
          {
            internalType: "bool",
            name: "firstBorrowDeposited",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "totalCdsDepositedAmountForOpFeesCrCalc",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "lastETHPrice",
            type: "uint128",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "liqAmountUsedCV",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "liqCollateralCV",
                type: "uint256",
              },
            ],
            internalType:
              "struct IBorrowLiquidation.LiquidationCumulativeValues",
            name: "liquidationCumulativeValues",
            type: "tuple",
          },
        ],
        internalType: "struct IGlobalVariables.OmniChainData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IBorrowing.AssetName",
        name: "asset",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "toAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "transferAmount",
        type: "uint256",
      },
    ],
    name: "withdrawDustAmounts",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;
