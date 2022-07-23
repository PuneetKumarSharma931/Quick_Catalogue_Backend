const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true,
        minLength: [2, "The Name Should have atleast 2 characters!"],
        maxLength: [50, "The Name cannot have more then 40 characters!"]
    },

    Email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {

            if(!validator.isEmail(value))
                throw new Error("Please provide a valid email address!");
        }
    },

    Password: {
        type: String,
        required: true,
        minLength: [2, "The Password Should atleast have 2 characters!"],
        maxLength: [14, "The Password cannot have more then 14 characters!"]
    },

    Created: {
        type: Date,
        required: true,
        default: Date.now
    }

});

userSchema.pre('save', async function(next) {

    try {

        this.Password = await bcrypt.hash(this.Password, 12);

        next();
    }
    catch(err) {

        throw new Error("Something Went Wrong While Saving User's Data!");
    }
});

const user = new mongoose.model('user', userSchema);

module.exports = user;

