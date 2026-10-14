import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Organizacion } from './org.entity.js'

export class OrganizacionController {

  async getAll(req: Request, res: Response) {
    try {
      const organizacion = await orm.em.find(Organizacion, {})

      return res.status(200).json(organizacion)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener las organizaciones',
      })
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const organizacion = await orm.em.findOne(Organizacion, { id: id })

      if (!organizacion) {
        return res.status(404).json({
          message: 'Organizacion no encontrada',
        })
      }

      return res.status(200).json(organizacion)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener la organizacion',
      })
    }
  }


  async create(req: Request, res: Response) {
    try {
      const organizacion = orm.em.create(Organizacion, req.body)
      await orm.em.flush()
      return res.status(201).json(organizacion)
    }catch (error){
      console.error(error)
      return res.status(500).json({
        message: 'Error al crear la organizacion',
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const organizacion = await orm.em.findOne(Organizacion, { id: id })

      if (!organizacion) {
        return res.status(404).json({
          message: 'Organizacion no encontrada',
        })
      }

      const { razonSocial, cuit } = req.body

      if (razonSocial !== undefined) {
        organizacion.razonSocial = razonSocial
      }
      if (cuit !== undefined) {
        organizacion.cuit = cuit
      }

      await orm.em.flush()

      return res.status(200).json(organizacion)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al actualizar la organizacion',
      })
    }
  }

    async remove(req: Request, res: Response) {
    try{
      const id = Number(req.params.id)
      const organizacion = await orm.em.findOne(Organizacion, { id: id })
      if(!organizacion) {
        return res.status(404).json({
          message: 'Organizacion no encontrada',
        })
      }
      await orm.em.remove(organizacion)
      await orm.em.flush()
      return res.status(200).json({
        message: 'Organizacion eliminada',
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al eliminar la organización',
      })
    }
  }
}