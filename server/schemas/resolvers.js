const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    //retrieves all users
    users: async () => {
      return User.find();
    },

    //retrieves a specific user
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },

    //retrieves user info by id from context
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to log in");
    },
  },

  Mutation: {
    
    //create new user with name,email,password and generates token
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, user };
    },

    //find user by email
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email");
      }

      //checks is password is correct
      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect password");
      }

      //generate toke for the user and returns user and token
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
