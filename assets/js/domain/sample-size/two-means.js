import { ensureBetweenExclusive, ensurePositive } from '../common/validators.js';
import { standardNormalQuantile } from '../common/stats-core.js';

export function computeTwoMeansSampleSize(input) {
  const sigma1 = Number(input.sigma1);
  const sigma2 = Number(input.sigma2);
  const delta = Number(input.delta);
  const alpha = Number(input.alpha);
  const power = Number(input.power);
  const k = input.k === undefined ? 1 : Number(input.k);

  ensurePositive(sigma1, 'σ1');
  ensurePositive(sigma2, 'σ2');
  ensurePositive(delta, 'Δ');
  ensureBetweenExclusive(alpha, 'α', 0, 1);
  ensureBetweenExclusive(power, 'potencia', 0, 1);
  ensurePositive(k, 'k');

  const zAlpha = standardNormalQuantile(1 - alpha / 2);
  const zBeta = standardNormalQuantile(power);

  const n1 = Math.ceil((Math.pow(zAlpha + zBeta, 2) * (Math.pow(sigma1, 2) + (Math.pow(sigma2, 2) / k))) / Math.pow(delta, 2));
  const n2 = Math.ceil(k * n1);

  return {
    n1,
    n2,
    nTotal: n1 + n2,
    zAlpha,
    zBeta,
    assumptions: ['Comparación de medias independientes', 'Aproximación normal para el diseño']
  };
}
