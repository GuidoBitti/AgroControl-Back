import { Router } from 'express'
import { LoteCampaniaController } from '../lote.campaña/lote.campaña.controller.js'

export const lotesCampañasRouter = Router()
const controller = new LoteCampaniaController()

lotesCampañasRouter.get('/', controller.getAll.bind(controller))
lotesCampañasRouter.get('/:id', controller.getOne.bind(controller))
lotesCampañasRouter.put('/:id', controller.update.bind(controller))
lotesCampañasRouter.post('/', controller.create.bind(controller))
lotesCampañasRouter.delete('/:id', controller.remove.bind(controller))