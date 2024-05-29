const jwt = require("jsonwebtoken");
const secret = "adityasingh";

function SetUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
}
function GetUser(token) {
  if (!token) return null;
  
  return jwt.verify(token, secret);
}
module.exports = {
  SetUser,
  GetUser,
};
