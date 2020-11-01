const mongoose = require('mongoose');

const connectToDb = cb => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('DB connected');
    db.dropDatabase();
    cb();
  });
};

module.exports = {
  connectToDb
};
