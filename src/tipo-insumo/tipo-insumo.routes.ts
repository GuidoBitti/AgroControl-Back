import { Router } from 'express'
import { TipoInsumoController } from './tipo-insumo.controller.js'

export const tipoInsumoRouter = Router()
const controller = new TipoInsumoController()

tipoInsumoRouter.get('/', controller.getAll.bind(controller))
tipoInsumoRouter.get('/:id', controller.getOne.bind(controller))
