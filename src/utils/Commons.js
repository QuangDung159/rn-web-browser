/* eslint-disable import/prefer-default-export */
import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// based on iphone 5s's scale
const scale = width / 460;

export function normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    }
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) + 1;
}

export function getScreenWidthHeight() {
    return { width, height };
}
