import cryptoEth from "@/app/assets/eth.png";
import { getIconMapping } from "@/utils/token-config";
import etherfi from "@/app/assets/ether_fi.png";

import {
  ArrowDownUp,
  Calendar,
  ChartCandlestick,
  ChartColumnDecreasing,
  HandCoins,
  Percent,
  Scale,
  TrendingDown,
  UmbrellaOff,
} from "lucide-react";
export interface StrategyData {
  id: string;
  route?: string;
  strategy: string;
  risk: string;
  name: string;
  description: string;
  maxReturn: {
    value: string;
    period: string;
    upto?: boolean;
  };
  rewards: Array<{
    value: string;
    token: string;
    period: string;
    icon: React.ReactNode;
  }>;
  strategyDetails: Array<{ heading: string; subHeading: Array<string> }>;
  costs: Array<{
    platform: string;
    monthlyBorrowingFee: string;
    optionFee: string;
  }>;
  monthlyYield: Array<{
    amount: string;
    percentage: string;
    up: boolean;
  }>;
  risks: {
    level: string;
    factors: Array<{
      icon: React.ReactNode;
      label: string;
    }>;
  };
}

export const strategies: StrategyData[] = [
  {
    strategy: "borrow",
    risk: "veryLow",
    route: "mintUSDaWithCollateral/ETH",
    id: "1",
    name: "Mint USDA+ with ETH",
    description: "Delta neutral ETH while retaining upside",
    maxReturn: {
      value: "~16.17%",
      period: "1 Month",
    },
    rewards: [
      {
        value: "Monthly APR ~0.16%",
        token: "ETH",
        period: "Monthly",
        icon: cryptoEth,
      },
      {
        value: "Earn ABOND tokens ~ Variable APY",
        token: "ABOND",
        period: "APY",
        icon: getIconMapping("dark", "ABOND"),
      },
      {
        value: "Earn Autonomint Points",
        token: "ABOND",
        period: "APY",
        icon: getIconMapping("dark", "ABOND"),
      },
    ],
    strategyDetails: [
      {
        heading: "Strategy",
        subHeading: ["Deposit ETH and borrow 80% of ETH value in USDA+"],
      },
      {
        heading: "Example",
        subHeading: ["Deposit 1 ETH worth $2000 and borrow 1600 USDA+"],
      },
    ],
    costs: [
      {
        platform: "Autonomint",
        monthlyBorrowingFee: "0.16%",
        optionFee: "0.16%",
      },
      {
        platform: "Market",
        monthlyBorrowingFee: "0.42%",
        optionFee: "8%",
      },
    ],
    monthlyYield: [
      { amount: "$100", percentage: "~1.5%", up: false },
      { amount: "$200", percentage: "~6.5%", up: false },
      { amount: "$300", percentage: "~11.5%", up: false },
      { amount: "$399", percentage: "~16.5%", up: false },
    ],
    risks: {
      level: "Very Low Risk Strategy",
      factors: [
        { icon: <Percent width={16} height={16} />, label: "Interest Rate" },
        {
          icon: <ChartColumnDecreasing width={16} height={16} />,
          label: "Option Fees",
        },
        {
          icon: <UmbrellaOff width={16} height={16} />,
          label: "AAVE Platform risks",
        },
      ],
    },
  },
  {
    id: "2",
    risk: "veryLow",
    strategy: "borrow",
    route: "mintUSDaWithCollateral/weETH",
    name: "Mint USDA+ with weETH (Ether.fi)",
    description: "Delta neutral weETH while retaining upside",
    maxReturn: {
      value: "~16.81%",
      period: "1 Month",
    },
    rewards: [
      {
        value: "Monthly APR ~0.16%",
        token: "ETH",
        period: "Monthly",
        icon: cryptoEth,
      },
      {
        value: "Earn ABOND tokens ~ Variable APY",
        token: "ABOND",
        period: "APY",
        icon: getIconMapping("dark", "ABOND"),
      },
      {
        value: "Earn Etherfi points ~ Variable APY",
        token: "Etherfi",
        period: "APY",
        icon: etherfi,
      },
      {
        value: "Earn Autonomint Points",
        token: "ABOND",
        period: "APY",
        icon: getIconMapping("dark", "ABOND"),
      },
    ],
    strategyDetails: [
      {
        heading: "Strategy",
        subHeading: ["Deposit weETH and borrow 80% of weETH value in USDA+"],
      },
      {
        heading: "Example",
        subHeading: ["Deposit 1 weETH worth $2000 and borrow 1600 USDA+"],
      },
    ],
    costs: [
      {
        platform: "Autonomint",
        monthlyBorrowingFee: "0.16%",
        optionFee: "0.16%",
      },
      {
        platform: "Market",
        monthlyBorrowingFee: "0.42%",
        optionFee: "8%",
      },
    ],
    monthlyYield: [
      { amount: "$100", percentage: "~1.5%", up: false },
      { amount: "$200", percentage: "~6.5%", up: false },
      { amount: "$300", percentage: "~11.5%", up: false },
      { amount: "$399", percentage: "~16.5%", up: false },
    ],
    risks: {
      level: "Very Low Risk Strategy",
      factors: [
        { icon: <Percent width={16} height={16} />, label: "Interest Rate" },
        {
          icon: <ChartColumnDecreasing width={16} height={16} />,
          label: "Option Fees",
        },
        {
          icon: <UmbrellaOff width={16} height={16} />,
          label: "AAVE Platform risks",
        },
      ],
    },
  },
  {
    id: "3",
    strategy: "borrow",
    risk: "veryLow",
    route: "mintUSDaWithCollateral/wrsETH",
    name: "Mint USDA+ with rsETH (Kelp DAO)",
    description: "Delta neutral rsETH while retaining upside",
    maxReturn: {
      value: "~16.81%",
      period: "1 Month",
    },
    rewards: [
      {
        value: "Monthly APR ~0.16%",
        token: "ETH",
        period: "Monthly",
        icon: cryptoEth,
      },
      {
        value: "Earn ABOND tokens ~ Variable APY",
        token: "ABOND",
        period: "APY",
        icon: getIconMapping("dark", "ABOND"),
      },
      {
        value: "Earn Autonomint Points",
        token: "ABOND",
        period: "APY",
        icon: getIconMapping("dark", "ABOND"),
      },
    ],
    strategyDetails: [
      {
        heading: "Strategy",
        subHeading: ["Deposit rsETH and borrow 80% of rsETH value in USDA+"],
      },
      {
        heading: "Example",
        subHeading: ["Deposit 1 rsETH worth $2000 and borrow 1600 USDA+"],
      },
    ],
    costs: [
      {
        platform: "Autonomint",
        monthlyBorrowingFee: "0.16%",
        optionFee: "0.16%",
      },
      {
        platform: "Market",
        monthlyBorrowingFee: "0.42%",
        optionFee: "8%",
      },
    ],
    monthlyYield: [
      { amount: "$100", percentage: "~1.5%", up: false },
      { amount: "$200", percentage: "~6.5%", up: false },
      { amount: "$300", percentage: "~11.5%", up: false },
      { amount: "$399", percentage: "~16.5%", up: false },
    ],
    risks: {
      level: "Very Low Risk Strategy",
      factors: [
        { icon: <Percent width={16} height={16} />, label: "Interest Rate" },
        {
          icon: <ChartColumnDecreasing width={16} height={16} />,
          label: "Option Fees",
        },
        {
          icon: <UmbrellaOff width={16} height={16} />,
          label: "AAVE Platform risks",
        },
      ],
    },
  },
  {
    id: "4",
    strategy: "dcds",
    risk: "low",
    route: "dcds",
    name: "Mint USDA+ and deposit 25% in dCDS",
    description: "Retain ETH upside and earn some option fees",
    maxReturn: {
      value: "~3.5%",
      period: "1 Month",
    },
    rewards: [
      {
        value: "Monthly APR ~0.16%",
        token: "ETH",
        period: "Monthly",
        icon: cryptoEth,
      },
      {
        value: "Earn ABOND tokens ~ Variable APY",
        token: "ABOND",
        period: "APY",
        icon: getIconMapping("dark", "ABOND"),
      },
      {
        value: "dCDS APR ~ upto 200%",
        token: "ABOND",
        period: "APY",
        icon: getIconMapping("dark", "ABOND"),
      },
      {
        value: "Earn Autonomint Points",
        token: "ABOND",
        period: "APY",
        icon: getIconMapping("dark", "ABOND"),
      },
    ],
    strategyDetails: [
      {
        heading: "Strategy",
        subHeading: [
          "Deposit ETH and borrow 80% of ETH value in USDA+",
          "Deposit a minimum of 25% of borrowed USDA+ in dCDS",
        ],
      },
      {
        heading: "Example",
        subHeading: [
          "Deposit 1 ETH worth $2000 and borrow 1600 USDA+",
          "Deposit 400 USDA+ in dCDS",
        ],
      },
    ],
    costs: [
      {
        platform: "Autonomint",
        monthlyBorrowingFee: "0.16%",
        optionFee: "0.16%",
      },
      {
        platform: "Market",
        monthlyBorrowingFee: "0.42%",
        optionFee: "8%",
      },
    ],
    monthlyYield: [
      { amount: "$100", percentage: "~1.5%", up: false },
      { amount: "$200", percentage: "~6.5%", up: false },
      { amount: "$300", percentage: "~11.5%", up: false },
      { amount: "$399", percentage: "~16.5%", up: false },
    ],
    risks: {
      level: "Low Risk Strategy",
      factors: [
        { icon: <Percent width={16} height={16} />, label: "Interest Rate" },
        {
          icon: <ChartColumnDecreasing width={16} height={16} />,
          label: "Option Fees",
        },
        {
          icon: <UmbrellaOff width={16} height={16} />,
          label: "AAVE Platform risks",
        },
        {
          icon: <ChartCandlestick width={16} height={16} />,
          label: "Market Volatility Risk",
        },
      ],
    },
  },
  {
    id: "5",
    strategy: "dcds",
    risk: "medium",
    route: "dcds",
    name: "Mint USDA+ and deposit 100% in dCDS",
    description: "Retain ETH upside and earn high option fees",
    maxReturn: {
      value: "~13.5%",
      period: "1 Month",
    },
    rewards: [
      {
        value: "Monthly APR ~0.16%",
        token: "ETH",
        period: "Monthly",
        icon: cryptoEth,
      },
      {
        value: "Earn ABOND tokens ~ Variable APY",
        token: "ABOND",
        period: "APY",
        icon: getIconMapping("dark", "ABOND"),
      },
      {
        value: "dCDS APR ~ upto 200%",
        token: "ABOND",
        period: "APY",
        icon: <Percent width={16} height={16} />,
      },
      {
        value: "Earn Autonomint Points",
        token: "ABOND",
        period: "APY",
        icon: getIconMapping("dark", "ABOND"),
      },
    ],
    strategyDetails: [
      {
        heading: "Strategy",
        subHeading: [
          "Deposit ETH and borrow 80% of ETH value in USDA+",
          "Deposit borrowed USDA+ in dCDS",
        ],
      },
      {
        heading: "Example",
        subHeading: [
          "Deposit 1 ETH worth $2000 and borrow 1600 USDA+",
          "Deposit 1600 USDA+ in dCDS",
        ],
      },
    ],
    costs: [
      {
        platform: "Autonomint",
        monthlyBorrowingFee: "0.16%",
        optionFee: "0.16%",
      },
      {
        platform: "Market",
        monthlyBorrowingFee: "0.42%",
        optionFee: "8%",
      },
    ],
    monthlyYield: [
      { amount: "$100", percentage: "~1.5%", up: false },
      { amount: "$200", percentage: "~6.5%", up: false },
      { amount: "$300", percentage: "~11.5%", up: false },
      { amount: "$399", percentage: "~16.5%", up: false },
    ],
    risks: {
      level: "Medium Risk Strategy",
      factors: [
        { icon: <Percent width={16} height={16} />, label: "Interest Rate" },
        {
          icon: <ChartColumnDecreasing width={16} height={16} />,
          label: "Option Fees",
        },
        {
          icon: <UmbrellaOff width={16} height={16} />,
          label: "AAVE Platform risks",
        },
        {
          icon: <ChartCandlestick width={16} height={16} />,
          label: "Market Volatility Risk",
        },
      ],
    },
  },
  {
    id: "6",
    strategy: "dcds",
    risk: "medium",
    route: "dcds",
    name: "Deposit Stablecoins in dCDS",
    description: "Capture ETH upside gains and earn option fees",
    maxReturn: {
      value: "~31.67%",
      period: "1 Month",
    },
    rewards: [
      {
        value: "dCDS APR ~ upto 200%",
        token: "ABOND",
        period: "APY",
        icon: <Percent width={16} height={16} />,
      },
      {
        value: "Earn Autonomint Points",
        token: "ABOND",
        period: "APY",
        icon: getIconMapping("dark", "ABOND"),
      },
    ],
    strategyDetails: [
      {
        heading: "Strategy",
        subHeading: ["Deposit USDT in dCDS"],
      },
      {
        heading: "Example",
        subHeading: ["Deposit 1000 USDT in dCDS"],
      },
    ],
    costs: [
      {
        platform: "$0",
        monthlyBorrowingFee: "0.16%",
        optionFee: "0.16%",
      },
    ],
    monthlyYield: [
      { amount: "$20", percentage: "~5%", up: true },
      { amount: "$40", percentage: "~10%", up: true },
      { amount: "$60", percentage: "~15%", up: true },
    ],
    risks: {
      level: "Medium Risk Strategy",
      factors: [
        {
          icon: <ChartColumnDecreasing width={16} height={16} />,
          label: "Option Fees",
        },
        {
          icon: <ChartCandlestick width={16} height={16} />,
          label: "Market Volatility Risk",
        },
      ],
    },
  },
  {
    id: "7",
    strategy: "dcds",
    risk: "medium",
    route: "dcds",
    name: "Deposit Volatile Tokens in dCDS",
    description: "Capture ETH upside gains and earn option fees",
    maxReturn: {
      value: "~24.16%",
      period: "1 Month",
    },
    rewards: [
      {
        value: "dCDS APR ~ upto 200%",
        token: "ABOND",
        period: "APY",
        icon: <Percent width={16} height={16} />,
      },
      {
        value: "Earn Autonomint Points",
        token: "ABOND",
        period: "APY",
        icon: getIconMapping("dark", "ABOND"),
      },
    ],
    strategyDetails: [
      {
        heading: "Strategy",
        subHeading: ["Deposit AERO or OP token in dCDS"],
      },
      {
        heading: "Example",
        subHeading: [
          "Deposit $1000 AERO token in dCDS",
          "Discounted Value = $700",
        ],
      },
    ],
    costs: [
      {
        platform: "$0",
        monthlyBorrowingFee: "0.16%",
        optionFee: "0.16%",
      },
    ],
    monthlyYield: [
      { amount: "$20", percentage: "~5%", up: true },
      { amount: "$40", percentage: "~10%", up: true },
      { amount: "$60", percentage: "~15%", up: true },
    ],
    risks: {
      level: "Medium Risk Strategy",
      factors: [
        {
          icon: <ChartColumnDecreasing width={16} height={16} />,
          label: "Option Fees",
        },
        {
          icon: <ChartCandlestick width={16} height={16} />,
          label: "Market Volatility Risk",
        },
        {
          icon: <ChartCandlestick width={16} height={16} />,
          label: "Token Price Volatility Risk",
        },
      ],
    },
  },
  {
    id: "8",
    strategy: "option",
    risk: "medium",
    route: "mintUSDaWithCollateral/ETH",
    name: "Best Strategy : Option Fee Arbitrage",
    description: "Borrow cheap option from Autonomint & sell higher",
    maxReturn: {
      value: "~4%",
      period: "1 Month",
    },
    rewards: [
      {
        value: "Monthly APR ~0.16%",
        token: "ETH",
        period: "Monthly",
        icon: cryptoEth,
      },
      {
        value: "Earn ABOND tokens ~ Variable APY",
        token: "ABOND",
        period: "APY",
        icon: getIconMapping("dark", "ABOND"),
      },
      {
        value: "Earn Autonomint Points",
        token: "ABOND",
        period: "APY",
        icon: getIconMapping("dark", "ABOND"),
      },
    ],
    strategyDetails: [
      {
        heading: "Strategy",
        subHeading: [
          "Deposit ETH and borrow 80% of ETH value in USDA+",
          "Go to Deribit and sell a 1 month expiry ETH ATM Put option",
        ],
      },
      {
        heading: "Example",
        subHeading: [
          "Deposit 1 ETH and borrow 1600 USDA+",
          "Go to Deribit and deposit 400 USDT as margin",
          "Sell a 1 month expiry ETH ATM Put option for $160",
        ],
      },
    ],
    costs: [
      {
        platform: "Autonomint",
        monthlyBorrowingFee: "0.16%",
        optionFee: "0.16%",
      },
      {
        platform: "Deribit",
        monthlyBorrowingFee: "0.42%",
        optionFee: "8%",
      },
    ],
    monthlyYield: [],
    risks: {
      level: "Medium Risk Strategy",
      factors: [
        {
          icon: <ChartColumnDecreasing width={16} height={16} />,
          label: "Option Fees",
        },
        {
          icon: <ChartCandlestick width={16} height={16} />,
          label: "ETH Market Volatility Risk",
        },
      ],
    },
  },
  {
    id: "9",
    strategy: "option",
    risk: "veryLow",
    route: "mintUSDaWithCollateral/ETH",
    name: "Best Strategy : Multiple Option Fee Arbitrage",
    description:
      "Borrow monthly cheap option from Autonomint & sell mutiple weekly ones",
    maxReturn: {
      value: "~10%",
      period: "1 Month",
      upto: true,
    },
    rewards: [
      {
        value: "Monthly APR ~0.16%",
        token: "ETH",
        period: "Monthly",
        icon: cryptoEth,
      },
      {
        value: "Earn ABOND tokens ~ Variable APY",
        token: "ABOND",
        period: "APY",
        icon: getIconMapping("dark", "ABOND"),
      },
      {
        value: "Earn Autonomint Points",
        token: "ABOND",
        period: "APY",
        icon: getIconMapping("dark", "ABOND"),
      },
    ],
    strategyDetails: [
      {
        heading: "Strategy",
        subHeading: [
          "Deposit ETH and borrow 80% of ETH value in USDA+",
          "Go to Deribit and sell week wise expiry ETH ATM Put option",
        ],
      },
      {
        heading: "Example",
        subHeading: [
          "Deposit 1 ETH and borrow 1600 USDA+",
          "Go to Deribit and deposit 400 USDT as margin",
          "Sell a 1 month expiry ETH ATM Put option for $160",
          "Keep on repeating previous step after a week till entire month is over",
        ],
      },
    ],
    costs: [
      {
        platform: "Autonomint",
        monthlyBorrowingFee: "0.16%",
        optionFee: "0.16%",
      },
      {
        platform: "Deribit",
        monthlyBorrowingFee: "0.42%",
        optionFee: "8%",
      },
    ],
    monthlyYield: [],
    risks: {
      level: "Very Low risk strategy",

      factors: [
        {
          icon: <ChartColumnDecreasing width={16} height={16} />,
          label: "Option Fees",
        },
        {
          icon: <ChartCandlestick width={16} height={16} />,
          label: "ETH Market Volatility Risk",
        },
      ],
    },
  },
];
