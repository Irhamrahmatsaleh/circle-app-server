/*
  Warnings:

  - You are about to drop the column `vibeId` on the `likes` table. All the data in the column will be lost.
  - Added the required column `targetId` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_vibeId_fkey";

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "vibeId",
ADD COLUMN     "targetId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "vibes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
