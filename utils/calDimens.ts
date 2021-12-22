import {Dimensions} from 'react-native';

const calHeight = (number:number) => {
  return (number / 100) * Dimensions.get('window').height;
};

const calWidth = (number:number) => {
  return (number / 100) * Dimensions.get('window').width;
};

export {calHeight, calWidth};
