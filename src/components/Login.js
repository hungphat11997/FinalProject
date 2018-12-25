import React from 'react';
import {
    Row,
    Label,
    Col,
    Button,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Form,
    FormGroup,
    Input,
    InputGroup,
  } from 'reactstrap';
import '../App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateSCKey } from '../actions/updateSCKey';
import { Redirect } from 'react-router-dom';
import { updatePBKey } from '../actions/updatePBKey';
import { updateFollowKey } from '../actions/updateFollowKey';
import LoadingScreen from 'react-loading-screen';
const fetch = require('node-fetch');
const { Keypair } = require('stellar-base');
class Login extends React.Component {


    onLogin = () => {
      var value = document.getElementById('login').value;
        try {
            const key2 = Keypair.fromSecret(value);
            const pbk = key2.publicKey();
            var key = {
              pbk: pbk,
            }
    
            //profile
            fetch(`/check`, {method: "POST", body: JSON.stringify(key),
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "same-origin"})
              .then((res) => res.json())
              .then((res) => {if(res.isValid === false)
                alert("Key invalid!"); else {
                  //console.log(value)
                  //console.log(pbk)
                       //following key
                }})
            this.props.onUpdateSCKey(value);
            this.props.onUpdatePBKey(pbk);
            
              
          }
          catch(err) {
            alert(err.message);
          }
    }

    render() {
      //console.log(this.props.followkey)
        return(
            this.props.sckey !== null && this.props.pbkey !== null ? 
            <Redirect to="/"></Redirect> :
            <div>
              <Row>
        <Col xs={6} md={4}>
        </Col>
        <Col xs={6} md={4}>
                  <div class="h-white"><h1>Login</h1></div>
                  <Row>
                  <input id="login" class="input-login" placeholder="secret key"/>
                  </Row>
                  <br></br>
                  <button onClick={() => this.onLogin()}class="button button1">Login</button>
                </Col>
                <Col xs={6} md={4}>
                </Col>
                </Row>
                </div>
                
        )
    }
}
const mapStateToProps = (state) => {
    return {
      sckey: state.sckey,
      pbkey: state.pbkey,
      followkey: state.followkey,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      onUpdateSCKey: updateSCKey,
      onUpdatePBKey: updatePBKey,
      onUpdateFollowKey: updateFollowKey,
    }, dispatch);
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Login);