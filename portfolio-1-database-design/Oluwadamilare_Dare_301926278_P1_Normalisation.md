# Online Streaming / Video Platform — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| viewer_id | playback_sessions records (list) |
| --- | --- |
| 101 | [301] |
| 102 | [302] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| playback_sessions.playback_id | playback_sessions.viewer_id | playback_sessions.video_id | viewers.viewer_id | viewers.display_name | videos.video_id | videos.title |
| --- | --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | 101 | Avery Chen | 201 | Coastal Light |
| 302 | 102 | 202 | 102 | Jordan Lee | 202 | Forest Paths |

Key: playback_id.

## 2NF: depend on the whole key

The declared candidate keys do not introduce a partial dependency here, so the 1NF rows stay unchanged at this step.

## playback_sessions_example

| playback_sessions.playback_id | playback_sessions.viewer_id | playback_sessions.video_id | viewers.viewer_id | viewers.display_name | videos.video_id | videos.title |
| --- | --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | 101 | Avery Chen | 201 | Coastal Light |
| 302 | 102 | 202 | 102 | Jordan Lee | 202 | Forest Paths |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## viewers

| viewer_id | display_name | email | created_at |
| --- | --- | --- | --- |
| 101 | Avery Chen | avery.chen@example.test | 2026-01-15T10:00:00+00:00 |
| 102 | Jordan Lee | jordan.lee@example.test | 2026-02-20T14:30:00+00:00 |

## videos

| video_id | title | release_date | duration_seconds | is_published |
| --- | --- | --- | --- | --- |
| 201 | Coastal Light | 2025-11-05 | 1800 | true |
| 202 | Forest Paths | 2026-03-12 | 2400 | true |

## playback_sessions

| playback_id | viewer_id | video_id | started_at | ended_at | position_seconds | completed |
| --- | --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | 2026-10-30T18:00:00+00:00 | NULL | 420 | false |
| 302 | 102 | 202 | 2026-10-29T09:15:00+00:00 | 2026-10-29T09:55:00+00:00 | 2400 | true |

## Dependencies

- viewers: (viewer_id) → display_name, email, created_at
- videos: (video_id) → title, release_date, duration_seconds, is_published
- playback_sessions: (playback_id) → viewer_id, video_id, started_at, ended_at, position_seconds, completed

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
