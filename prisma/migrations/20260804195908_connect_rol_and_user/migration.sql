/*
  Warnings:

  - Added the required column `rolId` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Made the column `clave` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "rolId" INTEGER NOT NULL,
ALTER COLUMN "clave" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
