/* Add a new car */
INSERT INTO cars (name, image_url, description)
VALUES ($1, $2, $3)
RETURNING *