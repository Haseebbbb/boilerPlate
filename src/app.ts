import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.routes';
import hondaRoutes from './routes/honda.routes'

const app = express();

app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/honda', hondaRoutes);


export default app;
