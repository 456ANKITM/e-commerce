const errorHandler = (error, req, res, next) => {
  let statusCode = error.status || 500;
  let msg = error.message || "Internal Sever Error";
  res.status(statusCode).send({ error: msg });
  
};

export default errorHandler;
