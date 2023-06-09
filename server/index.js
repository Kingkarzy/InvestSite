import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';
import dashboardRoute from './routes/dashboard.js';
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import cron from 'node-cron';
import performBalanceUpdate from './cron/balanceUpdate.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json())
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/dashboard', dashboardRoute)

cron.schedule('0 0 * * *', () => {
  // Run the balance update task
  performBalanceUpdate();
});

const PORT = process.env.PORT || 5501;
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));