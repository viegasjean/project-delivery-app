const minName = 12;
const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
const minPass = 6;
const okCode = 200;
const notFound = 404;
const badReq = 400;
const internalErr = 500;
const created = 201;

module.exports = {
  minName,
  emailRegex,
  minPass,
  okCode,
  notFound,
  badReq,
  internalErr,
  created,
};
