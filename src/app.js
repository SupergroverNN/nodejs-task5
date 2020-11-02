const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const { checkToken } = require('./common/tokenUtils');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

const morgan = require('morgan');
const fs = require('fs');
const { errorHandler } = require('./errors/errorsHandler');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
morgan.token('body', (req) => JSON.stringify(req.body));
morgan.token('query', (req) => JSON.stringify(req.query));
app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]',
    { stream: accessLogStream }
  )
); // to file
app.use(morgan(':method :url :status body - :body ; query - :query')); // to console

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

process.on('uncaughtException', (err) => {
  console.error(`Caught exception: ${err.message}`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection! ', reason.message);
});

app.use(errorHandler);

app.use('/login', loginRouter);
app.use('/users', checkToken, userRouter);
app.use('/boards', checkToken, boardRouter);
app.use(
  '/boards/:id/tasks',
  checkToken,
  (req, _res, next) => {
    req.boardId = req.params.id;
    next();
  },
  taskRouter
);

module.exports = app;
