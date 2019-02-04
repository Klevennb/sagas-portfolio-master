const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const sqlText = `
    SELECT * FROM "projects"
    `;
    pool.query(sqlText).then((sqlResult) => {
        console.log(sqlResult);
        res.send(sqlResult.rows);
    }).catch((sqlError) => {
        console.log(`Error in project GET: ${sqlError}`);
        res.sendStatus(500);
    });
});
router.post('/', (req,res) => {
    let newProject = req.body;
    const sqlText = `INSERT INTO "projects" (name, description,thumbnail, website, github, date_completed, tag_id)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    pool.query(sqlText, [newProject.project, newProject.description, newProject.image, newProject.website, newProject.github, newProject.date, newProject.tag])
      .then((response) => {
          console.log(response);
          res.sendStatus(200);
      }).catch((error) => {
          console.log(`Error in POST /project`, error);
          res.sendStatus(500);
      });
})
module.exports = router;

