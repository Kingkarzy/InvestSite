import mongoose from "mongoose";

const PlanSchema = mongoose.Schema(
    {
        planId: { type: String, unique: true },
        plantype: { type: String, default: 'Bronze' },
    }, { timestamps: true }
)

const Plan = mongoose.model("Plan", PlanSchema)
export default Plan