export enum NetworkType {
  MAIN, 
  TEST, 
  REGTEST, 
  SCALINGTEST
}

/**
 * Get the network type from the network string
 * @param {string} network The network split string
 * @returns {NetworkType} The type of network
 */
export function _getNetworkType(network: string): NetworkType {
  switch (network) {
  case '_':
    return NetworkType.MAIN;
  case 'T':
    return NetworkType.TEST;
  case 'R':
    return NetworkType.REGTEST;
  default:
    throw new Error('Unknown network type');
  }
}

/**
 * Get the network type number
 * @param {NetworkType} networkType The network type
 * @returns The number represent network byte
 */
export function _getNetworkByte(networkType: NetworkType): number {
  return _getNetworkChar(networkType).charCodeAt(0);
}

/**
 * Get the network type string
 * @param {NetworkType} networkType The network type
 * @returns The string represent network byte
 */
export function _getNetworkChar(networkType: NetworkType): string {
  switch (networkType) {
  case NetworkType.MAIN:
    return '_';
  case NetworkType.TEST:
    return 'T';
  case NetworkType.REGTEST:
    return 'R';
  default:
    throw new Error('Unknown network type');
  }
}