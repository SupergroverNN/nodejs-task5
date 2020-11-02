const mongoose = require('mongoose');
const userService = require('./src/resources/users/user.service');

const connectToDb = (cb) => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const newUser = { name: 'admin', login: 'admin', password: 'admin' };

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    console.log('DB connected');
    await db.dropDatabase();
    await userService.add(newUser);
    cb();
  });
};

module.exports = {
  connectToDb,
};
