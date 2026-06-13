/*
  Warnings:

  - The values [LOCAL] on the enum `AuthProvider` will be removed. If these variants are still used in the database, this will fail.
  - The `role` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[avatarFileId]` on the table `CreatorProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[avatarFileId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "AccountRole" AS ENUM ('USER', 'CREATOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "CreatorProfileStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'REVOKED');

-- CreateEnum
CREATE TYPE "TrackStatus" AS ENUM ('PENDING_REVIEW', 'PUBLISHED', 'BLOCKED', 'DELETED');

-- CreateEnum
CREATE TYPE "TrackSource" AS ENUM ('JAMENDO', 'USER_UPLOAD');

-- CreateEnum
CREATE TYPE "PlaylistVisibility" AS ENUM ('PRIVATE', 'PUBLIC', 'UNLISTED');

-- CreateEnum
CREATE TYPE "StoredFileUploadStatus" AS ENUM ('PENDING', 'READY', 'FAILED');

-- CreateEnum
CREATE TYPE "StoredFileKind" AS ENUM ('TRACK_AUDIO', 'TRACK_COVER', 'TRACK_LYRICS', 'PROFILE_AVATAR', 'CREATOR_AVATAR', 'PLAYLIST_COVER');

-- CreateEnum
CREATE TYPE "StoredFileVisibility" AS ENUM ('PRIVATE', 'PUBLIC');

-- AlterEnum
BEGIN;
CREATE TYPE "AuthProvider_new" AS ENUM ('EMAIL_PASSWORD', 'GITHUB', 'TELEGRAM');
ALTER TABLE "AuthIdentity" ALTER COLUMN "provider" TYPE "AuthProvider_new" USING ("provider"::text::"AuthProvider_new");
ALTER TYPE "AuthProvider" RENAME TO "AuthProvider_old";
ALTER TYPE "AuthProvider_new" RENAME TO "AuthProvider";
DROP TYPE "public"."AuthProvider_old";
COMMIT;

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "role",
ADD COLUMN     "role" "AccountRole" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "CreatorProfile" ADD COLUMN     "avatarFileId" TEXT,
ADD COLUMN     "status" "CreatorProfileStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "avatarFileId" TEXT,
ADD COLUMN     "avatarUrl" TEXT;

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "source" "TrackSource" NOT NULL,
    "externalId" TEXT,
    "status" "TrackStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "title" TEXT NOT NULL,
    "artistName" TEXT,
    "albumName" TEXT,
    "durationSec" INTEGER,
    "coverUrl" TEXT,
    "audioUrl" TEXT,
    "uploadedByAccountId" TEXT,
    "creatorProfileId" TEXT,
    "audioFileId" TEXT,
    "coverFileId" TEXT,
    "publishedAt" TIMESTAMP(3),
    "blockedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "moderationReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikedTrack" (
    "accountId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LikedTrack_pkey" PRIMARY KEY ("accountId","trackId")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "id" TEXT NOT NULL,
    "ownerAccountId" TEXT NOT NULL,
    "visibility" "PlaylistVisibility" NOT NULL DEFAULT 'PRIVATE',
    "name" TEXT NOT NULL,
    "description" TEXT,
    "coverUrl" TEXT,
    "coverFileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaylistEntry" (
    "id" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlaylistEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecentlyPlayedTrack" (
    "accountId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "lastPlayedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastPlayedPositionSec" INTEGER,
    "playCount" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "RecentlyPlayedTrack_pkey" PRIMARY KEY ("accountId","trackId")
);

-- CreateTable
CREATE TABLE "PlaybackHistory" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "playedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "playedDurationSec" INTEGER,

    CONSTRAINT "PlaybackHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoredFile" (
    "id" TEXT NOT NULL,
    "uploadedByAccountId" TEXT,
    "kind" "StoredFileKind" NOT NULL,
    "visibility" "StoredFileVisibility" NOT NULL DEFAULT 'PRIVATE',
    "storageDriver" TEXT NOT NULL DEFAULT 'S3_COMPATIBLE',
    "bucket" TEXT NOT NULL,
    "objectKey" TEXT NOT NULL,
    "originalFileName" TEXT,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "checksum" TEXT,
    "uploadStatus" "StoredFileUploadStatus" NOT NULL DEFAULT 'PENDING',
    "width" INTEGER,
    "height" INTEGER,
    "durationSec" INTEGER,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoredFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Track_audioFileId_key" ON "Track"("audioFileId");

-- CreateIndex
CREATE INDEX "Track_creatorProfileId_idx" ON "Track"("creatorProfileId");

-- CreateIndex
CREATE INDEX "Track_status_idx" ON "Track"("status");

-- CreateIndex
CREATE INDEX "Track_uploadedByAccountId_idx" ON "Track"("uploadedByAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Track_source_externalId_key" ON "Track"("source", "externalId");

-- CreateIndex
CREATE INDEX "LikedTrack_trackId_idx" ON "LikedTrack"("trackId");

-- CreateIndex
CREATE INDEX "Playlist_ownerAccountId_idx" ON "Playlist"("ownerAccountId");

-- CreateIndex
CREATE INDEX "PlaylistEntry_playlistId_position_idx" ON "PlaylistEntry"("playlistId", "position");

-- CreateIndex
CREATE INDEX "PlaylistEntry_trackId_idx" ON "PlaylistEntry"("trackId");

-- CreateIndex
CREATE INDEX "RecentlyPlayedTrack_accountId_lastPlayedAt_idx" ON "RecentlyPlayedTrack"("accountId", "lastPlayedAt");

-- CreateIndex
CREATE INDEX "RecentlyPlayedTrack_trackId_idx" ON "RecentlyPlayedTrack"("trackId");

-- CreateIndex
CREATE INDEX "PlaybackHistory_accountId_playedAt_idx" ON "PlaybackHistory"("accountId", "playedAt");

-- CreateIndex
CREATE INDEX "PlaybackHistory_trackId_idx" ON "PlaybackHistory"("trackId");

-- CreateIndex
CREATE INDEX "StoredFile_uploadedByAccountId_idx" ON "StoredFile"("uploadedByAccountId");

-- CreateIndex
CREATE INDEX "StoredFile_kind_idx" ON "StoredFile"("kind");

-- CreateIndex
CREATE INDEX "StoredFile_uploadStatus_idx" ON "StoredFile"("uploadStatus");

-- CreateIndex
CREATE UNIQUE INDEX "StoredFile_storageDriver_bucket_objectKey_key" ON "StoredFile"("storageDriver", "bucket", "objectKey");

-- CreateIndex
CREATE UNIQUE INDEX "CreatorProfile_avatarFileId_key" ON "CreatorProfile"("avatarFileId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_avatarFileId_key" ON "Profile"("avatarFileId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_avatarFileId_fkey" FOREIGN KEY ("avatarFileId") REFERENCES "StoredFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatorProfile" ADD CONSTRAINT "CreatorProfile_avatarFileId_fkey" FOREIGN KEY ("avatarFileId") REFERENCES "StoredFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_uploadedByAccountId_fkey" FOREIGN KEY ("uploadedByAccountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_creatorProfileId_fkey" FOREIGN KEY ("creatorProfileId") REFERENCES "CreatorProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_audioFileId_fkey" FOREIGN KEY ("audioFileId") REFERENCES "StoredFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_coverFileId_fkey" FOREIGN KEY ("coverFileId") REFERENCES "StoredFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedTrack" ADD CONSTRAINT "LikedTrack_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedTrack" ADD CONSTRAINT "LikedTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_ownerAccountId_fkey" FOREIGN KEY ("ownerAccountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_coverFileId_fkey" FOREIGN KEY ("coverFileId") REFERENCES "StoredFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistEntry" ADD CONSTRAINT "PlaylistEntry_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistEntry" ADD CONSTRAINT "PlaylistEntry_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecentlyPlayedTrack" ADD CONSTRAINT "RecentlyPlayedTrack_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecentlyPlayedTrack" ADD CONSTRAINT "RecentlyPlayedTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaybackHistory" ADD CONSTRAINT "PlaybackHistory_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaybackHistory" ADD CONSTRAINT "PlaybackHistory_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoredFile" ADD CONSTRAINT "StoredFile_uploadedByAccountId_fkey" FOREIGN KEY ("uploadedByAccountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
