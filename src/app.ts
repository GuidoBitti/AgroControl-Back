import express, { type Express, type Request, type Response } from 'express';
import { orm, syncSchema } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'
import { insumosRouter } from './insumo/insumo.routes.js'
import {lotesRouter} from './lote/lote.routes.js'
import {usuariosRouter} from './usuario/usuario.routes.js'
import {campaniaRouter} from './campania/campania.routes.js'
import cors from 'cors'
import { lotesCampaniasRouter } from './lote-campania/lote-campania.routes.js';
import { trabajosRouter } from './trabajo/trabajo.routes.js';

const app = express()
app.use(cors({origin: 'http://localhost:5173'}))
app.use(express.json())

//luego de los middlewares base 
app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})
//antes de las rutas y middlewares de negocio
app.use('/api/campanias', campaniaRouter)
app.use('/api/usuarios', usuariosRouter) 
app.use('/api/insumos', insumosRouter)
app.use('/api/lotes', lotesRouter)
app.use('/api/lote-campania', lotesCampaniasRouter )
app.use('/api/trabajos', trabajosRouter)

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})




await syncSchema()

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})