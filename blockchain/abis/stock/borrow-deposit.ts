export const borrowDepositStockOptionsABI = [
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
      "name": "BorrowDeposit_InvalidAddress",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "BorrowDeposit_MsgSenderNotAllowed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "BorrowDeposit_OnlyCoreContracts",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "BorrowDeposit_RequiredApprovalsNotMetToSet",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_OnlyBorrowing",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ECDSAInvalidSignature",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "length",
          "type": "uint256"
        }
      ],
      "name": "ECDSAInvalidSignatureLength",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "ECDSAInvalidSignatureS",
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
      "inputs": [],
      "name": "EIP712DomainChanged",
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
          "components": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
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
              "internalType": "uint128",
              "name": "hedgeValidity",
              "type": "uint128"
            },
            {
              "components": [
                {
                  "internalType": "uint128",
                  "name": "ethPrice",
                  "type": "uint128"
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
              "internalType": "struct IBorrowing.EIP712VerifyParams",
              "name": "verifyParams",
              "type": "tuple"
            }
          ],
          "internalType": "struct IBorrowing.BorrowDepositParams",
          "name": "depositParam",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "contract IBorrowing",
              "name": "borrow",
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
              "internalType": "contract IOptions",
              "name": "options",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "contract IBorrowDeposit",
                  "name": "borrowDeposit",
                  "type": "address"
                },
                {
                  "internalType": "contract IBorrowWithdraw",
                  "name": "borrowWithdraw",
                  "type": "address"
                }
              ],
              "internalType": "struct IBorrowing.ChildContracts",
              "name": "childContracts",
              "type": "tuple"
            }
          ],
          "internalType": "struct IBorrowing.Interfaces",
          "name": "interfaces",
          "type": "tuple"
        }
      ],
      "name": "depositCollateral",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "eip712Domain",
      "outputs": [
        {
          "internalType": "bytes1",
          "name": "fields",
          "type": "bytes1"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "version",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "chainId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "verifyingContract",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "salt",
          "type": "bytes32"
        },
        {
          "internalType": "uint256[]",
          "name": "extensions",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_borrowing",
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
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "hashedAdminTwo",
              "type": "bytes32"
            },
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
              "components": [
                {
                  "internalType": "uint128",
                  "name": "ethPrice",
                  "type": "uint128"
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
              "internalType": "struct IBorrowing.EIP712VerifyParams",
              "name": "verifyParams",
              "type": "tuple"
            }
          ],
          "internalType": "struct IBorrowDeposit.EIP712VerifyParams",
          "name": "params",
          "type": "tuple"
        }
      ],
      "name": "verify",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
];

