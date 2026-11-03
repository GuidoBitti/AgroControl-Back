import { Router } from 'express'
import { LoteCampaniaController } from '../lote-campania/lote-campania.controller.js'
import { verifyToken } from '../middleware/auth.js'

export const lotesCampaniasRouter = Router()
const controller = new LoteCampaniaController()

lotesCampaniasRouter.use(verifyToken)

lotesCampaniasRouter.get('/', controller.getAll.bind(controller))
lotesCampaniasRouter.get('/:id', controller.getOne.bind(controller))
lotesCampaniasRouter.put('/:id', controller.update.bind(controller))
lotesCampaniasRouter.post('/', controller.create.bind(controller))
lotesCampaniasRouter.delete('/:id', controller.remove.bind(controller))