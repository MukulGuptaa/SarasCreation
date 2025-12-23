const express = require('express');
const { calendarController } = require('../../controllers');

const calendarRouter = express.Router();

// POST /api/v1/postDumpCalender
calendarRouter.post('/postDumpCalender', calendarController.postDumpCalendar);

// GET /api/v1/getDumpedCalender
calendarRouter.get('/getDumpedCalender', calendarController.getDumpedCalendar);

module.exports = calendarRouter;


