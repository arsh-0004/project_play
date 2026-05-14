import { model, Schema, type InferSchemaType } from "mongoose";





const matchSchema = new Schema({

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    gameType: {
        type: String,
        enum: ["padel", "pickleball"],
        required: true
    },
    venue: {
        type: Schema.Types.ObjectId,
        ref: 'Venue',
        required: true,
    },
    court: {
        type: Schema.Types.ObjectId,
        ref: 'Courts',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    duration: 
        {
            type: String,
        required: true,
        enum: ["60 Min", "120 Min"]
    },
    slots: [
    {
      time: String,     // "06:00"
      price: Number,    // 400
      session: String,  // "morning"
    }
  ]
    ,
    isPublic: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["open", "ongoing", "completed"]
    },
    maxPlayers: {
        type: Number,
        enum: [4],
        default: 4
    },
    teamA: {
        player1: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        player2: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },

    // ✅ TEAM B
    teamB: {
        player1: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        player2: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    payment:{
        type:String,
        enum:["pending","complete"],
        default:"pending"
    }



})

export type Imatch = InferSchemaType<typeof matchSchema>


export const  Match = model<Imatch>("Match",matchSchema)