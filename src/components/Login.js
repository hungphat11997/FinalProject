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
import { updateReadyToLogin } from '../actions/updateReadyToLogin';
import { updatePaymentUser } from '../actions/updatePaymentUser';
import { updatePaymentUserList } from '../actions/updatePaymentUserList';
import { updateProfilePicture } from '../actions/updateProfilePicture';
const fetch = require('node-fetch');
const { Keypair } = require('stellar-base');
class Login extends React.Component {

  nameOfPublicKey = async (payUser) => {
    //console.log(pbk)
    var arr = [];
    for(let i = 0;i < payUser.length; i++){
      var data = {
        pbk: payUser[i],
      }
      //profile
    const response = await fetch(`/data`, {method: "POST", body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"}).then(res => res.json())
    const json = await response.name;
    arr.push(json);
    
  }
  this.props.onUpdatePaymentUserList({payUserList: arr})
  }

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
                  this.props.onUpdateSCKey(value);
                  this.props.onUpdatePBKey(pbk);
                }})
                .then(() => {
                  var data = {
                    pbk: this.props.pbkey,
                  }
                  //paymentuser
                  fetch(`/paymentuser`, {method: "POST", body: JSON.stringify(data),
                  headers: {
                    "Content-Type": "application/json"
                  },
                  credentials: "same-origin"})
                    .then((res) => res.json())
                    .then(res => this.props.onUpdatePaymentUser({payUser: res.payUser}))
                    .then(() => this.nameOfPublicKey(this.props.paymentuser.payUser))
                    .then(() => {
                      var data = {
                        pbk: this.props.pbkey,
                      }
                         //profilepicture
                         fetch(`/picture`, {method: "POST", body: JSON.stringify(data),
                         headers: {
                           "Content-Type": "application/json"
                         },
                         credentials: "same-origin"})
                           .then((res) => res.json())
                            .then(res => this.props.onUpdateProfilePicture("data:image/png;base64, " + res.picture));
                    })
                    .then(() => this.props.onUpdateReadyToLogin(!this.props.readytologin))
                })
            
            
              
          }
          catch(err) {
            alert(err.message);
          }
    }

    render() {
//       const key = Keypair.random();
// console.log(key.secret());
// console.log(key.publicKey());

      //console.log(this.props.followkey)
        return(
            this.props.readytologin !== false ? 
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
      paymentuser: state.paymentuser,
      readytologin: state.readytologin,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      onUpdateSCKey: updateSCKey,
      onUpdatePBKey: updatePBKey,
      onUpdateProfilePicture: updateProfilePicture,
      onUpdatePaymentUser: updatePaymentUser,
      onUpdatePaymentUserList: updatePaymentUserList,
      onUpdateFollowKey: updateFollowKey,
      onUpdateReadyToLogin: updateReadyToLogin,
    }, dispatch);
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Login);