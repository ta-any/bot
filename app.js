// app.js
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './router/router.js';

const app = express();
app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.listen(3030, () => {
  console.log('Server is running on http://localhost:3030');
});