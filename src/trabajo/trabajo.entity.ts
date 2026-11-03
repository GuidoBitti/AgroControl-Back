import { defineEntity, p } from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Lote } from '../lote/lote.entity.js'
import { Insumo } from '../insumo/insumo.entity.js'
import { Organizacion } from '../organizacion/org.entity.js'
import { Usuario } from '../usuario/usuario.entity.js'

export const Trabajo = defineEntity({
  name: 'Trabajo',
  extends: BaseEntity,
  properties: {
    descripcion: p.string(),
    fechaInicio: p.date(),
    fechaFin: p.date(),
    cantidadInsumo: p.integer(),
    lote: () => p.manyToOne(Lote),
    insumo: () => p.manyToOne(Insumo),
    organizacion: () => p.manyToOne(Organizacion),
    usuario: () => p.manyToOne(Usuario)
  },
})