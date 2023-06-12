const { AuthenticationError } = require("apollo-server-express");
const { User, Task } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to log in");
    },
    tasks: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        return Task.find({ _id: { $in: user.tasks } });
      }
      // Allow testing without authentication
      // Remove this block if authentication is required
      const tasks = await Task.find();
      return tasks;
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      console.log(args);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect password");
      }

      console.log(email, password);

      const token = signToken(user);
      return { token, user };
    }
  }
};

module.exports = resolvers;
