import mongoose from "mongoose";
const {Schema,model}=mongoose;

const matchSchema= new Schema(
  {
    date: {
      type: String,
      required: true
    },
    teamHome: {
      type: String,
      required: true
    },
    teamAway: {
      type: String,
      required: true
    },
    nbPlaces: {
      type: Number,
      required: true
    }
  }
);

export default model("Match",matchSchema);