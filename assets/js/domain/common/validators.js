export function ensureFiniteNumber(value, name) {
  if (!Number.isFinite(value)) {
    throw new Error(`${name} debe ser un número finito`);
  }
}

export function ensureBetweenExclusive(value, name, min, max) {
  ensureFiniteNumber(value, name);
  if (value <= min || value >= max) {
    throw new Error(`${name} debe estar entre ${min} y ${max} (sin incluir extremos)`);
  }
}

export function ensurePositive(value, name) {
  ensureFiniteNumber(value, name);
  if (value <= 0) {
    throw new Error(`${name} debe ser mayor que 0`);
  }
}

export function ensureMin(value, name, minValue) {
  ensureFiniteNumber(value, name);
  if (value < minValue) {
    throw new Error(`${name} debe ser mayor o igual que ${minValue}`);
  }
}

export function ensureInEnum(value, name, allowedValues) {
  if (!allowedValues.includes(value)) {
    throw new Error(`${name} debe ser uno de: ${allowedValues.join(', ')}`);
  }
}

export function ensureRequired(value, name) {
  if (value === undefined || value === null || value === '') {
    throw new Error(`${name} es obligatorio`);
  }
}
