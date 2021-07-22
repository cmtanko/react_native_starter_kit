import App from './src/index';
import {init} from './src/helpers/db';
import BootSplash from 'react-native-bootsplash';
console.disableYellowBox = true;
init()
  .then(() => {
    BootSplash.hide();
  })
  .catch((err) => {
    console.error(err);
  });

export default App;
