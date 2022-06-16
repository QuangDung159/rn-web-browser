/* eslint-disable global-require */
/* eslint-disable react/style-prop-object */
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import React from 'react';
import {
    Alert, Image, LogBox
} from 'react-native';
import TabNavigator from './src/navigations/TabNavigator';
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

export default function App() {
    const [isLoadingComplete, setIsLoadingComplete] = React.useState(false);
    const [fontLoaded, setFontLoaded] = React.useState(false);

    React.useEffect(() => {
        const fetchUpdateOTA = Updates.addListener(async () => {
            const otaObj = await Updates.fetchUpdateAsync();
            if (otaObj.isNew) {
                Alert.alert('Bạn có bản cập nhật mới', '', [
                    { text: 'Cập nhật', onPress: () => Updates.reloadAsync() },
                ]);
            }
        });

        return () => fetchUpdateOTA;
    }, []);

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
                <TabNavigator />
            </NavigationContainer>
        </>
    );
}
