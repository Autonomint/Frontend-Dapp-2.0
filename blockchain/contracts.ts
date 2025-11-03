import { NetworkId } from "@/utils/constants";
import { ZeroAddress } from "ethers";
import { zeroAddress } from "viem";

type ChainAddresses = {
  [key: number | string]: `0x${string}`;
};


// Addresses for the multi-sign contract
export const multiSignAddress = {
  8453: "0xD183EE82CcBA62ED8Bff80817D24219E59F20dB6",
  10: "0xD183EE82CcBA62ED8Bff80817D24219E59F20dB6",
  [NetworkId.Ethereum]: '0xd2F3Abd425F660920473C62539720B6503f069cb'
} as const;

// Addresses for the usDa contract
export const usDaAddress = {
  8453: "0x4e44fB5c61a89CF44a9080AB987335889FCaA6bd",
  10: "0x4e44fB5c61a89CF44a9080AB987335889FCaA6bd",
  34443: "0x39B54D1631205F7FD2B29454CF73Ee85fA6C5E45",
  [NetworkId.Ethereum]: '0xD533b1dA8CF1c8Bc15a8566Ba0AE88F7E2f7A069'
} as const;

// Addresses for the borrowing contract
export const borrowingContractAddress = {
  8453: "0x5C6775563C5C9813f55E4C41b7B4c739532C3768",
  10: "0x5C6775563C5C9813f55E4C41b7B4c739532C3768",
  [NetworkId.Ethereum]: '0x7960abb9d9Ac0D39f166C5096D61B85b0B6cA81d'
} as const;

// Addresses for the borrowing deposit contract
export const borrowingDepositContractAddress = {
  8453: "0x4a8d902fc344bACF72583C97f4280C94eD586088",
  10: "0x91aD5Ce32ed5569C30c23916300C275Cd83307c6",
  [NetworkId.Ethereum]: '0x616cff79C2fE6d376075f107Ef9C273dEd932f60'
} as const;

// Addresses for the borrowing withdraw contract
export const borrowingWithdrawContractAddress = {
  8453: "0x91aD5Ce32ed5569C30c23916300C275Cd83307c6",
  10: "0x2e322fB33031B64D7D11d888a950F47cE7E5f2e6",
  [NetworkId.Ethereum]: '0xe4D1110Fd438dDdCF9a998eE2410A0A78CD36C97'
} as const;

// Addresses for the cds contract
export const cdsAddress = {
  8453: "0x86efd14eE1590f671f624D38789964542966F7C8",
  10: "0x86efd14eE1590f671f624D38789964542966F7C8",
  [NetworkId.Ethereum]: '0x9a8b51EecAb7a2287F4507680293e5F7e2810221'
} as const;

// Addresses for the cds deposit contract
export const cdsDepositAddress = {
  8453: "0x9Cbb1df330A37C0A0C16b2ec6a6c3bb4795C937A",
  10: "0x14157E3b04f6ae7524969CB8B8E57713dcE3e8F8",
  [NetworkId.Ethereum]: '0xbFcAA7Cd69913aab6c4780b5478980Ec5E4aB375'
} as const;

// Addresses for the cds withdraw contract
export const cdsWithdrawAddress = {
  8453: "0x14157E3b04f6ae7524969CB8B8E57713dcE3e8F8",
  10: "0x3f4549Caf7CA067661Dfc99d83EacdDfdD593E8C",
  [NetworkId.Ethereum]: "0xdd60164604d2F23fde1a91f5950C6C85D1f94604"
} as const;

// Addresses for the USDT contract
export const testusdtAbiAddress = {
  8453: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
  10: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
  [NetworkId.Ethereum]: '0x2633aF287cC740Ac43Ec6869Cad61F4dCAFb3179'
} as const;

// Addresses for the USDC contract
export const usdcAddress = {
  8453: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  10: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
  [NetworkId.Ethereum]: '0x7190946C91cd0Ff9956876E73E409B5903Bc048A'

} as const;

// Addresses for the sUSD contract
export const sUSDAddress = {
  10: "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9",
  8453: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the abond contract
export const abondAddress = {
  8453: "0x87Af984DED0ACE6547485cAfd2526ab332454149",
  10: "0x87Af984DED0ACE6547485cAfd2526ab332454149",
  [NetworkId.Ethereum]: "0x8d1d0e7CCCd61c3f42D25273594c5543DD9157B1"
} as const;

// Addresses for the native token
export const nativeTokenAddress: ChainAddresses = {
  8453: "0x940181a94A35A4569E4529A3CDfB74e38FD98631",
  10: "0x4200000000000000000000000000000000000042",
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
};

// Addresses for the ETH contract
export const ethAddress: ChainAddresses = {
  8453: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  10: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  [NetworkId.Ethereum]: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
} as const;

// Addresses for the wrsETH contract
export const wrsETHAddress: ChainAddresses = {
  8453: "0xEDfa23602D0EC14714057867A78d01e94176BEA0",
  10: "0x87eEE96D50Fb761AD85B1c982d28A042169d61b1",
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,

} as const;

// Addresses for the weETH contract
export const weETHAddress: ChainAddresses = {
  8453: "0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A",
  10: "0x5A7fACB970D094B6C7FF1df0eA68D99E6e73CBFF",
  [NetworkId.Ethereum]: '0x880e17de27C1f11dB4fF1b3aB57F2c3a5F7C7C49',
} as const;

// Addresses for the rsETH contract
export const rsETHAddress: ChainAddresses = {
  8453: "0x7118Ee6D6eBeb3028FFc885b2f62Cf7264c2168F",
  10: "0x101ddb5026322f42E0F133352c115AD4B40B9412",
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
} as const;

// Addresses for the wsuperOETH contract
export const wsuperOETHAddress: ChainAddresses = {
  8453: "0x7FcD174E80f264448ebeE8c88a7C4476AAF58Ea6",
  10: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
} as const;

// Addresses for the cbBTC contract
export const cbBTCAddress: ChainAddresses = {
  84532: "0xF0Cc5e691679693221560182F6046F1D6f6cAF98",
  11155420: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
} as const;

// Addresses for the borrow assets
export const borrowAssetsAddress = {
  ETH: ethAddress,
  wrsETH: wrsETHAddress,
  weETH: weETHAddress,
  rsETH: rsETHAddress,
  wsuperOETHb: wsuperOETHAddress,
  cbBTC: cbBTCAddress,
} as const;

// Addresses for the global contract
export const globalAddress = {
  8453: "0x29400a68568De78c580491EA865300e7f6eE1092",
  10: "0x29400a68568De78c580491EA865300e7f6eE1092",
  [NetworkId.Ethereum]: '0xcC81132A4944C297CAC375C77f87F21cD2b406c7',

} as const;

// Addresses for the mpo contract
export const mpoAddress = {
  8453: "0x715A3B65335FaB8291b77f5A6afa427c8cF2e015",
  10: "0x715A3B65335FaB8291b77f5A6afa427c8cF2e015",
} as const;

export const treasuryAddress = {
  8453: "0xB868684d9E37704327436B94912899747690FfEc",
  10: "0xB868684d9E37704327436B94912899747690FfEc",
  [NetworkId.Ethereum]: '0xf63d4D599a4D26de77c1a469642d70f996e2Cb88',
} as const;

// // Addresses for the borrow lib contract
// export const borrowLibAddress = {
//   84532: "0xCDEAc33b6C9E0f0470A2B2db83D115EE5A920516",
//   11155420: "0xa1222aa38AAee1cc21491cC6bB18E3618471bf9f",
// } as const;

// Addresses for the borrow lib contract
export const boldTokenAddress = {
  8453: "0xDDc9fcE09bf6d5310973bD3b24cF787Ee3Ef2bcB",
  10: "0x814BD144aeBF04a6cE6452438540125158ff9625",
  [NetworkId.Ethereum]: ZeroAddress,
} as const;

// option contract address
export const optionContractAddress = {
  8453: "0x3820d1eD09F73C3e9a9fcd39795855b430f9C6E3",
  10: "0x3820d1eD09F73C3e9a9fcd39795855b430f9C6E3",
}
// Addresses for the borrow lib contract
export const borrowLibAddress = {
  84532: "0x8A08258Bf7448604a354094182137A47296A5BB5",
  11155420: "0x84ef34218255C3A0EcD4100820cd3ab3D23DFDed",
  [NetworkId.Ethereum]: "0x1B20faae1BbD00476afF3097501BEc379FBB1B96",
} as const;

// CDS Core Address
export const cdsCoreAddress = {
  84532: "0xa0b94aA25F41EFaC55167E72BF6934207f85fB21",
  11155420: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
} as const;

// CDS Deposit Core Address
export const cdsDepositCoreAddress = {
  84532: "0xE100085e918A00519F25F40d2C8F1E5Aab6aad8A",
  11155420: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
} as const;

// CDS Withdraw Core Address
export const cdsWithdrawCoreAddress = {
  84532: "0xa0761ba01A407E7700C81a40deEEF037F7C24122",
  11155420: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
} as const;

// Borrow Core Address
export const borrowCoreAddress = {
  84532: "0x436ad5c4C7AF3873b1C68043F4A7822A70952a61",
  11155420: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
} as const;

// Borrow Deposit Core Address
export const borrowDepositCoreAddress = {
  84532: "0xD2D9858057574326a12D708f223c336CaE9A77AD",
  11155420: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
} as const;

// Borrow Withdraw Core Address
export const borrowWithdrawCoreAddress = {
  84532: "0x1268929C5ce52B427Fcac41aB82a65347313e630",
  11155420: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
} as const;

// Borrow Liquidation Core Address
export const borrowLiquidationCoreAddress = {
  84532: "0x764f85fda1EA4935993380D256C1f853791aAc14",
  11155420: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
} as const;