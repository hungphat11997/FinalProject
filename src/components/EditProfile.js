import React, { Component } from 'react';
import NavBar from './NavBar';
import { Navbar } from 'react-bootstrap';
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
import Image from 'react-image-resizer';
import { connect } from 'react-redux';
import { updateCoverImage } from '../actions/updateCoverImage';
import { updateTab } from '../actions/updateTab';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { updateImageInput } from '../actions/updateImageInput';
import { updateComponent } from '../actions/updateComponent';
import { updateSCKey } from '../actions/updateSCKey';
import { updateProfile } from '../actions/updateProfile';
import { updateMyNewfeed } from '../actions/updateMyNewfeed';
import { updatePaymentHistory } from '../actions/updatePaymentHistory';
import { updatePaymentUser } from '../actions/updatePaymentUser';
import { updatePaymentUserList } from '../actions/updatePaymentUserList';
import { updateProfilePicture } from '../actions/updateProfilePicture';
import { updateFollowKey } from '../actions/updateFollowKey';
import { updatePost } from '../actions/updatePost';
import { updatePBKey } from '../actions/updatePBKey';
import { updateFollowKeyName } from '../actions/updateFollowKeyName';
import { updateFollowKeyPic } from '../actions/updateFollowKeyPic';
import { updateFollowNewsfeed } from '../actions/updateFollowNewsfeed';
import { updatePostName } from '../actions/updatePostName';
import { updatePostPic } from '../actions/updatePostPic';
import { sign, encode, Transaction } from '../v1';
import { updateFollowNewsfeedHeight } from '../actions/updateFollowNewsfeedHeight';
import { updatePostHeight } from '../actions/updatePostHeight';
import { updateFollowNewsfeedKey } from '../actions/updateFollowNewsfeedKey';
import { updatePostKey } from '../actions/updatePostKey';
import { updateReadyToLogin } from '../actions/updateReadyToLogin';
import { updateMyNewfeedHeight } from '../actions/updateMyNewfeedHeight';
var fs = require('fs').fs;
let axios = require('axios');

class EditProfile extends Component {

  componentDidMount() {
    var data = {
      pbk: this.props.pbkey,
    }
    //profile
    fetch(`/data`, {method: "POST", body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"})
      .then((res) => res.json())
       .then(res => this.props.onUpdateProfile({name: res.name, seq: res.sequence, balance: res.balance}));
          //profilepicture
    fetch(`/picture`, {method: "POST", body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"})
      .then((res) => res.json())
       .then(res => this.props.onUpdateProfilePicture("data:image/png;base64, " + res.picture));
  }
updateProfile = () => {
  var data = {
    pbk: this.props.pbkey,
    name: document.getElementById('name').value,
  }
    //updatename
  fetch(`/updatename`, {method: "POST", body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "same-origin"})
  .then(res => res.json())
  .then((res) => {
    var tx = res;
    tx.params.value = Buffer.from(tx.params.value)
    tx.memo = Buffer.from(tx.memo)
    sign(tx, this.props.sckey);
    var txHash = '0x' + encode(tx).toString('hex')
    fetch("https://komodo.forest.network/broadcast_tx_commit?tx=" + txHash).then(res => res.json())
    this.props.onUpdateProfile({name: document.getElementById('name').value, seq: this.props.profile.seq + 1, balance: this.props.profile.balance});
    document.getElementById('name').value = null;
    alert("Update Successful!");
  });


    
//   if(this.props.imageinput !== null && this.props.imageinput !== undefined) {
//     var data2 = {
//       pbk: this.props.pbkey,
//       file: this.props.imageinput,
//     }
//     //console.log(document.getElementById('image').files[0])
//     console.log("data:" + this.props.imageinput)
//       //updatepicture
//   fetch(`/updatepicture`, {method: "POST", body: JSON.stringify(data2),
//   headers: {
//     "Content-Type": "application/json"
//   },
//   credentials: "same-origin"})
//   .then(res => res.json())
//   .then((res) => {
//     var tx = res;
//       tx.memo = Buffer.from(tx.memo)
//       tx.params.value =  Buffer.from(tx.params.value) 
//       //fs.readFileSync(this.props.imageinput, function(err, original_data){
//         //tx.params.value = this.props.imageinput.getAsBinary();;
// //         sign(tx,  this.props.sckey);
// //         var txHash =  encode(tx).toString('base64')
// //         axios.post('https://komodo.forest.network/', {
// //     "jsonrpc": "2.0",
// //     "id": 1,
// //     "method": "broadcast_tx_commit",
// //     "params": [`${txHash}`]
// // })
// //     .then(res => console.log(res.data))
// //       //})
        
    

    
//    })
  
//   this.props.onUpdateProfilePicture(this.props.imageinput)
//   this.props.onUpdateImageInput("")
//   document.getElementById('image').value = "";
//   alert("Update Successful!")
//   }
//   else {
//     alert("Missing!")
//   }

  


}
onImageChange(event) {
  if (event.target.files && event.target.files[0]) {

      let reader = new FileReader();
      reader.onload = (e) => {
        
          
          this.props.onUpdateImageInput(e.target.result)
          console.log("data:" +this.props.imageinput)
          
      };
      reader.readAsDataURL(event.target.files[0]);
  }
  else {
    
    this.props.onUpdateImageInput(null)
    //console.log("data:" +this.props.image)
  }
}
  render() {
    if(this.props.imageinput !== null) {
      console.log(this.props.imageinput.name)
    }

    return (
      this.props.sckey == null ? <Redirect to="/login"></Redirect> :
      this.props.component === "home" ? <Redirect to="/"></Redirect> :
      this.props.component === "post" ? <Redirect to="/home"></Redirect> :
        this.props.component === "following" ? <Redirect to="/following"></Redirect> :
            <div class="content">
              <div>
                <div class="cover-div">
                  <img class="cover-image"
                    src={this.props.coverImage.cover}
                  />
                </div>
                <NavBar profilepic = {this.props.coverImage.profile} 
      profilepicture = {this.props.profilepicture} 
      component = {this.props.component}
      tab = {this.props.tab}
      postCount = {this.props.mynewfeed.newfeed.length}
      followCount = {this.props.followkey.length}
      onUpdateSCKey = {this.props.onUpdateSCKey} 
      onUpdatePBKey = {this.props.onUpdatePBKey} 
      onUpdateTab = {this.props.onUpdateTab} 
      onUpdateComponent = {this.props.onUpdateComponent} 
      onUpdateFollowKeyName = {this.props.onUpdateFollowKeyName} 
      onUpdateFollowKeyPic = {this.props.onUpdateFollowKeyPic} 
      onUpdateFollowKey = {this.props.onUpdateFollowKey} 
      onUpdateFollowNewsfeed = {this.props.onUpdateFollowNewsfeed}
      onUpdateFollowNewsfeedKey = {this.props.onUpdateFollowNewsfeedKey}
      onUpdateFollowNewsfeedHeight = {this.props.onUpdateFollowNewsfeedHeight}
      onUpdateMyNewfeed = {this.props.onUpdateMyNewfeed}
      onUpdateMyNewfeedHeight = {this.props.onUpdateMyNewfeedHeight}  
      onUpdatePaymentHistory = {this.props.onUpdatePaymentHistory} 
      onUpdatePaymentUserList = {this.props.onUpdatePaymentUserList} 
      onUpdatePaymentUser = {this.props.onUpdatePaymentUser} 
      onUpdatePostName = {this.props.onUpdatePostName} 
      onUpdatePostPic = {this.props.onUpdatePostPic} 
      onUpdatePost = {this.props.onUpdatePost} 
      onUpdatePostKey = {this.props.onUpdatePostKey} 
      onUpdatePostHeight = {this.props.onUpdatePostHeight} 
      onUpdateProfilePicture = {this.props.onUpdateProfilePicture} 
      onUpdateProfile = {this.props.onUpdateProfile} 
      onUpdateReadyToLogin = {this.props.onUpdateReadyToLogin} 
      />
                <Col xs={6} md={3}>
                <Row className="show-grid">
        <Col xs={6} md={6}>
        </Col>
        <Col xs={6} md={6}>
        <div class="user-info">
        <div class="div-left"><p> Name: <b>{this.props.profile.name}</b></p></div>
        <div class="div-left"><p> Sequence: <b>{this.props.profile.seq}</b></p></div>
        <div class="div-left"><p> Balance: <b>{this.props.profile.balance}</b></p></div>
          </div>
        </Col>
        </Row>
                </Col>

                <Col xs={6} md={8}>
                  <Card>
                    <CardHeader color="Info">
                      <strong>Your Profile</strong>
                    </CardHeader>
                    <br></br>
                    
                    <CardBody className="text-center">
                      <Form action="" method="post" class="form-horizontal">
                        <FormGroup row>
                          <Label for="name" sm={4}>Name</Label>
                          <Col sm={4} md="4">
                            <InputGroup>
                              <Input type="text" id="name" name="name" placeholder="Name"/>
                            </InputGroup>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="Image" sm={4}>Profile picture</Label>
                          <Col sm={4} md="4">
                            <InputGroup>
                            <input onChange={(e) => this.onImageChange(e)} id="image" type="file" name="image" accept="image/png, image/jpeg"/>
                            </InputGroup>
                          </Col>
                        </FormGroup>
                      </Form>
                    </CardBody>
              
                    <br></br>


                    <CardFooter>
                      <Button onClick={() => this.updateProfile()}type="submit" size="sm" sm={2}><i className="fa fa-save" />Save</Button>{' '}
                      <Button type="reset" size="sm"><i className="fa fa-ban" />Cancel</Button>
                    </CardFooter>
                <br></br>
                  </Card>
                </Col>
                
              </div>
            </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    coverImage: state.coverImage,
    tab: state.tab,
    component: state.component,
    sckey: state.sckey,
    pbkey: state.pbkey,
    profile: state.profile,
  mynewfeed: state.mynewfeed,
  followkey: state.followkey,
  imageinput: state.imageinput,
  profilepicture: state.profilepicture,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onUpdateCoverImage: updateCoverImage,
    onUpdateTab: updateTab,
    onUpdateComponent: updateComponent,
    onUpdateSCKey: updateSCKey,
    onUpdateProfile: updateProfile,
    onUpdateImageInput: updateImageInput,
    onUpdatePBKey: updatePBKey,
    onUpdateMyNewfeed: updateMyNewfeed,
    onUpdateMyNewfeedHeight: updateMyNewfeedHeight,
    onUpdatePaymentHistory: updatePaymentHistory,
    onUpdatePaymentUser: updatePaymentUser,
    onUpdatePaymentUserList: updatePaymentUserList,
    onUpdateProfilePicture: updateProfilePicture,
    onUpdateFollowKey: updateFollowKey,
    onUpdateFollowKeyName: updateFollowKeyName,
    onUpdateFollowKeyPic: updateFollowKeyPic,
    onUpdateFollowNewsfeed: updateFollowNewsfeed,
    onUpdatePost: updatePost,
    onUpdatePostName: updatePostName,
    onUpdatePostPic: updatePostPic,
    onUpdateFollowNewsfeedHeight: updateFollowNewsfeedHeight,
    onUpdatePostHeight: updatePostHeight,
    onUpdateFollowNewsfeedKey: updateFollowNewsfeedKey,
    onUpdatePostKey: updatePostKey,
    onUpdateReadyToLogin: updateReadyToLogin,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);