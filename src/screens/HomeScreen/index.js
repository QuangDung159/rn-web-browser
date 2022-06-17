/* eslint-disable react/react-in-jsx-scope */
import Constants from 'expo-constants';
import {
    useCallback, useEffect, useRef, useState
} from 'react';
import {
    Animated, SafeAreaView,
    StyleSheet, TextInput
} from 'react-native';
import WebView from 'react-native-webview';

const { statusBarHeight } = Constants;

export default function HomeScreen() {
    const [url, setUrl] = useState('https://google.com');
    const [uri, setUri] = useState(url);
    const [urlDisplay, setUrlDisplay] = useState('https://google.com');
    const [currentScroll, setCurrentScroll] = useState(0);
    const [isScrollUp, setIsScrollUp] = useState(true);

    // fadeAnim will be used as the value for opacity. Initial Value: 0
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(
        () => {
            if (isScrollUp) {
                fadeOut();
            } else {
                fadeIn();
            }
        }, [isScrollUp]
    );

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: -(40 + statusBarHeight),
            duration: 100
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 100
        }).start();
    };

    const fetchWebsite = () => {
        const validUrl = `https://${url}`;
        setUri(validUrl);
        setUrlDisplay(validUrl);
    };

    const onFocusInput = () => {
        let formattedUrl = urlDisplay;
        formattedUrl = formattedUrl?.replace('https://', '');
        formattedUrl = formattedUrl?.replace('http://', '');
        setUrlDisplay(formattedUrl);
    };

    const renderWebView = useCallback(
        () => (
            <WebView
                style={[
                    isScrollUp && {
                        marginTop: statusBarHeight
                    }
                ]}
                source={{ uri }}
                pullToRefreshEnabled
                onScroll={(syntheticEvent) => {
                    const { contentOffset } = syntheticEvent.nativeEvent;
                    const isTriggerToggle = Math.abs(contentOffset.y - currentScroll) > 50;

                    if (contentOffset.y <= currentScroll || contentOffset.y <= 0) {
                        if (isTriggerToggle) {
                            setIsScrollUp(true);
                        }
                    } else if (isTriggerToggle) {
                        setIsScrollUp(false);
                    }
                    setCurrentScroll(contentOffset.y);
                }}
            />
        ), [uri, currentScroll]
    );

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
        >
            <Animated.View
                style={[
                    {
                        transform: [{
                            translateY: fadeAnim
                        }]
                    },
                    {
                        position: 'absolute',
                        zIndex: 99,
                        top: statusBarHeight
                    }
                ]}
            >
                <TextInput
                    style={styles.input}
                    onChangeText={(input) => {
                        setUrl(input);
                        setUrlDisplay(input);
                    }}
                    value={urlDisplay}
                    placeholder="Enter URL"
                    onSubmitEditing={() => {
                        fetchWebsite();
                    }}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onFocus={() => onFocusInput()}
                />
            </Animated.View>
            {renderWebView()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        paddingHorizontal: 10,
    },
});
