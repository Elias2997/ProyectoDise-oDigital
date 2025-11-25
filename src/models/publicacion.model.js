import pool from '../config/db.js';

export const createPublicacion = async ({ title, content, author_id }) => {
  const [result] = await pool.query(
    'INSERT INTO publicaciones (title, content, author_id) VALUES (?, ?, ?)',
    [title, content, author_id]
  );
  return result.insertId;
};

export const getAllPublicaciones = async () => {
  const [rows] = await pool.query(
    `SELECT p.*, u.username AS author
     FROM publicaciones p
     JOIN users u ON p.author_id = u.id
     ORDER BY p.created_at DESC`
  );
  return rows;
};

export const getPublicacionById = async (id) => {
  const [rows] = await pool.query('SELECT p.*, u.username AS author FROM publicaciones p JOIN users u ON p.author_id = u.id WHERE p.id = ?', [id]);
  return rows[0];
};

export const updatePublicacion = async ({ id, title, content }) => {
  await pool.query('UPDATE publicaciones SET title = ?, content = ? WHERE id = ?', [title, content, id]);
};

export const deletePublicacion = async (id) => {
  await pool.query('DELETE FROM publicaciones WHERE id = ?', [id]);
};