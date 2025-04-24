export const borrowingContractAbi = [
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
    name: "Borrow_AlreadyLiquidated",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_AlreadyWithdrew",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_AlreadyWithdrewOrLiquidated",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_BorrowHealthLow",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_BurnFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_CallerIsNotAnAdmin",
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
    name: "Borrow_CantBeContractOrZeroAddress",
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
    name: "Borrow_CantBeEOAOrZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_CantLiquidateOwnAssets",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_CollateralAddressesAndPriceFeedIdsMustBeSameLength",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_DeadlinePassed",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_DepositFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_ETHTransferFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_EthTransferToCdsFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_GettingETHPriceFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_InsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_InvalidIndex",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_LTVIsZero",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_LiquidationFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_MintFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_MintLimitReached",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "Borrow_MustBeNonZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_NeedsMoreThanZero",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "enum IBorrowing.AssetName",
        name: "asset",
        type: "uint8",
      },
    ],
    name: "Borrow_NotAllowedToken",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_NotEnoughFundInCDS",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_NotSignedByEIP712Signer",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_OnlyCoreContractsCancall",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_OnlyTreasuryCancall",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_Paused",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_RenewFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_RequiredApprovalsNotMetToSet",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_SlippageExceeded",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_TransferFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_USDaTransferFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_USDa_MintFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Borrow_WithdrawTimeNotYetReached",
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
        internalType: "enum IBorrowing.AssetName",
        name: "assetName",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "depositedAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "depositedAmountInETH",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "exchangeRateAtDeposit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "normalizedAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "depositedTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "ethPrice",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "noOfUSDaMinted",
        type: "uint256",
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
        name: "strikePricePercent",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "APR",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "aBondCr",
        type: "uint256",
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
        indexed: false,
        internalType: "address",
        name: "borrower",
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
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "Renewed",
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
        internalType: "uint128",
        name: "ethPrice",
        type: "uint128",
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
        name: "withdrawAmount",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "noOfAbond",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalDebtAmount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "APR",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LTV",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
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
    name: "abondLiqGainsCr",
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
        internalType: "enum IBorrowing.AssetName",
        name: "",
        type: "uint8",
      },
    ],
    name: "assetAddress",
    outputs: [
      {
        internalType: "address",
        name: "assetAddress",
        type: "address",
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
    ],
    name: "assetDetails",
    outputs: [
      {
        internalType: "enum IBorrowing.AssetStatus",
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
    inputs: [],
    name: "bondRatio",
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
        internalType: "uint128",
        name: "usdaAmount",
        type: "uint128",
      },
    ],
    name: "calculateCrForAbondLiqGains",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "calculateCumulativeRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
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
      {
        internalType: "uint128",
        name: "lastETHPrice",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "currentEthPrice",
        type: "uint128",
      },
    ],
    name: "calculateRatio",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "collateralValueRemainingInWithdraw",
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
        components: [
          {
            internalType: "uint128",
            name: "strikePercent",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "volatility",
            type: "uint256",
          },
          {
            internalType: "enum IBorrowing.AssetName",
            name: "assetName",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "depositingAmount",
            type: "uint256",
          },
        ],
        internalType: "struct IBorrowing.BorrowDepositParams",
        name: "depositParam",
        type: "tuple",
      },
      {
        components: [
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
        internalType: "struct IBorrowing.EIP712VerifyParams",
        name: "verifyParams",
        type: "tuple",
      },
    ],
    name: "depositTokens",
    outputs: [],
    stateMutability: "payable",
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
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "aBondAmount",
        type: "uint128",
      },
    ],
    name: "getAbondYields",
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
    name: "getLTV",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
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
    name: "getOptionFeesToPay",
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
        name: "token",
        type: "address",
      },
    ],
    name: "getUSDValue",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
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
        name: "abondTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "multiSignAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "mpoAddress",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "collateralAddresses",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "tokenAddresses",
        type: "address[]",
      },
      {
        internalType: "uint64",
        name: "chainId",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "globalVariablesAddress",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "_minInterval",
        type: "uint64",
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
            components: [
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
            internalType: "struct IBorrowing.EIP712VerifyParams",
            name: "verifyParams",
            type: "tuple",
          },
        ],
        internalType: "struct IBorrowing.LiquidationParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "liquidate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "minInterval",
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
    name: "optionsFeesTimeLimits",
    outputs: [
      {
        internalType: "uint128",
        name: "minimumLimit",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "maximumLimit",
        type: "uint128",
      },
    ],
    stateMutability: "view",
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
    name: "ratePerSec",
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
        name: "aBondAmount",
        type: "uint128",
      },
    ],
    name: "redeemYields",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "index",
        type: "uint64",
      },
    ],
    name: "renewOptions",
    outputs: [],
    stateMutability: "payable",
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
        internalType: "uint16",
        name: "_APR",
        type: "uint16",
      },
      {
        internalType: "uint128",
        name: "_ratePerSec",
        type: "uint128",
      },
    ],
    name: "setAPR",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "hashedAddress",
        type: "bytes32",
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
        internalType: "uint64",
        name: "_bondRatio",
        type: "uint64",
      },
    ],
    name: "setBondRatio",
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
      {
        internalType: "address",
        name: "_options",
        type: "address",
      },
      {
        internalType: "address",
        name: "_borrowLiquidation",
        type: "address",
      },
    ],
    name: "setCoreContracts",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "ltv",
        type: "uint8",
      },
    ],
    name: "setLTV",
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
        name: "asset",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "enum IBorrowing.AssetStatus",
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
        internalType: "struct IBorrowing.AssetDetails",
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
        internalType: "uint64",
        name: "_minInterval",
        type: "uint64",
      },
    ],
    name: "updateMinInterval",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint128",
            name: "minimumLimit",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "maximumLimit",
            type: "uint128",
          },
        ],
        internalType: "struct IBorrowing.OptionsFeesTimeLimits",
        name: "_optionsFeesTimeLimits",
        type: "tuple",
      },
    ],
    name: "updateOptionsFeesTimeLimits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "usdaPrice",
        type: "uint32",
      },
    ],
    name: "updateRatePerSecByUSDaPrice",
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
    name: "usda",
    outputs: [
      {
        internalType: "contract IUSDa",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "viewCurrentCr",
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
        name: "toAddress",
        type: "address",
      },
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
        components: [
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
        internalType: "struct IBorrowing.EIP712VerifyParams",
        name: "verifyParams",
        type: "tuple",
      },
    ],
    name: "withDraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;
