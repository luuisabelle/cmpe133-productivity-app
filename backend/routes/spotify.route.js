import express from 'express'
import {
    getAuthURL, callback, disconnect,playTrack
} from '../controllers/spotify.controllers.js'
import { authenticate } from '../middlewares/auth.js'

const router = express.Router()

router.get('/auth', authenticate, getAuthURL)
router.get('/callback', callback)
router.post('/disconnect', authenticate, disconnect)
router.post('/play', authenticate, playTrack)

export default router