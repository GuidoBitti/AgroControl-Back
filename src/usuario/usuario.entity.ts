import { defineEntity, p } from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Rol } from '../rol/rol.entity.js'
import { Organizacion } from '../organizacion/org.entity.js'

export const Usuario = defineEntity({
  name: 'Usuario',
  extends: BaseEntity,
  properties: {
    nombre: p.string(),
    apellido: p.string(),
    email: p.string(),
    password: p.string(),
    fechaNacimiento: p.date(),
    telefono: p.integer(),
    direccion: p.string(),
    rol: () => p.manyToOne(Rol),
    organizacion: () => p.manyToOne(Organizacion)
  },
})
