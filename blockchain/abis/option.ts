export const optionABI = [
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
      "name": "FailedCall",
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
      "inputs": [],
      "name": "Options_CallerIsNotAnAdmin",
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
      "name": "Options_CantBeContractOrZeroAddress",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Options_InvalidMultiSignAddress",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Options_InvalidStrikePricePercent",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Options_LengthMismatch",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Options_OnlyCoreContracts",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Options_RequiredApprovalsNotMetToSet",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Options_StrikePricePercentIsGreaterThanLimit",
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
          "internalType": "enum IBorrowing.AssetName",
          "name": "_assetName",
          "type": "uint8"
        },
        {
          "internalType": "uint128",
          "name": "_ethPrice",
          "type": "uint128"
        },
        {
          "internalType": "uint64",
          "name": "_priceDecimals",
          "type": "uint64"
        },
        {
          "internalType": "uint256",
          "name": "_ethVolatility",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "uint128",
          "name": "_hedgeValidity",
          "type": "uint128"
        },
        {
          "internalType": "bool",
          "name": "isRenew",
          "type": "bool"
        }
      ],
      "name": "calculateOptionPrice",
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
          "internalType": "uint128",
          "name": "depositedAmount",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "strikePrice",
          "type": "uint128"
        },
        {
          "internalType": "uint64",
          "name": "ethPrice",
          "type": "uint64"
        },
        {
          "internalType": "uint128",
          "name": "repayPercent",
          "type": "uint128"
        }
      ],
      "name": "calculateStrikePriceGains",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "contractAddress",
          "type": "address"
        }
      ],
      "name": "coreContracts",
      "outputs": [
        {
          "internalType": "bool",
          "name": "isCoreContract",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "currentStrikePricePercentLimit",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "treasuryAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "cdsAddress",
          "type": "address"
        },
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
          "internalType": "uint128[]",
          "name": "strikePricePercents",
          "type": "uint128[]"
        },
        {
          "components": [
            {
              "internalType": "uint64",
              "name": "borrowerPutOptionConstant",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "borrowerCallOptionConstant",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "dCDSConstant",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "strikePriceConstant",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "premiumReductionConstant",
              "type": "uint64"
            }
          ],
          "internalType": "struct IOptions.OptionsFeesConstants[]",
          "name": "optionsFeesConstants_",
          "type": "tuple[]"
        },
        {
          "internalType": "uint128",
          "name": "strikePriceLimit",
          "type": "uint128"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint128",
          "name": "strikePricePercent",
          "type": "uint128"
        }
      ],
      "name": "optionsFeesConstants",
      "outputs": [
        {
          "internalType": "uint64",
          "name": "borrowerPutOptionConstant",
          "type": "uint64"
        },
        {
          "internalType": "uint64",
          "name": "borrowerCallOptionConstant",
          "type": "uint64"
        },
        {
          "internalType": "uint64",
          "name": "dCDSConstant",
          "type": "uint64"
        },
        {
          "internalType": "uint64",
          "name": "strikePriceConstant",
          "type": "uint64"
        },
        {
          "internalType": "uint64",
          "name": "premiumReductionConstant",
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
          "name": "assetName",
          "type": "uint8"
        }
      ],
      "name": "optionsFeesConstantsAssets",
      "outputs": [
        {
          "internalType": "uint64",
          "name": "borrowerPutOptionConstant",
          "type": "uint64"
        },
        {
          "internalType": "uint64",
          "name": "borrowerCallOptionConstant",
          "type": "uint64"
        },
        {
          "internalType": "uint64",
          "name": "dCDSConstant",
          "type": "uint64"
        },
        {
          "internalType": "uint64",
          "name": "strikePriceConstant",
          "type": "uint64"
        },
        {
          "internalType": "uint64",
          "name": "premiumReductionConstant",
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
          "name": "assetName",
          "type": "uint8"
        },
        {
          "internalType": "uint128",
          "name": "hedgeValidity",
          "type": "uint128"
        }
      ],
      "name": "optionsFeesConstantsValidity",
      "outputs": [
        {
          "internalType": "uint64",
          "name": "borrowerPutOptionConstant",
          "type": "uint64"
        },
        {
          "internalType": "uint64",
          "name": "borrowerCallOptionConstant",
          "type": "uint64"
        },
        {
          "internalType": "uint64",
          "name": "dCDSConstant",
          "type": "uint64"
        },
        {
          "internalType": "uint64",
          "name": "strikePriceConstant",
          "type": "uint64"
        },
        {
          "internalType": "uint64",
          "name": "premiumReductionConstant",
          "type": "uint64"
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
          "internalType": "address[]",
          "name": "coreContracts_",
          "type": "address[]"
        }
      ],
      "name": "setCoreContracts",
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
          "internalType": "enum IBorrowing.AssetName",
          "name": "assetName",
          "type": "uint8"
        }
      ],
      "name": "strikePricePercentLimits",
      "outputs": [
        {
          "internalType": "uint128",
          "name": "strikPricePercentLimit",
          "type": "uint128"
        }
      ],
      "stateMutability": "view",
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
          "internalType": "enum IBorrowing.AssetName[]",
          "name": "assetNames",
          "type": "uint8[]"
        },
        {
          "internalType": "uint128[]",
          "name": "hedgeValidities",
          "type": "uint128[]"
        },
        {
          "components": [
            {
              "internalType": "uint64",
              "name": "borrowerPutOptionConstant",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "borrowerCallOptionConstant",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "dCDSConstant",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "strikePriceConstant",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "premiumReductionConstant",
              "type": "uint64"
            }
          ],
          "internalType": "struct IOptions.OptionsFeesConstants[]",
          "name": "optionsFeesConstants_",
          "type": "tuple[]"
        }
      ],
      "name": "updateConstants",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "coreContracts_",
          "type": "address[]"
        }
      ],
      "name": "updateCoreContracts",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "updatePrecisions",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum IBorrowing.AssetName[]",
          "name": "assetNames",
          "type": "uint8[]"
        },
        {
          "internalType": "uint128[]",
          "name": "strikePriceLimits_",
          "type": "uint128[]"
        }
      ],
      "name": "updateStrikePriceLimits",
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
    }
];
