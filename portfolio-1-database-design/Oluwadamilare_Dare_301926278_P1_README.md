# Portfolio 1 — Database Design and Modelling

I organised the data into viewers, videos, playback_sessions. The design document explains the fields, keys, relationships and business rules. The normalisation document shows the sample tables at 1NF, 2NF and 3NF.

## Database checks

| Table | Rows |
| --- | --- |
| viewers | 2 |
| videos | 2 |
| playback_sessions | 2 |

The 10 invalid inserts were rejected at their expected constraints, and the valid sample rows remained unchanged.

## Files

- [Design](Oluwadamilare_Dare_301926278_P1_Design.md)
- [ER diagram](Oluwadamilare_Dare_301926278_P1_ERDiagram.md)
- [Normalisation](Oluwadamilare_Dare_301926278_P1_Normalisation.md)
- [Schema](Oluwadamilare_Dare_301926278_P1_Schema.sql)
- [Sample data](Oluwadamilare_Dare_301926278_P1_SampleData.sql)
- [Constraint tests](Oluwadamilare_Dare_301926278_P1_ConstraintTests.sql)
- [Table and constraint evidence](screenshots/Oluwadamilare_Dare_301926278_P1_DatabaseResults.png)

## Run the SQL

Create a fresh PostgreSQL database. Run the schema first, then the sample data. Run the deliberately invalid statements in ConstraintTests.sql individually outside a transaction; each is expected to produce an error.

## References

- [PostgreSQL — constraints](https://www.postgresql.org/docs/17/ddl-constraints.html)

