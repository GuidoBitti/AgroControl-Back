import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { TipoInsumo } from './tipo-insumo.entity.js'

export class TipoInsumoController {
  async getAll(_req: Request, res: Response) {
    try {
      const tiposInsumo = await orm.em.find(TipoInsumo, {})

      return res.status(200).json(tiposInsumo)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener los tipos de insumo',
      })
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const tipoInsumo = await orm.em.findOne(TipoInsumo, { id })

      if (!tipoInsumo) {
        return res.status(404).json({
          message: 'Tipo de insumo no encontrado',
        })
      }

      return res.status(200).json(tipoInsumo)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener el tipo de insumo',
      })
    }
  }
}
