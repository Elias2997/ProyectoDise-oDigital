import * as PublicacionModel from '../models/publicacion.model.js';

export const list = async (req, res, next) => {
  try {
    const pubs = await PublicacionModel.getAllPublicaciones();
    res.json(pubs);
  } catch (err) { next(err); }
};

export const get = async (req, res, next) => {
  try {
    const pub = await PublicacionModel.getPublicacionById(req.params.id);
    if (!pub) return res.status(404).json({ message: 'No encontrada' });
    res.json(pub);
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const id = await PublicacionModel.createPublicacion({ title, content, author_id: req.user.id });
    res.status(201).json({ id });
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const pub = await PublicacionModel.getPublicacionById(req.params.id);
    if (!pub) return res.status(404).json({ message: 'No encontrada' });
    if (pub.author_id !== req.user.id) return res.status(403).json({ message: 'No autorizado' });

    const { title, content } = req.body;
    await PublicacionModel.updatePublicacion({ id: req.params.id, title, content });
    res.json({ message: 'Actualizada' });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const pub = await PublicacionModel.getPublicacionById(req.params.id);
    if (!pub) return res.status(404).json({ message: 'No encontrada' });
    if (pub.author_id !== req.user.id) return res.status(403).json({ message: 'No autorizado' });

    await PublicacionModel.deletePublicacion(req.params.id);
    res.json({ message: 'Eliminada' });
  } catch (err) { next(err); }
};
