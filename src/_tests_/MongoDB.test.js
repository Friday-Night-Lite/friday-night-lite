const { MongoClient } = require('mongodb')
require('dotenv').config()
const { DB_STRING } = process.env


describe('insert', () => {
  let connection
  let db

  beforeAll(async () => {
    connection = await MongoClient.connect(DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await connection.db()
  })

  afterAll(async () => {
    await connection.close()
    await db.close()
  })
  
  it('should insert a game into fnl', async () => {
    const games = db.collection('games')
    
    const mockGame = { _id: '1234567', name: 'New Game' }
    await games.insertOne(mockGame)
    
    const insertedGame = await games.findOne({ _id: '1234567' })
    expect(insertedGame).toEqual(mockGame)
    await games.deleteOne({ _id: '1234567' })
  })

  it('should insert a drive into fnl game', async () => {
    const games = db.collection('games')

    const mockGame = { _id: '1234567', name: 'New Game', drivesArr: [] }
    await games.insertOne(mockGame)

    const insertedGame = await games.findOne({ _id: '1234567' })
    
    const mockDrive = { _id: '2345678', team: 'Home' }
    await insertedGame.drivesArr.push(mockDrive)
    await games.replaceOne({ _id: '1234567' }, insertedGame)
    
    
    const newInsertedGame = await games.findOne({"drivesArr._id": '2345678' })
    expect(newInsertedGame.drivesArr[0]).toEqual(mockDrive)
    await games.deleteOne({ _id: '1234567' })
  })
})
