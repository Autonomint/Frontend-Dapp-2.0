export const borrowStockOptionsABI = [
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
      "name": "Borrow_AlreadyLiquidated",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_AlreadyWithdrew",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_AlreadyWithdrewOrLiquidated",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_BorrowHealthLow",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_BurnFailed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_CallerIsNotAnAdmin",
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
      "name": "Borrow_CantBeContractOrZeroAddress",
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
      "name": "Borrow_CantBeEOAOrZeroAddress",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_CantLiquidateOwnAssets",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_CollateralTransferFailed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_DeadlinePassed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_DepositFailed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_ETHTransferFailed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_GettingETHPriceFailed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_InsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_InvalidIndex",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_InvalidMultiSignAddress",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint128",
          "name": "repayAmount",
          "type": "uint128"
        }
      ],
      "name": "Borrow_InvalidRepayAmount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_InvalidStrikePrice",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_InvalidWithdrawTimePeriod",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint128",
          "name": "stakingAmount",
          "type": "uint128"
        }
      ],
      "name": "Borrow_Invalid_StakeAmount",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint128",
          "name": "validity",
          "type": "uint128"
        }
      ],
      "name": "Borrow_Invalid_Validity",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_LTVIsZero",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_LengthMismatch",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_LiquidationFailed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_MintFailed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_MintLimitReached",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_MsgSenderNotAllowed",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "Borrow_MustBeNonZeroAddress",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_NeedsMoreThanZero",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "enum IBorrowing.AssetName",
          "name": "asset",
          "type": "uint8"
        }
      ],
      "name": "Borrow_NotAllowedToken",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_NotEnoughFundInCDS",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_NotSignedByEIP712Signer",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_OnlyBorrowing",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_OnlyChildContractsCanCall",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_OnlyCoreContracts",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_Paused",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_RenewFailed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_RequiredApprovalsNotMetToSet",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_SlippageExceeded",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_StakeNotSupported",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_TransferFailed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_USDaTransferFailed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Borrow_USDa_MintFailed",
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
          "internalType": "uint256",
          "name": "depositedAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "depositedTime",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "ethPrice",
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
          "internalType": "uint256",
          "name": "strikePrice",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "hedgeValidity",
          "type": "uint128"
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
          "internalType": "uint128",
          "name": "ethPrice",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "withdrawTime",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "profit",
          "type": "uint256"
        }
      ],
      "name": "Withdraw",
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
          "name": "",
          "type": "uint8"
        }
      ],
      "name": "assetAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "assetAddress",
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
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint128",
          "name": "lastETHPrice",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "currentEthPrice",
          "type": "uint128"
        }
      ],
      "name": "calculateRatio",
      "outputs": [
        {
          "internalType": "uint64",
          "name": "",
          "type": "uint64"
        }
      ],
      "stateMutability": "nonpayable",
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
        }
      ],
      "name": "depositTokens",
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
        }
      ],
      "name": "getAssetDetails",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint64",
              "name": "intervalAfterExpiry",
              "type": "uint64"
            },
            {
              "internalType": "enum IBorrowing.AssetStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "uint64",
              "name": "tokenDecimals",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "priceDecimals",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "ratio",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "minInterval",
              "type": "uint64"
            }
          ],
          "internalType": "struct IBorrowing.AssetDetails",
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
          "internalType": "enum IBorrowing.AssetName",
          "name": "assetName",
          "type": "uint8"
        }
      ],
      "name": "getBorrowData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "totalNormalizedAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "collateralRemainingInWithdraw",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "collateralValueRemainingInWithdraw",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "depositedInBorrow",
              "type": "bool"
            },
            {
              "internalType": "uint64",
              "name": "lastEventTime",
              "type": "uint64"
            },
            {
              "internalType": "uint128",
              "name": "lastCumulativeRate",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "pendingUSDaToBurn",
              "type": "uint128"
            }
          ],
          "internalType": "struct IBorrowing.AssetData",
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
      "name": "getDebtCeilingData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint128",
              "name": "time",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "mintedAmount",
              "type": "uint128"
            }
          ],
          "internalType": "struct IBorrowing.DebtCeilingData",
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
          "name": "token",
          "type": "address"
        }
      ],
      "name": "getUSDValue",
      "outputs": [
        {
          "internalType": "uint128",
          "name": "",
          "type": "uint128"
        },
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
          "name": "cdsAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "multiSignAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "mpoAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "globalVariablesAddress",
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
        },
        {
          "internalType": "bytes32",
          "name": "hashedAddress",
          "type": "bytes32"
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
          "name": "_childContracts",
          "type": "tuple"
        }
      ],
      "name": "setChildContracts",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_treasury",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_options",
          "type": "address"
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
          "name": "assets",
          "type": "uint8[]"
        },
        {
          "components": [
            {
              "internalType": "uint64",
              "name": "intervalAfterExpiry",
              "type": "uint64"
            },
            {
              "internalType": "enum IBorrowing.AssetStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "uint64",
              "name": "tokenDecimals",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "priceDecimals",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "ratio",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "minInterval",
              "type": "uint64"
            }
          ],
          "internalType": "struct IBorrowing.AssetDetails[]",
          "name": "assetDetails_",
          "type": "tuple[]"
        },
        {
          "internalType": "address[]",
          "name": "assetAddresses",
          "type": "address[]"
        }
      ],
      "name": "updateAssetDetails",
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
              "name": "totalNormalizedAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "collateralRemainingInWithdraw",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "collateralValueRemainingInWithdraw",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "depositedInBorrow",
              "type": "bool"
            },
            {
              "internalType": "uint64",
              "name": "lastEventTime",
              "type": "uint64"
            },
            {
              "internalType": "uint128",
              "name": "lastCumulativeRate",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "pendingUSDaToBurn",
              "type": "uint128"
            }
          ],
          "internalType": "struct IBorrowing.AssetData",
          "name": "data",
          "type": "tuple"
        }
      ],
      "name": "updateBorrowData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_borrower",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "uint128",
              "name": "time",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "mintedAmount",
              "type": "uint128"
            }
          ],
          "internalType": "struct IBorrowing.DebtCeilingData",
          "name": "_data",
          "type": "tuple"
        }
      ],
      "name": "updateDebtCeilingData",
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
      "name": "updateDepositedInBorrow",
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
          "internalType": "enum IBorrowing.AssetName",
          "name": "assetName",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint128",
          "name": "currentEthPrice",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "strikePrice",
          "type": "uint128"
        }
      ],
      "name": "viewCurrentRatio",
      "outputs": [
        {
          "internalType": "uint64",
          "name": "ratio",
          "type": "uint64"
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
          "internalType": "struct IBorrowing.BorrowWithdraw_Params",
          "name": "params",
          "type": "tuple"
        }
      ],
      "name": "withDraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
];

