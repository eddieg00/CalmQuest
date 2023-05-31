const {Schema, model} = require ("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
});

userSchema.pre("save", async function (next) {
   if (this.isNew || this.isModified("password")) {
    const salt = 10;
    this.password = await bcrypt.hash(this.password, salt)
   }

   next();
});

userSchema.methods.comparePasswords = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;