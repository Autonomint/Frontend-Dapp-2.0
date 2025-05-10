export const cdsAbi = [
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
    name: "CDSInterface_SupportedTokenAddressAndAssetDetailsMustBeSameLength",
    type: "error",
  },
  {
    inputs: [],
    name: "CDSInterface_ZeroSupportedTokenAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_AlreadyWithdrew",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_AlreadyWithdrewGains",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_CallerIsNotAnAdmin",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "inputAddress",
        type: "address",
      },
    ],
    name: "CDS_CantBeContractOrZeroAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "inputAddress",
        type: "address",
      },
    ],
    name: "CDS_CantBeEOAOrZeroAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "hashedAddress",
        type: "bytes32",
      },
    ],
    name: "CDS_CantBeZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_ETH_TransferFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "CDS_IncorrectTokenOrder",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_Insufficient_Asset_Balance",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_Insufficient_Balance",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_Insufficient_USDa_Balance",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_InvalidAsset",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_InvalidIndex",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_InvalidPosition",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "liquidationAmount",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "totalDepositingAmount",
        type: "uint256",
      },
    ],
    name: "CDS_LiqAmountExceedsDepositAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_LockingPeriodLessThanWithdrawTimeLimit",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_NeedsMoreThanZero",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_NeedsUSDTOnly",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_NeedsZero",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "CDS_NotAllowedToken",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_NotAnAdminTwo",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_NotEnoughFundInCDS",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_OnlyBorrowCancall",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_OnlyGlobalOrLiqCanCall",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_Paused",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_PositionNotYetWithdrew",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "assetAddress",
        type: "address",
      },
    ],
    name: "CDS_PriceFeed_Failed",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_RequiredApprovalsNotMetToSet",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_RequiredUSDaNotMet",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_ShouldNotBeZero",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_SurplusUSDT",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_SwapFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_TokenAddressesAndAmountsMustBeSameLength",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_TransferFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_USDT_TransferFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_USDa_MintFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_USDa_TransferFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_UserDepositHasSufficientHealth",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_WithdrawTimeNotYetReached",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_ZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "CDS_ZeroNativeTokenDeposited",
    type: "error",
  },
  {
    inputs: [],
    name: "ECDSAInvalidSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "ECDSAInvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "ECDSAInvalidSignatureS",
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
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "index",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint128[]",
        name: "depositedAmounts",
        type: "uint128[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "depositedTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint128[]",
        name: "prices",
        type: "uint128[]",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "lockingPeriod",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "liquidationAmount",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "optedForLiquidation",
        type: "bool",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "EIP712DomainChanged",
    type: "event",
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "index",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "withdrawAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "withdrawTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "withdrewLiqCollateralAmount",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "ethPriceAtWithdraw",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "optionsFees",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "excessProfitCumulativeValue",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "priceChangePL",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "liqUsed",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "index",
        type: "uint64",
      },
    ],
    name: "WithdrewGains",
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
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "assetDetails",
    outputs: [
      {
        internalType: "enum CDSInterface.AssetStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "uint64",
        name: "LTV",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "tokenDecimals",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "priceDecimals",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "upside",
        type: "uint128",
      },
    ],
    name: "calculateCrForRealizedUpside",
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
        internalType: "uint128",
        name: "fees",
        type: "uint128",
      },
    ],
    name: "calculateCumulativeRate",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "vaultBal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "globalTotalCdsDepositedAmount",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "_price",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "lastETHPrice",
        type: "uint128",
      },
    ],
    name: "calculateCumulativeValue",
    outputs: [
      {
        components: [
          {
            internalType: "uint128",
            name: "currentValue",
            type: "uint128",
          },
          {
            internalType: "bool",
            name: "gains",
            type: "bool",
          },
        ],
        internalType: "struct CDSInterface.CalculateValueResult",
        name: "result",
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
        name: "user",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "index",
        type: "uint64",
      },
      {
        internalType: "uint256",
        name: "excessProfitCumulativeValue",
        type: "uint256",
      },
    ],
    name: "calculateLiquidatedETHTogiveToUser",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cdsCount",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractNonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "tokenAddresses",
        type: "address[]",
      },
      {
        internalType: "uint128[]",
        name: "tokenAmounts",
        type: "uint128[]",
      },
      {
        internalType: "bool",
        name: "liquidate",
        type: "bool",
      },
      {
        internalType: "uint128",
        name: "liquidationAmount",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "lockingPeriod",
        type: "uint128",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "downsideProtected",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "version",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]",
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
        name: "omniChainData",
        type: "tuple",
      },
      {
        internalType: "uint128",
        name: "value",
        type: "uint128",
      },
      {
        internalType: "bool",
        name: "gains",
        type: "bool",
      },
    ],
    name: "getCumulativeValue",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "tokenAddresses",
        type: "address[]",
      },
    ],
    name: "getPrices",
    outputs: [
      {
        internalType: "uint128[]",
        name: "",
        type: "uint128[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSupportedTokenAddresses",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalCdsDepositedAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalCdsDepositedAmountWithOptionFees",
    outputs: [
      {
        internalType: "uint256",
        name: "",
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
        name: "user",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "index",
        type: "uint64",
      },
    ],
    name: "getUsedAmount",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_supportedTokenAddresses",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "enum CDSInterface.AssetStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint64",
            name: "LTV",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "tokenDecimals",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "priceDecimals",
            type: "uint64",
          },
        ],
        internalType: "struct CDSInterface.AssetDetails[]",
        name: "_assetDetails",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "mpoAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "multiSignAddress",
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
        internalType: "address[]",
        name: "liquidatingToken",
        type: "address[]",
      },
      {
        internalType: "uint128",
        name: "usdtFromOdos",
        type: "uint128",
      },
      {
        internalType: "bytes",
        name: "odosAssembledData",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "liquidateNativeTokenDeposit",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "uint128",
        name: "usdaAmount",
        type: "uint128",
      },
      {
        internalType: "address",
        name: "redeemTokenAddress",
        type: "address",
      },
    ],
    name: "redeemAssets",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "bytes32",
        name: "hashedAddress",
        type: "bytes32",
      },
    ],
    name: "setAdminTwo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "setBorrowLiquidation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "setBorrowingContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "setGlobalVariables",
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
        internalType: "uint8",
        name: "percent",
        type: "uint8",
      },
    ],
    name: "setUSDaLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "amount",
        type: "uint64",
      },
    ],
    name: "setUsdtLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "_timeLimit",
        type: "uint64",
      },
    ],
    name: "setWithdrawTimeLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "supportedTokenAddresses",
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
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "tokenDepositedTillNow",
    outputs: [
      {
        internalType: "uint256",
        name: "totalAmountDepositedTillNow",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAvailableLiquidationAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalCdsDepositedAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
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
        name: "tokenAddress",
        type: "address",
      },
      {
        components: [
          {
            internalType: "enum CDSInterface.AssetStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint64",
            name: "LTV",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "tokenDecimals",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "priceDecimals",
            type: "uint64",
          },
        ],
        internalType: "struct CDSInterface.AssetDetails",
        name: "assetDetail",
        type: "tuple",
      },
    ],
    name: "updateAssetDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "downsideProtectedAmount",
        type: "uint128",
      },
    ],
    name: "updateDownsideProtected",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "updateTotalAvailableLiquidationAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "_amount",
        type: "uint128",
      },
      {
        internalType: "bool",
        name: "operation",
        type: "bool",
      },
    ],
    name: "updateTotalCdsDepositedAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "_amount",
        type: "uint128",
      },
      {
        internalType: "bool",
        name: "operation",
        type: "bool",
      },
    ],
    name: "updateTotalCdsDepositedAmountWithOptionFees",
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
    name: "usdaLimit",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "usdtLimit",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "index",
        type: "uint64",
      },
      {
        internalType: "uint256",
        name: "excessProfitCumulativeValue",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "index",
        type: "uint64",
      },
      {
        internalType: "bytes",
        name: "odosAssembledData",
        type: "bytes",
      },
      {
        internalType: "uint128",
        name: "usdtFromOdos",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "withdrawGains",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawTimeLimit",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
