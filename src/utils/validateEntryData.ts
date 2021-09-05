import { check, validationResult } from 'express-validator';

const auth = {
  register: [
    check('name').isString().not().isEmpty().withMessage('Name should be a string').escape(),
    check('lastName')
      .isString()
      .not()
      .isEmpty()
      .withMessage('lastName should be a string')
      .escape(),
    check('phone').isString().not().isEmpty().withMessage('phone should be a string').escape(),
    check('address').isString().not().isEmpty().withMessage('address should be a string').escape(),
    check('rfc').isString().not().isEmpty().withMessage('rfc is required').escape(),
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
