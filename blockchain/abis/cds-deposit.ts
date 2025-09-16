export const cdsDepositABI = [
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
        "name": "CDSDeposit_InvalidAddress",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "CDSDeposit_MsgSenderNotAllowed",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "CDSDeposit_OnlyCoreContracts",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "CDSDeposit_RequiredApprovalsNotMetToSet",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "CDS_OnlyCds",
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
        "inputs": [
            {
                "internalType": "uint16",
                "name": "optionType",
                "type": "uint16"
            }
        ],
        "name": "InvalidOptionType",
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
        "inputs": [
            {
                "internalType": "uint8",
                "name": "bits",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "SafeCastOverflowedUintDowncast",
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
                "internalType": "uint128[]",
                "name": "depositedAmounts",
                "type": "uint128[]"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "depositedTime",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint128[]",
                "name": "prices",
                "type": "uint128[]"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "lockingPeriod",
                "type": "uint128"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "liquidationAmount",
                "type": "uint128"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "optedForLiquidation",
                "type": "bool"
            }
        ],
        "name": "Deposit",
        "type": "event"
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
        "name": "EIP712_init",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
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
                        "internalType": "address[]",
                        "name": "tokenAddresses",
                        "type": "address[]"
                    },
                    {
                        "internalType": "uint128[]",
                        "name": "tokenAmounts",
                        "type": "uint128[]"
                    },
                    {
                        "internalType": "bool",
                        "name": "liquidate",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint128",
                        "name": "liquidationAmount",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "lockingPeriod",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expiredETHAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct CDSInterface.DepositUserParams",
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
                        "internalType": "contract IUSDa",
                        "name": "usda",
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
        "name": "deposit",
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
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint64",
                "name": "index",
                "type": "uint64"
            }
        ],
        "name": "getCdsDepositDetails",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "cdsProfitsCvAtDeposit",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint128",
                        "name": "cdsProfitsCrAtDeposit",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "pendingFixedYields",
                        "type": "uint128"
                    }
                ],
                "internalType": "struct ICdsDeposit.CdsDepositDetails",
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
                        "internalType": "uint256",
                        "name": "cdsProfitsCvAtDeposit",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint128",
                        "name": "cdsProfitsCrAtDeposit",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "pendingFixedYields",
                        "type": "uint128"
                    }
                ],
                "internalType": "struct ICdsDeposit.CdsDepositDetails",
                "name": "cdsDepositDetails_",
                "type": "tuple"
            }
        ],
        "name": "updateCdsDepositDetails",
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
                        "internalType": "enum CDSInterface.FunctionName",
                        "name": "functionName",
                        "type": "uint8"
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
                        "internalType": "uint256",
                        "name": "excessProfitCumulativeValue",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "odosAssembledData",
                        "type": "bytes"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expiredETHAmount",
                        "type": "uint256"
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
                "internalType": "struct ICdsDeposit.EIP712VerifyParams",
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