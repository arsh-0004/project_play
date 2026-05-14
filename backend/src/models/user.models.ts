import express from 'express'
import mongoose, { model, Schema, type InferSchemaType } from 'mongoose'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: [emailRegex, "Please use a valid email address"]
        },

        phone: {
            type: String,
            required: true,
            match: [/^[0-9]{10}$/, "Phone must be 10 digits"]
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },
        roll: {
            required: true,
            type: String,
            enum: ["admin", "user", "employ"],
            default: "user"
        },
        resetOtp: String,
        otpExpiry: Date
    }, {
    timestamps: true
});

export type Iuser = InferSchemaType<typeof userSchema>

export const User = model<Iuser>("User", userSchema)
