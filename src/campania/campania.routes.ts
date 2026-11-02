import { Router } from 'express'
import { CampaniaController } from './campania.controller.js'
import { verifyToken } from '../middleware/auth.js'

export const campaniaRouter = Router()
const controller = new CampaniaController()

campaniaRouter.get('/', controller.getAll.bind(controller))
campaniaRouter.get('/actual', verifyToken, controller.getActual.bind(controller))
campaniaRouter.put('/:id', controller.update.bind(controller))
campaniaRouter.post('/', verifyToken, controller.create.bind(controller))
campaniaRouter.delete('/:id', controller.remove.bind(controller))
