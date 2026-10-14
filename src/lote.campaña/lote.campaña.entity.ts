import { defineEntity, p } from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Lote } from '../lote/lote.entity.js'
import { Campania } from '../campaña/campaña.entity.js'
import { Cultivo } from '../cultivo/cultivo.entity.js'

export const LoteCampania = defineEntity({
  name: 'LoteCampania',
  extends: BaseEntity,
  properties: {
    lote: () => p.manyToOne(Lote),
    campania: () => p.manyToOne(Campania),
    cultivo: () => p.manyToOne(Cultivo),
  },
  uniques: [{ properties: ['lote', 'campania'] }],
})