const mongoose = require('mongoose'); //
const validator = require('validator'); //

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      // required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lovercase: true,

      validate(value) {
        if (!validator.isEmail(value)) {
          console.log(`Invalid email address!`)
          throw new Error(`Invalid email address!`)

        }
      }
    },
    password: {
      type: String,
      // required: true,
      trim: true,
      validate(value) {
        if (!validator.isLength(value, {min: 6})) {
          throw new Error(`password must be 6 or more characters`)
        }

        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain "password"')
        }
      }
    },
    phone: {
      type: String,
      trim: true
    },
    location: {
      city: {
        type: String,
        trim: true
      },
      address: {
        type: String,
        trim: true
      }
    },
    socials: {
      facebook: {
        type: String,
        trim: true,

        validate(value) {
          if (!validator.isURL(value)) {
            console.log(`Invalid link address!`)
            throw new Error(`You must add a link!`)
          }
        }
      },
      linkedIn: {
        type: String,
        trim: true,
        validate(value) {
          if (!value.length>0&&!validator.isURL(value)) {
            throw new Error(`You must add a link!`)
          }
        }
      },
      twitter: {
        type: String,
        trim: true,
        validate(value) {
          if (!validator.isURL(value)) {
            throw new Error(`You must add a link!`)
          }
        }
      },

    }
  }
)

const User = mongoose.model('User', userSchema);

module.exports = User;