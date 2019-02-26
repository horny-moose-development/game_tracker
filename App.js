import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

import { NativeRouter, Route, Link } from 'react-router-native';
//import createBrowserHistory from 'history/createBrowserHistory'

import { Font, AppLoading } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

import { styles, pallette } from './styles';
import FontText from './components/Text';

import Join from './components/Join';
const Create = () => <Text style={styles.header}>Create Game</Text>;
const History = () => <Text style={styles.header}>History</Text>;

const Topic = ({ match }) => (
    <Text style={styles.topic}>{match.params.topicId}</Text>
);

export default class App extends Component {
    state = {
        isReady: false,
        routerHistory: {},
    };

    async componentDidMount() {
        await Font.loadAsync({
            'open-sans-semibold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
        });

        this.setState({ isReady: true });
    }

    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        }

        return (
            <NativeRouter
                initialIndex={1}
                initialEntries={['/create', '/join', '/history']}
            >
                <SafeAreaView style={styles.container}>
                    <View style={[styles.navbar]}>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={pallette.darkgray}
                            />
                        </TouchableOpacity>
                        <View style={styles.logo}>
                            <FontText style={styles.logoText}>Score</FontText>
                            <FontText
                                style={[
                                    styles.logoText,
                                    { color: pallette.crimson },
                                ]}
                            >
                                Cast
                            </FontText>
                        </View>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Icon
                                name="user"
                                size={20}
                                color={pallette.darkgray}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.content]}>
                        <Route exact path="/create" component={Create} />
                        <Route path="/join" component={Join} />
                        <Route path="/history" component={History} />
                    </View>
                    <View style={[styles.nav]}>
                        <Link
                            to="/create"
                            underlayColor="#f0f4f7"
                            style={styles.navItem}
                            activeStyle={styles.navItemActive}
                            activeOpacity={0.5}
                        >
                            <Icon
                                name="pencil"
                                size={20}
                                color={pallette.crimson}
                            />
                        </Link>
                        <Link
                            to="/join"
                            underlayColor="#f0f4f7"
                            style={styles.navItem}
                            activeStyle={styles.navItemActive}
                            activeOpacity={0.5}
                        >
                            <Text>
                                <Icon
                                    name="rocket"
                                    size={20}
                                    color={pallette.crimson}
                                />
                            </Text>
                        </Link>
                        <Link
                            to="/history"
                            underlayColor="#f0f4f7"
                            style={styles.navItem}
                            activeStyle={styles.navItemActive}
                            activeOpacity={0.5}
                        >
                            <Text>
                                <Icon
                                    name="history"
                                    size={20}
                                    color={pallette.crimson}
                                />
                            </Text>
                        </Link>
                    </View>
                </SafeAreaView>
            </NativeRouter>
        );
    }
}
