const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: 'Please enter a valid email address'
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
                //or  ref: 'thought',?
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: this,
                // ref: 'User',?
            },
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;