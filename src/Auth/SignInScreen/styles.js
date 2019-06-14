
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
	backgroundColor: '#000',

  },
  content: {
	alignItems: 'center',	
	height: "100%",
  },
  formView: {
	width: deviceWidth * 0.9,
  },
  form: {
	borderColor: '#fff',
	borderStyle: 'solid',
	borderRadius: 10,
  },
  label: {
	paddingLeft: 10, 
	color: "#fff"
  },
  input: {
	margin: 10,
	marginRight: 0,
	marginBottom: 20,
  height: 80,
	borderColor: '#000',
	borderStyle: 'solid',
	color: '#fff',
	borderRadius: 10,
	backgroundColor: 'grey'
  },
  textInput: {
	color: '#fff',
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

  btn: {
    marginTop: 20,
    alignSelf: 'center',
  },
    
    bgImage: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      flex: 1,
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
	marginTop: 10,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginBtn: {
	  backgroundColor: '#000',
	  width: "100%",
	  height: 70,
	  borderColor: '#fff',
	  borderStyle: 'solid',
	  borderRadius: 10,
	  
	borderWidth: 0.5,
	justifyContent: 'center',
	},
	
    loginText: {
      color: '#fff',
	padding: 20,
	  fontSize: 20,
	},
	forgotPass: {

		backgroundColor: '#000',
		width: "100%",
		height: 50,
		borderColor: '#fff',
		borderRadius: 10,
		marginTop: 10,
		paddingTop: 10,
	  justifyContent: 'center',
	  },
    errorText: {
      color: 'red',
      textAlign: 'center',
      margin: 20,
	  fontSize: 20,
	  height: '10%'
    }
};
