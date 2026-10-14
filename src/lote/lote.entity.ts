import { defineEntity, p } from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { LoteCampania } from '../lote.campaña/lote.campaña.entity.js'


export const Lote = defineEntity({
  name: 'Lote',
  extends: BaseEntity,
  properties: {
    tipo: p.string(),
    descripcion: p.string(),
    loteCampanias: () => p.oneToMany(LoteCampania).mappedBy('lote'),
  },
})