const express = require('express');
const app = express();
const router = express.Router();
const {homePage, insertTrade, getUserTrades, deleteStocks, stocks} = require('../controllers/controller');

router.post('/trades', insertTrade);
router.get('/trades/users/:id', getUserTrades);
router.delete('/delete', deleteStocks);
router.get('/stocks/:stock/price', stocks);
router.get('/', homePage);

module.exports = router;