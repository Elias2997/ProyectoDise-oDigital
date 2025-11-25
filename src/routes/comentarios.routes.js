import { Router } from 'express';
import * as Ctrl from '../controllers/comentarios.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { z } from 'zod';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

const comentarioSchema = z.object({
  body: z.object({
    content: z.string().min(1).max(1000)
  })
});

router.get('/:id/comentarios', Ctrl.list);
router.post('/:id/comentarios', verifyToken, validate(comentarioSchema), Ctrl.create);

export default router;