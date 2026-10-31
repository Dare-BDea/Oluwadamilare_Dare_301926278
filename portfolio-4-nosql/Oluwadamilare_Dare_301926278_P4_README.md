# Portfolio 4 — NoSQL and Advanced Data Models

I used MongoDB collection playback_events for playback_started and progress_updated events. These are fictional event examples based on playback_sessions, viewers, videos.

## Document model

| Field | Meaning |
| --- | --- |
| _id | Unique string event ID |
| eventType | One of the two selected case event labels |
| occurredAt | Native BSON Date; sample timestamps are in 2030 |
| source | Original entity, primary key and saved JSON snapshot |
| embedded | Linked record snapshots read with the event |
| references | Keys for linked sources kept outside the embedded snapshots |
| details | Event metadata whose fields vary |

Related viewers, videos details are stored as snapshots with the event. This makes an event readable in one document. It duplicates some information, and later SQL changes do not automatically update the snapshots. PostgreSQL continues to enforce the relational rules.

## Example document

```javascript
{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "playback_started",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "playback_sessions",
        "key": {
            "playback_id": 301
        },
        "snapshot": {
            "playback_id": 301,
            "viewer_id": 101,
            "video_id": 201,
            "started_at": "2026-10-30T18:00:00Z",
            "ended_at": null,
            "position_seconds": 420,
            "completed": false
        }
    },
    "embedded": {
        "viewers": [
            {
                "key": {
                    "viewer_id": 101
                },
                "snapshot": {
                    "viewer_id": 101,
                    "display_name": "Avery Chen",
                    "email": "avery.chen@example.test",
                    "created_at": "2026-01-15T10:00:00Z"
                },
                "via": [
                    "playback_sessions.viewer_id → viewers"
                ]
            }
        ],
        "videos": [
            {
                "key": {
                    "video_id": 201
                },
                "snapshot": {
                    "video_id": 201,
                    "title": "Coastal Light",
                    "release_date": "2025-11-05",
                    "duration_seconds": 1800,
                    "is_published": true
                },
                "via": [
                    "playback_sessions.video_id → videos"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}
```

## Queries and results

| Query | Returned documents |
| --- | --- |
| Find the first sample event type (up to five documents). | 2 |
| Find events for the first source record using nested key fields (up to five). | 2 |
| Find events in the sample time range using a MongoDB Date filter (up to five). | 4 |
| Count documents for each event type. | 2 |

## 1. Find the first sample event type (up to five documents).

```javascript
db.getCollection("playback_events").find({"eventType":"playback_started"}).sort({_id:1}).limit(5).toArray();
```

Selected fields from the returned documents:

```json
[
  {
    "_id": "event_000001",
    "eventType": "playback_started",
    "occurredAt": {
      "$date": "2030-01-01T10:00:00Z"
    },
    "source": {
      "playback_id": 301
    }
  },
  {
    "_id": "event_000003",
    "eventType": "playback_started",
    "occurredAt": {
      "$date": "2030-01-01T10:02:00Z"
    },
    "source": {
      "playback_id": 302
    }
  }
]
```

## 2. Find events for the first source record using nested key fields (up to five).

```javascript
db.getCollection("playback_events").find({"source.key.playback_id":301}).sort({_id:1}).limit(5).toArray();
```

Selected fields from the returned documents:

```json
[
  {
    "_id": "event_000001",
    "eventType": "playback_started",
    "occurredAt": {
      "$date": "2030-01-01T10:00:00Z"
    },
    "source": {
      "playback_id": 301
    }
  },
  {
    "_id": "event_000002",
    "eventType": "progress_updated",
    "occurredAt": {
      "$date": "2030-01-01T10:01:00Z"
    },
    "source": {
      "playback_id": 301
    }
  }
]
```

## 3. Find events in the sample time range using a MongoDB Date filter (up to five).

```javascript
db.getCollection("playback_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray();
```

Selected fields from the returned documents:

```json
[
  {
    "_id": "event_000001",
    "eventType": "playback_started",
    "occurredAt": {
      "$date": "2030-01-01T10:00:00Z"
    },
    "source": {
      "playback_id": 301
    }
  },
  {
    "_id": "event_000002",
    "eventType": "progress_updated",
    "occurredAt": {
      "$date": "2030-01-01T10:01:00Z"
    },
    "source": {
      "playback_id": 301
    }
  },
  {
    "_id": "event_000003",
    "eventType": "playback_started",
    "occurredAt": {
      "$date": "2030-01-01T10:02:00Z"
    },
    "source": {
      "playback_id": 302
    }
  },
  {
    "_id": "event_000004",
    "eventType": "progress_updated",
    "occurredAt": {
      "$date": "2030-01-01T10:03:00Z"
    },
    "source": {
      "playback_id": 302
    }
  }
]
```

## 4. Count documents for each event type.

```javascript
db.getCollection("playback_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray();
```

| _id | documentCount |
| --- | --- |
| playback_started | 2 |
| progress_updated | 2 |

## Validation and suitability

MongoDB inserted 4 documents. An invalid date type was rejected with code 121 and a repeated event ID with 11000. The collection still contained 4 valid documents. The compound eventType/occurredAt index supports those access fields; this exercise does not measure its speed.

The details field can vary across event types, while the common fields have a validator. Events can be added as separate documents rather than growing one large history record.

## Run the script

Connect mongosh to a fresh exercise database and run Oluwadamilare_Dare_301926278_P4_MongoDB.js. It selects portfolio_nosql, creates the collection, inserts the sample documents and displays the query results. [Implementation evidence](screenshots/Oluwadamilare_Dare_301926278_P4_DocumentsAndQueries.png).

## References

- [MongoDB — data modelling](https://www.mongodb.com/docs/manual/data-modeling/)

