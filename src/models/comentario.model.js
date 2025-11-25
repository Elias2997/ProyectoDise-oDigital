import pool from '../config/db.js';

export const createComentario = async ({ publicacion_id, author_id, content }) => {
  const [result] = await pool.query(
    'INSERT INTO comentarios (publicacion_id, author_id, content) VALUES (?, ?, ?)',
    [publicacion_id, author_id, content]
  );
  return result.insertId;
};

export const getComentariosByPublicacion = async (publicacion_id) => {
  const [rows] = await pool.query(
    `SELECT c.*, u.username AS author
     FROM comentarios c
     JOIN users u ON c.author_id = u.id
     WHERE c.publicacion_id = ?
     ORDER BY c.created_at ASC`, [publicacion_id]
  );
  return rows;
};
