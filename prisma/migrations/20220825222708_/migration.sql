/*
  Warnings:

  - Made the column `postion` on table `ProfilePageLocations` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProfilePageLocations" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "redirect" TEXT NOT NULL,
    "postion" INTEGER NOT NULL,
    "accessStatuses" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL
);
INSERT INTO "new_ProfilePageLocations" ("accessStatuses", "id", "isActive", "postion", "redirect", "text") SELECT "accessStatuses", "id", "isActive", "postion", "redirect", "text" FROM "ProfilePageLocations";
DROP TABLE "ProfilePageLocations";
ALTER TABLE "new_ProfilePageLocations" RENAME TO "ProfilePageLocations";
CREATE UNIQUE INDEX "ProfilePageLocations_id_key" ON "ProfilePageLocations"("id");
CREATE UNIQUE INDEX "ProfilePageLocations_postion_key" ON "ProfilePageLocations"("postion");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
