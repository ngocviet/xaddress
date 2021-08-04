import { isBuffer, reverse } from "../utils/buffer";
import assert from 'assert';

export class BufferWriter {

  bufLen: number;
  bufs: Buffer[];

  constructor() {
    this.bufLen = 0;
    this.bufs = [];
  }

  toBuffer() {
    return this.concat();
  }

  concat() {
    return Buffer.concat(this.bufs, this.bufLen);
  }

  write(buf: Buffer) {
    assert(isBuffer(buf));
    this.bufs.push(buf);
    this.bufLen += buf.length;
    return this;
  }

  writeReverse(buf: Buffer) {
    assert(isBuffer(buf));
    this.bufs.push(reverse(buf));
    this.bufLen += buf.length;
    return this;
  }

  writeUInt8(n: number) {
    const buf = Buffer.alloc(1);
    buf.writeUInt8(n, 0);
    this.write(buf);
    return this;
  }

  writeVarintNum(n: number) {
    let buf = this.varintBufNum(n);
    this.write(buf);
    return this;
  }

  varintBufNum(n: number) {
    let buf = undefined;
    if (n < 253) {
      buf = Buffer.alloc(1);
      buf.writeUInt8(n, 0);
    } else if (n < 0x10000) {
      buf = Buffer.alloc(1 + 2);
      buf.writeUInt8(253, 0);
      buf.writeUInt16LE(n, 1);
    } else if (n < 0x100000000) {
      buf = Buffer.alloc(1 + 4);
      buf.writeUInt8(254, 0);
      buf.writeUInt32LE(n, 1);
    } else {
      buf = Buffer.alloc(1 + 8);
      buf.writeUInt8(255, 0);
      buf.writeInt32LE(n & -1, 1);
      buf.writeUInt32LE(Math.floor(n / 0x100000000), 5);
    }
    return buf;
  }
}