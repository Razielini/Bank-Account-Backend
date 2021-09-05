import { check, validationResult } from 'express-validator';

const auth = {
  register: [
    check('email').not().isEmpty().isEmail().withMessage('Email is required').normalizeEmail(),
    check('password').not().isEmpty().withMessage('password is required').escape(),
    check('confirmPassword').not().isEmpty().withMessage('confirmPassword is required').escape(),
    (req: any, res: any, next: any) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
      next();
    },
  ],
  login: [
    check('email').not().isEmpty().isEmail().withMessage('Email is required').normalizeEmail(),
    check('password').not().isEmpty().withMessage('password is required').escape(),
    (req: any, res: any, next: any) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
      next();
    },
  ],
};

export default { auth };
