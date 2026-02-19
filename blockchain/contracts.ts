import { NetworkId } from "@/utils/constants";
import { ZeroAddress } from "ethers";
import { zeroAddress } from "viem";

type ChainAddresses = {
  [key: number | string]: `0x${string}`;
};


// Addresses for the multi-sign contract
export const multiSignAddress = {
  84532: "0xD2121D7979650Bf50969207dC78aa9d3c3cfE204",
  11155420: "0x2f4A8f47AA7dd43881FA8B6233B08bD9bC73e3bA",
  [NetworkId.Ethereum]: '0xd2F3Abd425F660920473C62539720B6503f069cb',
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the usDa contract
export const usDaAddress = {
  84532: "0x528DF5A715876A61EACF9ebcCD7f1e9ca8C08C4F",
  11155420: "0x1aADdb3d892f4Ceb82252E5826045b36e640d1Cc",
  919: "0x39B54D1631205F7FD2B29454CF73Ee85fA6C5E45",
  [NetworkId.Ethereum]: '0xD533b1dA8CF1c8Bc15a8566Ba0AE88F7E2f7A069',
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the borrowing contract
export const borrowingContractAddress = {
  84532: "0x37dd8a3F1195B8d3dbd76FA30dE04dF247F3a02E",
  11155420: "0x102545F40D9F707e9FBB656d714E24a35A289683",
  [NetworkId.Ethereum]: '0x7960abb9d9Ac0D39f166C5096D61B85b0B6cA81d',
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the borrowing deposit contract
export const borrowingDepositContractAddress = {
  84532: "0xF3c96a27Ef2b3469D744ea85C2C92Eba2393626a",
  11155420: "0x65994CcA324b08c70F47D8468C2915771D04a60a",
  [NetworkId.Ethereum]: '0x616cff79C2fE6d376075f107Ef9C273dEd932f60',
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the borrowing withdraw contract
export const borrowingWithdrawContractAddress = {
  84532: "0x05D0D554BeCf47648CF7CdbE5270EDdfad989997",
  11155420: "0xEcFe29e7BC5d7f1068F2a8A38869508349dbE78b",
  [NetworkId.Ethereum]: '0xe4D1110Fd438dDdCF9a998eE2410A0A78CD36C97',
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the cds contract
export const cdsAddress = {
  84532: "0x6F2e7070F38797107885c2bdd51427224eBFB96E",
  11155420: "0x2772AcB7c92B3d300222EbB6e516E5A8aC27B402",
  [NetworkId.Ethereum]: '0x9a8b51EecAb7a2287F4507680293e5F7e2810221',
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the cds deposit contract
export const cdsDepositAddress = {
  84532: "0xd5A2e88dE643f04e6577975e7Da7fDd17c837ae8",
  11155420: "0x311a01DAC6E2DACC698e5995CBBad7FDC5AE4121",
  [NetworkId.Ethereum]: '0xbFcAA7Cd69913aab6c4780b5478980Ec5E4aB375',
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the cds withdraw contract
export const cdsWithdrawAddress = {
  84532: "0xD4CD7809Cce48c9008794595E2E271ED6e372453",
  11155420: "0x053De3d2Da8F77b534dF1E1728683E21643f9B23",
  [NetworkId.Ethereum]: "0xdd60164604d2F23fde1a91f5950C6C85D1f94604",
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the USDT contract
export const testusdtAbiAddress = {
  84532: "0x1eBFf56C8f5d6B71bAFc607764767187018687E9",
  11155420: "0xDCa91575A8bb40a1EbC4C8985d0d05fbfb16D9d6",
  [NetworkId.Ethereum]: '0x2633aF287cC740Ac43Ec6869Cad61F4dCAFb3179',
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the USDC contract
export const usdcAddress = {
  84532: "0x7293ec00aF71Ba1fDFff81b79BD5bF01C2a0e051",
  11155420: "0x58dFf3FbD0209365db39AD7801921Ffa5d637a17",
  [NetworkId.Ethereum]: '0x7190946C91cd0Ff9956876E73E409B5903Bc048A',
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the sUSD contract
export const sUSDAddress = {
  11155420: "0xD7D674d80e79CF3A3b67D6a510AC1B0493dF47cF",
  84532: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the abond contract
export const abondAddress = {
  84532: "0x3Cc46516D062838c1F27A153De519F1579B4348C",
  11155420: "0x8a64C6Dd4F257E7D498bD1Ddc293a779A918DA27",
  [NetworkId.Ethereum]: "0x8d1d0e7CCCd61c3f42D25273594c5543DD9157B1",
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the native token
export const nativeTokenAddress: ChainAddresses = {
  84532: "0xB271403D5833296F1eaF4E7Cb397118ffd369aCD",
  11155420: "0xCC09162500a5E6F96f0AEF3AA6844Cf35197EAcd",
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
};

// Addresses for the ETH contract
export const ethAddress: ChainAddresses = {
  84532: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  11155420: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  [NetworkId.Ethereum]: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  [NetworkId.Rise]: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
} as const;

// Addresses for the wrsETH contract
export const wrsETHAddress: ChainAddresses = {
  84532: "0x750cF0693a94B776EEed523184277669373E739C",
  11155420: "0xe8e8b5b655Ed069755537dc79645Ad3D4e83bA0B",
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the weETH contract
export const weETHAddress: ChainAddresses = {
  84532: "0xE584D3e9Ca316A57557c461e0AC794AA18999e7E",
  11155420: "0x100BaFBbf6CCC7aB40e3d7Abf4A8861AFDeAB215",
  [NetworkId.Ethereum]: '0x880e17de27C1f11dB4fF1b3aB57F2c3a5F7C7C49',
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the rsETH contract
export const rsETHAddress: ChainAddresses = {
  84532: "0x7118Ee6D6eBeb3028FFc885b2f62Cf7264c2168F",
  11155420: "0x101ddb5026322f42E0F133352c115AD4B40B9412",
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the wsuperOETH contract
export const wsuperOETHAddress: ChainAddresses = {
  84532: "0x7F1Ed7Dcb429ed1Adb93f5d56537c4bDaf54eD50",
  11155420: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the cbBTC contract
export const cbBTCAddress: ChainAddresses = {
  84532: "0xF0Cc5e691679693221560182F6046F1D6f6cAF98",
  11155420: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the KRWQ contract
export const KRWQAddress: ChainAddresses = {
  84532: "0xAE2902b0b876473F938a40FdBFFaa4F2b0Ac3BA4",
  11155420: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the EURC contract
export const EURCAddress: ChainAddresses = {
  84532: "0x60a3e35cc302bfa44cb288bc5a4f316fdb1adb42",
  11155420: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress as `0x${string}`,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
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
} as const;

// Addresses for the global contract
export const globalAddress = {
  84532: "0xDE5C0d41Bc70842086c83106b918CBA7CDdE8D70",
  11155420: "0x98015b7458825B7d463B29Ff38D66aA6eCcd1479",
  [NetworkId.Ethereum]: '0xcC81132A4944C297CAC375C77f87F21cD2b406c7',
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the mpo contract
export const mpoAddress = {
  84532: "0xAa506b51aD7834efAA120A9B17Fe071B08Cdca29",
  11155420: "0x099786b09C075F798de410b69a0E86B6A908593F",
  [NetworkId.Ethereum]: '0xf63d4D599a4D26de77c1a469642d70f996e2Cb88',
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the borrow lib contract
export const borrowLibAddress = {
  84532: "0xCDEAc33b6C9E0f0470A2B2db83D115EE5A920516",
  11155420: "0xa1222aa38AAee1cc21491cC6bB18E3618471bf9f",
  [NetworkId.Ethereum]: '0xcd1Df59f6031Ea6DfAFe6dA83bDD38934A106728',
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Addresses for the borrow lib contract
export const boldTokenAddress = {
  84532: "0xDDc9fcE09bf6d5310973bD3b24cF787Ee3Ef2bcB",
  11155420: "0x814BD144aeBF04a6cE6452438540125158ff9625",
  [NetworkId.Ethereum]: ZeroAddress,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// option contract address
export const optionContractAddress = {
  84532: "0xC1222756564fdc5B8bb2f99aEF854288C3c97d5e",
  11155420: "0x08ff83CcE09DbDd4dfC5E7ae42a5617cd54d8C12",
  [NetworkId.Ethereum]: "0x1B20faae1BbD00476afF3097501BEc379FBB1B96",
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// CDS Core Address
export const cdsCoreAddress = {
  84532: "0xa0b94aA25F41EFaC55167E72BF6934207f85fB21",
  11155420: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// CDS Deposit Core Address
export const cdsDepositCoreAddress = {
  84532: "0xE100085e918A00519F25F40d2C8F1E5Aab6aad8A",
  11155420: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// CDS Withdraw Core Address
export const cdsWithdrawCoreAddress = {
  84532: "0xa0761ba01A407E7700C81a40deEEF037F7C24122",
  11155420: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Borrow Core Address
export const borrowCoreAddress = {
  84532: "0x436ad5c4C7AF3873b1C68043F4A7822A70952a61",
  11155420: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Borrow Deposit Core Address
export const borrowDepositCoreAddress = {
  84532: "0xD2D9858057574326a12D708f223c336CaE9A77AD",
  11155420: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Borrow Withdraw Core Address
export const borrowWithdrawCoreAddress = {
  84532: "0x1268929C5ce52B427Fcac41aB82a65347313e630",
  11155420: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;

// Borrow Liquidation Core Address
export const borrowLiquidationCoreAddress = {
  84532: "0x764f85fda1EA4935993380D256C1f853791aAc14",
  11155420: zeroAddress,
  [NetworkId.Ethereum]: ZeroAddress,
  [NetworkId.Rise]: ZeroAddress as `0x${string}`
} as const;