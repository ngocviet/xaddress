export enum XAddressType {
  ScriptPubKey
}

/**
 * Get the address xtype from type value
 * @param {number} xtype The address type byte value
 * @returns {XAddressType} The address type
 */
export function _getAddressType(xtype: number): XAddressType {
  switch (xtype) {
  case 0:
    return XAddressType.ScriptPubKey;
  default:
    throw new Error('Unknown address xtype');
  }
}

/**
 * Get the address type number
 * @param {XAddressType} type The address xtype
 * @returns The number represent address xtype
 */
export function _getAddressXTypeNumber(xtype: XAddressType): number {
  switch (xtype) {
  case XAddressType.ScriptPubKey:
    return 0;
  default:
    throw new Error('Unknown address xtype');
  }
}