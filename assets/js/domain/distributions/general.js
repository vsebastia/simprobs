import {
  ensureBetweenExclusive,
  ensureFiniteNumber,
  ensureInEnum,
  ensureRequired
} from '../common/validators.js';
import {
  distributionCdf,
  distributionPdf,
  distributionQuantile,
  isDiscreteDistribution
} from '../common/stats-core.js';

const ALLOWED_DISTRIBUTIONS = [
  'normal',
  'binomial',
  'poisson',
  'studentt',
  'chisquare',
  'centralf',
  'exponential',
  'negbin',
  'geometric'
];

const ALLOWED_CALCULATIONS = ['pdf', 'cdf', 'quantile'];
const ALLOWED_CDF_MODES = ['left', 'right', 'interval'];

export function computeDistributionGeneral(input) {
  const {
    distribution,
    calculation,
    cdfMode = 'left',
    x,
    b,
    probability,
    params = {}
  } = input;

  ensureRequired(distribution, 'distribution');
  ensureRequired(calculation, 'calculation');
  ensureInEnum(distribution, 'distribution', ALLOWED_DISTRIBUTIONS);
  ensureInEnum(calculation, 'calculation', ALLOWED_CALCULATIONS);

  const p1 = Number(params.p1);
  const p2 = params.p2 === undefined ? undefined : Number(params.p2);

  if (calculation === 'pdf') {
    ensureFiniteNumber(Number(x), 'x');
    const xValue = Number(x);

    return {
      mode: 'pdf',
      value: distributionPdf(distribution, xValue, p1, p2),
      label: `f(${xValue})`,
      meta: { distribution, calculation, isDiscrete: isDiscreteDistribution(distribution) }
    };
  }

  if (calculation === 'quantile') {
    ensureBetweenExclusive(Number(probability), 'probabilidad', 0, 1);
    const pValue = Number(probability);

    return {
      mode: 'quantile',
      value: distributionQuantile(distribution, pValue, p1, p2),
      label: `Q(${pValue})`,
      meta: { distribution, calculation, isDiscrete: isDiscreteDistribution(distribution) }
    };
  }

  ensureInEnum(cdfMode, 'cdfMode', ALLOWED_CDF_MODES);
  ensureFiniteNumber(Number(x), 'x');
  const xValue = Number(x);

  if (cdfMode === 'left') {
    return {
      mode: 'cdf',
      cdfMode,
      value: distributionCdf(distribution, xValue, p1, p2),
      label: `P(X ≤ ${xValue})`,
      meta: { distribution, calculation, isDiscrete: isDiscreteDistribution(distribution) }
    };
  }

  if (cdfMode === 'right') {
    const isDiscrete = isDiscreteDistribution(distribution);
    const rightValue = isDiscrete ? xValue - 1 : xValue;
    return {
      mode: 'cdf',
      cdfMode,
      value: 1 - distributionCdf(distribution, rightValue, p1, p2),
      label: `P(X ≥ ${xValue})`,
      meta: { distribution, calculation, isDiscrete }
    };
  }

  ensureFiniteNumber(Number(b), 'b');
  const bValue = Number(b);
  if (bValue < xValue) {
    throw new Error('El intervalo debe cumplir a ≤ b');
  }

  const isDiscrete = isDiscreteDistribution(distribution);
  const lowerValue = isDiscrete ? xValue - 1 : xValue;

  return {
    mode: 'cdf',
    cdfMode,
    value: distributionCdf(distribution, bValue, p1, p2) - distributionCdf(distribution, lowerValue, p1, p2),
    label: `P(${xValue} ≤ X ≤ ${bValue})`,
    meta: { distribution, calculation, isDiscrete }
  };
}
