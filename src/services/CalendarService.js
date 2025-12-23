class CalendarService {
  constructor(calendarRepository) {
    this.calendarRepository = calendarRepository;
  }

  async createCalendar(data) {
    const doc = await this.calendarRepository.createCalendar(data);
    return doc;
  }

  async getAllCalendars() {
    const docs = await this.calendarRepository.getAllCalendars();
    return docs;
  }
}

module.exports = CalendarService;


