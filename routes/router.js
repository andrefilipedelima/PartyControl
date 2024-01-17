const router = require('express').Router();


//Services router
const serviceRouter = require('./services');
router.use('/', serviceRouter);

//Parties router
const partyRouter = require("./parties");
router.use('/', partyRouter);


module.exports = router;