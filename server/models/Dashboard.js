import mongoose from "mongoose"

const DashboardSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    balance: { type: Number, default: 100 },
    deposits: [{
        depositId: {
            type: Number,
            unique: true,
        },
        amount: { type: Number, default: 0 },
        mode: { type: String, default: "BTC" },
        status: { type: String, default: "Pending" },
        date: { type: Date, default: new Date() },
    }],
    withdraw: [{
        withdrawId: {
            type: Number,
            unique: true,
        },
        amount: { type: Number, default: 0 },
        mode: { type: String, default: "BTC" },
        status: { type: String, default: "pending" },
        date: { type: Date, default: new Date() },
    }],
    referrals: [{
        referralId: {
            type: Number,
            unique: true,
        },
        clientId: { type: String, unique: true },
        clientPlan: { type: String, default: "Completed" },
        status: { type: String, default: "pending" },
        date: { type: Date, default: new Date() },
    }],
    plan: [{
        planId: { type: String, unique: true },
        plantype: { type: String, default: 'Bronze' },
    }],
},
    { timestamps: true }
)

const Dashboard = mongoose.model("Dashboard", DashboardSchema)
export default Dashboard;