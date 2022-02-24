import Error from './modules/error/error';
import '../index.css';

class Error500 extends Error {
  constructor() {
    super({
      className: 'error',
      errorText: 'Мы уже фиксим',
      errorNumber: 500,
    });
  }
};

export default Error500;
