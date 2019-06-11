
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    backgroundColor: '#000',
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
    //   padding: 10,
      //borderRadius: 20,
    },
    form: {
      //flex: 1,
      borderColor: '#fff',
      borderStyle: 'solid',
    //   borderWidth: 1,
    //   paddingTop: 80,
      borderRadius: 10,
    },
    input: {
	  margin: 10,
	  marginRight: 0,
	  paddingLeft:5,
      borderColor: '#000',
      borderStyle: 'solid',
	  color: '#fff',
	  borderRadius: 10,
	  backgroundColor: 'grey'
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

	paddingTop: 10,
    //   display: 'flex',
    //   flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    loginBtn: {
	  backgroundColor: '#000',
	//   flex: 2,
	  width: "100%",
	// width: deviceWidth,
	  height: 50,
	  borderColor: '#fff',
	  borderStyle: 'solid',
	  borderRadius: 10,
	//   marginBottom: 10,
	  
	borderWidth: 0.5,
	justifyContent: 'center',
	},
	
    loginText: {
      color: '#fff',
	  display: 'flex',
	//   height: 70,
	// padding: 10,
	  fontSize: 20,
	},
	forgotPass: {

		backgroundColor: '#000',
		width: "100%",
		height: 50,
		borderColor: '#fff',
		// borderStyle: 'solid',
		borderRadius: 10,
		marginTop: 10,
		paddingTop: 10,
		
	//   borderWidth: 0.5,
	  justifyContent: 'center',
	  },
    errorText: {
      color: 'red',
      textAlign: 'center',
      margin: 20,
      fontSize: 20,
    }
};
