export function isBuffer(arg: any) {
  return Buffer.isBuffer(arg) || arg instanceof Uint8Array;
}

export function reverse(arg: any) {
  return (Buffer.from(arg)).reverse();
}