import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Insumo } from './insumo.entity.js'

export class InsumoController {

  async getAll(req: Request, res: Response) {
    try {
      console.log('req.user:', req.user)
      const insumos = await orm.em.find(Insumo, {
        organizacion: req.user!.organizacion,
      })

      return res.status(200).json(insumos)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener los insumos',
      })
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const insumo = await orm.em.findOne(Insumo, {
        id,
        organizacion: req.user!.organizacion,
       })

      if (!insumo) {
        return res.status(404).json({
          message: 'Insumo no encontrado',
        })
      }

      return res.status(200).json(insumo)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener el insumo',
      })
    }
  }


    async create(req: Request, res: Response) {
    try {
      const { nombre, stock, tipo, descripcion } = req.body

      const insumo = orm.em.create(Insumo, {
        nombre,
        stock,
        tipo,
        descripcion,
        organizacion: req.user!.organizacion, // siempre la del token
      })
      await orm.em.flush()
      return res.status(201).json(insumo)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Error al crear el insumo' })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const insumo = await orm.em.findOne(Insumo, {
        id,
        organizacion: req.user!.organizacion,
      })

      if (!insumo) {
        return res.status(404).json({ message: 'Insumo no encontrado' })
      }

      const { nombre, stock, tipo, descripcion } = req.body
      orm.em.assign(insumo, { nombre, stock, tipo, descripcion })
      await orm.em.flush()
      return res.status(200).json(insumo)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Error al actualizar el insumo' })
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const insumo = await orm.em.findOne(Insumo, {
        id,
        organizacion: req.user!.organizacion,
      })

      if (!insumo) {
        return res.status(404).json({ message: 'Insumo no encontrado' })
      }

      orm.em.remove(insumo)
      await orm.em.flush()
      return res.status(204).send()
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Error al eliminar el insumo' })
    }
  }
}