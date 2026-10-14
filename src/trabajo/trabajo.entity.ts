import { defineEntity, p } from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { LoteCampania } from '../lote.campaña/lote.campaña.entity.js'
import { Insumo } from '../insumo/insumo.entity.js'

export const Trabajo = defineEntity({
  name: 'Trabajo',
  extends: BaseEntity,
  properties: {
    descripcion: p.string(),
    fechaInicio: p.date(),
    fechaFin: p.date(),
    loteCampania: () => p.manyToOne(LoteCampania),
    insumo: () => p.manyToOne(Insumo),
  },
})