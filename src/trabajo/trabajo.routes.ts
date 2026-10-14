import { Router } from 'express'
import { TrabajoController } from './trabajo.controller.js'

export const trabajosRouter = Router()
const controller = new TrabajoController()

trabajosRouter.get('/', controller.getAll.bind(controller))
trabajosRouter.get('/:id', controller.getOne.bind(controller))
trabajosRouter.put('/:id', controller.update.bind(controller))
trabajosRouter.post('/', controller.create.bind(controller))
trabajosRouter.delete('/:id', controller.remove.bind(controller))
