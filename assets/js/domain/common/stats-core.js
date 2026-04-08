import { ensureFiniteNumber } from './validators.js';

function getJStat() {
  const instance = globalThis.jStat;
  if (!instance) {
    throw new Error('jStat no está disponible en el contexto global');
  }
  return instance;
}

export function standardNormalQuantile(probability) {
  ensureFiniteNumber(probability, 'probabilidad');
  return getJStat().normal.inv(probability, 0, 1);
}

export function distributionPdf(distribution, x, p1, p2) {
  const jStat = getJStat();
  switch (distribution) {
    case 'normal': return jStat.normal.pdf(x, p1, p2);
    case 'binomial': return jStat.binomial.pdf(x, p1, p2);
    case 'poisson': return jStat.poisson.pdf(x, p1);
    case 'studentt': return jStat.studentt.pdf(x, p1);
    case 'chisquare': return jStat.chisquare.pdf(x, p1);
    case 'centralf': return jStat.centralF.pdf(x, p1, p2);
    case 'exponential': return jStat.exponential.pdf(x, p1);
    case 'negbin': return jStat.negbin.pdf(x, p1, p2);
    case 'geometric': return geometricPmf(x, p1);
    default:
      throw new Error(`Distribución no soportada: ${distribution}`);
  }
}

export function distributionCdf(distribution, x, p1, p2) {
  const jStat = getJStat();
  switch (distribution) {
    case 'normal': return jStat.normal.cdf(x, p1, p2);
    case 'binomial': return jStat.binomial.cdf(x, p1, p2);
    case 'poisson': return jStat.poisson.cdf(x, p1);
    case 'studentt': return jStat.studentt.cdf(x, p1);
    case 'chisquare': return jStat.chisquare.cdf(x, p1);
    case 'centralf': return jStat.centralF.cdf(x, p1, p2);
    case 'exponential': return jStat.exponential.cdf(x, p1);
    case 'negbin': return jStat.negbin.cdf(x, p1, p2);
    case 'geometric': return geometricCdf(x, p1);
    default:
      throw new Error(`Distribución no soportada: ${distribution}`);
  }
}

export function distributionQuantile(distribution, probability, p1, p2) {
  const jStat = getJStat();
  switch (distribution) {
    case 'normal': return jStat.normal.inv(probability, p1, p2);
    case 'binomial': return jStat.binomial.inv(probability, p1, p2);
    case 'poisson': return jStat.poisson.inv(probability, p1);
    case 'studentt': return jStat.studentt.inv(probability, p1);
    case 'chisquare': return jStat.chisquare.inv(probability, p1);
    case 'centralf': return jStat.centralF.inv(probability, p1, p2);
    case 'exponential': return jStat.exponential.inv(probability, p1);
    case 'negbin': return jStat.negbin.inv(probability, p1, p2);
    case 'geometric': return geometricInv(probability, p1);
    default:
      throw new Error(`Distribución no soportada: ${distribution}`);
  }
}

export function geometricPmf(x, probability) {
  if (x < 1 || !Number.isInteger(x)) {
    return 0;
  }
  return Math.pow(1 - probability, x - 1) * probability;
}

export function geometricCdf(x, probability) {
  if (x < 1) {
    return 0;
  }
  const floorX = Math.floor(x);
  return 1 - Math.pow(1 - probability, floorX);
}

export function geometricInv(probability, successProbability) {
  if (probability <= 0) {
    return 1;
  }
  if (probability >= 1) {
    return Number.POSITIVE_INFINITY;
  }
  const value = Math.log(1 - probability) / Math.log(1 - successProbability);
  return Math.ceil(value);
}

export function isDiscreteDistribution(distribution) {
  return ['binomial', 'poisson', 'negbin', 'geometric'].includes(distribution);
}
