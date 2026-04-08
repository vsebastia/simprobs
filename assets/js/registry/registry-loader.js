import { METHOD_REGISTRY } from './method-registry.js';

export function getMethodDefinition(methodId) {
  const method = METHOD_REGISTRY.methods.find((item) => item.id === methodId);
  if (!method) {
    throw new Error(`Método no encontrado: ${methodId}`);
  }
  return method;
}

export function listMethodsByFamily(family) {
  return METHOD_REGISTRY.methods.filter((item) => item.family === family);
}

export async function executeMethod(methodId, payload) {
  const method = getMethodDefinition(methodId);
  const modulePath = `../${method.engine.module}`;
  const loadedModule = await import(modulePath);
  const computeFn = loadedModule[method.engine.export];

  if (typeof computeFn !== 'function') {
    throw new Error(`Export no válido para ${methodId}: ${method.engine.export}`);
  }

  return computeFn(payload);
}
