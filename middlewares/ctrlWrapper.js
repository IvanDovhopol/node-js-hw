const ctrlWrapper = ctrl => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      if (error.kind === 'ObjectId') {
        error.status = 404;
        error.message = 'Contact not found';
      }

      next(error);
    }
  };
};

module.exports = ctrlWrapper;
