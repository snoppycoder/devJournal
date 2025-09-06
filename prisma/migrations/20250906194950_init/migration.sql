-- AlterTable
ALTER TABLE "public"."Entry" ADD COLUMN     "dislike" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "like" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."_Reactions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Reactions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Reactions_B_index" ON "public"."_Reactions"("B");

-- AddForeignKey
ALTER TABLE "public"."_Reactions" ADD CONSTRAINT "_Reactions_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_Reactions" ADD CONSTRAINT "_Reactions_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
