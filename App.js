import App from './src/index';
import {init} from './src/helpers/db';

init()
  .then(() => {
    console.log('Initialized database');
  })
  .catch((err) => {
    console.error(err);
  });
export default App;
