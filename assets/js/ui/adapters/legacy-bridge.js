import { executeMethod } from '../../registry/registry-loader.js';

function mapLegacySampleSizeInput(type, payload) {
  if (type === 'oneprop') {
    return {
      methodId: 'sample_size.one_proportion',
      data: {
        p: Number(payload.p),
        e: Number(payload.e),
        confidence: Number(payload.confidence)
      }
    };
  }

  if (type === 'twoprop') {
    return {
      methodId: 'sample_size.two_proportions',
      data: {
        p1: Number(payload.p1),
        p2: Number(payload.p2),
        alpha: Number(payload.alpha),
        power: Number(payload.power),
        k: payload.k === undefined ? 1 : Number(payload.k)
      }
    };
  }

  if (type === 'onemean') {
    return {
      methodId: 'sample_size.one_mean',
      data: {
        sigma: Number(payload.sigma),
        e: Number(payload.e),
        confidence: Number(payload.confidence)
      }
    };
  }

  if (type === 'twomean') {
    return {
      methodId: 'sample_size.two_means',
      data: {
        sigma1: Number(payload.sigma1),
        sigma2: Number(payload.sigma2),
        delta: Number(payload.delta),
        alpha: Number(payload.alpha),
        power: Number(payload.power),
        k: payload.k === undefined ? 1 : Number(payload.k)
      }
    };
  }

  throw new Error(`Tipo de cálculo legacy no soportado: ${type}`);
}

export function installLegacyBridge(target = globalThis) {
  target.registryApi = {
    executeMethod,
    async calculateDistribution(payload) {
      return executeMethod('distribution.general', payload);
    },
    async calculateSampleSize(type, payload) {
      const mapped = mapLegacySampleSizeInput(type, payload);
      return executeMethod(mapped.methodId, mapped.data);
    }
  };
}
