import { installLegacyBridge } from '../ui/adapters/legacy-bridge.js';
import { METHOD_REGISTRY } from '../registry/method-registry.js';

function bootstrap() {
  installLegacyBridge(globalThis);
  globalThis.__METHOD_REGISTRY__ = METHOD_REGISTRY;
}

bootstrap();
