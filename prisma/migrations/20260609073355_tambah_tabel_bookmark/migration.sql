-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Collection_slug_user_email_key" ON "Collection"("slug", "user_email");
