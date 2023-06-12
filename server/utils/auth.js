const jwt = require("jsonwebtoken");

const secret = "secret";
const expiration = "1h";

module.exports = {
  authMiddleware: async function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
    console.log(token)
    //if no token found, request object as is
    if (!token) {
      console.log("No token provided");
    }

    //set user on request object with data taken from token
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      return data;
    } catch {
      console.log("Invalid token");
    }
  },

  //create payload containing user data and signs payload with a secret key and expiration
  signToken: function ({ name, email, _id }) {
    const payload = { name, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
