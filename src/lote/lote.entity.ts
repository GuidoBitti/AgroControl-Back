import { defineEntity, p } from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { LoteCampania } from '../lote-campania/lote-campania.entity.js'
import { Cultivo } from '../cultivo/cultivo.entity.js'


export const Lote = defineEntity({
  name: 'Lote',
  extends: BaseEntity,
  properties: {
    tipo: p.string(),
    descripcion: p.string(),
    hectareas: p.integer(),
    lat: p.string(),
    lng: p.string(),
    loteCampanias: () => p.oneToMany(LoteCampania).mappedBy('Lote'),
    Cultivo: () => p.manyToOne(Cultivo),
  },
})