import { defineEntity, p } from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Organizacion } from '../organizacion/org.entity.js'

export const Insumo = defineEntity({
  name: 'Insumo',
  extends: BaseEntity,
  properties: {
    nombre: p.string(),
    stock: p.integer(),
    tipo: p.string(),
    descripcion: p.string(),
    organizacion: () => p.manyToOne(Organizacion)
  },
})