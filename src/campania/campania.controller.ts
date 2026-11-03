import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Campania } from './campania.entity.js'

export class CampaniaController {

  async getAll(req: Request, res: Response) {
    try {
      const campania = await orm.em.find(
        Campania,
        { organizacion: req.user!.organizacion },
        { populate: ['LoteCampanias', 'LoteCampanias.Lote'] },
      )

      return res.status(200).json(campania)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener las campañas',
      })
    }
  }

  async getActual(req: Request, res: Response) {
    try {
      const hoy = new Date()
      const fechaHoy = [
        hoy.getFullYear(),
        String(hoy.getMonth() + 1).padStart(2, '0'),
        String(hoy.getDate()).padStart(2, '0'),
      ].join('-')

      const campania = await orm.em.findOne(
        Campania,
        {
          organizacion: req.user!.organizacion,
          fechaInicio: { $lte: fechaHoy },
          fechaFin: { $gte: fechaHoy },
        },
        { populate: ['LoteCampanias', 'LoteCampanias.Lote'] },
      )

      if (!campania) {
        return res.status(404).json({
          message: 'No hay una campaña vigente para esta organización',
        })
      }

      return res.status(200).json(campania)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener la campaña vigente',
      })
    }
  }



  async create(req: Request, res: Response) {
    try {
      const { descripcion, fechaInicio, fechaFin } = req.body

      if (
        typeof descripcion !== 'string' ||
        typeof fechaInicio !== 'string' ||
        typeof fechaFin !== 'string'
      ) {
        return res.status(400).json({
          message: 'Descripción, fecha de inicio y fecha de fin son obligatorias',
        })
      }

      const inicio = new Date(fechaInicio)
      const fin = new Date(fechaFin)

      if (Number.isNaN(inicio.getTime()) || Number.isNaN(fin.getTime())) {
        return res.status(400).json({
          message: 'Las fechas de la campaña no son válidas',
        })
      }

      if (inicio > fin) {
        return res.status(400).json({
          message: 'La fecha de inicio no puede ser posterior a la fecha de fin',
        })
      }

      const inicioFecha = inicio.toISOString().slice(0, 10)
      const finFecha = fin.toISOString().slice(0, 10)

      const campaniaExistente = await orm.em.findOne(Campania, {
        organizacion: req.user!.organizacion,
        fechaInicio: { $lte: finFecha },
        fechaFin: { $gte: inicioFecha },
      })

      if (campaniaExistente) {
        return res.status(409).json({
          message: 'Ya existe una campaña de esta organización en ese período',
        })
      }

      const campania = orm.em.create(Campania, {
        descripcion,
        fechaInicio: inicioFecha,
        fechaFin: finFecha,
        organizacion: req.user!.organizacion,
      })
      await orm.em.flush()
      return res.status(201).json(campania)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al crear la campaña',
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const campania = await orm.em.findOne(Campania, {
        id,
        organizacion: req.user!.organizacion,
      })

      if (!campania) {
        return res.status(404).json({
          message: 'Campaña no encontrada',
        })
      }
      const { descripcion, fechaInicio, fechaFin } = req.body
      
      if (descripcion !== undefined) {
        campania.descripcion = descripcion
      }
      if (fechaInicio !== undefined) {
        campania.fechaInicio = fechaInicio
      }
      if (fechaFin !== undefined) {
        campania.fechaFin = fechaFin
      }
      
      await orm.em.flush()

      return res.status(200).json(campania)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al actualizar la campaña',
      })
    }
  }

    async remove(req: Request, res: Response) {
    try{
      const id = Number(req.params.id)
      const campania = await orm.em.findOne(Campania, {
        id,
        organizacion: req.user!.organizacion,
      })
      if(!campania) {
        return res.status(404).json({
          message: 'Campaña no encontrada',
        })
      }
      await orm.em.remove(campania)
      await orm.em.flush()
      return res.status(200).json({
        message: 'Campaña eliminada',
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al eliminar la campaña',
      })
    }
  }
}