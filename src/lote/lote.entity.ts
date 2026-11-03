import { defineEntity, p } from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { LoteCampania } from '../lote-campania/lote-campania.entity.js'
import { Organizacion } from '../organizacion/org.entity.js'

export const Lote = defineEntity({
  name: 'Lote',
  extends: BaseEntity,
  properties: {
    numero: p.integer(),
    latitud: p.float(),
    longitud: p.float(),
    hectareas: p.integer(),
    descripcion: p.string(),
    organizacion: () => p.manyToOne(Organizacion),
    LoteCampanias: () => p.oneToMany(LoteCampania).mappedBy('Lote'),
  },
})