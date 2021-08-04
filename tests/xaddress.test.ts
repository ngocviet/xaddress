import "ts-jest";
import { XAddress, NetworkType, XAddressType } from '../src';

describe('XAddress', () => {

  const TEST_HASHES_P2PKH = [
    // 25 bytes include opcode
    new Uint8Array([118, 169, 20, 118, 160, 64, 83, 189, 160, 168, 139, 218, 81, 119, 184, 106, 21, 195, 178, 159, 85, 152, 115, 136, 172]),
    new Uint8Array([118, 169, 20, 203, 72, 18, 50, 41, 156, 213, 116, 49, 81, 172, 75, 45, 99, 174, 25, 142, 123, 176, 169, 136, 172]),
  ];

  const TEST_HASHES_P2SH = [
    // 23 bytes include opcode
    new Uint8Array([169, 20, 118, 160, 64, 83, 189, 160, 168, 139, 218, 81, 119, 184, 106, 21, 195, 178, 159, 85, 152, 115, 135]),
  ];

  const EXPECTED_P2PKH_OUTPUTS = [
    'lotus_16PSJLk9W86KAZp26x3uM176w6N9vUU8YNQQnQTHN',
    'lotus_16PSJPLVnkMvbURPjfPGZqdrUhzwYJSAxJiXVcfKs'
  ];

  const EXPECTED_P2SH_OUTPUTS = [
    'lotus_1PrQz5R11Ae1YcbvUpGDSvzPP2GsVw6E7mthMV'
  ];

  test("XAddress P2PKH", (): void => {
    for (const index in TEST_HASHES_P2PKH) {
      const x = new XAddress(XAddressType.ScriptPubKey, NetworkType.MAIN, Buffer.from(TEST_HASHES_P2PKH[index]), 'lotus');
      expect(x.toString()).toEqual(EXPECTED_P2PKH_OUTPUTS[index]);
    }
  });

  test("XAddress P2SH", (): void => {
    for (const index in TEST_HASHES_P2SH) {
      const x = new XAddress(XAddressType.ScriptPubKey, NetworkType.MAIN, Buffer.from(TEST_HASHES_P2SH[index]), 'lotus');
      expect(x.toString()).toEqual(EXPECTED_P2SH_OUTPUTS[index]);
    }
  });
})