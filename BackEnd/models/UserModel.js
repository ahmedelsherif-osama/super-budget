const mongoose = require('mongoose');

// Schema
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
            required: false
        },
        avatar: {
            type: String,
            required: false
        },
        dateCreated: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
);



// Model
const UserModel = mongoose.model('users', UserSchema);

// Export the model
module.exports = UserModel;