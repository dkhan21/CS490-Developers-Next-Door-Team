-- CreateTable
CREATE TABLE "UserLoginToken" (
    "email" TEXT NOT NULL,
    "token" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserLoginToken_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserLoginToken_email_key" ON "UserLoginToken"("email");
