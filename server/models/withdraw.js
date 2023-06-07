import mongoose from "mongoose";

const WithdrawSchema = mongoose.Schema(
    {
        withdrawId: {
            type: Number,
            unique: true,
        },
        amount: { type: Number, default: 0 },
        mode: { type: String, default: "BTC" },
        status: { type: String, default: "pending" },
        date: { type: Date, default: new Date() },
    }, { timestamps: true }
)

const Withdraw = mongoose.model("Withdraw", WithdrawSchema)
export default Withdraw