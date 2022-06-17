/* eslint-disable react/react-in-jsx-scope */
import Constants from 'expo-constants';
import {
    useCallback, useEffect, useRef, useState
} from 'react';
import {
    Animated, Dimensions, SafeAreaView, TextInput
} from 'react-native';
import WebView from 'react-native-webview';

const { statusBarHeight } = Constants;
const { width } = Dimensions.get('window');

export default function HomeScreen() {
    const [url, setUrl] = useState('https://google.com');
    const [uri, setUri] = useState(url);
    const [urlDisplay, setUrlDisplay] = useState('https://google.com');
    const [currentScroll, setCurrentScroll] = useState(0);
    const [isScrollUp, setIsScrollUp] = useState(true);

    const scrollAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(
        () => {
            if (isScrollUp) {
                scrollDown();
                fadeIn();
            } else {
                scrollUp();
                fadeOut();
            }
        }, [isScrollUp]
    );

    const scrollUp = () => {
        Animated.timing(scrollAnim, {
            toValue: -(40 + statusBarHeight),
            duration: 100
        }).start();
    };

    const scrollDown = () => {
        Animated.timing(scrollAnim, {
            toValue: 0,
            duration: 100
        }).start();
    };

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 250
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 50
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
                        marginTop: 40
                    }
                ]}
                source={{ uri }}
                pullToRefreshEnabled
                onScroll={(syntheticEvent) => {
                    const { contentOffset } = syntheticEvent.nativeEvent;
                    const isTriggerToggle = Math.abs(contentOffset.y - currentScroll) > 20;

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
                flex: 1,
                backgroundColor: '#fff'
            }}
        >
            <Animated.View
                style={[
                    {
                        transform: [{
                            translateY: scrollAnim
                        }]
                    },
                    {
                        position: 'absolute',
                        zIndex: 99,
                        top: statusBarHeight,
                        backgroundColor: '#ffffff',
                        opacity: fadeAnim
                    }
                ]}
            >
                <TextInput
                    style={{
                        height: 40,
                        paddingHorizontal: 10,
                        width
                    }}
                    onChangeText={(input) => {
                        setUrl(input);
                        setUrlDisplay(input);
                    }}
                    value={urlDisplay}
                    placeholder="Enter URL"
                    onSubmitEditing={() => fetchWebsite()}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onFocus={() => onFocusInput()}
                    onBlur={() => fetchWebsite()}
                    selectTextOnFocus
                />
            </Animated.View>
            {renderWebView()}
        </SafeAreaView>
    );
}
