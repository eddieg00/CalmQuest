const jwt = require("jsonwebtoken");

const secret = "secret";
const expiration = "1h";

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop.trim();
    }

    //if no token found, request object as is
    if (!token) {
      return req;
    }

    //set user on request object with data taken from token
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("No good");
    }

    return req;
  },

  //create payload containing user data and signs payload with a secret key and expiration
  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
