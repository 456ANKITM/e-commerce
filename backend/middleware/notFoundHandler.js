const notFoundHandler = (req, res, next) => {
  let err = new Error(`Cannot ${req.method} at ${req.url}`);
  err.status = 404;
  next(err);
};

export default notFoundHandler;
