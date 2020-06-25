/* Delete a car by id */
DELETE
FROM cars
WHERE id = $1
RETURNING *