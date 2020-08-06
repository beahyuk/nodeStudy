const router = require('koa-router')();
const upgPackController = require('../controller/upgPackController')

router.post('/getLatestVerInfo', upgPackController.getLatestVerInfo);

module.exports = router;