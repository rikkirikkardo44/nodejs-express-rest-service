const { PORT } = require('./common/config');
const app = require('./app');
const connectToDb = require('./db/db.client');
const logger = require('./common/logger');

connectToDb(() => {
  app.listen(PORT, () =>
    logger.silly(`App is running on http://localhost:${PORT}`)
  );
});
