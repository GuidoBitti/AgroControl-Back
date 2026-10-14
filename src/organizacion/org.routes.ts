import { Router } from 'express'
import { OrganizacionController } from './org.controller.js'

export const organizacionRouter = Router()
const controller = new OrganizacionController()

organizacionRouter.get('/', controller.getAll.bind(controller))
organizacionRouter.get('/:id', controller.getOne.bind(controller))
organizacionRouter.put('/:id', controller.update.bind(controller))
organizacionRouter.post('/', controller.create.bind(controller))
organizacionRouter.delete('/:id', controller.remove.bind(controller))
