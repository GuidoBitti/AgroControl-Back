import { defineEntity, p } from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { LoteCampania } from '../lote-campania/lote-campania.entity.js'
import { Cultivo } from '../cultivo/cultivo.entity.js'


export const Lote = defineEntity({
  name: 'Lote',
  extends: BaseEntity,
  properties: {
    numero: p.integer(),
    tipo: p.string(),
    latitud: p.float(),
    longitud: p.float(),
    hectareas: p.integer(),
    descripcion: p.string(),
  },
})