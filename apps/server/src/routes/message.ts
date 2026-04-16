import { Router } from 'express'
import { db } from '../lib/db.js'

const router = Router()

// GET /api/message — get the custom message
router.get('/', async (req, res) => {
  try {
    const docs = await db.collection('messages').find()
    if (docs.length === 0) {
      const id = await db.collection('messages').insertOne({ message: 'Hello World' })
      const doc = await db.collection('messages').findById(id)
      return res.json(doc)
    }
    res.json(docs[0])
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// PUT /api/message — update the custom message
router.put('/', async (req, res) => {
  try {
    const { message } = req.body
    if (typeof message !== 'string') {
      return res.status(400).json({ error: 'Message must be a string' })
    }

    const docs = await db.collection('messages').find()
    if (docs.length === 0) {
      const id = await db.collection('messages').insertOne({ message })
      const doc = await db.collection('messages').findById(id)
      return res.json(doc)
    }
    
    const ok = await db.collection('messages').updateOne(docs[0]._id, { message })
    if (!ok) return res.status(404).json({ error: 'Not found' })
    const updated = await db.collection('messages').findById(docs[0]._id)
    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router