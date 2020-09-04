import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import UserLogin from '../screens/userLogin';
import CreateUser from '../screens/createUser';
import AdditionalInfo from '../screens/additionalInfo';

const screens = {
    Home: {
        screen: Home
    },
    UserLogin: {
      screen: UserLogin
    },
    CreateUser: {
        screen: CreateUser
    },
    AdditionalInfo: {
        screen: AdditionalInfo
    }
}
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);