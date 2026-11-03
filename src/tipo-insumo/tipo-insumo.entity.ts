import { defineEntity, p } from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'

export const TipoInsumo = defineEntity({
  name: 'TipoInsumo',
  extends: BaseEntity,
  properties: {
    nombre: p.string(),
  },
})
