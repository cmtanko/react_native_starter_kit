import App from './src/index';
import {init} from './src/helpers/db';
import BootSplash from 'react-native-bootsplash';

init()
  .then(() => {
    BootSplash.hide();
  })
  .catch((err) => {
    console.error(err);
  });

export default App;
