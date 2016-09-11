'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View
} from 'react-native';

import Button from '../common/button';
import Header from '../common/header';
import styles from '../styles/common-styles';

import Login from './signin';

import Firebase from 'firebase';

let fireBase = new Firebase("https://testreactnative.firebaseIO.com");

export default class signup extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState()
  }

  getInitialState() {
    return {
      loaded: true,
      email: '',
      password: ''
    }
  }

  signupUser() {
    this.setState({
      loaded: false
    });
    // fire base shit
    console.log('goingto creat a user');
    fireBase.createUser({
      'email': this.state.email,
      'password': this.state.password
    }, (error, userData) => {
      if(error) {
        switch(error.code) {

          case "EMAIL_TAKEN":
            alert("The new user account cannot be created because the email is already in use.");
          break;

          case "INVALID_EMAIL":
            alert("The specified email is not a valid emaillll.", error);
          break;

          default:
            alert(error);
        }
      } else {
        alert('Your account was created!');
      }

      this.setState({
        email: '',
        password: '',
        loaded: true
      });

    });
  }

  goToLogin() {
    console.log('going to login');
    this.props.navigator.push({
      component: Login
    });
  }

  render() {
    console.log('test react');
    return (
      <View style={styles.container}>
        <Header text="Signup" loaded={this.state.loaded} />
        <View style={styles.body}>
          <Text style={styles.label}> email:</Text>
          <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({email: text})}
              value={this.state.email}
          placeholder={"Email Address"}
          />
          <Text style={styles.label}> Password:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
          />
          <Button
            text="Signup"
            onpress={this.signupUser.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />

          <Button
            text="Got an Account?"
            onpress={this.goToLogin.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }

}
