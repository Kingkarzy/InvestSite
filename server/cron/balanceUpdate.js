import Plan from '../models/plan.js'
import User from '../models/user.js'

const performBalanceUpdate = async () => {
    try {
        // Fetch all users or specific users for balance update
        const users = await User.find();

        // Iterate over each user
        for (const user of users) {
            // Fetch all plans for the user
            const plans = await Plan.find({ userId: user._id });

            // Perform balance update for each plan
            for (const plan of plans) {
                // Check if balance update is needed
                if (plan.status !== 'Completed') {
                    user.balance += plan.amount * 1.25;
                    plan.status = 'Completed';
                    await user.save();
                    await plan.save();
                }
            }
        }
    } catch (error) {
        console.error('Error performing balance update:', error);
    }
};

export default performBalanceUpdate;
