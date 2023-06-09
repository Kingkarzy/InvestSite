import mongoose from "mongoose";

const PlanSchema = mongoose.Schema(
    {
        userId: { type: String },
        planType: { type: String, default: 'None' },
        amount: { type: Number },
        duration: {
            type: Date,
            default: function () {
                const currentDate = new Date();
                const futureDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Add 30 days
                return futureDate;
            },
        },
        gain: { type: Number },
        status: { type: String, default: "Ongoing" },
    },
    { timestamps: true }
);

const Plan = mongoose.model("Plan", PlanSchema);
export default Plan;
