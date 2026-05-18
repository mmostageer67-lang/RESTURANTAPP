
const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const error = new Error('Validation failed');
      error.statusCode = 400;
      error.status = 'fail';

      const fieldErrors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

    

      return next(error);
    }

    req.body = result.data;
    next();
  };
};

module.exports = { validate };
