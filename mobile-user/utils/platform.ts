import { Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Device = {
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  isWeb: Platform.OS === 'web',
  screenWidth: width,
  screenHeight: height,
};
