export const globalStockOptionsABI = [
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
      "name": "Global_CallerIsNotAnAdmin",
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
      "name": "Global_CantBeContractOrZeroAddress",
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
      "name": "Global_CantBeEOAOrZeroAddress",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Global_InvalidMultiSignAddress",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Global_OnlyCoreContracts",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Global_RequiredApprovalsNotMetToSet",
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
          "name": "assetName",
          "type": "uint8"
        }
      ],
      "name": "getLastETHPrice",
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
          "internalType": "enum IBorrowing.AssetName",
          "name": "assetName",
          "type": "uint8"
        }
      ],
      "name": "getOmniChainData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "vaultValue",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "cdsPoolValue",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalCdsDepositedAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalCdsDepositedAmountWithOptionFees",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "usdtAmountDepositedTillNow",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalVolumeOfBorrowersAmountinWei",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalVolumeOfBorrowersAmountinUSD",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalNoOfDepositIndices",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "downsideProtected",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalCdsDepositedAmountForOpFeesCrCalc",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalCdsDepositedAmountForCvCalc",
              "type": "uint256"
            },
            {
              "internalType": "uint128",
              "name": "lastCumulativeRate",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "noOfBorrowers",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "cumulativeValue",
              "type": "uint128"
            },
            {
              "internalType": "uint64",
              "name": "cdsCount",
              "type": "uint64"
            },
            {
              "internalType": "bool",
              "name": "firstBorrowDeposited",
              "type": "bool"
            },
            {
              "internalType": "uint128",
              "name": "lastETHPrice",
              "type": "uint128"
            }
          ],
          "internalType": "struct IGlobalVariables.OmniChainData",
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
          "name": "multiSignAddress",
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
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "vaultValue",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "cdsPoolValue",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalCdsDepositedAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalCdsDepositedAmountWithOptionFees",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "usdtAmountDepositedTillNow",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalVolumeOfBorrowersAmountinWei",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalVolumeOfBorrowersAmountinUSD",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalNoOfDepositIndices",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "downsideProtected",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalCdsDepositedAmountForOpFeesCrCalc",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalCdsDepositedAmountForCvCalc",
              "type": "uint256"
            },
            {
              "internalType": "uint128",
              "name": "lastCumulativeRate",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "noOfBorrowers",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "cumulativeValue",
              "type": "uint128"
            },
            {
              "internalType": "uint64",
              "name": "cdsCount",
              "type": "uint64"
            },
            {
              "internalType": "bool",
              "name": "firstBorrowDeposited",
              "type": "bool"
            },
            {
              "internalType": "uint128",
              "name": "lastETHPrice",
              "type": "uint128"
            }
          ],
          "internalType": "struct IGlobalVariables.OmniChainData",
          "name": "_omniChainData",
          "type": "tuple"
        }
      ],
      "name": "setOmniChainData",
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
