export enum XAddressType {
  ScriptPubKey
}

/**
 * Get the address xType from type value
 * @param {number} xType The address type byte value
 * @returns {XAddressType} The address type
 */
export function _getAddressType(xType: number): XAddressType {
  switch (xType) {
  case 0:
    return XAddressType.ScriptPubKey;
  default:
    throw new Error('Unknown address xType');
  }
}

/**
 * Get the address type number
 * @param {XAddressType} type The address xType
 * @returns The number represent address xType
 */
export function _getAddressXTypeNumber(xType: XAddressType): number {
  switch (xType) {
  case XAddressType.ScriptPubKey:
    return 0;
  default:
    throw new Error('Unknown address xType');
  }
}