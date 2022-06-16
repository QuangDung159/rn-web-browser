/* eslint-disable global-require */
/* eslint-disable react/style-prop-object */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, LogBox } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { SCREEN_NAME, SCREEN_TITLE, THEME } from './src/utils/Constants';
import Images from './src/utils/Images';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore all log notifications

const getFonts = () => Font.loadAsync({
    'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'tahoma-regular': require('./assets/fonts/tahoma-regular.ttf'),
    'tahoma-bold': require('./assets/fonts/tahoma-bold.ttf'),
    'helvetica-neue-regular': require('./assets/fonts/helvetica-neue-regular.ttf'),
    'helvetica-neue-bold': require('./assets/fonts/helvetica-neue-bold.ttf'),
    'roboto-regular': require('./assets/fonts/roboto-regular.ttf'),
    'roboto-bold': require('./assets/fonts/roboto-bold.ttf'),
});

// images caching
function cacheImages() {
    return assetImages.map((image) => {
        if (typeof image === 'string' && image !== undefined) {
            return Image.prefetch(image);
        }
        if (image !== undefined) {
            return Asset.fromModule(image).downloadAsync();
        }
        return null;
    });
}

// cache app images
const assetImages = [Images.Onboarding];
const { FONTS, SIZES } = THEME;

const StackNavigator = createNativeStackNavigator();

const headerConfig = {
    headerStyle: {
        // backgroundColor: 'transparent',
    },
    headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: FONTS.TEXT_BOLD,
        fontSize: SIZES.FONT_H2,
        elevation: 0,
    },
};

export default function App() {
    const [isLoadingComplete, setIsLoadingComplete] = React.useState(false);
    const [fontLoaded, setFontLoaded] = React.useState(false);

    React.useEffect(() => {
        async function loadFont() {
            await getFonts();
            setFontLoaded(true);
        }
        loadFont();
    }, []);

    const loadResourcesAsync = async () => {
        await getFonts();
        setFontLoaded(true);

        return Promise.all([...cacheImages()]);
    };

    const handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
        console.warn(error);
    };

    const handleFinishLoading = () => {
        if (fontLoaded) {
            setIsLoadingComplete(true);
        }
    };

    // rendering
    if (!isLoadingComplete) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={handleFinishLoading}
            />
        );
    }

    return (
        <>
            <StatusBar barStyle="light-content" translucent />
            <NavigationContainer>
                <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
                    <StackNavigator.Screen
                        options={{
                            ...headerConfig,
                            title: SCREEN_TITLE.HOME,
                        }}
                        name={SCREEN_NAME.HOME}
                        component={HomeScreen}
                    />
                </StackNavigator.Navigator>
            </NavigationContainer>
        </>
    );
}
