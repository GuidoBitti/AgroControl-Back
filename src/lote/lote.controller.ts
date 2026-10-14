import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Lote } from './lote.entity.js'

export class LoteController {

  async getAll(req: Request, res: Response) {
    try {
      const lotes = await orm.em.find(Lote, {})

      return res.status(200).json(lotes)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener los lotes',
      })
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const lote = await orm.em.findOne(Lote, { id: id })

      if (!lote) {
        return res.status(404).json({
          message: 'lote no encontrado',
        })
      }

      return res.status(200).json(lote)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener el lote',
      })
    }
  }


  async create(req: Request, res: Response) {
    try {
      const lote = orm.em.create(Lote, req.body)
      await orm.em.flush()
      return res.status(201).json(lote)
    }catch (error){
      console.error(error)
      return res.status(500).json({
        message: 'Error al crear el lote',
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const lote = await orm.em.findOne(Lote, { id: id })

      if (!lote) {
        return res.status(404).json({
          message: 'lote no encontrado',
        })
      }

      const { tipo, descripcion } = req.body
      
      if (tipo !== undefined) {
        lote.tipo = tipo
      }
      if (descripcion !== undefined) {
        lote.descripcion = descripcion
      }

      await orm.em.flush()

      return res.status(200).json(lote)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al actualizar el lote',
      })
    }
  }

    async remove(req: Request, res: Response) {
    try{
      const id = Number(req.params.id)
      const lote = await orm.em.findOne(Lote, { id: id })
      if(!lote) {
        return res.status(404).json({
          message: 'lote no encontrado',
        })
      }
      await orm.em.remove(lote)
      await orm.em.flush()
      return res.status(200).json({
        message: 'lote eliminado',
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al eliminar el lote',
      })
    }
  }
}