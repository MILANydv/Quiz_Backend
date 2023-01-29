const { Schema, model } = require("mongoose");

const ScoreSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        quiz: {
            type: Schema.Types.ObjectId,
            ref: "quiz",
        },
        profile: {
            type: Schema.Types.ObjectId,
            ref: "profile",
        },
        score: {
            type: Number,
            required: true,
        },
        // if the status is true, user has another chance to take the quiz
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Score = model("score", ScoreSchema);
module.exports = Score;