-- Show related playback_sessions, viewers, videos records (up to 20).
SELECT t0."playback_id" AS "playback_sessions_playback_id",
       t0."started_at" AS "playback_sessions_started_at",
       t1."viewer_id" AS "viewers_viewer_id",
       t1."display_name" AS "viewers_display_name",
       t2."video_id" AS "videos_video_id",
       t2."title" AS "videos_title"
FROM portfolio."playback_sessions" t0
JOIN portfolio."viewers" t1 ON t0."viewer_id" = t1."viewer_id"
JOIN portfolio."videos" t2 ON t0."video_id" = t2."video_id"
ORDER BY t0."playback_id", t1."viewer_id", t2."video_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT t0."playback_id" AS "playback_sessions_playback_id",
       t0."started_at" AS "playback_sessions_started_at",
       t1."viewer_id" AS "viewers_viewer_id",
       t1."display_name" AS "viewers_display_name",
       t2."video_id" AS "videos_video_id",
       t2."title" AS "videos_title"
FROM portfolio."playback_sessions" t0
JOIN portfolio."viewers" t1 ON t0."viewer_id" = t1."viewer_id"
JOIN portfolio."videos" t2 ON t0."video_id" = t2."video_id"
ORDER BY t0."playback_id", t1."viewer_id", t2."video_id"
LIMIT 20;

-- Find videos records where title matches "Coastal Light" (up to 20).
SELECT * FROM portfolio."videos"
WHERE "title" IS NOT DISTINCT FROM 'Coastal Light'
ORDER BY "video_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."videos"
WHERE "title" IS NOT DISTINCT FROM 'Coastal Light'
ORDER BY "video_id"
LIMIT 20;

-- Count playback_sessions records for each viewer_id (up to 20 groups).
SELECT "viewer_id", count(*) AS record_count
FROM portfolio."playback_sessions"
GROUP BY "viewer_id"
ORDER BY record_count DESC, "viewer_id" NULLS LAST
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT "viewer_id", count(*) AS record_count
FROM portfolio."playback_sessions"
GROUP BY "viewer_id"
ORDER BY record_count DESC, "viewer_id" NULLS LAST
LIMIT 20;

-- Count playback_sessions records for each viewer_id (up to 20 groups).
SELECT "viewer_id", count(*) AS record_count
FROM portfolio."playback_sessions"
GROUP BY "viewer_id"
ORDER BY record_count DESC, "viewer_id" NULLS LAST
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT "viewer_id", count(*) AS record_count
FROM portfolio."playback_sessions"
GROUP BY "viewer_id"
ORDER BY record_count DESC, "viewer_id" NULLS LAST
LIMIT 20;

-- Find playback_sessions records where started_at matches "2026-10-30T18:00:00Z" (up to 20).
SELECT * FROM portfolio."playback_sessions"
WHERE "started_at" IS NOT DISTINCT FROM '2026-10-30T18:00:00Z'
ORDER BY "playback_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."playback_sessions"
WHERE "started_at" IS NOT DISTINCT FROM '2026-10-30T18:00:00Z'
ORDER BY "playback_id"
LIMIT 20;
