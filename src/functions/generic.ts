import config from 'config';

const CARGO = config.get('interfaces.typeTransfer.CARGO') || 'CARGO';
const ABONO = config.get('interfaces.typeTransfer.ABONO') || 'ABONO';

const accountNumber = () => new Date().getTime().toString();

const nip = (length: number = 4) => {
  const nip = [];
  nip.push(randomNumber({ min: 1, max: 9 }));
  for (let i = 0; i < length - 1; i++) {
    nip.push(randomNumber({ min: 0, max: 9 }));
  }
  return nip.join('');
};

const cargo = ({ amount, origin, destination }: any) => {
  return { origin: origin - amount, destination: destination + amount };
};

const abono = ({ amount, origin, destination }: any) => {
  return { origin: origin + amount, destination: destination - amount };
};

const calculateAmount = ({ amount, origin, destination, type }: any) => {
  if (type.toUpperCase() === CARGO) return cargo({ amount, origin, destination });
  if (type.toUpperCase() === ABONO) return abono({ amount, origin, destination });
  return { origin, destination };
};

const randomNumber = ({ min = 0, max = 9 }: any) => Math.floor(Math.random() * 10);
export default {
  generate: {
    accountNumber,
    nip,
  },
  calculateAmount,
};
