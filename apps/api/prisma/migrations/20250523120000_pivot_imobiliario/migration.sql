-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "AuthProviderType" AS ENUM ('GOOGLE', 'CREDENTIALS');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('HOUSE', 'APARTMENT');

-- CreateEnum
CREATE TYPE "PropertyPurpose" AS ENUM ('RENT', 'SALE', 'RENT_AND_SALE');

-- CreateEnum
CREATE TYPE "PropertyFeatureType" AS ENUM ('BEDROOM', 'BATHROOM', 'PARKING_SPOT', 'AIR_CONDITIONER', 'BUILT_IN_WARDROBE', 'FURNISHED_KITCHEN', 'OTHER');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('INTERESTED', 'VISIT_SCHEDULED', 'PROPOSAL', 'CLOSED');

-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Admin" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Credentials" (
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Credentials_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "AuthProvider" (
    "uid" TEXT NOT NULL,
    "type" "AuthProviderType" NOT NULL,

    CONSTRAINT "AuthProvider_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Customer" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "displayName" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "BrokerageManager" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "displayName" TEXT,
    "brokerageId" INTEGER,

    CONSTRAINT "BrokerageManager_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Agent" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "displayName" TEXT NOT NULL,
    "image" TEXT,
    "licenseID" TEXT NOT NULL DEFAULT '',
    "brokerageId" INTEGER,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Brokerage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "displayName" TEXT,
    "description" TEXT,

    CONSTRAINT "Brokerage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "displayName" TEXT,
    "description" TEXT,
    "images" TEXT[],
    "propertyType" "PropertyType" NOT NULL DEFAULT 'APARTMENT',
    "purpose" "PropertyPurpose" NOT NULL DEFAULT 'RENT',
    "listPrice" DOUBLE PRECISION,
    "brokerageId" INTEGER,
    "responsibleAgentId" TEXT NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "propertyId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyFeature" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "displayName" TEXT,
    "type" "PropertyFeatureType" NOT NULL DEFAULT 'OTHER',
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "propertyId" INTEGER NOT NULL,

    CONSTRAINT "PropertyFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "listPriceAtInquiry" DOUBLE PRECISION,
    "totalPrice" DOUBLE PRECISION,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "contactNotes" TEXT,
    "phoneNumber" TEXT,
    "passcode" TEXT,
    "status" "InquiryStatus" NOT NULL DEFAULT 'INTERESTED',
    "propertyId" INTEGER NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentAssignment" (
    "inquiryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visitLat" DOUBLE PRECISION,
    "visitLng" DOUBLE PRECISION,
    "assignedAgentId" TEXT,

    CONSTRAINT "AgentAssignment_pkey" PRIMARY KEY ("inquiryId")
);

-- CreateTable
CREATE TABLE "InquiryTimeline" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "InquiryStatus" NOT NULL,
    "inquiryId" INTEGER NOT NULL,
    "agentId" TEXT,
    "managerId" TEXT,

    CONSTRAINT "InquiryTimeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT,
    "customerId" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verification" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "adminId" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("propertyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_email_key" ON "Credentials"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BrokerageManager_brokerageId_key" ON "BrokerageManager"("brokerageId");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_brokerageId_uid_key" ON "Agent"("brokerageId", "uid");

-- CreateIndex
CREATE UNIQUE INDEX "Address_propertyId_key" ON "Address"("propertyId");

-- CreateIndex
CREATE INDEX "Inquiry_startTime_endTime_idx" ON "Inquiry"("startTime", "endTime");

-- CreateIndex
CREATE INDEX "InquiryTimeline_inquiryId_idx" ON "InquiryTimeline"("inquiryId");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credentials" ADD CONSTRAINT "Credentials_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthProvider" ADD CONSTRAINT "AuthProvider_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrokerageManager" ADD CONSTRAINT "BrokerageManager_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrokerageManager" ADD CONSTRAINT "BrokerageManager_brokerageId_fkey" FOREIGN KEY ("brokerageId") REFERENCES "Brokerage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_brokerageId_fkey" FOREIGN KEY ("brokerageId") REFERENCES "Brokerage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_brokerageId_fkey" FOREIGN KEY ("brokerageId") REFERENCES "Brokerage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_responsibleAgentId_fkey" FOREIGN KEY ("responsibleAgentId") REFERENCES "Agent"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyFeature" ADD CONSTRAINT "PropertyFeature_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentAssignment" ADD CONSTRAINT "AgentAssignment_assignedAgentId_fkey" FOREIGN KEY ("assignedAgentId") REFERENCES "Agent"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentAssignment" ADD CONSTRAINT "AgentAssignment_inquiryId_fkey" FOREIGN KEY ("inquiryId") REFERENCES "Inquiry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InquiryTimeline" ADD CONSTRAINT "InquiryTimeline_inquiryId_fkey" FOREIGN KEY ("inquiryId") REFERENCES "Inquiry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InquiryTimeline" ADD CONSTRAINT "InquiryTimeline_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InquiryTimeline" ADD CONSTRAINT "InquiryTimeline_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "BrokerageManager"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "Verification_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "Verification_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
