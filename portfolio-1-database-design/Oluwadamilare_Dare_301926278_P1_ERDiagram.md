# Online Streaming / Video Platform — ER diagram

```mermaid
erDiagram
    direction LR
    viewers {
        bigint viewer_id PK
        text display_name
        text email UK
        timestamptz created_at
    }
    videos {
        bigint video_id PK
        text title
        date release_date
        integer duration_seconds
        boolean is_published
    }
    playback_sessions {
        bigint playback_id PK
        bigint viewer_id FK
        bigint video_id FK
        timestamptz started_at
        timestamptz ended_at "Optional"
        integer position_seconds
        boolean completed
    }
    viewers ||--o{ playback_sessions : "viewer_id"
    videos ||--o{ playback_sessions : "video_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Oluwadamilare_Dare_301926278_ERDiagram.png)
