# Migration `20200605162333`

This migration has been generated by Naoufel Berrada at 6/5/2020, 4:23:33 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `naoufelnotes`.`Comment` DROP FOREIGN KEY `Comment_ibfk_1`,
DROP COLUMN `noteId`,
ADD COLUMN `note_id` int NOT NULL ,
DROP COLUMN `date`,
ADD COLUMN `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ;

CREATE  INDEX `note_id` ON `naoufelnotes`.`Comment`(`note_id`)

ALTER TABLE `naoufelnotes`.`Comment` ADD FOREIGN KEY (`note_id`) REFERENCES `naoufelnotes`.`Note`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200605154459..20200605162333
--- datamodel.dml
+++ datamodel.dml
@@ -2,19 +2,23 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "mysql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
 }
 model Comment {
   id        Int @id @default(autoincrement())
+  note_id   Int
   content   String
-  date      Int
+  date      DateTime @default(now())
+  Note      Note @relation(fields: [note_id], references: [id])
+
+  @@index([note_id], name: "note_id")
 }
 model Note {
   id        Int @id @default(autoincrement())
```


