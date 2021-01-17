import { Router, Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
import { userModel } from '../models/User'
import { check, validationResult, ValidationChain } from 'express-validator'

const router: Router = Router()

const registrationValidators: ValidationChain[] = [
  check('email', 'Invalid email address').isEmail(),
  check(
    'password', 
    'The minimum password length is 6 characters'
  ).isLength({ min: 6 })
]

const registration = async (req: Request, res: Response) => {
  try {
    const validationError = validationResult(req)

    if (!validationError.isEmpty()) {
      return res.status(400).json({
        errors: validationError.array(),
        message: 'Incorrect data during registration',
      })
    }

    const { email, password } = req.body
    const candidate = await userModel.findOne({ email })

    if (candidate) {
      return res.status(400).json({ message: 'This user already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new userModel({ email, password: hashedPassword })

    await user.save()

    res.status(201).json({ message: 'User was created successfully' })

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' })
  }
}

// (/api/auth/register)
router.post('/register', registrationValidators, registration,
)


export { router } 