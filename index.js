import './db/index.js';
import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js'
import postsRouter from './routes/postsRouter.js'

import * as dotenv from 'dotenv'
dotenv.config()

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/posts', postsRouter);
app.get('/', (req, res )=> res.send('Hello Backend!'))
app.use('*', (req, res )=>res.sendStatus(404));
app.use(errorHandler);



app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));


