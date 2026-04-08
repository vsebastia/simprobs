import { ensureBetweenExclusive, ensurePositive } from '../common/validators.js';
import { standardNormalQuantile } from '../common/stats-core.js';

export function computeOneMeanSampleSize(input) {
  const sigma = Number(input.sigma);
  const e = Number(input.e);
  const confidence = Number(input.confidence);

  ensurePositive(sigma, 'σ');
  ensurePositive(e, 'E');
  ensureBetweenExclusive(confidence, 'nivel de confianza', 0, 1);

  const alpha = 1 - confidence;
  const z = standardNormalQuantile(1 - alpha / 2);
  const n = Math.ceil(Math.pow((z * sigma) / e, 2));

  return {
    n,
    alpha,
    z,
    assumptions: ['Variable continua', 'σ conocida o aproximada']
  };
}
