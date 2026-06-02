# AgroControl-Back

Backend de AgroControl construido con Node.js, TypeScript y Prisma.

## Resumen

Este proyecto es el servidor backend de AgroControl. Usa `express` para la API y Prisma para el acceso a la base de datos.

## Requisitos previos

- Node.js 18+ instalado
- pnpm instalado globalmente (o disponible en tu sistema)
- PostgreSQL accesible o una base de datos compatible
- Git para clonar el repositorio

Si no tienes `pnpm`, instálalo con:

```bash
npm install -g pnpm
```

## Clonar y preparar desde cero

1. Clona el repositorio:

```bash
git clone https://github.com/GuidoBitti/AgroControl-Back.git && cd AgroControl-Back
```

2. Instala dependencias:

```bash
pnpm install
```

3. Crea el archivo `.env`

Crea un archivo `.env` en la raíz del proyecto con al menos esta variable:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

4. Genera el cliente Prisma y aplica migraciones

Genera el cliente Prisma con:

```bash
pnpm prisma generate
```

Si todavía no hay migraciones creadas, usa:

```bash
pnpm prisma migrate dev --name init
```

Si ya tienes migraciones, aplica los cambios con:

```bash
pnpm prisma migrate dev
```

## Iniciar el proyecto

Para desarrollo:

```bash
pnpm dev
```

Este comando ejecuta `tsx watch src/server.ts`.

## Estructura principal

- `src/` — Código fuente TypeScript
- `prisma/` — Esquema Prisma y migraciones
- `package.json` — Scripts y dependencias
- `tsconfig.json` — Configuración del compilador TypeScript