import * as ComentarioModel from '../models/comentario.model.js';
import * as PublicacionModel from '../models/publicacion.model.js';
import { sanitize } from '../utils/sanitize.js';

export const list = async (req, res, next) => {
  try {
    const comentarios = await ComentarioModel.getComentariosByPublicacion(req.params.id);
    res.json(comentarios);
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const pub = await PublicacionModel.getPublicacionById(req.params.id);
    if (!pub) return res.status(404).json({ message: 'Publicación no encontrada' });

    const content = sanitize(req.body.content);
    const id = await ComentarioModel.createComentario({
      publicacion_id: req.params.id,
      author_id: req.user.id,
      content
    });
    res.status(201).json({ id });
  } catch (err) { next(err); }
};
