import { NetworkId } from "@/utils/constants";
import { ZeroAddress } from "ethers";
import { zeroAddress } from "viem";

type ChainAddresses = {
  [key: number | string]: `0x${string}`;
};


// Addresses for the multi-sign contract
export const multiSignAddress = {
  [NetworkId.BaseSepolia]: "0xD183EE82CcBA62ED8Bff80817D24219E59F20dB6",
  [NetworkId.Optimism]: "0xD183EE82CcBA62ED8Bff80817D24219E59F20dB6",
  [NetworkId.Ethereum]: '0xd2F3Abd425F660920473C62539720B6503f069cb',
  [NetworkId.Rise]: "0xDA448766672279d7C62a7a6826246cAb717AB9aa" as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress

} as const;

// Addresses for the usDa contract
export const usDaAddress = {
  [NetworkId.BaseSepolia]: "0x4e44fB5c61a89CF44a9080AB987335889FCaA6bd",
  [NetworkId.Optimism]: "0x4e44fB5c61a89CF44a9080AB987335889FCaA6bd",
  34443: "0x39B54D1631205F7FD2B29454CF73Ee85fA6C5E45",
  [NetworkId.Ethereum]: '0xD533b1dA8CF1c8Bc15a8566Ba0AE88F7E2f7A069',
  [NetworkId.Rise]: "0x9f5542813398af71F41c5d037DDCe5aaE81455ee" as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress

} as const;

// Addresses for the borrowing contract
export const borrowingContractAddress = {
  [NetworkId.BaseSepolia]: "0x5C6775563C5C9813f55E4C41b7B4c739532C3768",
  [NetworkId.Optimism]: "0x5C6775563C5C9813f55E4C41b7B4c739532C3768",
  [NetworkId.Ethereum]: '0x7960abb9d9Ac0D39f166C5096D61B85b0B6cA81d',
  [NetworkId.Rise]: '0x8817D21011504010183Ef93dad3fEF77Fb5186D4' as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress

} as const;

// Addresses for the borrowing deposit contract
export const borrowingDepositContractAddress = {
  [NetworkId.BaseSepolia]: "0x4a8d902fc344bACF72583C97f4280C94eD586088",
  [NetworkId.Optimism]: "0x91aD5Ce32ed5569C30c23916300C275Cd83307c6",
  [NetworkId.Ethereum]: '0x616cff79C2fE6d376075f107Ef9C273dEd932f60',
  [NetworkId.Rise]: '0x375f9Fe2a4401feB54A73225e70c436141440534' as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress

} as const;

// Addresses for the borrowing withdraw contract
export const borrowingWithdrawContractAddress = {
  [NetworkId.BaseSepolia]: "0x91aD5Ce32ed5569C30c23916300C275Cd83307c6",
  [NetworkId.Optimism]: "0x2e322fB33031B64D7D11d888a950F47cE7E5f2e6",
  [NetworkId.Ethereum]: '0xe4D1110Fd438dDdCF9a998eE2410A0A78CD36C97',
  [NetworkId.Rise]: '0x3289fFc0368f80c41802Aa626a1738962C740dD5' as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress

} as const;

// Addresses for the cds contract
export const cdsAddress = {
  [NetworkId.BaseSepolia]: "0x86efd14eE1590f671f624D38789964542966F7C8",
  [NetworkId.Optimism]: "0x86efd14eE1590f671f624D38789964542966F7C8",
  [NetworkId.Ethereum]: '0x9a8b51EecAb7a2287F4507680293e5F7e2810221',
  [NetworkId.Rise]: '0x268BF3cDe50bcbBED5De8C284b498b5DDf13c96d' as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress

} as const;

// Addresses for the cds deposit contract
export const cdsDepositAddress = {
  [NetworkId.BaseSepolia]: "0x9Cbb1df330A37C0A0C16b2ec6a6c3bb4795C937A",
  [NetworkId.Optimism]: "0x14157E3b04f6ae7524969CB8B8E57713dcE3e8F8",
  [NetworkId.Ethereum]: '0xbFcAA7Cd69913aab6c4780b5478980Ec5E4aB375',
  [NetworkId.Rise]: '0x8E6cBe3132a03b68B652C74b3f9dB837818B5AA6' as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress

} as const;

// Addresses for the cds withdraw contract
export const cdsWithdrawAddress = {
  [NetworkId.BaseSepolia]: "0x14157E3b04f6ae7524969CB8B8E57713dcE3e8F8",
  [NetworkId.Optimism]: "0x3f4549Caf7CA067661Dfc99d83EacdDfdD593E8C",
  [NetworkId.Ethereum]: "0xdd60164604d2F23fde1a91f5950C6C85D1f94604",
  [NetworkId.Rise]: '0x087d29a451cFa4Ce0201b9F02B9a86A8651F19bF' as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress

} as const;

// Addresses for the USDT contract
export const testusdtAbiAddress = {
  [NetworkId.BaseSepolia]: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
  [NetworkId.Optimism]: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
  [NetworkId.Ethereum]: '0x2633aF287cC740Ac43Ec6869Cad61F4dCAFb3179',
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// Addresses for the USDC contract
export const usdcAddress = {
  [NetworkId.BaseSepolia]: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  [NetworkId.Optimism]: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
  [NetworkId.Ethereum]: '0x7190946C91cd0Ff9956876E73E409B5903Bc048A',
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// Addresses for the sUSD contract
export const sUSDAddress = {
  [NetworkId.Optimism]: "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9",
  [NetworkId.BaseSepolia]: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// Addresses for the abond contract
export const abondAddress = {
  [NetworkId.BaseSepolia]: "0x87Af984DED0ACE6547485cAfd2526ab332454149",
  [NetworkId.Optimism]: "0x87Af984DED0ACE6547485cAfd2526ab332454149",
  [NetworkId.Ethereum]: "0x8d1d0e7CCCd61c3f42D25273594c5543DD9157B1",
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress

} as const;

// Addresses for the native token
export const nativeTokenAddress: ChainAddresses = {
  [NetworkId.BaseSepolia]: "0x940181a94A35A4569E4529A3CDfB74e38FD98631",
  [NetworkId.Optimism]: "0x4200000000000000000000000000000000000042",
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
};

// Addresses for the ETH contract
export const ethAddress: ChainAddresses = {
  [NetworkId.BaseSepolia]: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  [NetworkId.Optimism]: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  [NetworkId.Ethereum]: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  [NetworkId.Rise]: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" as `0x${string}`,
  [NetworkId.Hyperliquid]: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
} as const;

// Addresses for the wrsETH contract
export const wrsETHAddress: ChainAddresses = {
  [NetworkId.BaseSepolia]: "0xEDfa23602D0EC14714057867A78d01e94176BEA0",
  [NetworkId.Optimism]: "0x87eEE96D50Fb761AD85B1c982d28A042169d61b1",
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// Addresses for the weETH contract
export const weETHAddress: ChainAddresses = {
  [NetworkId.BaseSepolia]: "0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A",
  [NetworkId.Optimism]: "0x5A7fACB970D094B6C7FF1df0eA68D99E6e73CBFF",
  [NetworkId.Ethereum]: '0x880e17de27C1f11dB4fF1b3aB57F2c3a5F7C7C49',
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// Addresses for the rsETH contract
export const rsETHAddress: ChainAddresses = {
  [NetworkId.BaseSepolia]: "0x7118Ee6D6eBeb3028FFc885b2f62Cf7264c2168F",
  [NetworkId.Optimism]: "0x101ddb5026322f42E0F133352c115AD4B40B9412",
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// Addresses for the wsuperOETH contract
export const wsuperOETHAddress: ChainAddresses = {
  [NetworkId.BaseSepolia]: "0x7FcD174E80f264448ebeE8c88a7C4476AAF58Ea6",
  [NetworkId.Optimism]: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// Addresses for the cbBTC contract
export const cbBTCAddress: ChainAddresses = {
  [NetworkId.BaseSepolia]: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
  [NetworkId.Optimism]: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// Addresses for the KRWQ contract
export const KRWQAddress: ChainAddresses = {
  [NetworkId.BaseSepolia]: "0x370923D39f139C64813f173a1bf0b4f9Ba36a24f",
  [NetworkId.Optimism]: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// Addresses for the EURC contract
export const EURCAddress: ChainAddresses = {
  [NetworkId.BaseSepolia]: "0x60a3E35Cc302bFA44Cb288Bc5a4F316Fdb1adb42",
  [NetworkId.Optimism]: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// Addresses for the HYPE contract
export const HYPEAddress: ChainAddresses = {
  [NetworkId.BaseSepolia]: zeroAddress,
  [NetworkId.Optimism]: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// Addresses for the borrow assets
export const borrowAssetsAddress = {
  ETH: ethAddress,
  wrsETH: wrsETHAddress,
  weETH: weETHAddress,
  rsETH: rsETHAddress,
  wsuperOETHb: wsuperOETHAddress,
  cbBTC: cbBTCAddress,
  KRWQ: KRWQAddress,
  krwq: KRWQAddress,
  EURC: EURCAddress,
  eurc: EURCAddress,
  hype: HYPEAddress,
  HYPE: HYPEAddress,
} as const;

// Addresses for the global contract
export const globalAddress = {
  [NetworkId.BaseSepolia]: "0x29400a68568De78c580491EA865300e7f6eE1092",
  [NetworkId.Optimism]: "0x29400a68568De78c580491EA865300e7f6eE1092",
  [NetworkId.Ethereum]: '0xcC81132A4944C297CAC375C77f87F21cD2b406c7',
  [NetworkId.Rise]: '0x08DB6fAeEdA60e41073483c7F39853f4663B7243' as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// Addresses for the mpo contract
export const mpoAddress = {
  [NetworkId.BaseSepolia]: "0x715A3B65335FaB8291b77f5A6afa427c8cF2e015",
  [NetworkId.Optimism]: "0x715A3B65335FaB8291b77f5A6afa427c8cF2e015",
  [NetworkId.Rise]: '0x52cA56529687893F4fB5811a36C3A9206DDd5A78' as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

export const treasuryAddress = {
  [NetworkId.BaseSepolia]: "0xB868684d9E37704327436B94912899747690FfEc",
  [NetworkId.Optimism]: "0xB868684d9E37704327436B94912899747690FfEc",
  [NetworkId.Ethereum]: '0xf63d4D599a4D26de77c1a469642d70f996e2Cb88',
  [NetworkId.Rise]: "0x05a58E6aeB92fc907B6DE425Fe5DbCC06Fa17323" as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// // Addresses for the borrow lib contract
// export const borrowLibAddress = {
//   84532: "0xCDEAc33b6C9E0f0470A2B2db83D115EE5A920516",
//   11155420: "0xa1222aa38AAee1cc21491cC6bB18E3618471bf9f",
// } as const;

// Addresses for the borrow lib contract
export const boldTokenAddress = {
  [NetworkId.BaseSepolia]: "0xDDc9fcE09bf6d5310973bD3b24cF787Ee3Ef2bcB",
  [NetworkId.Optimism]: "0x814BD144aeBF04a6cE6452438540125158ff9625",
  [NetworkId.Ethereum]: ZeroAddress,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// option contract address
export const optionContractAddress = {
  [NetworkId.BaseSepolia]: "0x3820d1eD09F73C3e9a9fcd39795855b430f9C6E3",
  [NetworkId.Optimism]: "0x3820d1eD09F73C3e9a9fcd39795855b430f9C6E3",
  [NetworkId.Rise]: "0x1Cf1f0CF74a905c955eab29F1147eeAc73b0a2C1" as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
}
// Addresses for the borrow lib contract
export const borrowLibAddress = {
  84532: "0x8A08258Bf7448604a354094182137A47296A5BB5",
  11155420: "0x84ef34218255C3A0EcD4100820cd3ab3D23DFDed",
  [NetworkId.Ethereum]: "0x1B20faae1BbD00476afF3097501BEc379FBB1B96",
  [NetworkId.Rise]: "0xcbD60D49d81A8834B629bBC281524B1c38d31608" as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// CDS Core Address
export const cdsCoreAddress = {
  [NetworkId.BaseSepolia]: "0x4486e2377950cE9e80356DbF6079aF776cdA461E",
  [NetworkId.Optimism]: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// CDS Deposit Core Address
export const cdsDepositCoreAddress = {
  [NetworkId.BaseSepolia]: "0xF8C9f313ff7e5b2C68CF953051368d824f57d719",
  [NetworkId.Optimism]: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// CDS Withdraw Core Address
export const cdsWithdrawCoreAddress = {
  [NetworkId.BaseSepolia]: "0xbB13f93552c6DA39F321e67f7281346cCC527664",
  [NetworkId.Optimism]: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// Borrow Core Address
export const borrowCoreAddress = {
  [NetworkId.BaseSepolia]: "0x6b2404c1B478e6F5A67AeF4AcC90acFE6d473ECe",
  [NetworkId.Optimism]: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// Borrow Deposit Core Address
export const borrowDepositCoreAddress = {
  [NetworkId.BaseSepolia]: "0x4643B246f068a2ab7FE618021DA478268fB1F611",
  [NetworkId.Optimism]: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// Borrow Withdraw Core Address
export const borrowWithdrawCoreAddress = {
  [NetworkId.BaseSepolia]: "0x0B1C6B3918B4253b94CD2497AC14a154CDf28Fbb",
  [NetworkId.Optimism]: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;

// Borrow Liquidation Core Address
export const borrowLiquidationCoreAddress = {
  [NetworkId.BaseSepolia]: "0x4c195Ff346e5451FcF55709C21fc0c67c5c2Fa58",
  [NetworkId.Optimism]: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`,
  [NetworkId.Hyperliquid]: zeroAddress
} as const;



