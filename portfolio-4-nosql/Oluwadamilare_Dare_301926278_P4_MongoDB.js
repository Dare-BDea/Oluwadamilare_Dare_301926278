// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("playback_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("playback_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "playback_started",
                    "progress_updated"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "playback_sessions"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "playback_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("playback_events").insertMany([
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
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "progress_updated",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
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
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "attributes": [
                {
                    "entity": "playback_sessions",
                    "key": {
                        "playback_id": 301
                    },
                    "field": "position_seconds",
                    "value": 420
                }
            ],
            "examples": {
                "device_type": "illustrative device_type",
                "client_version": "illustrative client_version",
                "network_type": "illustrative network_type"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "playback_started",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "playback_sessions",
            "key": {
                "playback_id": 302
            },
            "snapshot": {
                "playback_id": 302,
                "viewer_id": 102,
                "video_id": 202,
                "started_at": "2026-10-29T09:15:00Z",
                "ended_at": "2026-10-29T09:55:00Z",
                "position_seconds": 2400,
                "completed": true
            }
        },
        "embedded": {
            "viewers": [
                {
                    "key": {
                        "viewer_id": 102
                    },
                    "snapshot": {
                        "viewer_id": 102,
                        "display_name": "Jordan Lee",
                        "email": "jordan.lee@example.test",
                        "created_at": "2026-02-20T14:30:00Z"
                    },
                    "via": [
                        "playback_sessions.viewer_id → viewers"
                    ]
                }
            ],
            "videos": [
                {
                    "key": {
                        "video_id": 202
                    },
                    "snapshot": {
                        "video_id": 202,
                        "title": "Forest Paths",
                        "release_date": "2026-03-12",
                        "duration_seconds": 2400,
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
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "progress_updated",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "playback_sessions",
            "key": {
                "playback_id": 302
            },
            "snapshot": {
                "playback_id": 302,
                "viewer_id": 102,
                "video_id": 202,
                "started_at": "2026-10-29T09:15:00Z",
                "ended_at": "2026-10-29T09:55:00Z",
                "position_seconds": 2400,
                "completed": true
            }
        },
        "embedded": {
            "viewers": [
                {
                    "key": {
                        "viewer_id": 102
                    },
                    "snapshot": {
                        "viewer_id": 102,
                        "display_name": "Jordan Lee",
                        "email": "jordan.lee@example.test",
                        "created_at": "2026-02-20T14:30:00Z"
                    },
                    "via": [
                        "playback_sessions.viewer_id → viewers"
                    ]
                }
            ],
            "videos": [
                {
                    "key": {
                        "video_id": 202
                    },
                    "snapshot": {
                        "video_id": 202,
                        "title": "Forest Paths",
                        "release_date": "2026-03-12",
                        "duration_seconds": 2400,
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
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "attributes": [
                {
                    "entity": "playback_sessions",
                    "key": {
                        "playback_id": 302
                    },
                    "field": "position_seconds",
                    "value": 2400
                }
            ],
            "examples": {
                "device_type": "illustrative device_type",
                "client_version": "illustrative client_version",
                "network_type": "illustrative network_type"
            }
        }
    }
]));
  await db.getCollection("playback_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("playback_events").find({"eventType":"playback_started"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("playback_events").find({"source.key.playback_id":301}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("playback_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("playback_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("playback_events").insertOne({...{
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
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("playback_events").insertOne({
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
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("playback_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
