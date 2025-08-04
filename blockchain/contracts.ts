import { zeroAddress } from "viem";

type ChainAddresses = {
  [key: number]: `0x${string}`;
};

// Addresses for the multi-sign contract
export const multiSignAddress = {
  84532: "0xD2121D7979650Bf50969207dC78aa9d3c3cfE204",
  11155420: "0x2f4A8f47AA7dd43881FA8B6233B08bD9bC73e3bA",
} as const;

// Addresses for the usDa contract
export const usDaAddress = {
  84532: "0x528DF5A715876A61EACF9ebcCD7f1e9ca8C08C4F",
  11155111: "0x343f4E70e2489A566d056b12c647382f58857CC5",
  11155420: "0x1aADdb3d892f4Ceb82252E5826045b36e640d1Cc",
  919: "0x39B54D1631205F7FD2B29454CF73Ee85fA6C5E45",
} as const;

// Addresses for the borrowing contract
export const borrowingContractAddress = {
  84532: "0x37dd8a3F1195B8d3dbd76FA30dE04dF247F3a02E",
  11155420: "0x102545F40D9F707e9FBB656d714E24a35A289683",
} as const;

// Addresses for the borrowing deposit contract
export const borrowingDepositContractAddress = {
  84532: "0xF3c96a27Ef2b3469D744ea85C2C92Eba2393626a",
  11155420: "0x65994CcA324b08c70F47D8468C2915771D04a60a",
} as const;

// Addresses for the borrowing withdraw contract
export const borrowingWithdrawContractAddress = {
  84532: "0x05D0D554BeCf47648CF7CdbE5270EDdfad989997",
  11155420: "0xEcFe29e7BC5d7f1068F2a8A38869508349dbE78b",
} as const;

// Addresses for the cds contract
export const cdsAddress = {
  84532: "0x6F2e7070F38797107885c2bdd51427224eBFB96E",
  11155420: "0x2772AcB7c92B3d300222EbB6e516E5A8aC27B402",
} as const;

// Addresses for the cds deposit contract
export const cdsDepositAddress = {
  84532: "0xd5A2e88dE643f04e6577975e7Da7fDd17c837ae8",
  11155420: "0x311a01DAC6E2DACC698e5995CBBad7FDC5AE4121",
} as const;

// Addresses for the cds withdraw contract
export const cdsWithdrawAddress = {
  84532: "0xD4CD7809Cce48c9008794595E2E271ED6e372453",
  11155420: "0x053De3d2Da8F77b534dF1E1728683E21643f9B23",
} as const;

// Addresses for the USDT contract
export const testusdtAbiAddress = {
  84532: "0x1eBFf56C8f5d6B71bAFc607764767187018687E9",
  11155420: "0xDCa91575A8bb40a1EbC4C8985d0d05fbfb16D9d6",
} as const;

// Addresses for the USDC contract
export const usdcAddress = {
  84532: "0x7293ec00aF71Ba1fDFff81b79BD5bF01C2a0e051",
  11155420: "0x58dFf3FbD0209365db39AD7801921Ffa5d637a17",
} as const;

// Addresses for the sUSD contract
export const sUSDAddress = {
  11155420: "0xD7D674d80e79CF3A3b67D6a510AC1B0493dF47cF",
  84532: zeroAddress,
} as const;

// Addresses for the abond contract
export const abondAddress = {
  84532: "0x3Cc46516D062838c1F27A153De519F1579B4348C",
  11155420: "0x8a64C6Dd4F257E7D498bD1Ddc293a779A918DA27",
} as const;

// Addresses for the native token
export const nativeTokenAddress: ChainAddresses = {
  84532: "0xB271403D5833296F1eaF4E7Cb397118ffd369aCD",
  11155420: "0xCC09162500a5E6F96f0AEF3AA6844Cf35197EAcd",
};

// Addresses for the ETH contract
export const ethAddress: ChainAddresses = {
  84532: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  11155420: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
} as const;

// Addresses for the wrsETH contract
export const wrsETHAddress: ChainAddresses = {
  84532: "0x750cF0693a94B776EEed523184277669373E739C",
  11155420: "0xe8e8b5b655Ed069755537dc79645Ad3D4e83bA0B",
} as const;

// Addresses for the weETH contract
export const weETHAddress: ChainAddresses = {
  84532: "0xE584D3e9Ca316A57557c461e0AC794AA18999e7E",
  11155420: "0x100BaFBbf6CCC7aB40e3d7Abf4A8861AFDeAB215",
} as const;

// Addresses for the rsETH contract
export const rsETHAddress: ChainAddresses = {
  84532: "0x7118Ee6D6eBeb3028FFc885b2f62Cf7264c2168F",
  11155420: "0x101ddb5026322f42E0F133352c115AD4B40B9412",
} as const;

// Addresses for the wsuperOETH contract
export const wsuperOETHAddress: ChainAddresses = {
  84532: "0x7F1Ed7Dcb429ed1Adb93f5d56537c4bDaf54eD50",
  11155420: zeroAddress,
} as const;

// Addresses for the borrow assets
export const borrowAssetsAddress = {
  ETH: ethAddress,
  wrsETH: wrsETHAddress,
  weETH: weETHAddress,
  rsETH: rsETHAddress,
  wsuperOETHb: wsuperOETHAddress,
} as const;

// Addresses for the global contract
export const globalAddress = {
  84532: "0xDE5C0d41Bc70842086c83106b918CBA7CDdE8D70",
  11155420: "0x98015b7458825B7d463B29Ff38D66aA6eCcd1479",
} as const;

// Addresses for the mpo contract
export const mpoAddress = {
  84532: "0xAa506b51aD7834efAA120A9B17Fe071B08Cdca29",
  11155420: "0x099786b09C075F798de410b69a0E86B6A908593F",
} as const;

// Addresses for the borrow lib contract
export const borrowLibAddress = {
  84532: "0xCDEAc33b6C9E0f0470A2B2db83D115EE5A920516",
  11155420: "0xa1222aa38AAee1cc21491cC6bB18E3618471bf9f",
} as const;

// Addresses for the borrow lib contract
export const boltTokenAddress = {
  84532: "0xDDc9fcE09bf6d5310973bD3b24cF787Ee3Ef2bcB",
  11155420: "0x814BD144aeBF04a6cE6452438540125158ff9625",
} as const;
