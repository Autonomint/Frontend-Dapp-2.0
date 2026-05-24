export const treasuryStockOptionsABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "target",
          "type": "address"
        }
      ],
      "name": "AddressEmptyCode",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "implementation",
          "type": "address"
        }
      ],
      "name": "ERC1967InvalidImplementation",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ERC1967NonPayable",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "FailedInnerCall",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidInitialization",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotInitializing",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ReentrancyGuardReentrantCall",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Treasury_AavePoolAddressZero",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Treasury_ApproveFailed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Treasury_CallerIsNotAnAdmin",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "Treasury_CantBeContractOrZeroAddress",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "inputAddress",
          "type": "address"
        }
      ],
      "name": "Treasury_CantBeEOAOrZeroAddress",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Treasury_EthTransferToCdsLiquidatorFailed",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "enum IBorrowing.AssetName",
          "name": "inputAsset",
          "type": "uint8"
        }
      ],
      "name": "Treasury_InvalidAsset",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Treasury_InvalidMultiSignAddress",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Treasury_NeedsMoreThanZero",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Treasury_OnlyCoreContracts",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Treasury_RequiredApprovalsNotMetToSet",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Treasury_SwapFailed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Treasury_TransferFailed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Treasury_WithdrawExternalProtocolDuringLiqFailed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Treasury_ZeroAddress",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "UUPSUnauthorizedCallContext",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "slot",
          "type": "bytes32"
        }
      ],
      "name": "UUPSUnsupportedProxiableUUID",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Deposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "count",
          "type": "uint64"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "DepositToAave",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "count",
          "type": "uint64"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "DepositToCompound",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "version",
          "type": "uint64"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "implementation",
          "type": "address"
        }
      ],
      "name": "Upgraded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdraw",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "count",
          "type": "uint64"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "WithdrawFromAave",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "count",
          "type": "uint64"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "WithdrawFromCompound",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "UPGRADE_INTERFACE_VERSION",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approveCDSTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum IBorrowing.AssetName",
          "name": "assetName",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approveTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "depositor",
          "type": "address"
        }
      ],
      "name": "borrowing",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "depositedAmountInETH",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalBorrowedAmount",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "hasBorrowed",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "hasDeposited",
          "type": "bool"
        },
        {
          "internalType": "uint64",
          "name": "borrowerIndex",
          "type": "uint64"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum IBorrowing.AssetName",
          "name": "",
          "type": "uint8"
        }
      ],
      "name": "defaultAmountsFromSwaps",
      "outputs": [
        {
          "internalType": "int256",
          "name": "amount",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint128",
          "name": "ethPrice",
          "type": "uint128"
        },
        {
          "internalType": "enum IBorrowing.AssetName",
          "name": "assetName",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "depositingAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "depositAmount",
          "type": "uint256"
        }
      ],
      "name": "deposit",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bool",
              "name": "hasDeposited",
              "type": "bool"
            },
            {
              "internalType": "uint64",
              "name": "borrowerIndex",
              "type": "uint64"
            }
          ],
          "internalType": "struct ITreasury.DepositResult",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum IBorrowing.AssetName",
          "name": "",
          "type": "uint8"
        }
      ],
      "name": "depositedCollateralAmountInWei",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "collateralAmountDeposited",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum IBorrowing.AssetName",
          "name": "",
          "type": "uint8"
        }
      ],
      "name": "excessAmountsFromSwaps",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalanceInTreasury",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "depositor",
          "type": "address"
        },
        {
          "internalType": "uint64",
          "name": "index",
          "type": "uint64"
        }
      ],
      "name": "getBorrowing",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint64",
              "name": "totalIndex",
              "type": "uint64"
            },
            {
              "components": [
                {
                  "internalType": "uint64",
                  "name": "depositedTime",
                  "type": "uint64"
                },
                {
                  "internalType": "uint128",
                  "name": "depositedAmountInETH",
                  "type": "uint128"
                },
                {
                  "internalType": "uint128",
                  "name": "depositedAmountUsdValue",
                  "type": "uint128"
                },
                {
                  "internalType": "uint128",
                  "name": "ethPriceAtDeposit",
                  "type": "uint128"
                },
                {
                  "internalType": "bool",
                  "name": "withdrawed",
                  "type": "bool"
                },
                {
                  "internalType": "uint64",
                  "name": "ethPriceAtWithdraw",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "withdrawTime",
                  "type": "uint64"
                },
                {
                  "internalType": "uint128",
                  "name": "strikePrice",
                  "type": "uint128"
                },
                {
                  "internalType": "uint128",
                  "name": "optionFees",
                  "type": "uint128"
                },
                {
                  "internalType": "enum IBorrowing.AssetName",
                  "name": "assetName",
                  "type": "uint8"
                },
                {
                  "internalType": "uint128",
                  "name": "exchangeRateAtDeposit",
                  "type": "uint128"
                },
                {
                  "internalType": "uint128",
                  "name": "depositedAmount",
                  "type": "uint128"
                },
                {
                  "internalType": "uint128",
                  "name": "hedgeValidity",
                  "type": "uint128"
                }
              ],
              "internalType": "struct ITreasury.DepositDetails",
              "name": "depositDetails",
              "type": "tuple"
            }
          ],
          "internalType": "struct ITreasury.GetBorrowingResult",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "borrower",
          "type": "address"
        }
      ],
      "name": "getTotalDeposited",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "depositor",
          "type": "address"
        }
      ],
      "name": "getTotalIndex",
      "outputs": [
        {
          "internalType": "uint64",
          "name": "",
          "type": "uint64"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "borrowingAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "globalVariablesAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "multiSignAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "usdcAddress_",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "noOfBorrowers",
      "outputs": [
        {
          "internalType": "uint128",
          "name": "",
          "type": "uint128"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "proxiableUUID",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum IBorrowing.AssetName",
          "name": "",
          "type": "uint8"
        }
      ],
      "name": "redeemableAssets",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_admin",
          "type": "address"
        }
      ],
      "name": "setAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_multiSign",
          "type": "address"
        }
      ],
      "name": "setMultiSign",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "options_",
          "type": "address"
        }
      ],
      "name": "setOptions",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "tokenAddress",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "swapAmounts",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "minOutAmount",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "odosAssembledData",
          "type": "bytes"
        }
      ],
      "name": "swapTokenForUSDT",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "borrower",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "borrowed",
          "type": "bool"
        }
      ],
      "name": "updateBorrowerDetails",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "depositor",
          "type": "address"
        },
        {
          "internalType": "uint64",
          "name": "index",
          "type": "uint64"
        },
        {
          "components": [
            {
              "internalType": "uint64",
              "name": "depositedTime",
              "type": "uint64"
            },
            {
              "internalType": "uint128",
              "name": "depositedAmountInETH",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "depositedAmountUsdValue",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "ethPriceAtDeposit",
              "type": "uint128"
            },
            {
              "internalType": "bool",
              "name": "withdrawed",
              "type": "bool"
            },
            {
              "internalType": "uint64",
              "name": "ethPriceAtWithdraw",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "withdrawTime",
              "type": "uint64"
            },
            {
              "internalType": "uint128",
              "name": "strikePrice",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "optionFees",
              "type": "uint128"
            },
            {
              "internalType": "enum IBorrowing.AssetName",
              "name": "assetName",
              "type": "uint8"
            },
            {
              "internalType": "uint128",
              "name": "exchangeRateAtDeposit",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "depositedAmount",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "hedgeValidity",
              "type": "uint128"
            }
          ],
          "internalType": "struct ITreasury.DepositDetails",
          "name": "depositDetail",
          "type": "tuple"
        }
      ],
      "name": "updateDepositDetails",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum IBorrowing.AssetName",
          "name": "asset",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "amountInUSD",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "operation",
          "type": "bool"
        }
      ],
      "name": "updateDepositedCollateralAmountInUsd",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum IBorrowing.AssetName",
          "name": "asset",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "operation",
          "type": "bool"
        }
      ],
      "name": "updateDepositedCollateralAmountInWei",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "enum IBorrowing.AssetName",
          "name": "asset",
          "type": "uint8"
        },
        {
          "internalType": "bool",
          "name": "operation",
          "type": "bool"
        }
      ],
      "name": "updateRedeemableAssets",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "updateUsdaCollectedFromCdsWithdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newImplementation",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "upgradeToAndCall",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "usdaCollectedFromCdsWithdraw",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "isUSDT",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawUSDTAndUSDC",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "toAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawUSDaCollected",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
];
