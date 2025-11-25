import pool from '../config/db.js';

export const createUser = async ({ username, email, passwordHash }) => {
  const [result] = await pool.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, passwordHash]
  );
  return { id: result.insertId, username, email };
};

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

export const findUserById = async (id) => {
  const [rows] = await pool.query('SELECT id, username, email, created_at FROM users WHERE id = ?', [id]);
  return rows[0];
};