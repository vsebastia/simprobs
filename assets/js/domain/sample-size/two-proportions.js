import { ensureBetweenExclusive, ensurePositive } from '../common/validators.js';
import { standardNormalQuantile } from '../common/stats-core.js';

export function computeTwoProportionsSampleSize(input) {
  const p1 = Number(input.p1);
  const p2 = Number(input.p2);
  const alpha = Number(input.alpha);
  const power = Number(input.power);
  const k = input.k === undefined ? 1 : Number(input.k);

  ensureBetweenExclusive(p1, 'p1', 0, 1);
  ensureBetweenExclusive(p2, 'p2', 0, 1);
  ensureBetweenExclusive(alpha, 'α', 0, 1);
  ensureBetweenExclusive(power, 'potencia', 0, 1);
  ensurePositive(k, 'k');

  const diff = Math.abs(p1 - p2);
  ensurePositive(diff, '|p1 - p2|');

  const zAlpha = standardNormalQuantile(1 - alpha / 2);
  const zBeta = standardNormalQuantile(power);
  const pBar = (p1 + k * p2) / (1 + k);

  const term1 = zAlpha * Math.sqrt((1 + 1 / k) * pBar * (1 - pBar));
  const term2 = zBeta * Math.sqrt((p1 * (1 - p1)) + ((p2 * (1 - p2)) / k));

  const n1 = Math.ceil(Math.pow(term1 + term2, 2) / Math.pow(diff, 2));
  const n2 = Math.ceil(k * n1);

  return {
    n1,
    n2,
    nTotal: n1 + n2,
    diff,
    pBar,
    zAlpha,
    zBeta,
    assumptions: ['Comparación de dos grupos independientes', 'Aproximación normal']
  };
}
