exports.logMiddleware = (req, res, next) => {
  // console.log(req.method, req.url);
  console.log(Date.now(), req.method, req.url);
  next();
};
