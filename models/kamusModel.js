import mongoose from "mongoose";

const kamusSchema = new mongoose.Schema({
    term: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    definition: {
        type: String,
        required: true,
        trim: true
    },
    Source: {
        type: String,
        default: "Unknown",
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    }
}, { timestamps: true 

});

const Kamus = mongoose.model("Kamus", kamusSchema);
export default Kamus;
