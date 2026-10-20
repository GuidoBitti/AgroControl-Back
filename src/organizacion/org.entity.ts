import { defineEntity, p } from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Usuario } from '../usuario/usuario.entity.js'

export const Organizacion = defineEntity({
  name: 'Organizacion',
  extends: BaseEntity,
  properties: {
    razonSocial: p.string(),
    cuit: p.string().unique(),
    usuarios: () => p.oneToMany(Usuario).mappedBy('organizacion'),
  },
})