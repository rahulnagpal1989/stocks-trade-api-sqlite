const dotenv = require('dotenv').config();
var formidable = require('formidable');
var fs = require('fs');
var {checkTradeExists, insertTrade, getUserTrades, getStockPrices, deleteStocks} = require('../models/model');
var moment = require('moment');

exports.homePage = (req, res, next) => {
    res.send('Hello World!');
};

exports.insertTrade = async (req, res, next) => {
    let params = req.body;
    if(params.type==='buy' || params.type==='sell') {
        let id = await checkTradeExists(params.id);
        if(id<=0) {
            id = await insertTrade(params.id, params.type, params.user.id, params.stock_symbol, params.stock_quantity, params.stock_price, params.trade_timestamp);
            res.json({code:200, success: 1, message: 'Trade inserted successfuly', data: [id]});
        } else {
            res.json({ code: 400, message: "Error: Trade ID already exists", data: [params.id] });
        }
    } else {
        res.json({ code: 400, message: "Error: Please check stock type", data: [params.type] });
    }
};

exports.getUserTrades = async (req, res, next) => {
    let params = req.params;
    let result = await getUserTrades(params.id, params.type);
    res.json({code:200, success: 1, message: 'Get user trades', data: result});
};

exports.deleteStocks = async (req, res, next) => {
    let result = await deleteStocks();
    res.json({code:200, success: 1, message: 'All stocks deleted', data: []});
};

exports.stocks = async (req, res, next) => {
    let params = {...req.params, ...req.query};
    let result = await getStockPrices(params.stock, params.start, params.end);
    res.json({code:200, success: 1, message: 'Get user trades', data: result});
};
