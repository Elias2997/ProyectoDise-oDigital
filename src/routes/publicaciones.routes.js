import { Router } from 'express';
import * as Ctrl from '../controllers/publicaciones.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { z } from 'zod';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

const pubSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    content: z.string().min(1)
  })
});

router.get('/', Ctrl.list);
router.get('/:id', Ctrl.get);
router.post('/', verifyToken, validate(pubSchema), Ctrl.create);
router.put('/:id', verifyToken, validate(pubSchema), Ctrl.update);
router.delete('/:id', verifyToken, Ctrl.remove);

export default router;
