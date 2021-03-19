const mongoose = require("mongoose");

const ResetPasswordSchema = new mongoose.Schema({
    user : {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
        
    },
    accessToken : {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        required: true
    }
},
{
    timestamps: true
});

const resetPassword = mongoose.model("resetPassword",ResetPasswordSchema);
module.exports = resetPassword;