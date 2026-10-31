# Online Streaming / Video Platform — database design

My case study records viewers, videos, playback_sessions.

## Users

- Viewers watching published videos
- Catalog staff reviewing video availability
- Analysts summarizing playback activity

## Main operations

- Register viewers and catalog videos
- Start and update playback sessions
- Find recent viewing activity and summarize watch progress

## Entities

| Entity | Information stored |
| --- | --- |
| viewers | Stores synthetic viewer profile details. |
| videos | Stores video catalog metadata and publication status. |
| playback_sessions | Tracks a viewer's playback of one video, including progress and session times. |

## viewers

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| viewer_id | BIGINT | PK | Yes |
| display_name | TEXT |  | Yes |
| email | TEXT | Unique | Yes |
| created_at | TIMESTAMPTZ |  | Yes |
- Unique key: (email).

## videos

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| video_id | BIGINT | PK | Yes |
| title | TEXT |  | Yes |
| release_date | DATE |  | Yes |
| duration_seconds | INTEGER |  | Yes |
| is_published | BOOLEAN |  | Yes |


## playback_sessions

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| playback_id | BIGINT | PK | Yes |
| viewer_id | BIGINT | FK | Yes |
| video_id | BIGINT | FK | Yes |
| started_at | TIMESTAMPTZ |  | Yes |
| ended_at | TIMESTAMPTZ |  | No |
| position_seconds | INTEGER |  | Yes |
| completed | BOOLEAN |  | Yes |
- viewer_id → viewers.viewer_id
- video_id → videos.video_id

## Relationships and business rules

- Each viewer email identifies at most one viewer.
- Every playback session must reference an existing viewer.
- Every playback session must reference an existing video.
- A catalog video must have a duration greater than zero seconds.
- Playback position must be zero or greater.
- A partial unique constraint on viewer_id and video_id, applying only to rows with no ended_at value, prevents concurrent duplicate active sessions for the same viewer and video.

## Assumptions

- All records and identifiers are synthetic; identifiers are globally unique across entity types.
- Timestamps use UTC, and each playback session refers to exactly one viewer and one video.
- A session is active when it has no end timestamp; a viewer may have at most one active session for the same video.
- Worked normalization example: playback_sessions has foreign keys to viewers and videos, so viewer names and video titles are stored once in their respective tables rather than repeated in each session.

