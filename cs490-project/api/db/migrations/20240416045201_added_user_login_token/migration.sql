-- CreateTable
CREATE TABLE "UserLoginToken" (
    "email" TEXT NOT NULL PRIMARY KEY,
    "token" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "UserLoginToken_email_key" ON "UserLoginToken"("email");
