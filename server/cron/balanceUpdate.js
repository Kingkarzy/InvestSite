import Plan from '../models/plan.js'
import User from '../models/user.js'
import cron from 'node-cron';

const performBalanceUpdate = async () => {
    console.log('Running scheduled task...');

    try {
        cron.schedule('0 0 * * *', async () => {
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
                        user.balance += plan.amount * (plan.gain / 100);
                        plan.duration--;
                        user.profit += plan.amount * (plan.gain / 100)
                        if (plan.duration === 0) {
                            plan.status = 'Completed';
                            user.balance += plan.amount;
                        }

                        await Promise.all([user.save(), plan.save()]);
                    }
                }

            }
            console.log('Ran scheduled task...');
        })
    } catch (error) {
        console.error('Error performing balance update:', error);
    }

};

export default performBalanceUpdate;