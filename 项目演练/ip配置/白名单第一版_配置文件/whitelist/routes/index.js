const router = require('koa-router')();
const upgPackController = require('../controller/upgPackController')

router.get('/', upgPackController.getLatestVerInfo);

module.exports = router;