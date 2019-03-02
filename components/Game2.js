import {pallette, styles} from "../styles";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    StyleSheet
} from "react-native";
import React, { Component } from "react";

import {compose} from "redux";
import {firestoreConnect, getVal} from "react-redux-firebase";
import connect from "react-redux/es/connect/connect";
import Icon from 'react-native-vector-icons/FontAwesome';
import Link from "react-router-native/Link";
import { SectionGrid } from 'react-native-super-grid';

class Game2 extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //TODO: Figure out event listeners so that multiple people can update
        //this.props.firestore.setListener({ collection: 'games', doc: this.props.match.params.gameId });
    }

    render() {
        let game = this.props.games.find((g) => {
            return g.id === this.props.match.params.gameId;
        });

        let isAdmin = (this.props.firebase.auth.uid === game.admin);

        let template = this.props.games.find((g) => {
            return g.id === this.props.match.params.gameId;
        }).template;

        let logic = this.props.templates.find((t) => {
            return t.id === template;
        }).logic;

        if (!logic) return (<></>);
        logic = JSON.parse(logic);

        let view = this.props.templates.find((t) => {
            return t.id === template;
        }).view;

        if (!view) return (<></>);
        view = JSON.parse(view);


        let gameName = 'Game';
        let elements = view.elements.map((e, index) => {
            let varName = Object.keys(game.variables).find((varName) => {
                return varName === e.ref;
            });

            if (varName) {
                return (
                    <View style={{
                        position: 'absolute',
                        top: e.py,
                        left: e.px,
                        width: e.w,
                    }} key={index}>
                        <View style={{
                            position: 'absolute',
                            left: -(e.w / 2),
                            width: e.w,
                            flexDirection: 'row',
                            textAlign: 'center',
                        }}>
                            <Text style={{
                                flex: 1,
                                textAlign: 'center',
                                fontSize: e.size,
                            }}>{game.variables[varName]}</Text>
                            {(isAdmin && varName === 'gameName') ? (
                                <TouchableOpacity style={{marginLeft: 10, marginTop: 5}}
                                                  onPress={() => {
                                                      console.log(this.props.match.params.gameId);
                                                      let setupPath = `/home/gameSetup/${this.props.match.params.gameId}`;
                                                      console.log(setupPath);
                                                      this.props.history.push(setupPath);
                                                  }}>
                                    <Icon name="wrench" size={20} color={pallette.darkgray}/>
                                </TouchableOpacity>
                            ) : (<></>)}
                        </View>
                    </View>
                );
            } else if (logic) {
                let actionName = logic.actions.find((a) => {
                    return (a.name === e.ref);
                }).name;

                if (actionName) {
                    return (
                        <View style={{
                            position: 'absolute',
                            top: e.py,
                            left: e.px,
                            width: e.w,
                        }} key={index}>
                            <View style={{
                                position: 'absolute',
                                left: -(e.w / 2),
                                width: e.w,
                                flexDirection: 'row',
                                textAlign: 'center',
                            }}>
                                <TouchableOpacity style={{marginLeft: 10, marginTop: 5}}>
                                    <Text style={[{
                                        flex: 1,
                                        textAlign: 'center',
                                        fontSize: e.size,
                                    },{
                                        backgroundColor: pallette.darkgray,
                                        color: pallette.white,
                                        borderRadius: 10,
                                        padding: 10,
                                        fontSize: e.size
                                    }]}>{actionName}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }
            }
        });

        return (
            <View style={[{ flex: 1, flexDirection: 'row', backgroundColor: '#ffccdd' }]}>
                <View style={[{ flex: 1, flexDirection: 'column', backgroundColor: pallette.lightgreen }]}>
                    {elements}
                </View>
            </View>
        );
    };
}

export default compose(
    firestoreConnect(['templates', 'games']),
    connect((state, props) => ({
        firebase: state.firebase,
        templates: state.firestore.ordered.templates,
        games: state.firestore.ordered.games,
    }))
)(Game2);