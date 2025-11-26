import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import publicacionesRoutes from './routes/publicaciones.routes.js';
import comentariosRoutes from './routes/comentarios.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import pool from './config/db.js';

dotenv.config();
const app = express();

app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/publicaciones', publicacionesRoutes);
app.use('/api/publicaciones', comentariosRoutes); // rutas de comentarios bajo /api/publicaciones/:id/comentarios

// healthcheck
app.get('/', (req, res) => res.json({ ok: true }));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  // optional: test DB connection
  try {
    await pool.getConnection();
    console.log('DB connected');
  } catch (err) {
    console.error('DB connection error', err);
  }
  console.log(`Server listening on ${PORT}`);
});