export enum XAddressType {
  ScriptPubKey
}

/**
 * Get the address type from type value
 * @param {number} type The address type byte value
 * @returns {XAddressType} The address type
 */
export function _getAddressType(type: number): XAddressType {
  switch (type) {
    case 0:
      return XAddressType.ScriptPubKey;
    default:
      throw new Error('Unknown address type');
  }
}

/**
 * Get the address type number
 * @param {XAddressType} type The address type
 * @returns The number represent address type
 */
export function _getAddressTypeNumber(type: XAddressType): number {
  switch (type) {
    case XAddressType.ScriptPubKey:
      return 0;
    default:
      throw new Error('Unknown address type');
  }
}