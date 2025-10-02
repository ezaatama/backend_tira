import { web } from './application/web.js';
import { logger } from './application/logging.js';

const PORT = 3000;
const HOST = '0.0.0.0';

web.listen(PORT, HOST, () => {
  logger.info(`Server running on http://${HOST}:${PORT}`);
});