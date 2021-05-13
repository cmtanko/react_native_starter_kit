import App from './src/index';
import {init} from './src/helpers/db';

init()
  .then(() => {})
  .catch((err) => {
    console.error(err);
  });
export default App;
