import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Organizacion } from './org.entity.js'
import { Usuario } from '../usuario/usuario.entity.js'
import { Rol } from '../rol/rol.entity.js'
import bcrypt from 'bcryptjs'

export class OrganizacionController {

  async getAll(req: Request, res: Response) {
    try {
      const organizacion = await orm.em.find(Organizacion, {})

      return res.status(200).json(organizacion)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener las organizaciones',
      })
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const organizacion = await orm.em.findOne(Organizacion, { id: id })

      if (!organizacion) {
        return res.status(404).json({
          message: 'Organizacion no encontrada',
        })
      }

      return res.status(200).json(organizacion)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener la organizacion',
      })
    }
  }


  async create(req: Request, res: Response) {
    try {
      const body = req.body ?? {}
      const {
        razonSocial,
        cuit,
        nombre,
        apellido,
        email,
        password,
        fechaNacimiento,
        telefono,
        direccion,
      } = body

      const requiredFields = {
        razonSocial,
        cuit,
        nombre,
        apellido,
        email,
        password,
        fechaNacimiento,
        telefono,
        direccion,
      }

      if (Object.values(requiredFields).some(value => typeof value !== 'string' || value.trim() === '')) {
        return res.status(400).json({
          message: 'Todos los datos de la organización y del administrador son obligatorios',
        })
      }

      const parsedFechaNacimiento = new Date(fechaNacimiento)
      if (Number.isNaN(parsedFechaNacimiento.getTime())) {
        return res.status(400).json({
          message: 'La fecha de nacimiento no es válida',
        })
      }

      const existingUser = await orm.em.findOne(Usuario, { email })
      if (existingUser) {
        return res.status(409).json({
          message: 'El email ya está registrado',
        })
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const result = await orm.em.transactional(async em => {
        const duplicateUser = await em.findOne(Usuario, { email })
        if (duplicateUser) {
          return null
        }

        const rol = await em.findOne(Rol, { descripcion: 'Administrador' })
        if (!rol) throw new Error('No existe el rol Administrador')
        const organizacion = em.create(Organizacion, { razonSocial, cuit })
        const administrador = em.create(Usuario, {
          nombre,
          apellido,
          email,
          password: hashedPassword,
          fechaNacimiento,
          telefono,
          direccion,
          rol,
          organizacion,
        })

        return { organizacion, administrador }
      })

      if (!result) {
        return res.status(409).json({
          message: 'El email ya está registrado',
        })
      }

      return res.status(201).json(result)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al crear la organización y su administrador',
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const organizacion = await orm.em.findOne(Organizacion, { id: id })

      if (!organizacion) {
        return res.status(404).json({
          message: 'Organizacion no encontrada',
        })
      }

      const { razonSocial, cuit } = req.body

      if (razonSocial !== undefined) {
        organizacion.razonSocial = razonSocial
      }
      if (cuit !== undefined) {
        organizacion.cuit = cuit
      }

      await orm.em.flush()

      return res.status(200).json(organizacion)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al actualizar la organizacion',
      })
    }
  }

    async remove(req: Request, res: Response) {
    try{
      const id = Number(req.params.id)
      const organizacion = await orm.em.findOne(Organizacion, { id: id })
      if(!organizacion) {
        return res.status(404).json({
          message: 'Organizacion no encontrada',
        })
      }
      await orm.em.remove(organizacion)
      await orm.em.flush()
      return res.status(200).json({
        message: 'Organizacion eliminada',
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al eliminar la organización',
      })
    }
  }
}