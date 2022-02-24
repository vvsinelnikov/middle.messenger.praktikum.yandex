import Error from './modules/error/error';
import '../index.css';

class Error404 extends Error {
  constructor() {
    super({
      className: 'error',
      errorText: 'Не туда попали',
      errorNumber: 404,
    });
  }
};

export default Error404;
