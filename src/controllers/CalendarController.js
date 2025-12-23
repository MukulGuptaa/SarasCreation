const { StatusCodes } = require('http-status-codes');
const { CalendarService } = require('../services');
const { CalendarRepository } = require('../repositories');

const calendarService = new CalendarService(new CalendarRepository());

async function postDumpCalendar(req, res, next) {
  try {
    const created = await calendarService.createCalendar(req.body);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Successfully dumped calendar payload',
      error: {},
      data: created,
    });
  } catch (error) {
    next(error);
  }
}

async function getDumpedCalendar(req, res, next) {
  try {
    const records = await calendarService.getAllCalendars();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Successfully fetched dumped calendar payloads',
      error: {},
      data: records,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  postDumpCalendar,
  getDumpedCalendar,
};


