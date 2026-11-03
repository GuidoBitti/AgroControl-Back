import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Trabajo } from './trabajo.entity.js'
import { Insumo } from '../insumo/insumo.entity.js'

export class TrabajoController {

  async getAll(req: Request, res: Response) {
    try {
      const trabajo = await orm.em.find(Trabajo, {})

      return res.status(200).json(trabajo)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener los trabajos',
      })
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const trabajo = await orm.em.findOne(Trabajo, { id: id })

      if (!trabajo) {
        return res.status(404).json({
          message: 'Trabajo no encontrado',
        })
      }

      return res.status(200).json(trabajo)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener el trabajo',
      })
    }
  }


  async create(req: Request, res: Response) {
  try {
    const { insumo: insumoId, cantidadInsumo, ...resto } = req.body
    const cantidad = Number(cantidadInsumo)

    if (!Number.isFinite(cantidad) || cantidad <= 0) {
      return res.status(400).json({ message: 'La cantidad debe ser mayor a 0' })
    }

    const trabajo = await orm.em.transactional(async (em) => {
      const insumo = await em.findOne(Insumo, { id: Number(insumoId) })
      if (!insumo) {
        throw Object.assign(new Error('El insumo no existe'), { status: 404 })
      }
      if (insumo.stock < cantidad) {
        throw Object.assign(
          new Error(`Stock insuficiente: disponible ${insumo.stock}, solicitado ${cantidad}`),
          { status: 400 }
        )
      }

      insumo.stock -= cantidad
      return em.create(Trabajo, { ...resto, insumo, cantidadInsumo: cantidad })
    })

    return res.status(201).json(trabajo)
  } catch (error: any) {
    console.error(error)
    return res.status(error.status ?? 500).json({
      message: error.status ? error.message : 'Error al crear el trabajo',
    })
  }
}

  async update(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const { descripcion, fechaInicio, fechaFin, cantidadInsumo } = req.body
    const loteId = req.body.lote ?? req.body.loteId
    const usuarioId = req.body.usuario ?? req.body.usuarioId
    const insumoId = req.body.insumo ?? req.body.insumoId

    const trabajo = await orm.em.transactional(async (em) => {
      const trabajo = await em.findOne(Trabajo, { id }, { populate: ['insumo'] })
      if (!trabajo) throw new Error('TRABAJO_NO_ENCONTRADO')

      const insumoAnterior = trabajo.insumo
      const cantidadAnterior = trabajo.cantidadInsumo
      const insumoNuevoId = insumoId !== undefined ? Number(insumoId) : insumoAnterior.id
      const cantidadNueva =
        cantidadInsumo !== undefined ? Number(cantidadInsumo) : cantidadAnterior
      if (!Number.isInteger(cantidadNueva) || cantidadNueva < 0) {
        throw new Error('CANTIDAD_INVALIDA')
      }
      if (insumoNuevoId === insumoAnterior.id) {
        const diferencia = cantidadNueva - cantidadAnterior
        if (diferencia > insumoAnterior.stock) throw new Error('STOCK_INSUFICIENTE')
        insumoAnterior.stock -= diferencia
      } else {
        const insumoNuevo = await em.findOne(Insumo, { id: insumoNuevoId })
        if (!insumoNuevo) throw new Error('INSUMO_NO_ENCONTRADO')
        if (cantidadNueva > insumoNuevo.stock) throw new Error('STOCK_INSUFICIENTE')
        insumoAnterior.stock += cantidadAnterior
        insumoNuevo.stock -= cantidadNueva
        trabajo.insumo = insumoNuevo
      }
      trabajo.cantidadInsumo = cantidadNueva
      if (descripcion !== undefined) trabajo.descripcion = descripcion
      if (fechaInicio !== undefined) trabajo.fechaInicio = fechaInicio
      if (fechaFin !== undefined) trabajo.fechaFin = fechaFin
      if (loteId !== undefined) em.assign(trabajo, { lote: Number(loteId) })
      if (usuarioId !== undefined) em.assign(trabajo, { usuario: Number(usuarioId) })
      return trabajo 
    })
    return res.status(200).json(trabajo)
  } catch (error) {
    if (error instanceof Error) {
      const respuestas: Record<string, [number, string]> = {
        TRABAJO_NO_ENCONTRADO: [404, 'Trabajo no encontrado'],
        INSUMO_NO_ENCONTRADO: [404, 'Insumo no encontrado'],
        STOCK_INSUFICIENTE: [400, 'No hay stock suficiente del insumo'],
        CANTIDAD_INVALIDA: [400, 'La cantidad debe ser un entero mayor o igual a cero'],
      }
      const respuesta = respuestas[error.message]
      if (respuesta) return res.status(respuesta[0]).json({ message: respuesta[1] })
    }
    console.error(error)
    return res.status(500).json({ message: 'Error al actualizar el trabajo' })
  }
}
    async remove(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    await orm.em.transactional(async (em) => {
      const trabajo = await em.findOne(Trabajo, { id }, { populate: ['insumo'] })
      if (!trabajo) {
        throw Object.assign(new Error('El trabajo no existe'), { status: 404 })
      }
      trabajo.insumo.stock += trabajo.cantidadInsumo
      em.remove(trabajo)
    })
    return res.status(200).json({ message: 'Trabajo eliminado' })
  } catch (error: any) {
    console.error(error)
    return res.status(error.status ?? 500).json({
      message: error.status ? error.message : 'Error al eliminar el trabajo',
    })
  }
}
}
