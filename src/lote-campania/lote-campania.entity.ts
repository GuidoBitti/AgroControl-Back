import { defineEntity, p } from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Lote } from '../lote/lote.entity.js'
import { Campania } from '../campania/campania.entity.js'
import { Cultivo } from '../cultivo/cultivo.entity.js'

export const LoteCampania = defineEntity({
  name: 'LoteCampania',
  extends: BaseEntity,
  properties: {
    Lote: () => p.manyToOne(Lote),
    Campania: () => p.manyToOne(Campania),
    Cultivo: () => p.manyToOne(Cultivo),
  },
  uniques: [{ properties: ['Lote', 'Campania'] }],
})