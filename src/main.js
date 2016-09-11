

// how does this Navigator work?
// will both work on android?
// sort out styling
// sort out account
// load different components is pretty dam cool
// understand how every part of redux works
// then integrate work it with it..

// then learn peters redux guidelines

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';

import Signin from './components/authentication/signin';
import Signup from './components/authentication/signup';
import Account from './components/authentication/account';

import Header from './components/common/header';

import Firebase from 'firebase';

let app = new Firebase("https://testreactnative.firebaseIO.com");

import styles from './components/styles/common-styles.js';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: null,
      loaded: false
    };
  }


  componentWillMount() {
    // load the type of component using Aysunc storage
    AsyncStorage.getItem('user_data').then((user_data_json) => {

      let user_data = JSON.parse(user_data_json);
      let component = {component: Signup};
      // interesting setting data directly with component
      console.log('existing user data', user_data)
      if (user_data != null) {
        // ue fire base stuff and and render account
        app.authWithCustomToken(user_data.token, (error, authData) => {
          if (error) {
            // set state component with sign up
            console.log('THERE IS NO TOCKEN', error)
            this.setState(component);
          } else {
            console.log('THERE IS A TOKEN')
            this.setState({component: Account});
          }
        });
      } else {
        this.setState(component);
      }
    });
  }

  render() {
    // what the hell does this all do?
    // navigator component
    // also set up the inital route as this . state component, easy as that
    // but what about navigating back???

    if(this.state.component) {
      return (
        <Navigator
          initialRoute={{component: this.state.component}}
          // set up the animation..
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          // route component will always be here has its used from conponent.mount?
          renderScene={(route, navigator) => {
            if(route.component){
              return React.createElement(route.component, { navigator });
            }
          }}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Header text="React Native Firebase Auth" loaded={this.state.loaded} />
          <View style={styles.body}>

          </View>
        </View>
      );
    }

  }
}

// var styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });
