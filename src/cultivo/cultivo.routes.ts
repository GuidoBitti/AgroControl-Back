import { Router } from 'express'
import { CultivoController } from './cultivo.controller.js'

export const cultivoRouter = Router()
const controller = new CultivoController()

cultivoRouter.get('/', controller.getAll.bind(controller))
cultivoRouter.get('/:id', controller.getOne.bind(controller))
cultivoRouter.put('/:id', controller.update.bind(controller))
cultivoRouter.post('/', controller.create.bind(controller))
cultivoRouter.delete('/:id', controller.remove.bind(controller))
