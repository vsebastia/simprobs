import { ensureBetweenExclusive } from '../common/validators.js';
import { standardNormalQuantile } from '../common/stats-core.js';

export function computeOneProportionSampleSize(input) {
  const p = Number(input.p);
  const e = Number(input.e);
  const confidence = Number(input.confidence);

  ensureBetweenExclusive(p, 'p', 0, 1);
  ensureBetweenExclusive(e, 'E', 0, 1);
  ensureBetweenExclusive(confidence, 'nivel de confianza', 0, 1);

  const alpha = 1 - confidence;
  const z = standardNormalQuantile(1 - alpha / 2);
  const n = Math.ceil((Math.pow(z, 2) * p * (1 - p)) / Math.pow(e, 2));

  return {
    n,
    alpha,
    z,
    assumptions: ['Muestreo aleatorio', 'Aproximación normal']
  };
}
