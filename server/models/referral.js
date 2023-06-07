import mongoose from "mongoose";

const ReferralSchema = mongoose.Schema(
    {
        referralId: {
            type: Number,
            unique: true,
        },
        amount: { type: Number, default: 0 },
        mode: { type: String, default: "BTC" },
        status: { type: String, default: "pending" },
        date: { type: Date, default: new Date() },
    }, { timestamps: true }
)

const Referral = mongoose.model("Referral", ReferralSchema)
export default Referral