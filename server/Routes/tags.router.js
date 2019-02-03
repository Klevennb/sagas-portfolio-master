const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const sqlText = `
    SELECT * FROM "tags"
    `;
    pool.query(sqlText).then((sqlResult) => {
        console.log(sqlResult);
        res.send(sqlResult.rows);
    }).catch((sqlError) => {
        console.log(`Error in project GET: ${sqlError}`);
        res.sendStatus(500);
    });
});
module.exports = router;