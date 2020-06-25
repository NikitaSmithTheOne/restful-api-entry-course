/* Find a car by id */
SELECT id          AS "id",
       name        AS "name",
       image_url   AS "imageUrl",
       description AS "description"
FROM cars
WHERE id = $1