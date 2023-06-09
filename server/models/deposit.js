import mongoose from "mongoose";

const DepositSchema = mongoose.Schema(
    {
        userId: { type: String, required: true },
        amount: { type: Number, default: 0 },
        mode: { type: String, default: "BTC" },
        status: { type: String, default: "pending" },
        picturePath: String,
        date: { type: Date, default: new Date() },
    }, { timestamps: true }
)

const Deposit = mongoose.model("Deposit", DepositSchema)
export default Deposit