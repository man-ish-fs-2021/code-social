const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
}, {
    timestamps: true
});

const Friendship = mongoose.model("Friendship", friendSchema);

module.exports = Friendship;