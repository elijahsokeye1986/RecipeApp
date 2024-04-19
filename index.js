import { AppRegistry } from 'react-native';
import App from './App'; // Adjust this line if your main App component is in a different file
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
