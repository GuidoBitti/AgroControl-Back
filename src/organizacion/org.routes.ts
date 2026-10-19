import { Router } from 'express'
import { OrganizacionController } from './org.controller.js'

export const organizacionRouter = Router()
const controller = new OrganizacionController()

organizacionRouter.get('/:id', controller.getOne.bind(controller))
organizacionRouter.post('/', controller.create.bind(controller))
