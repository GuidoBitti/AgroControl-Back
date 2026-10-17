import { defineEntity, p } from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { LoteCampania } from '../lote-campania/lote-campania.entity.js'

export const Cultivo = defineEntity({
  name: 'Cultivo',
  extends: BaseEntity,
  properties: {
    nombre: p.string(),
    tipo: p.string(),
    descripcion: p.string(),
    LoteCampanias: () => p.oneToMany(LoteCampania).mappedBy('Cultivo'),
  },
})