import { check, validationResult } from 'express-validator';

const auth = {
  register: [
    check('email').not().isEmpty().isEmail().withMessage('Email is required').normalizeEmail(),
    check('password').not().isEmpty().withMessage('Name is required').escape(),
    check('confirmPassword').not().isEmpty().withMessage('Lastname is required').escape(),
    (req: any, res: any, next: any) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
      next();
    },
  ],
};

export default { auth };
