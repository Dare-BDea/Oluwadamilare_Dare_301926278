-- Online Streaming / Video Platform: tables, keys and business constraints.
-- Run once in a fresh PostgreSQL database.
BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA portfolio;
CREATE TABLE portfolio."viewers" (
  "viewer_id" bigint NOT NULL,
  "display_name" text NOT NULL,
  "email" text NOT NULL,
  "created_at" timestamptz NOT NULL,
  CONSTRAINT "pk_viewers" PRIMARY KEY ("viewer_id"),
  CONSTRAINT "uq_viewers_0" UNIQUE ("email")
);
CREATE TABLE portfolio."videos" (
  "video_id" bigint NOT NULL,
  "title" text NOT NULL,
  "release_date" date NOT NULL,
  "duration_seconds" bigint NOT NULL,
  "is_published" boolean NOT NULL,
  CONSTRAINT "pk_videos" PRIMARY KEY ("video_id")
);
CREATE TABLE portfolio."playback_sessions" (
  "playback_id" bigint NOT NULL,
  "viewer_id" bigint NOT NULL,
  "video_id" bigint NOT NULL,
  "started_at" timestamptz NOT NULL,
  "ended_at" timestamptz,
  "position_seconds" bigint NOT NULL,
  "completed" boolean NOT NULL,
  CONSTRAINT "pk_playback_sessions" PRIMARY KEY ("playback_id")
);
ALTER TABLE portfolio."playback_sessions" ADD CONSTRAINT "fk_playback_sessions_0" FOREIGN KEY ("viewer_id") REFERENCES portfolio."viewers" ("viewer_id");
ALTER TABLE portfolio."playback_sessions" ADD CONSTRAINT "fk_playback_sessions_1" FOREIGN KEY ("video_id") REFERENCES portfolio."videos" ("video_id");
ALTER TABLE portfolio."videos" ADD CONSTRAINT "positive_video_duration" CHECK ("duration_seconds" > 0);
ALTER TABLE portfolio."playback_sessions" ADD CONSTRAINT "nonnegative_playback_position" CHECK ("position_seconds" >= 0);
CREATE UNIQUE INDEX "playback_one_active_per_video" ON portfolio."playback_sessions" ("viewer_id", "video_id") WHERE ("ended_at" IS NULL);
COMMIT;
