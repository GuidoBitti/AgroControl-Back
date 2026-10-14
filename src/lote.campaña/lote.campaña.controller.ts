import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { LoteCampania } from '../lote.campaña/lote.campaña.entity.js'


export class LoteCampaniaController {

  async getAll(req: Request, res: Response) {
    try {
      const loteCampania = await orm.em.find(LoteCampania, {})

      return res.status(200).json(loteCampania)
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

      const loteCampania = await orm.em.findOne(LoteCampania, { id: id })

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
      const loteCampania = orm.em.create(LoteCampania, req.body)
      await orm.em.flush()
      return res.status(201).json(loteCampania)
    }catch (error){
      console.error(error)
      return res.status(500).json({
        message: 'Error al crear el lote de campaña',
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const loteCampania = await orm.em.findOne(LoteCampania, { id: id })

      if (!loteCampania) {
        return res.status(404).json({
          message: 'Lote de campaña no encontrado',
        })
      }

      const { id: loteId } = req.body
      
      if (loteId !== undefined) {
        loteCampania.id = loteId
      }

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
      await orm.em.remove(loteCampania).flush()
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