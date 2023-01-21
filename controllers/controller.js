const dotenv = require('dotenv').config();
var formidable = require('formidable');
var fs = require('fs');
var {insertTrade, getUserTrades, getStockPrices, deleteStocks} = require('../models/model');
var moment = require('moment');

exports.homePage = (req, res, next) => {
    res.send('Hello World!');
};

exports.insertTrade = async (req, res, next) => {
    let params = req.body;
    console.log(params);
    let id = await insertTrade(params.id, params.type, params.user.id, params.stock_symbol, params.stock_quantity, params.stock_price, params.trade_timestamp);
    res.json({success: 1, message: 'Trade inserted successfuly', data: [id]});
};

exports.getUserTrades = async (req, res, next) => {
    let params = req.params;
    console.log(params, params.id);
    let result = await getUserTrades(params.id);
    res.json({success: 1, message: 'Get user trades', data: result});
};

exports.deleteStocks = async (req, res, next) => {
    let result = await deleteStocks();
    res.json({success: 1, message: 'All stocks deleted', data: []});
};

exports.stocks = async (req, res, next) => {
    let params = {...req.params, ...req.query};
    console.log(params);
    let result = await getStockPrices(params.stock, params.start, params.end);
    res.json({success: 1, message: 'Get user trades', data: result});
};
