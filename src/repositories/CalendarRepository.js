const { Calendar } = require('../models');

class CalendarRepository {
  async createCalendar(data) {
    try {
      // Use findOneAndUpdate with upsert to ensure only one record exists
      // This will update the existing record if found, or create one if not found
      const doc = await Calendar.findOneAndUpdate(
        {}, // Empty filter matches any document
        { payload: data },
        { 
          upsert: true, // Create if doesn't exist
          new: true, // Return the updated document
          setDefaultsOnInsert: true // Apply defaults when creating
        }
      );
      return doc;
    } catch (error) {
      throw error;
    }
  }

  async getAllCalendars() {
    try {
      const docs = await Calendar.find({}).sort({ createdAt: -1 });
      return docs;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CalendarRepository;


