const { AuthenticationError } = require("apollo-server-express");
const User = require("../models/user");
const { signToken } = require("../utils/auth");
const Task = require("../models/task");

const resolvers = {
  Query: {
    //retrieves all users
    users: async () => {
      return User.find();
    },

/*     //retrieves a specific user
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    }, */

    //retrieves user info by id from context
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to log in");
    },

    //easier on frontend to filter out tasks
    /* randomTask: async (parent, args, context) => {
      if (context.user) {
        //first checks if an authenticated user and finds user based off of context
        const user = await User.findOne({ _id: context.user._id });
        //finds all tasks that have not been completed
        const tasks = await Task.find({ completed: false });
        //randomizes tasks
        const random = Math.floor(Math.random() * tasks.length);
        const ranTask = tasks[random];
        
        //push random task into array
        //create an empty array
        //add for loop to return

        await user.save();
        return ranTask;
      }
      throw new AuthenticationError("You need to log in");
    },
     */
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
      const correctPassword = await user.comparePasswords(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect password");
      }

      //generate toke for the user and returns user and token
      const token = signToken(user);
      return { token, user };
    },

/*     completeTask: async (parent, { taskId }, context) => {
        if (context.user) {
            
            //find user based off of authenticated id
            const user = await User.findOneAndUpdate({ _id: context.user.id })
            
            //checks to make sure task is in user's array
            const task = user.tasks.indexOf(taskId);

            //if task is not found then throw error
            if (task === -1 ) {
                throw new Error("No tasks found")
            }

            //removes from user array
            user.tasks.splice(task, 1);

            //adds count to user completed tasks
            user.findByIdAndUpdate += 1;

            //if user has completed all the tasks then sets them all back to false
            if (user.tasks.length === 0 ) {
                await Task.updateMany({}, { completed: false });
            }

            //saves updated user
            await user.save();

            //find task by id and mark comleted
            const updatedTask = await Task.findOneAndUpdate(
                { _id: taskId },
                { completed: true }
            );
            return updatedTask;
        };
    } */
  },
};

module.exports = resolvers;
