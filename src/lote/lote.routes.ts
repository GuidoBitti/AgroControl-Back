import { Router } from 'express'
import { LoteController } from './lote.controller.js'

export const lotesRouter = Router()
const controller = new LoteController()

lotesRouter.get('/', controller.getAll.bind(controller))
lotesRouter.get('/:id', controller.getOne.bind(controller))
lotesRouter.put('/:id', controller.update.bind(controller))
lotesRouter.post('/', controller.create.bind(controller))
lotesRouter.delete('/:id', controller.remove.bind(controller))
