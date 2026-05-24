export const cdsWithdrawStockOptionsABI = [
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
      "inputs": [],
      "name": "CDSWithdraw_InvalidAddress",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "CDSWithdraw_OnlyCoreContracts",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "CDSWithdraw_RequiredApprovalsNotMetToSet",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "CDS_InvalidIndex",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "CDS_NotEnoughFundInCDS",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "CDS_OnlyCds",
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
          "indexed": false,
          "internalType": "enum IBorrowing.AssetName",
          "name": "assetName",
          "type": "uint8"
        }
      ],
      "name": "UpdatedCv",
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
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "index",
          "type": "uint64"
        },
        {
          "indexed": false,
          "internalType": "enum IBorrowing.AssetName",
          "name": "assetName",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "enum CDSInterface.WithdrawType",
          "name": "withdrawType",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "withdrawAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "withdrawTime",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "ethPriceAtWithdraw",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "optionsFees",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "int256",
          "name": "excessProfitCumulativeValue",
          "type": "int256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "priceChangePL",
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
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "index",
          "type": "uint64"
        },
        {
          "indexed": false,
          "internalType": "enum IBorrowing.AssetName",
          "name": "assetName",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "enum CDSInterface.WithdrawType",
          "name": "withdrawType",
          "type": "uint8"
        }
      ],
      "name": "WithdrewGains",
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
      "inputs": [
        {
          "internalType": "enum IBorrowing.AssetName",
          "name": "assetName",
          "type": "uint8"
        },
        {
          "internalType": "uint128",
          "name": "cdsProfits",
          "type": "uint128"
        }
      ],
      "name": "calculateCdsProfitsOfThisChainCr",
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
      "name": "getCdsProfitsOfThisChainCr",
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
          "name": "_cds",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_multiSign",
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
          "internalType": "enum IBorrowing.AssetName",
          "name": "assetName",
          "type": "uint8"
        }
      ],
      "name": "setCdsProfitsOfThisChainCr",
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
          "internalType": "enum IBorrowing.AssetName",
          "name": "assetName",
          "type": "uint8"
        },
        {
          "internalType": "uint128",
          "name": "amount",
          "type": "uint128"
        },
        {
          "internalType": "bool",
          "name": "operation",
          "type": "bool"
        }
      ],
      "name": "updateTotalAvailableLiqAmountForCdsProfitsCrCalc",
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
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "internalType": "uint64",
              "name": "index",
              "type": "uint64"
            },
            {
              "internalType": "enum CDSInterface.WithdrawType",
              "name": "withdrawType",
              "type": "uint8"
            },
            {
              "components": [
                {
                  "internalType": "int256",
                  "name": "excessProfitCumulativeValue",
                  "type": "int256"
                },
                {
                  "internalType": "uint128",
                  "name": "ethPrice",
                  "type": "uint128"
                },
                {
                  "internalType": "bytes",
                  "name": "odosAssembledData",
                  "type": "bytes"
                },
                {
                  "internalType": "uint256",
                  "name": "deadline",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "signature",
                  "type": "bytes"
                }
              ],
              "internalType": "struct CDSInterface.EIP712VerifyParams",
              "name": "verifyParams",
              "type": "tuple"
            }
          ],
          "internalType": "struct CDSInterface.WithdrawUserParams",
          "name": "params",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "contract IBorrowing",
              "name": "borrowing",
              "type": "address"
            },
            {
              "internalType": "contract CDSInterface",
              "name": "cds",
              "type": "address"
            },
            {
              "internalType": "contract ITreasury",
              "name": "treasury",
              "type": "address"
            },
            {
              "internalType": "contract IGlobalVariables",
              "name": "globalVariables",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "contract ICdsDeposit",
                  "name": "cdsDeposit",
                  "type": "address"
                },
                {
                  "internalType": "contract ICdsWithdraw",
                  "name": "cdsWithdraw",
                  "type": "address"
                }
              ],
              "internalType": "struct CDSInterface.ChildContracts",
              "name": "childContracts",
              "type": "tuple"
            }
          ],
          "internalType": "struct CDSInterface.Interfaces",
          "name": "interfaces",
          "type": "tuple"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
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
          "internalType": "uint64",
          "name": "index",
          "type": "uint64"
        },
        {
          "internalType": "enum CDSInterface.WithdrawType",
          "name": "withdrawType",
          "type": "uint8"
        },
        {
          "components": [
            {
              "internalType": "contract IBorrowing",
              "name": "borrowing",
              "type": "address"
            },
            {
              "internalType": "contract CDSInterface",
              "name": "cds",
              "type": "address"
            },
            {
              "internalType": "contract ITreasury",
              "name": "treasury",
              "type": "address"
            },
            {
              "internalType": "contract IGlobalVariables",
              "name": "globalVariables",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "contract ICdsDeposit",
                  "name": "cdsDeposit",
                  "type": "address"
                },
                {
                  "internalType": "contract ICdsWithdraw",
                  "name": "cdsWithdraw",
                  "type": "address"
                }
              ],
              "internalType": "struct CDSInterface.ChildContracts",
              "name": "childContracts",
              "type": "tuple"
            }
          ],
          "internalType": "struct CDSInterface.Interfaces",
          "name": "interfaces",
          "type": "tuple"
        }
      ],
      "name": "withdrawGains",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
];

