### Table: rating

Moodle ratings.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **component**: `VARCHAR(100)`, The component to which this rating belongs.
- **context_id**: `BIGINT(19)`, Foreign key to the context ID.
- **item_id**: `BIGINT(19)`, The ID of the item being rated.
- **rating**: `BIGINT(19)`, The rating value.
- **rating_area**: `VARCHAR(50)`, The area within the component where this rating is applied.
- **scale_id**: `BIGINT(19)`, Foreign key to the scale ID.
- **created_at**: `BIGINT(19)`, Timestamp of when the rating was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the rating was last modified.
- **user_id**: `BIGINT(19)`, Foreign key to the user ID of the person who gave the rating.
