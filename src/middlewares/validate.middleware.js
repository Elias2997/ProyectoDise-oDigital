export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query
    });
    // Attach parsed if needed
    req.validated = parsed;
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Validation error', errors: err.errors });
  }
};
