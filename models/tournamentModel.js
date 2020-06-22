const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')

const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: ["true", "a tornamnent must have a name"],
      trim: true,
      maxlength: 50,
    },
    gameCategory:{
        type:String,
        required:['true','a tournament must have a gameCategory']
    },
    duration: {
      type: Number,
      required: ["true", "a tournament must have duraton"]
    },
    tournamentVenue:{
        city:{
            type:String,
            required:['true','a must have venue City']
        },
        state:String,
        address:{
            type:String,
            required:['true']
        },
        pinCode:Number
    },

   
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a max number of player size"]
    },
    minGroupSize: {
      type: Number,
      required: [true, "A tour must have a minimum number of group size"]
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either: easy, medium, difficult"
      }
    },
    rewardPrice: {
      type: Number,
      required: [true, "A tour must have a reward price"]
    },
    entryFee: {
      type: Number,
      validate: {
        validator: function(val) {
          // this only points to current doc on NEW document creation
          return val <= 0;
        },
        message: "enty fee must be greater thaan 0"
      }
    },
    description: {
      type: String,
      trim: true,
      required: [true, "A tour must have a description"]
    },
    imageCover: {
      type: String,
      //required: [true, "A tour must have a cover image"]
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now()
     
    },
    startDate: {
        type:Date,
        required:['true','tournament mst have a start date']
    },
    bookingDeadline:{
        type:Date,
        required:['true','a Tournament must have boking deadline']
    }

  },
  //second argument optional
  {
    toJSON: { virtual: true },
    toObject: { virtual: true }
  }
);
tournamentSchema.plugin(uniqueValidator)
//virtual properties
tournamentSchema.virtual("durationWeeks",()=> {
  return this.duration / 7;
});

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;
