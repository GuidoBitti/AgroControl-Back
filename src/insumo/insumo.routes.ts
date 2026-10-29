import { Router } from 'express'
import { InsumoController } from './insumo.controller.js'
import { verifyToken } from '../middleware/auth.js'

export const insumosRouter = Router()
const controller = new InsumoController()

insumosRouter.use(verifyToken);

insumosRouter.get('/', controller.getAll.bind(controller))
insumosRouter.get('/:id', controller.getOne.bind(controller))
insumosRouter.put('/:id', controller.update.bind(controller))
insumosRouter.post('/', controller.create.bind(controller))
insumosRouter.delete('/:id', controller.remove.bind(controller))
