'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

// Link to views folder.
let views = path.join(__dirname, '../');

// Home route.
router.get('/', (req, res) => {
  res.sendFile('index.html', { root: views });
});

// Other routes.
router.get('/page1', function(req, res){
  res.sendFile('page1.html', { root: views });
});
router.get('/page2', function(req, res){
  res.sendFile('page2.html', { root: views });
});
router.get('/page3', function(req, res){
  res.sendFile('page3.html', { root: views });
});
router.get('/page4', function(req, res){
   let aMonthList = [
    {
      "month": "01", "month_desc": "ינואר",
    },
    {
      "month": "02", "month_desc": "פברואר",
    },
    {
      "month": "03", "month_desc": "מרץ",
    },
    {
      "month": "04", "month_desc": "אפריל",
    },
    {
      "month": "05", "month_desc": "מאי",
    },
    {
      "month": "06", "month_desc": "יוני",
    },
    {
      "month": "07", "month_desc": "יולי",
    },
    {
      "month": "08", "month_desc": "אוגוסט",
    },
    {
      "month": "09", "month_desc": "ספטמבר",
    },
    {
      "month": "10", "month_desc": "אוקטובר",
    },
    {
      "month": "11", "month_desc": "נובמבר",
    },
    {
      "month": "12", "month_desc": "דצמבר",
    },
  ];

  const start = new Date();
  const current = new Date();
  const end = new Date(current.getFullYear(), current.getMonth() + Number(req.query.duration));

  const monthYearArray = [];

  let currentDate = start;
  while (currentDate <= end) {
    const month_code = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const oMonth = aMonthList.find(month => { return month.month === month_code });
    const year = currentDate.getFullYear();
    const monthDays = new Date(year, currentDate.getMonth(), 0).getDate();
    monthYearArray.push({ "month_code": month_code, "month_desc": oMonth.month_desc, "year": year, "monthDays": monthDays });

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

   res.json(monthYearArray);
});


app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda (express/server.js)

module.exports = app;
module.exports.handler = serverless(app);
