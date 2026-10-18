import { Router } from 'express'
import { CampaniaController } from './campania.controller.js'

export const campaniaRouter = Router()
const controller = new CampaniaController()

campaniaRouter.get('/', controller.getAll.bind(controller))
campaniaRouter.get('/:id', controller.getOne.bind(controller))
campaniaRouter.put('/:id', controller.update.bind(controller))
campaniaRouter.post('/', controller.create.bind(controller))
campaniaRouter.delete('/:id', controller.remove.bind(controller))
