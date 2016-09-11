/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage
} from 'react-native';
import Button from '../common/button';
import Signup from './signup';
import Account from './account';
import Header from '../common/header';
import styles from '../styles/common-styles';

import Firebase from 'firebase';

let fireBase = new Firebase("https://testreactnative.firebaseIO.com");

export default class extends Component {
  // fuckign around with state...

  componentWillMount() {
    // need something to replace parse??
  }

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      email: '',
      password: '',
      loaded: true
    }
  }

  loginUser() {
    this.setState({
      loaded: false
    });

    fireBase.authWithPassword({
      "email": this.state.email,
      "password": this.state.password
    }, (error, user_data) => {

      this.setState({
        loaded: true
      });

      if (error) {
        alert('something isnt right', error);
      } else {
        AsyncStorage.setItem('user_data', JSON.stringify(user_data));
        this.props.navigator.push({
          component: Account
        });
      }
    });
  }

  // dont like those inline function,
  // on change text call set state
  // this will cause the component to render, with new user name
  // state
  // authentication working
  render() {
    console.log('the login page');
    return (
      <View style={styles.container}>
        <Header text="Signup" loaded={this.state.loaded} />
        <View style={styles.body}>
          <Text> Sign In</Text>
          <Text style={styles.label}> UserName:</Text>
          <TextInput
            style={styles.input}
            value={this.state.email}
            onChangeText={(text) => this.setState({email: text})}
          />

          <Text style={styles.label}> Password:</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            value={this.state.password}
            onChangeText={(text) => this.setState({password: text})}
          />
          <Button
            text='Sign IN' onpress={this.loginUser.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text}
          />
          <Button
            text="New here?"
            onpress={this.goToSignup.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    )
  }


  goToSignup() {
    this.props.navigator.push({
      component: Signup
    });
  }
}
