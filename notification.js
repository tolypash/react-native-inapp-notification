import * as React from 'react'
import { StyleSheet, View, Dimensions, Image, Animated, PanResponder } from 'react-native'
import { Text } from 'galio-framework'
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    notificationView: {
        zIndex: 999,
        width: width - 20,
        position: 'absolute',
        alignSelf: 'center',
        top: Constants.statusBarHeight,
        backgroundColor: 'white',
        borderRadius: 10,

        //shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        padding: 10
    }
})

export default class Notification extends React.Component {
    state = {
        active: false,
        logoURL: "",
        name: "",
        message: "",
    }

    setActive(value, time, logoURL, name, message) {
        console.log(message)
        if (value && !this.state.active) {
            this.setState({ active: value, logoURL: logoURL, name: name, message: message }, () => {
                this.show()
            })
        } else if (value && this.state.active) {
            Animated.timing(this.pan, { toValue: { x: 0, y: -height }, useNativeDriver: false }).start(() => {
                this.setState({ active: value, logoURL: logoURL, name: name, message: message }, () => {
                    this.show()
                })
            })
        } else {
            this.hide()
        }

        if (value && time) {
            setTimeout(() => {this.hide()}, time)
        }
    }

    show() {
        Animated.spring(this.pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start()
    }

    hide() {
        this.setState({ active: false })
        Animated.timing(this.pan, { toValue: { x: 0, y: -height }, useNativeDriver: false }).start()
    }

    pan = new Animated.ValueXY({ x: 0, y: -height })

    panResponder = PanResponder.create({

        onMoveShouldSetPanResponder: (evt, gestureState) => true,

        // onPanResponderGrant: () => {
        //     pan.setOffset({
        //         y: pan.y._value,
        //         x: 0
        //     });
        // },

        onPanResponderMove: Animated.event(
            [
                null,
                { dy: this.pan.y, dx: 0 }
            ],
            {
                listener: (event, gestureState) => {
                    if (gestureState.dy < -10) {
                        this.setState({ active: false })
                    } if (gestureState.dy > 10 && !this.state.active) {
                        this.setState({ active: true })
                    }
                    console.log(gestureState)
                }, useNativeDriver: false
            }
        ),
        onPanResponderRelease: () => this.state.active ? this.show() : this.hide()
    })
    render() {
        return (
            <Animated.View style={[styles.notificationView, { transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }] }]} {...this.panResponder.panHandlers}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ height: 55, width: 55, marginRight: 5, alignSelf: 'center' }} source={{ uri: this.state.logoURL || "https://sally.app/logo.png" }} />
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: 'open-sans-light' }} size={16} color="gray">{this.state.name.length ? this.state.name.toUpperCase() : ""}</Text>
                        <Text>{this.state.message}</Text>
                    </View>
                </View>
            </Animated.View>
        )
    }
}