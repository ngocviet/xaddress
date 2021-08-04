import base58 from "bs58";
import { createHash } from "crypto";
import { BufferWriter } from "./encoding/BufferWriter";
import { NetworkType, _getNetworkByte, _getNetworkChar, _getNetworkType } from "./NetworkType";
import { validate } from "./Validation";
import { XAddressType, _getAddressType, _getAddressTypeNumber } from "./XAddressType";



const TOKEN_NAME = 'lotus';

/**
 * Represent an address in xaddress format. <br />
 * Encoding and decoding the xaddress format for Lotus. <br />
 * Compliant with the xaddress specification:
 * {@link https://givelotus.org/docs/specs/lotus/addresses}
 */
export class XAddress {

  type: XAddressType;
  network: NetworkType;
  payload: Buffer;
  prefix: string;
  constructor(type: XAddressType = XAddressType.ScriptPubKey, network: NetworkType, payload: Buffer, prefix: string = TOKEN_NAME) {
    this.type = type;
    this.network = network;
    this.payload = payload;
    this.prefix = prefix;
  }

  toString() {
    return XAddress.encode(this);
  }

  /**
   * Decode the address string to xaddress object
   * @param {string} address Address to decode. E.g.: 'lotus_16PSJKKkyNhuwZxWRJZK9jxrcAe4abvUM9K1QyWtw'.
   * @return {XAddress} The xaddress object
   */
  static decode(address: string): XAddress {
    const match = /[A-Z]|_/.exec(address);
    const splitLocation = match ? match.index : 0;

    const prefix: string = address.substring(0, splitLocation);
    const networkChar: string = address.substring(splitLocation, splitLocation + 1);

    const encodedPayload: string = address.substring(splitLocation + 1);
    const decodedBytes: Buffer = Buffer.from(base58.decode(encodedPayload));

    const typeByte: Buffer = decodedBytes.slice(0, 1);

    const payload = decodedBytes.slice(1, decodedBytes.length - 4);
    const decodedChecksum = decodedBytes.slice(decodedBytes.length - 4);

    const xaddress: XAddress = new XAddress(
      _getAddressType(typeByte[0]),
      _getNetworkType(networkChar),
      payload,
      prefix
    );

    const checksum = this.createChecksum(xaddress);
    const checksumLegacy = this.createChecksumLegacy(xaddress);

    validate(
      (checksum.toString('hex') === decodedChecksum.toString('hex') ||
        checksumLegacy.toString('hex') === decodedChecksum.toString('hex')),
      'Invalid checksum: ' + address
    );

    return xaddress;
  }

  /**
   * Encode the xaddress object to the string format
   * @param {XAddress} xaddress The xaddress object input
   * @returns {string} The address for xaddress in string format
   */
  static encode(xaddress: XAddress): string {
    const networkChar = _getNetworkChar(xaddress.network);
    const addressTypeNumber = _getAddressTypeNumber(xaddress.type);
    const payload = xaddress.payload;
    const checksum = XAddress.createChecksum(xaddress);
    const encodedPayload = XAddress.encodePayload(addressTypeNumber, payload, checksum);
    return xaddress.prefix + networkChar + encodedPayload;
  }

  static encodePayload(addressTypeNumber: number, payload: Buffer, checksum: Buffer) {
    const bw = new BufferWriter();
    bw.writeUInt8(addressTypeNumber);
    bw.write(payload);
    bw.write(checksum);
    const buf = bw.concat();
    return base58.encode(buf);
  }

  /**
   * Calculate the checksum for the xaddress
   * @param {XAddress} address The xaddress object
   * @returns {Buffer} The checksum (4 bytes)
   */
  private static createChecksum(address: XAddress): Buffer {
    const addressTypeBuf = Buffer.alloc(1);
    addressTypeBuf.writeUInt8(_getAddressTypeNumber(address.type));
    const networkTypeBuf = Buffer.alloc(1);
    networkTypeBuf.writeUInt8(_getNetworkByte(address.network));
    const bufArr: Buffer[] = [
      Buffer.from(address.prefix),
      networkTypeBuf,
      addressTypeBuf,
      address.payload
    ];
    const data: Buffer = Buffer.concat(bufArr);
    const buf = createHash('sha256').update(data).digest();
    return buf.slice(0, 4);
  }

  /**
   * Calculate the checksum in legacy format for the xaddress
   * @param {XAddress} address The xaddress object
   * @returns {Buffer} The checksum (4 bytes)
   */
  private static createChecksumLegacy(address: XAddress) {
    const bw = new BufferWriter();
    bw.writeVarintNum(address.prefix.length);
    bw.write(Buffer.from(address.prefix));
    bw.writeUInt8(_getNetworkByte(address.network));
    bw.writeUInt8(_getAddressTypeNumber(address.type));
    bw.writeVarintNum(address.payload.length);
    bw.write(address.payload);
    const buf = bw.concat();
    return createHash('sha256').update(buf).digest().slice(0, 4);
  }
}