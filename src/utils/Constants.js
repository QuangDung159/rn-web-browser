import { getScreenWidthHeight, normalize } from './Commons';

const { width, height } = getScreenWidthHeight();

const FONT_NAME = {
    MONTSERRAT_REGULAR: 'montserrat-regular',
    MONTSERRAT_BOLD: 'montserrat-bold',
    TAHOMA_BOLD: 'tahoma-bold',
    HELVETICA_NEUE_REGULAR: 'helvetica-neue-regular',
    helveticaNeueRegular: 'helvetica-neue-regular',
    HELVETICA_NEUE_BOLD: 'helvetica-neue-bold',
    ROBOTO_REGULAR: 'roboto-regular',
    ROBOTO_BOLD: 'roboto-bold',
};

export const APP_VERSION_OTA = '2109112';

export const THEME = {
    COLORS: {
        BACKGROUND: '#FF985C',
        TEXT: '#454545',
        BUTTON: '#E6E6E6',
        BUTTON_CLICKED: '#9E9E9E',
        BORDER: '#303133',
    },
    SIZES: {
        FONT_H1: normalize(24),
        FONT_H2: normalize(20),
        FONT_H3: normalize(18),
        FONT_H4: normalize(16),
        FONT_H5: normalize(14),

        WIDTH_BASE: width,
        HEIGHT_BASE: height,
    },
    FONTS: {
        TEXT_REGULAR: FONT_NAME.MONTSERRAT_REGULAR,
        TEXT_BOLD: FONT_NAME.MONTSERRAT_BOLD,
    },
};

export const SCREEN_NAME = {
    HOME: 'HOME',
    PERSONAL: 'PERSONAL',
    SETTINGS: 'SETTINGS',
    SETTING_DETAIL: 'SETTING_DETAIL'
};

export const SCREEN_TITLE = {
    HOME: 'TRANG CHỦ',
    PERSONAL: 'TRANG CÁ NHÂN',
    SETTINGS: 'CÀI ĐẶT',
    SETTING_DETAIL: 'CHI TIẾT CÀI ĐẶT'
};

export const STACK_NAME = {
    HOME_STACK: 'HOME_STACK',
    SETTINGS_STACK: 'SETTINGS_STACK'
};
