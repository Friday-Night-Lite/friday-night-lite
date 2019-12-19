const mongoose = require('mongoose')
const Schema = mongoose.Schema
const DriveSchema = require('./drive-model')

module.exports = {
  GameSchema: new Schema({
    status: { type: String, required: true },
    home: { type: Object, required: true },
    away: { type: Object, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    start_time: { type: String, required: false },
    date: { type: Date, required: true },
    // Date − This datatype is used to store the current date or time in UNIX time format. You can specify your own date time by creating object of Date and passing day, month, year into it.
    drives: [DriveSchema]
  }),
  GameModel: mongoose.model(
    'game',
    new Schema({
      status: { type: String, required: true },
      home: { type: Object, required: true },
      away: { type: Object, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      start_time: { type: String, required: false },
      date: { type: Date, required: true },
      drivesArr: [DriveSchema]
    })
  )
}
