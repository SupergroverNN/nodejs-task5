const { PORT } = require('./common/config');
const app = require('./app');
const { connectToDb } = require('./../Database');

connectToDb(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
