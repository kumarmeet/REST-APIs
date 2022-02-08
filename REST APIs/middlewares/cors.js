function enableCors(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); //(*) means any page will be allowed to send req
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
}

module.exports = enableCors;
