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

const fetch = require('node-fetch');
const { Keypair } = require('stellar-base');
class Login extends React.Component {


    onLogin = () => {
      var value = document.getElementById('login').value;
        try {
            const key = Keypair.fromSecret(value);
            this.props.onUpdateSCKey(value);
            this.props.onUpdatePBKey(key.publicKey());
            
          }
          catch(err) {
            alert(err.message);
          }
    }

    render() {

      
        return(
            this.props.sckey !== null ? <Redirect to="/"></Redirect> :
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
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      onUpdateSCKey: updateSCKey,
      onUpdatePBKey: updatePBKey,
    }, dispatch);
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Login);