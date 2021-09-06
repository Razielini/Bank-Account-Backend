import { check, validationResult } from 'express-validator';
import config from 'config';

const auth = {
  register: [
    check('product').custom((val, { req }) => {
      if (!Object.values(config.get('interfaces.typeProducts')).includes(req.body.product)) {
        throw new Error('Invalid product');
      }
      return true;
    }),
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
      if (!errors.isEmpty()) return res.status(422).json({ status: 422, errors: errors.array() });
      next();
    },
  ],
  login: [
    check('email').not().isEmpty().isEmail().withMessage('Email is required').normalizeEmail(),
    check('password').not().isEmpty().withMessage('password is required').escape(),
    (req: any, res: any, next: any) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(422).json({ status: 422, errors: errors.array() });
      next();
    },
  ],
};

const transfer = {
  register: [
    check('type').custom((val, { req }) => {
      if (!Object.values(config.get('interfaces.typeTransfer')).includes(req.body.type)) {
        throw new Error('Invalid type of transfer');
      }
      return true;
    }),
    check('originAccount')
      .isString()
      .not()
      .isEmpty()
      .withMessage('originAccount should be a string')
      .escape(),
    check('destinationAccount')
      .isString()
      .not()
      .isEmpty()
      .withMessage('destinationAccount should be a string')
      .escape(),
    check('amount').isNumeric().not().isEmpty().withMessage('amount should be a number').escape(),
    check('concept').isString().not().isEmpty().withMessage('concept should be a string').escape(),
    check('reference')
      .isString()
      .not()
      .isEmpty()
      .withMessage('reference should be a string')
      .escape(),
    check('operation').custom((val, { req }) => {
      if (!Object.values(config.get('interfaces.typeOperation')).includes(req.body.operation)) {
        throw new Error('Invalid operation of transfer');
      }
      return true;
    }),
    (req: any, res: any, next: any) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(422).json({ status: 422, errors: errors.array() });
      next();
    },
  ],
};

export default { auth, transfer };
