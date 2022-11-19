const Router = require('express');
const router = new Router();
const LeadersController = require('../controllers/userLeaders');



// получить список лидеров
router.get('/leaders', LeadersController.getLeaders);
// Изменить рекорд юзера
router.put('/leader', LeadersController.editRecord);



module.exports = router;
