### Table: ratings

Moodle ratings.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **component**: `VARCHAR(100)` NOT NULL, The component to which this rating belongs.
- **context_id**: `BIGINT` NOT NULL, Foreign key to the context ID.
- **item_id**: `BIGINT` NOT NULL, The ID of the item being rated.
- **rating**: `INTEGER` NOT NULL, The rating value.
- **rating_area**: `VARCHAR(50)` NOT NULL, The area within the component where this rating is applied.
- **scale_id**: `BIGINT` NOT NULL, Foreign key to the scale ID.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the rating was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the rating was last modified.
- **user_id**: `BIGINT` NOT NULL, Foreign key to the user ID of the person who gave the rating.

#### Indexes

- `CREATE INDEX idx_component ON rating(component);`
- `CREATE INDEX idx_context_id ON rating(context_id);`
- `CREATE INDEX idx_item_id ON rating(item_id);`
- `CREATE INDEX idx_scale_id ON rating(scale_id);`
- `CREATE INDEX idx_user_id ON rating(user_id);`
