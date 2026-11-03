import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Insumo } from './insumo.entity.js'
import { TipoInsumo } from '../tipo-insumo/tipo-insumo.entity.js'

export class InsumoController {

  async getAll(req: Request, res: Response) {
    try {
      console.log('req.user:', req.user)
      const insumos = await orm.em.find(Insumo, {
        organizacion: req.user!.organizacion,
      }, { populate: ['tipoInsumo'] })

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
      }, { populate: ['tipoInsumo'] })

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
      const { nombre, stock, tipoInsumoId, descripcion } = req.body
      const idTipoInsumo = Number(tipoInsumoId)

      if (!Number.isInteger(idTipoInsumo) || idTipoInsumo <= 0) {
        return res.status(400).json({
          message: 'tipoInsumoId debe ser un número entero positivo',
        })
      }

      const tipoInsumo = await orm.em.findOne(TipoInsumo, { id: idTipoInsumo })

      if (!tipoInsumo) {
        return res.status(404).json({ message: 'Tipo de insumo no encontrado' })
      }

      const insumo = orm.em.create(Insumo, {
        nombre,
        stock,
        tipoInsumo,
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
      }, { populate: ['tipoInsumo'] })

      if (!insumo) {
        return res.status(404).json({ message: 'Insumo no encontrado' })
      }

      const { nombre, stock, tipoInsumoId, descripcion } = req.body

      if (tipoInsumoId !== undefined) {
        const idTipoInsumo = Number(tipoInsumoId)

        if (!Number.isInteger(idTipoInsumo) || idTipoInsumo <= 0) {
          return res.status(400).json({
            message: 'tipoInsumoId debe ser un número entero positivo',
          })
        }

        const tipoInsumo = await orm.em.findOne(TipoInsumo, { id: idTipoInsumo })

        if (!tipoInsumo) {
          return res.status(404).json({ message: 'Tipo de insumo no encontrado' })
        }

        insumo.tipoInsumo = tipoInsumo
      }

      orm.em.assign(insumo, { nombre, stock, descripcion })

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