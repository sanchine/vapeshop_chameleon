const Pool = require('pg').Pool

const pool = new Pool({
    user: "admin",
    host: "localhost",
    database: 'vape_db',
    password: 'admin',
    port: 5432
})

module.exports = {
    pool
}