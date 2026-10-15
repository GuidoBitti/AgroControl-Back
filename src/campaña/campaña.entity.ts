import { defineEntity, p } from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { LoteCampania } from '../lote.campaña/lote.campaña.entity.js'
import { Organizacion } from '../organizacion/org.entity.js'

export const Campania = defineEntity({
  name: 'Campania',
  extends: BaseEntity,
  properties: {
    fechaInicio: p.date(),
    fechaFin: p.date(),
    descripcion: p.string(),
    LoteCampanias: () => p.oneToMany(LoteCampania).mappedBy('campania'),
    organizacion: () => p.manyToOne(Organizacion)
  },
})