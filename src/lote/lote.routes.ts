import { Router } from 'express'
import { LoteController } from './lote.controller.js'
import { verifyToken } from '../middleware/auth.js'

export const lotesRouter = Router()
const controller = new LoteController()

lotesRouter.use(verifyToken)

lotesRouter.get('/', controller.getAll.bind(controller))
lotesRouter.get('/:id', controller.getOne.bind(controller))
lotesRouter.put('/:id', controller.update.bind(controller))
lotesRouter.post('/', controller.create.bind(controller))
lotesRouter.delete('/:id', controller.remove.bind(controller))
