const bcrypt = require("bcrypt");
const pool = require("../utils/database");

// list artists with pagination
const getArtists = async (req, res) => {
  const client = await pool.connect();

  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const offset = (page - 1) * limit;

  try {
    // check if artists table exists
    tableExists = await client.query(
      `
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_name = 'artists'
        )
        `
    );
    if (!tableExists.rows[0].exists)
      return res.status(200).send({ data: { artists: [] } });

    // send artists list
    artists = await client.query(
      `
      SELECT id, name, dob, gender, address, first_release_year, no_of_albums_released
      FROM artists
      LIMIT $1 OFFSET $2
    `,
      [limit, offset]
    );
    return res.status(200).send({ data: { artists: artists.rows } });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: "An error occurred fetching artists" });
  } finally {
    // release the connection pool
    client.release();
  }
};

const createArtist = async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      name,
      dob,
      gender,
      address,
      first_release_year,
      no_of_albums_released,
    } = req.body;

    await client.query("BEGIN");

    // create artists table
    await client.query(`
      CREATE TABLE IF NOT EXISTS artists (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        dob DATE NOT NULL,
        gender gender NOT NULL,
        address VARCHAR(255) NOT NULL,
        first_release_year INTEGER NOT NULL,
        no_of_albums_released INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // insert the artist details
    const artist = await client.query(
      `
        INSERT INTO artists (name, dob, gender, address, first_release_year,no_of_albums_released)
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING id
      `,
      [name, dob, gender, address, first_release_year, no_of_albums_released]
    );

    await client.query("COMMIT");
    return res.status(201).send({ data: { id: artist.rows[0].id } });
  } catch (err) {
    console.log(err);
    await client.query("ROLLBACK");
    res.status(500).json({ error: "An error occurred while creating artist" });
  } finally {
    // release the connection pool
    client.release();
  }
};

const updateArtist = async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    const { dob, gender, address, first_release_year, no_of_albums_released } =
      req.body;

    await client.query("BEGIN");

    // Update the artists record in the database
    const result = await client.query(
      `
      UPDATE artists
      SET dob = COALESCE($1, dob),
          gender = COALESCE($2, gender),
          address = COALESCE($3, address),
          first_release_year = COALESCE($4, first_release_year),
          no_of_albums_released = COALESCE($5, no_of_albums_released),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
      `,
      [dob, gender, address, first_release_year, no_of_albums_released, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Artist not found" });
    }
    await client.query("COMMIT");

    // Return the updated artists record
    return res.status(200).json({ data: { artist: result.rows[0] } });
  } catch (err) {
    console.log(err);
    await client.query("ROLLBACK");
    res.status(500).json({ error: "An error occurred while updating artist" });
  } finally {
    // release the connection pool
    client.release();
  }
};

const deleteArtist = async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;

    await client.query("BEGIN");

    // delete artist
    const artist = await client.query(
      `
      DELETE FROM artists
        WHERE id = $1
      `,
      [id]
    );
    if (artist.rowCount === 0) {
      return res
        .status(404)
        .json({ error: `Artist with ID ${id} doesn't exist` });
    }
    await client.query("COMMIT");

    // Return response
    return res
      .status(200)
      .json({ data: `Artist with ID ${id} deleted successfully` });
  } catch (err) {
    console.log(err);
    await client.query("ROLLBACK");
    res.status(500).json({ error: "An error occurred while updating artist" });
  } finally {
    // release the connection pool
    client.release();
  }
};
module.exports = { getArtists, createArtist, updateArtist, deleteArtist };
