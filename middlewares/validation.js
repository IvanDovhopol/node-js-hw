const validation = schema => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      // error.message = 'missing field favorite';
      next(error);
    }
    next();
  };
};

module.exports = validation;
