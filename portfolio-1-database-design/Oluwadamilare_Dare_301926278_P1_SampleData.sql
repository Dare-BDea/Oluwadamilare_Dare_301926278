-- Fictional sample records for Online Streaming / Video Platform.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."viewers" ("viewer_id", "display_name", "email", "created_at") VALUES (101, 'Avery Chen', 'avery.chen@example.test', '2026-01-15T10:00:00Z');
INSERT INTO portfolio."viewers" ("viewer_id", "display_name", "email", "created_at") VALUES (102, 'Jordan Lee', 'jordan.lee@example.test', '2026-02-20T14:30:00Z');
INSERT INTO portfolio."videos" ("video_id", "title", "release_date", "duration_seconds", "is_published") VALUES (201, 'Coastal Light', '2025-11-05', 1800, TRUE);
INSERT INTO portfolio."videos" ("video_id", "title", "release_date", "duration_seconds", "is_published") VALUES (202, 'Forest Paths', '2026-03-12', 2400, TRUE);
INSERT INTO portfolio."playback_sessions" ("playback_id", "viewer_id", "video_id", "started_at", "ended_at", "position_seconds", "completed") VALUES (301, 101, 201, '2026-10-30T18:00:00Z', NULL, 420, FALSE);
INSERT INTO portfolio."playback_sessions" ("playback_id", "viewer_id", "video_id", "started_at", "ended_at", "position_seconds", "completed") VALUES (302, 102, 202, '2026-10-29T09:15:00Z', '2026-10-29T09:55:00Z', 2400, TRUE);
COMMIT;
