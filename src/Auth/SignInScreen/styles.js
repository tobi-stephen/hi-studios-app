
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
  },
    content: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      position: 'relative',
      padding: 0,
      margin: 0,
      width: deviceWidth,
    },
    bgImage: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      flex: 1,
    },
    formView: {
      width: deviceWidth * 0.9,
      //borderColor: '#64493c',
      //borderStyle: 'solid',
      //borderWidth: 1,
      //padding: 10,
      //borderRadius: 20,
    },
    form: {
      //flex: 1,
      borderColor: '#5b696c',
      borderStyle: 'solid',
      borderWidth: 1,
      padding: 10,
      borderRadius: 20,
    },
    inputItem: {
      margin: 0,
      borderBottomColor: '#5b696c',
      borderStyle: 'solid',
      borderBottomWidth: 1,
      color: '#5b696c',
    },
    inputPassword: {
      margin: 0,
      borderBottomColor: 'transparent',
      borderStyle: 'solid',
      borderBottomWidth: 0,
      color: '#5b696c',
    },
    register: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    registerBtn: {
      backgroundColor: 'transparent',
    },
    registerText: {
      color: '#5b696c',
      textAlign: 'center',
      fontSize: 18,
      textTransform: 'capitalize',
    },
    controls: {
      padding: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      
    },
    loginBtn: {
      backgroundColor: '#5b696c',
      paddingLeft: 20,
      paddingRight: 20,
    },
    loginText: {
      color: '#ffffff',
      fontWeight: '400',
      textTransform: 'capitalize',
      display: 'flex',
      zIndex: 20,
      fontSize: 20,
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      margin: 20,
      fontSize: 20,
    }
};
