-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Profile" (
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "body_height" INTEGER,
    "body_weight" INTEGER,
    "age" INTEGER,
    "sex" BOOLEAN,
    CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HealthData" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "measure_type_id" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    CONSTRAINT "HealthData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HealthData_measure_type_id_fkey" FOREIGN KEY ("measure_type_id") REFERENCES "MeasureType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MeasureType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "MeasureType_name_key" ON "MeasureType"("name");
