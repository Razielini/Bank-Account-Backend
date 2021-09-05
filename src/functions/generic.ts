const accountNumber = () => new Date().getTime().toString();

const nip = (length: number = 4) => {
  const nip = [];
  nip.push(randomNumber({ min: 1, max: 9 }));
  for (let i = 0; i < length - 1; i++) {
    nip.push(randomNumber({ min: 0, max: 9 }));
  }
  return nip.join('');
};

const randomNumber = ({ min = 0, max = 9 }: any) => Math.floor(Math.random() * 10);
export default {
  generate: {
    accountNumber,
    nip,
  },
};
