import express from 'express';
import cors from 'cors';
import './db/index.js';
import errorHandler from './middlewares/errorHandler.js'
import authRouter from './routes/authRouter.js'
import resetPasswordRouter from './routes/resetPasswordRouter.js';

import * as dotenv from 'dotenv'
dotenv.config()

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/auth', authRouter);
app.use('/auth', resetPasswordRouter)
app.get('/', (req, res )=> res.send('Hello Backend!'))
app.use('*', (req, res )=>res.sendStatus(404));
app.use(errorHandler);




app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));


