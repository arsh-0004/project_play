import { model, Schema, type InferSchemaType } from "mongoose";

const courtSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    
  },
  description: {
    type: String,
    
  },
  selectGame: {
    type: String,
    enum: ["paddle", "pickleball"]
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive"
  }
});

const venueSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  description: String,

  address: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },
  

  state: {
    type: String,
    required: true
  },

  gameAvailable: [
    {
      type: String,
      enum: ["paddle", "pickleball"]
    }
  ],

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive"
  },

  timing: [
    {
      day: { type: String, required: true },
      open: { type: String, required: true },
      close: { type: String, required: true }
    }
  ],

  facilities: [
    {type:String}
  ],

  employeAssociated: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  courts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Courts"
    }
  ]
});

export type Icourt = InferSchemaType<typeof courtSchema>;
export type Ivenue = InferSchemaType<typeof venueSchema>;

export const Venue = model<Ivenue>("Venue", venueSchema);
export const Courts = model<Icourt>("Courts", courtSchema);