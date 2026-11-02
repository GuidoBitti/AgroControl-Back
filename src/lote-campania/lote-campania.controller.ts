import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { LoteCampania } from '../lote-campania/lote-campania.entity.js'
import { Lote } from '../lote/lote.entity.js'
import { Campania } from '../campania/campania.entity.js'


export class LoteCampaniaController {

  async getAll(req: Request, res: Response) {
    try {
      const loteCampanias = await orm.em.find(LoteCampania, {}, { populate: ['Lote', 'Campania'] })

      return res.status(200).json(loteCampanias)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener los lotes de campaña',
      })
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const loteCampania = await orm.em.findOne(
        LoteCampania,
        { id },
        { populate: ['Lote', 'Campania'] },
      )

      if (!loteCampania) {
        return res.status(404).json({
          message: 'Lote de campaña no encontrado',
        })
      }

      return res.status(200).json(loteCampania)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener el lote de campaña',
      })
    }
  }


  async create(req: Request, res: Response) {
    try {
      const { loteId: loteIdValue, campaniaId: campaniaIdValue } = req.body ?? {}
      const loteId = Number(loteIdValue)
      const campaniaId = Number(campaniaIdValue)

      if (!Number.isInteger(loteId) || !Number.isInteger(campaniaId)) {
        return res.status(400).json({
          message: 'loteId y campaniaId deben ser números enteros',
        })
      }

      const lote = await orm.em.findOne(Lote, { id: loteId })
      const campania = await orm.em.findOne(Campania, { id: campaniaId })

      if (!lote || !campania) {
        return res.status(404).json({
          message: !lote ? 'Lote no encontrado' : 'Campaña no encontrada',
        })
      }

      const asignacionExistente = await orm.em.findOne(LoteCampania, {
        Lote: loteId,
        Campania: campaniaId,
      })

      if (asignacionExistente) {
        return res.status(409).json({
          message: 'La campaña ya está asignada a este lote',
        })
      }

      const loteCampania = orm.em.create(LoteCampania, { Lote: lote, Campania: campania })
      await orm.em.flush()
      return res.status(201).json(loteCampania)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al crear el lote de campaña',
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const loteCampania = await orm.em.findOne(
        LoteCampania,
        { id },
        { populate: ['Lote', 'Campania'] },
      )

      if (!loteCampania) {
        return res.status(404).json({
          message: 'Lote de campaña no encontrado',
        })
      }

      const { loteId: loteIdValue, campaniaId: campaniaIdValue } = req.body ?? {}
      let lote = loteCampania.Lote
      let campania = loteCampania.Campania

      if (loteIdValue !== undefined) {
        const loteId = Number(loteIdValue)
        if (!Number.isInteger(loteId)) {
          return res.status(400).json({ message: 'loteId debe ser un número entero' })
        }
        const loteEncontrado = await orm.em.findOne(Lote, { id: loteId })
        if (!loteEncontrado) {
          return res.status(404).json({ message: 'Lote no encontrado' })
        }
        lote = loteEncontrado
      }

      if (campaniaIdValue !== undefined) {
        const campaniaId = Number(campaniaIdValue)
        if (!Number.isInteger(campaniaId)) {
          return res.status(400).json({ message: 'campaniaId debe ser un número entero' })
        }
        const campaniaEncontrada = await orm.em.findOne(Campania, { id: campaniaId })
        if (!campaniaEncontrada) {
          return res.status(404).json({ message: 'Campaña no encontrada' })
        }
        campania = campaniaEncontrada
      }

      const asignacionDuplicada = await orm.em.findOne(LoteCampania, {
        Lote: lote.id,
        Campania: campania.id,
        id: { $ne: id },
      })

      if (asignacionDuplicada) {
        return res.status(409).json({
          message: 'La campaña ya está asignada a este lote',
        })
      }

      loteCampania.Lote = lote
      loteCampania.Campania = campania
      await orm.em.flush()

      return res.status(200).json(loteCampania)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al actualizar el lote de campaña',
      })
    }
  }

    async remove(req: Request, res: Response) {
    try{
      const id = Number(req.params.id)
      const loteCampania = await orm.em.findOne(LoteCampania, { id: id })
      if(!loteCampania) {
        return res.status(404).json({
          message: 'Lote de campaña no encontrado',
        })
      }
      orm.em.remove(loteCampania)
      await orm.em.flush()
      return res.status(200).json({
        message: 'Lote de la campaña eliminado',
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al eliminar el lote de la campaña',
      })
    }
  }
}