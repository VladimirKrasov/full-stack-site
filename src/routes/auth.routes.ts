import { Router, Request, Response } from 'express'
import { userModel } from '../models/User'

const router = Router()

// (/api/auth/register)
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const candidate = await userModel.findOne({ email })
    if (candidate) {
      return res.status(400).json({ message: 'This user already exists' })
    }

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' })
  }
})


module.exports = router 