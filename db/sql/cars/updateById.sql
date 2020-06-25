/* Update a car by id */
UPDATE cars
SET name        = $2,
    image_url   = $3,
    description = $4
WHERE id = $1
RETURNING *