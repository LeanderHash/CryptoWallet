export const NETWORK_CONFIG = {
  bitcoin: {
    mainnet: {
      name: 'Bitcoin Mainnet',
      addressPrefix: 0x00,
      wifPrefix: 0x80,
      bip44: 0,
      messagePrefix: '\x18Bitcoin Signed Message:\n'
    },
    testnet: {
      name: 'Bitcoin Testnet',
      addressPrefix: 0x6f,
      wifPrefix: 0xef,
      bip44: 1,
      messagePrefix: '\x18Bitcoin Signed Message:\n'
    }
  },
  ethereum: {
    mainnet: {
      name: 'Ethereum Mainnet',
      chainId: 1,
      bip44: 60,
      rpcUrl: 'https://mainnet.infura.io'
    },
    testnet: {
      name: 'Ethereum Sepolia',
      chainId: 11155111,
      bip44: 1,
      rpcUrl: 'https://sepolia.infura.io'
    }
  }
};

export type SupportedNetworks = keyof typeof NETWORK_CONFIG;
export type NetworkType = 'mainnet' | 'testnet';