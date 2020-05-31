import BigNumber from 'bignumber.js';

/**
 * Convert 10.999 to 10999000
 * @param {number|string|BigNumber} rawAmt
 * @param {number} decimals
 * @returns {BigNumber}
 */
export function toBaseUnitBN(rawAmt, decimals) {
  const raw = new BigNumber(rawAmt);
  const base = new BigNumber(10);
  const decimalsBN = new BigNumber(decimals);
  return raw.times(base.pow(decimalsBN)).integerValue();
}