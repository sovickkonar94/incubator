const router = require('express').Router();
const controller = require('../controllers/base.controller');

router.get('/',controller.test);
router.post('/register',controller.register);
router.post('/login',controller.login);
router.post('/verify',controller.verify);
module.exports = router;