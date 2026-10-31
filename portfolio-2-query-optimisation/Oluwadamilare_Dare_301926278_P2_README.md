# Online Streaming / Video Platform — SQL queries

## 1. Show related playback_sessions, viewers, videos records (up to 20).

```sql
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
```

| playback_sessions_playback_id | playback_sessions_started_at | viewers_viewer_id | viewers_display_name | videos_video_id | videos_title |
| --- | --- | --- | --- | --- | --- |
| 301 | 2026-10-30T18:00:00+00:00 | 101 | Avery Chen | 201 | Coastal Light |
| 302 | 2026-10-29T09:15:00+00:00 | 102 | Jordan Lee | 202 | Forest Paths |

## 2. Find videos records where title matches "Coastal Light" (up to 20).

```sql
SELECT * FROM portfolio."videos"
WHERE "title" IS NOT DISTINCT FROM 'Coastal Light'
ORDER BY "video_id"
LIMIT 20;
```

| video_id | title | release_date | duration_seconds | is_published |
| --- | --- | --- | --- | --- |
| 201 | Coastal Light | 2025-11-05 | 1800 | true |

## 3. Count playback_sessions records for each viewer_id (up to 20 groups).

```sql
SELECT "viewer_id", count(*) AS record_count
FROM portfolio."playback_sessions"
GROUP BY "viewer_id"
ORDER BY record_count DESC, "viewer_id" NULLS LAST
LIMIT 20;
```

| viewer_id | record_count |
| --- | --- |
| 101 | 1 |
| 102 | 1 |

## 4. Count playback_sessions records for each viewer_id (up to 20 groups).

```sql
SELECT "viewer_id", count(*) AS record_count
FROM portfolio."playback_sessions"
GROUP BY "viewer_id"
ORDER BY record_count DESC, "viewer_id" NULLS LAST
LIMIT 20;
```

| viewer_id | record_count |
| --- | --- |
| 101 | 1 |
| 102 | 1 |

## 5. Find playback_sessions records where started_at matches "2026-10-30T18:00:00Z" (up to 20).

```sql
SELECT * FROM portfolio."playback_sessions"
WHERE "started_at" IS NOT DISTINCT FROM '2026-10-30T18:00:00Z'
ORDER BY "playback_id"
LIMIT 20;
```

| playback_id | viewer_id | video_id | started_at | ended_at | position_seconds | completed |
| --- | --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | 2026-10-30T18:00:00+00:00 | NULL | 420 | false |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 1.225 | 1.225, 1.224, 1.227 | Sort → Seq Scan | 139 |
| After index | 0.203 | 0.2, 0.203, 0.203 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 30 |

The median execution time changed from 1.225 ms to 0.203 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=1.195..1.197 rows=25 loops=1)
  Seq Scan on playback_sessions (actual time=0.015..1.161 rows=25 loops=1)
Planning Time: 0.384 ms
Execution Time: 1.225 ms
```

### Before index, run 2

```text
Sort (actual time=1.195..1.197 rows=25 loops=1)
  Seq Scan on playback_sessions (actual time=0.016..1.159 rows=25 loops=1)
Planning Time: 0.404 ms
Execution Time: 1.224 ms
```

### Before index, run 3

```text
Sort (actual time=1.195..1.197 rows=25 loops=1)
  Seq Scan on playback_sessions (actual time=0.016..1.159 rows=25 loops=1)
Planning Time: 0.372 ms
Execution Time: 1.227 ms
```

### After index, run 1

```text
Sort (actual time=0.141..0.143 rows=25 loops=1)
  Bitmap Heap Scan on playback_sessions (actual time=0.03..0.104 rows=25 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.017..0.017 rows=25 loops=1)
Planning Time: 0.578 ms
Execution Time: 0.2 ms
```

### After index, run 2

```text
Sort (actual time=0.143..0.145 rows=25 loops=1)
  Bitmap Heap Scan on playback_sessions (actual time=0.031..0.107 rows=25 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.017..0.017 rows=25 loops=1)
Planning Time: 0.622 ms
Execution Time: 0.203 ms
```

### After index, run 3

```text
Sort (actual time=0.143..0.145 rows=25 loops=1)
  Bitmap Heap Scan on playback_sessions (actual time=0.031..0.105 rows=25 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.017..0.018 rows=25 loops=1)
Planning Time: 0.595 ms
Execution Time: 0.203 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Oluwadamilare_Dare_301926278_P2_Queries.sql, then Oluwadamilare_Dare_301926278_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Oluwadamilare_Dare_301926278_P2_QueryResults.png) · [Index comparison](screenshots/Oluwadamilare_Dare_301926278_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

