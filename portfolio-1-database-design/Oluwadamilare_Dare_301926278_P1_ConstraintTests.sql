-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. test viewer primary key. Expected: pk_viewers, SQLSTATE 23505.
INSERT INTO portfolio."viewers" ("viewer_id", "display_name", "email", "created_at")
VALUES (101, 'Casey Morgan', 'casey.morgan@example.test', '2026-05-01T08:00:00Z');

-- 2. test viewer unique email. Expected: uq_viewers_0, SQLSTATE 23505.
INSERT INTO portfolio."viewers" ("viewer_id", "display_name", "email", "created_at")
VALUES (401, 'Taylor Quinn', 'avery.chen@example.test', '2026-05-02T08:00:00Z');

-- 3. test viewer not null. Expected: display_name, SQLSTATE 23502.
INSERT INTO portfolio."viewers" ("viewer_id", "display_name", "email", "created_at")
VALUES (402, NULL, 'sam.rivera@example.test', '2026-05-03T08:00:00Z');

-- 4. test video primary key. Expected: pk_videos, SQLSTATE 23505.
INSERT INTO portfolio."videos" ("video_id", "title", "release_date", "duration_seconds", "is_published")
VALUES (201, 'Mountain Morning', '2026-04-10', 1500, TRUE);

-- 5. test session primary key. Expected: pk_playback_sessions, SQLSTATE 23505.
INSERT INTO portfolio."playback_sessions" ("playback_id", "viewer_id", "video_id", "started_at", "ended_at", "position_seconds", "completed")
VALUES (301, 102, 201, '2026-05-04T08:00:00Z', '2026-05-04T08:10:00Z', 600, FALSE);

-- 6. test session viewer foreign key. Expected: fk_playback_sessions_0, SQLSTATE 23503.
INSERT INTO portfolio."playback_sessions" ("playback_id", "viewer_id", "video_id", "started_at", "ended_at", "position_seconds", "completed")
VALUES (403, 9991, 201, '2026-05-05T08:00:00Z', '2026-05-05T08:10:00Z', 300, FALSE);

-- 7. test session video foreign key. Expected: fk_playback_sessions_1, SQLSTATE 23503.
INSERT INTO portfolio."playback_sessions" ("playback_id", "viewer_id", "video_id", "started_at", "ended_at", "position_seconds", "completed")
VALUES (404, 102, 9992, '2026-05-06T08:00:00Z', '2026-05-06T08:10:00Z', 300, FALSE);

-- 8. test video positive duration. Expected: positive_video_duration, SQLSTATE 23514.
INSERT INTO portfolio."videos" ("video_id", "title", "release_date", "duration_seconds", "is_published")
VALUES (405, 'Still Waters', '2026-05-07', 0, FALSE);

-- 9. test session nonnegative position. Expected: nonnegative_playback_position, SQLSTATE 23514.
INSERT INTO portfolio."playback_sessions" ("playback_id", "viewer_id", "video_id", "started_at", "ended_at", "position_seconds", "completed")
VALUES (406, 102, 201, '2026-05-08T08:00:00Z', '2026-05-08T08:10:00Z', -1, FALSE);

-- 10. test session partial unique. Expected: playback_one_active_per_video, SQLSTATE 23505.
INSERT INTO portfolio."playback_sessions" ("playback_id", "viewer_id", "video_id", "started_at", "ended_at", "position_seconds", "completed")
VALUES (407, 101, 201, '2026-05-09T08:00:00Z', NULL, 120, FALSE);
