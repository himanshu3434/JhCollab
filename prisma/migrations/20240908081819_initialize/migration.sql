-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Processing', 'Completed', 'Error');

-- CreateTable
CREATE TABLE "room" (
    "id" SERIAL NOT NULL,
    "roomId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Processing',
    "error" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "room_roomId_key" ON "room"("roomId");
