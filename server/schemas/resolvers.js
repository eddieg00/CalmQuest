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

    saveTask: async (_, { userId, taskId }) => {
      try {
        // Find the user by ID
        const user = await User.findById(userId);

        // Find the task by ID
        //const task = await Task.findById(taskId);

        // Update the user's tasks array with the new task
        user.tasks.push(taskId);

        // Increment the completedTasks count
        user.completedTasks += 1;

        // Save the updated user document
        const savedUser = await user.save();

        return savedUser;
      } catch (error) {
        console.error('Error saving task:', error);
        throw new Error('Failed to save task');
      }
    }

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

    /* completeTask: async (parent, { taskId }, context) => {
      if (context.user) {
        try {
          // finds the user based on the authenticated id
          const user = await User.findOne({ _id: context.user._id });
          
          // checks if the task exists
          const taskIndex = user.tasks.findIndex((task) => task._id.toString() === taskId);
          if (taskIndex === -1) {
            throw new Error("Task not found for the user");
          }
    
          // marks task as complete
          user.tasks[taskIndex].completed = true;
    
          // increment completed task count
          user.completedTasks++;
    
          // checks if all tasks are complete
          const allTasksCompleted = user.tasks.every((task) => task.completed);
          if (allTasksCompleted) {
            // RESETS all tasks completed status to false
            await Task.updateMany({ _id: { $in: user.tasks.map((task) => task._id) } }, { completed: false });
          }
    
          await user.save();
    
          // Find the updated task
          const updatedTask = await Task.findById(taskId);
          return updatedTask;
        } catch (error) {
          throw new Error("Failed to complete the task");
        }
      }
      throw new AuthenticationError("You need to log in");
    } */
    
  },
};

module.exports = resolvers;
