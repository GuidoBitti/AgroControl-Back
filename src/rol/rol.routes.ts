import { Router } from 'express'
import { RolController } from './rol.controller.js'

export const rolRouter = Router()
const controller = new RolController()

rolRouter.get('/', controller.getAll.bind(controller))
rolRouter.get('/:id', controller.getOne.bind(controller))
rolRouter.put('/:id', controller.update.bind(controller))
rolRouter.post('/', controller.create.bind(controller))
rolRouter.delete('/:id', controller.remove.bind(controller))
