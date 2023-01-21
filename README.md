# stocks_trade_api
Stock traded API is to insert trade and fetch all trades

Steps:
1. Download code and place in a common directory.

   a. `cd stock_trade_api`

   b. run `npm install` for install all packages

   c. run `npm start`, this will run on [http://localhost:4000](http://localhost:4000)


## Sample Requests Examples

Consider the following requests performed in the given order:

**POST Requests** `/trades`
Consider the following POST requests (these are performed in the ascending order of trade id):
```
{
  "id":1000344,
  "type":"buy",
  "user":{
    "id":1619820,
    "name":"David"
  },
  "stock_symbol":"AC",
  "stock_quantity":28,
  "stock_price":162.17,
  "trade_timestamp":"2014-06-14 13:13:13"
}
```

**GET Request** `/trades/users/1619820`
The response of the GET request is the following JSON array with the HTTP response code 200:
```
[
  {
    "id":1000344,
    "type":"buy",
    "user":{
      "id":1619820,
      "name":"David"
    },
    "stock_symbol":"AC",
    "stock_quantity":28,
    "stock_price":162.17,
    "trade_timestamp":"2014-06-14 13:13:13"
  },
  {
    "id":1338585,
    "type":"buy",
    "user":{
      "id":1619820,
      "name":"David"
    },
    "stock_symbol":"ABR",
    "stock_quantity":12,
    "stock_price":137.39,
    "trade_timestamp":"2014-06-25 13:44:13"
  }
]
```

**GET Request** `/stocks/ACC/trades?type=sell&start=2014-06-27&end=2014-06-27`
As there are no trades for the stock in the given date range, so the response is an empty JSON array with the HTTP response code 200.
GET Request /stocks/ACC/price?start=2014-06-25&end=2014-06-26
The response of the GET request is the following JSON with the HTTP response code 200:
```
{
  "symbol":"ACC",
  "highest_price":146.09,
  "lowest_price":146.09
}
```


**DELETE Request** `/delete`
All the stock trades data is deleted from the database.
