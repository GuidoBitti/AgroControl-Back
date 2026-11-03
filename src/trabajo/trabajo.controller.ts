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
    const { descripcion, fechaInicio, fechaFin, cantidadInsumo } = req.body
    const loteId = req.body.lote ?? req.body.loteId
    const usuarioId = req.body.usuario ?? req.body.usuarioId
    const insumoId = req.body.insumo ?? req.body.insumoId
    const organizacionId = req.body.organizacion ?? req.body.organizacionId

    const cantidad = Number(cantidadInsumo)
    if (!Number.isInteger(cantidad) || cantidad < 0) {
      throw new Error('CANTIDAD_INVALIDA')
    }

    const trabajo = await orm.em.transactional(async (em) => {
      const insumo = await em.findOne(Insumo, { id: Number(insumoId) })
      if (!insumo) throw new Error('INSUMO_NO_ENCONTRADO')
      if (cantidad > insumo.stock) throw new Error('STOCK_INSUFICIENTE')

      insumo.stock -= cantidad

      const nuevo = em.create(Trabajo, {
        descripcion,
        fechaInicio,
        fechaFin,
        cantidadInsumo: cantidad,
        insumo,
        lote: Number(loteId),
        usuario: Number(usuarioId),
        organizacion: Number(organizacionId),
      })
      em.persist(nuevo)
      return nuevo
    })

    return res.status(201).json(trabajo)
  } catch (error) {
    if (error instanceof Error) {
      const respuestas: Record<string, [number, string]> = {
        INSUMO_NO_ENCONTRADO: [404, 'Insumo no encontrado'],
        STOCK_INSUFICIENTE: [400, 'No hay stock suficiente del insumo'],
        CANTIDAD_INVALIDA: [400, 'La cantidad debe ser un entero mayor o igual a cero'],
      }
      const respuesta = respuestas[error.message]
      if (respuesta) return res.status(respuesta[0]).json({ message: respuesta[1] })
    }
    console.error(error)
    return res.status(500).json({ message: 'Error al crear el trabajo' })
  }
}

  async update(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const { descripcion, fechaInicio, fechaFin, cantidadInsumo } = req.body
    const loteId = req.body.lote ?? req.body.loteId
    const usuarioId = req.body.usuario ?? req.body.usuarioId
    const insumoId = req.body.insumo ?? req.body.insumoId
    const organizacionId = req.body.organizacion ?? req.body.organizacionId

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
      if (organizacionId !== undefined) em.assign(trabajo, { organizacion: Number(organizacionId) })
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
      if (!trabajo) throw new Error('TRABAJO_NO_ENCONTRADO')

      trabajo.insumo.stock += trabajo.cantidadInsumo
      em.remove(trabajo)
    })

    return res.status(200).json({ message: 'Trabajo eliminado' })
  } catch (error) {
    if (error instanceof Error && error.message === 'TRABAJO_NO_ENCONTRADO') {
      return res.status(404).json({ message: 'Trabajo no encontrado' })
    }
    console.error(error)
    return res.status(500).json({ message: 'Error al eliminar el trabajo' })
  }
}
}
