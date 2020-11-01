const reqWrapper = callback => async (req, res, next) => {
  try {
    return await callback(req, res);
  } catch (err) {
    return next(err);
  }
};

class NotFoundError extends Error {
  constructor(entity, params, message) {
    super(message || `Couldn't find ${entity} with: ${JSON.stringify(params)}`);
    this.status = 404;
  }
}

module.exports = { reqWrapper, NotFoundError };
