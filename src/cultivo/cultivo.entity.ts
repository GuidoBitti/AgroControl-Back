import { defineEntity, p } from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { LoteCampania } from '../lote.campaña/lote.campaña.entity.js'

export const Cultivo = defineEntity({
  name: 'Cultivo',
  extends: BaseEntity,
  properties: {
    tipo: p.string(),
    descripcion: p.string(),
    LoteCampanias: () => p.oneToMany(LoteCampania).mappedBy('cultivo'),
  },
})