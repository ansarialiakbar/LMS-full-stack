import {config} from 'dotenv'
import express from 'express'
import favicon from 'serve-favicon';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import userRoutes from './routes/user.routes.js'
import courseRoutes from './routes/course.routes.js'
import paymentRoutes from './routes/payment.route.js'
import miscRoutes from './routes/miscellaneous.routes.js';
import errorMiddleware from './middlewares/error.middleware.js'

config()
const app = express()
// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve the favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico.png')));

app.use((req, res, next) => {
  console.log(`Request received from origin: ${req.headers.origin}`);
  console.log(`Allowed origin: ${process.env.CLIENT_URL}`);
  next();
});

app.use(express.json())
app.use(express.urlencoded({extended: true })) /* this urlencoded is helpful in to extract query params and parsing  */
// CORS Configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Your frontend's domain
    credentials: true, // Allow cookies and credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Customize as needed
  })
);
app.use(cookieParser())
app.use(morgan('dev'))

app.get("/", (_req, res) => {
  res.send("Welcome to the server!");
});
// to check the server is up or down
app.use('/ping', function(_req, res){
  res.send('Pong')
})
// module 3 routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/courses', courseRoutes)
app.use('/api/v1/payments', paymentRoutes)
app.use('/api/v1', miscRoutes);

app.all('*', (_req, res)=>{
    res.status(404).send('OOPS! 404 page not found')
})
// Generic error handling
app.use(errorMiddleware)
 export default app