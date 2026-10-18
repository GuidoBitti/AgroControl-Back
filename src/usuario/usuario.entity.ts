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
    email: p.string().unique(), //para evitar dos cuentas con el mismo correo
    password: p.string().hidden(), //el usuario no puede ver su password, solo el sistema lo puede ver
    fechaNacimiento: p.date(),
    telefono: p.string(),
    direccion: p.string(),
    rol: () => p.manyToOne(Rol),
    //organizacion: () => p.manyToOne(Organizacion)
  },
})
