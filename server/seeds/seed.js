const db = require('../config/connection')
const User = require('../models/user');
const Task = require('../models/task');
const userData = require('./user.json');
const taskData = require('./task.json');

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Task.deleteMany({});

        await User.create(userData);
        await Task.create(taskData);
        
        console.log('all good!');
        process.exit(0);
    } catch (err) {
        throw err;
    }
});