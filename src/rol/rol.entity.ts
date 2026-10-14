import { defineEntity, p } from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Usuario } from '../usuario/usuario.entity.js'

export const Rol = defineEntity({
  name: 'Rol',
  extends: BaseEntity,
  properties: {
    descripcion: p.string(),
    usuarios: () => p.oneToMany(Usuario).mappedBy('rol'),
  },
})