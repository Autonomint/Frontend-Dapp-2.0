export const borrowLibAbi = [
  {
    inputs: [],
    name: "Borrow_NeedsMoreThanZero",
    type: "error",
  },
  {
    inputs: [],
    name: "PERMIT_TYPEHASH",
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
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "n",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "b",
        type: "uint256",
      },
    ],
    name: "_rpow",
    outputs: [
      {
        internalType: "uint256",
        name: "z",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "_bondRatio",
        type: "uint64",
      },
    ],
    name: "abondToMint",
    outputs: [
      {
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "optionFeesPaid",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "currentAssetPrice",
        type: "uint128",
      },
    ],
    name: "calculateAssetToSwapForOptionFees",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "pure",
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
    name: "calculateBaseToMultiply",
    outputs: [
      {
        internalType: "uint8",
        name: "baseToMultiply",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "contract IBorrowing",
                name: "borrow",
                type: "IBorrowing",
              },
              {
                internalType: "contract CDSInterface",
                name: "cds",
                type: "CDSInterface",
              },
              {
                internalType: "contract ITreasury",
                name: "treasury",
                type: "ITreasury",
              },
              {
                internalType: "contract IGlobalVariables",
                name: "globalVariables",
                type: "IGlobalVariables",
              },
              {
                internalType: "contract IOptions",
                name: "options",
                type: "IOptions",
              },
              {
                internalType: "contract IUSDa",
                name: "usda",
                type: "IUSDa",
              },
              {
                internalType: "contract IABONDToken",
                name: "abond",
                type: "IABONDToken",
              },
            ],
            internalType: "struct IBorrowing.Interfaces",
            name: "interfaces",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint64",
                name: "depositedTime",
                type: "uint64",
              },
              {
                internalType: "uint128",
                name: "depositedAmountInETH",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "depositedAmountUsdValue",
                type: "uint128",
              },
              {
                internalType: "uint64",
                name: "downsidePercentage",
                type: "uint64",
              },
              {
                internalType: "uint128",
                name: "ethPriceAtDeposit",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "borrowedAmount",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "normalizedAmount",
                type: "uint128",
              },
              {
                internalType: "bool",
                name: "withdrawed",
                type: "bool",
              },
              {
                internalType: "uint128",
                name: "withdrawAmount",
                type: "uint128",
              },
              {
                internalType: "bool",
                name: "liquidated",
                type: "bool",
              },
              {
                internalType: "uint64",
                name: "ethPriceAtWithdraw",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "withdrawTime",
                type: "uint64",
              },
              {
                internalType: "uint128",
                name: "aBondTokensAmount",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "strikePrice",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "optionFees",
                type: "uint128",
              },
              {
                internalType: "uint16",
                name: "APR",
                type: "uint16",
              },
              {
                internalType: "uint256",
                name: "totalDebtAmountPaid",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "aBondCr",
                type: "uint256",
              },
              {
                internalType: "enum IBorrowing.AssetName",
                name: "assetName",
                type: "IBorrowing.AssetName",
              },
              {
                internalType: "uint128",
                name: "exchangeRateAtDeposit",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "depositedAmount",
                type: "uint128",
              },
              {
                internalType: "uint256",
                name: "optionsRenewedTimeStamp",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "swappedRemaining",
                type: "bool",
              },
            ],
            internalType: "struct ITreasury.DepositDetails",
            name: "depositDetail",
            type: "tuple",
          },
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
            name: "borrowingHealth",
            type: "uint128",
          },
          {
            internalType: "uint64",
            name: "ethPrice",
            type: "uint64",
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
        ],
        internalType: "struct IBorrowing.CalculateCollateralToReturn_Param",
        name: "params",
        type: "tuple",
      },
    ],
    name: "calculateCollateralToReturn",
    outputs: [
      {
        components: [
          {
            internalType: "uint128",
            name: "collateralToReturn",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "collateralRemainingInWithdraw",
            type: "uint256",
          },
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
            internalType: "uint256",
            name: "usdtToGet",
            type: "uint256",
          },
        ],
        internalType: "struct IBorrowing.CalculateCollateralToReturn_Result",
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
        internalType: "uint128",
        name: "usdaAmount",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "totalSupplyOfAbond",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "lastCumulativeRate",
        type: "uint128",
      },
    ],
    name: "calculateCrForAbondLiqGains",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "ratePerSec",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "lastEventTime",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "lastCumulativeRate",
        type: "uint256",
      },
    ],
    name: "calculateCumulativeRate",
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
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "cumulativeRate",
        type: "uint256",
      },
    ],
    name: "calculateDebtAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
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
        name: "ethPrice",
        type: "uint128",
      },
    ],
    name: "calculateDiscountedETH",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "currentEthPrice",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "depositEthPrice",
        type: "uint128",
      },
    ],
    name: "calculateDownsideProtected",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "depositEthPrice",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "currentEthPrice",
        type: "uint128",
      },
    ],
    name: "calculateEthPriceRatio",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "assetPrice",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "ethPrice",
        type: "uint128",
      },
    ],
    name: "calculateExchangeRate",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "pure",
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
    name: "calculateHalfValue",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
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
        internalType: "struct IBorrowLiquidation.LiquidationCumulativeValues",
        name: "prevCVs",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "liqAmountAvailable",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "depositEthPrice",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "depositedAmountInETH",
        type: "uint128",
      },
      {
        internalType: "uint64",
        name: "LTV",
        type: "uint64",
      },
    ],
    name: "calculateLiqCVs",
    outputs: [
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
        internalType: "struct IBorrowLiquidation.LiquidationCumulativeValues",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
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
    name: "calculateNewAPRToUpdate",
    outputs: [
      {
        internalType: "uint128",
        name: "ratePerSec",
        type: "uint128",
      },
      {
        internalType: "uint8",
        name: "newAPR",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
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
        internalType: "uint256",
        name: "cumulativeRate",
        type: "uint256",
      },
    ],
    name: "calculateNormAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "optionsFees",
        type: "uint128",
      },
    ],
    name: "calculateOptionsFeesPerSec",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "pure",
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
        name: "currentEthPrice",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "lastEthprice",
        type: "uint128",
      },
      {
        internalType: "bool",
        name: "firstBorrowDeposited",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "totalCollateralInETH",
        type: "uint256",
      },
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
        name: "previousData",
        type: "tuple",
      },
    ],
    name: "calculateRatio",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
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
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "depositedAmount",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "depositEthPrice",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "returnToTreasury",
        type: "uint128",
      },
    ],
    name: "calculateReturnToAbond",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "strikePricePercent",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "depositedAmountInETH",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "ethPrice",
        type: "uint128",
      },
    ],
    name: "calculateStrikePrice",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    name: "checkSlippage",
    outputs: [
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
        internalType: "uint256",
        name: "_liqAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_totalAvailableLiqAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_totalGlobalAvailableLiqAmountAmount",
        type: "uint256",
      },
    ],
    name: "getLiquidationAmountProportions",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "totalAmount",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "shareAmount",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
    ],
    name: "getProportions",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
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
    inputs: [
      {
        internalType: "uint256",
        name: "depositedAmount",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "ethPrice",
        type: "uint128",
      },
      {
        internalType: "uint16",
        name: "LTV",
        type: "uint16",
      },
    ],
    name: "tokensToLend",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IGlobalVariables",
        name: "globalVariables",
        type: "IGlobalVariables",
      },
      {
        internalType: "contract CDSInterface",
        name: "cds",
        type: "CDSInterface",
      },
      {
        internalType: "uint128",
        name: "ethPrice",
        type: "uint128",
      },
    ],
    name: "updateCumulativeValueInCDS",
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
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
];
