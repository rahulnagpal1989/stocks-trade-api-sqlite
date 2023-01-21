var moment = require('moment');
var sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database(':memory:');
// const db = new sqlite3.Database('../stocks.db');
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the stocks database.');
    let sql = `CREATE TABLE IF NOT EXISTS users(id integer PRIMARY KEY, name TEXT NOT NULL)`;
    db.run(sql, [], function(err) {
        if (err) {
            return console.log('Error:', err.message);
        }
        // get the last insert id
        console.log(`created table "users"`);

        sql = `CREATE TABLE IF NOT EXISTS stocks(id integer PRIMARY KEY, type TEXT NOT NULL, user INTEGER, stock_symbol TEXT NOT NULL, stock_quantity INTEGER, stock_price REAL, trade_timestamp TEXT, FOREIGN KEY(user) REFERENCES users(id))`;
        db.run(sql, [], function(err) {
            console.log(`created table "stocks"`);
        });
    });
});

function checkTradeExists(id) {
    return new Promise((resolve, reject) => {
        db.all("SELECT id FROM stocks WHERE id = ? ", [id], function(error, result) {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
}

function insertTrade(id, type, user, stock_symbol, stock_quantity, stock_price, trade_timestamp) {
    return new Promise((resolve, reject) => {
        let sqlParams = [
            id,
            type,
            user,
            stock_symbol,
            stock_quantity,
            stock_price,
            trade_timestamp,
        ];
        db.run("INSERT INTO stocks VALUES (?, ?, ?, ?, ?, ?, ?)", sqlParams, function(error, result) {
            if (error) {
                console.log(error);
                return reject(error);
            }
            return resolve(this.lastID);
        });
    });
}

function getUserTrades(user_id, type='') {
    let sqlParams = [user_id];
    let addon = '';
    if(type!=='') {
        addon = ' AND type = ?';
        sqlParams.push(type);
    }
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM stocks WHERE user = ? "+addon, sqlParams, function(error, result) {
            if (error) {
                return reject(error);
            }
            return resolve(result[0].id);
        });
    });
}

function getStockPrices(stock, start_date, end_date) {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM stocks WHERE stock_symbol = ? AND trade_timestamp BETWEEN ? AND ?", [stock, start_date, end_date], function(error, result) {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
}

function deleteStocks(stock, start_date, end_date) {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM stocks WHERE 1", [], function(error, result) {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
}

module.exports = {
    checkTradeExists,
    insertTrade,
    getUserTrades,
    getStockPrices,
    deleteStocks
 }
