import React, { Component } from 'react';
import NavBar from './NavBar';
import { Navbar, Row, Col } from 'react-bootstrap';
import Image from 'react-image-resizer';
import { connect } from 'react-redux';
import { updateCoverImage } from '../actions/updateCoverImage';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { isNullOrUndefined } from 'util';
import { sign, encode, Transaction } from '../v1';
import { updateTab } from '../actions/updateTab';
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
import { updateFollowNewsfeedHeight } from '../actions/updateFollowNewsfeedHeight';
import { updatePostHeight } from '../actions/updatePostHeight';
import { updateFollowNewsfeedKey } from '../actions/updateFollowNewsfeedKey';
import { updatePostKey } from '../actions/updatePostKey';
import { updateReadyToLogin } from '../actions/updateReadyToLogin';
import { updateMyNewfeedHeight } from '../actions/updateMyNewfeedHeight';
class Following extends Component {
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

       this.nameOfPublicKey(this.props.followkey)
       this.picOfPublicKey(this.props.followkey)
  }

  picOfPublicKey = async (followkey) => {
    //console.log(pbk)
    var arr = [];
    for(let i = 0;i < followkey.length; i++){
      var data = {
        pbk: followkey[i],
      }
      //profile
    const response = await fetch(`/picture`, {method: "POST", body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"}).then(res => res.json())
    const json = await response.picture;
    arr.push(json);
    
  }
  this.props.onUpdateFollowKeyPic({followkeypic: arr})
  }
  nameOfPublicKey = async (followkey) => {
    //console.log(pbk)
    var arr = [];
    for(let i = 0;i < followkey.length; i++){
      var data = {
        pbk: followkey[i],
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
  this.props.onUpdateFollowKeyName({followkeyname: arr})
  }

  unfollow = (i) => {
    var arr = this.props.followkey;
  if (i > -1) {
    arr.splice(i, 1);
  }
  var data = {
    pbk: this.props.pbkey,
    followings: arr,
  }
  fetch(`/updatefollowing`, {method: "POST", body: JSON.stringify(data),
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
    this.props.onUpdateFollowKey(arr);
    this.newsfeedOfPublicKey(this.props.followkey);
    this.nameOfPublicKey(arr);
    this.picOfPublicKey(arr);
    this.props.onUpdateProfile({name: this.props.profile.name, seq: this.props.profile.seq + 1, balance: this.props.profile.balance});

  });
  }

  follow = () => {
    if(document.getElementById('follow').value === "") {
      alert("Missing infomation!")
    }
    else {

        var key = {
          pbk: document.getElementById('follow').value,
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
              var arr = this.props.followkey;
              arr.push(key.pbk);
              var data = {
                pbk: this.props.pbkey,
                followings: arr,
              }
              fetch(`/updatefollowing`, {method: "POST", body: JSON.stringify(data),
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
                this.props.onUpdateFollowKey(arr);
                this.newsfeedOfPublicKey(this.props.followkey);
                this.nameOfPublicKey(arr);
                this.picOfPublicKey(arr);
                alert("Follow success!");
                this.props.onUpdateProfile({name: this.props.profile.name, seq: this.props.profile.seq + 1, balance: this.props.profile.balance});
              });    
          }
            }
          );
        }

  }

  newsfeedOfPublicKey = async (followkey) => {
    console.log(followkey.length)
    var newsarr = [];
    var newsheightarr = [];
    var namearr = [];
    var picarr = [];
    
    for(let i = 0; i < followkey.length; i++){
      
      var data = {
        pbk: followkey[i],
      }
        //name
    const resName = await fetch(`/data`, {method: "POST", body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"}).then(res => res.json())
    const name = await resName.name;
    
       //pic
       const resPic = await fetch(`/picture`, {method: "POST", body: JSON.stringify(data),
       headers: {
         "Content-Type": "application/json"
       },
       credentials: "same-origin"}).then(res => res.json())
       const pic = await resPic.picture;
        //newsfeed
    const resNews = await fetch(`/mynewfeed`, {method: "POST", body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"}).then(res => res.json())
    const newsfeed = await resNews.newfeed;

    //newsfeedheight
    const resNewsheight = await fetch(`/mynewfeedheight`, {method: "POST", body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"}).then(res => res.json())
    const newsfeedheight = await resNewsheight.newfeedheight;

    var arrName = [];
    var arrPic = [];
  for (let j = 0; j < newsfeed.length; j++) {
    arrName.push(name);
    arrPic.push(pic);
  }
  namearr = namearr.concat(arrName);
  picarr = picarr.concat(arrPic);
  newsarr = newsarr.concat(newsfeed);
  newsheightarr = newsheightarr.concat(newsfeedheight);
  }

  for(let i = 0; i < newsarr.length - 1; i++) {
    //console.log("hi")
    for(let j = i + 1; j < newsarr.length; j++) {
      if(parseInt(newsheightarr[i], 10) > parseInt(newsheightarr[j], 10)){
        var temp1 = newsheightarr[i];
        newsheightarr[i] = newsheightarr[j];
        newsheightarr[j] = temp1;

        var temp2 = newsarr[i];
        newsarr[i] = newsarr[j];
        newsarr[j] = temp2;

        var temp3 = namearr[i];
        namearr[i] = namearr[j];
        namearr[j] = temp3;

        var temp4 = picarr[i];
        picarr[i] = picarr[j];
        picarr[j] = temp4;
      }
    }
    
  }
 
  this.props.onUpdateFollowNewsfeed({
    name: namearr,
    pic: picarr,
    news: newsarr
  })
  }

  render() {
    console.log(this.props.followkeypic)
    const followList = Object.keys(this.props.followkey).map((i) => (
      <div>
      <li class="list-li post-content">
     <Row className="show-grid" >
     
                        <Col Col xs={6} md={2}>

                          <div class="div-left">
                            <img class="user-profile-small" src={"data:image/png;base64, " + this.props.followkeypic.followkeypic[i]} />
                          </div>
                          </Col>
                          <Col Col xs={6} md={6}>
                          <div class="follow-name div-left">
                            <p><b>{this.props.followkeyname.followkeyname[i] !== "" ?
                            this.props.followkeyname.followkeyname[i] : this.props.followkey[i].substring(0, 15) + "..."}</b></p>
                          </div>
                        </Col>
                        <Col Col xs={6} md={4}>

                          <button onClick={() => this.unfollow(i)}type="submit" class="button-follow">Unfollow</button>
                       </Col>                    
                     
     </Row>
     
     </li>        
     
     <br/>
     </div>
    ))
console.log(this.props.followkeyname)
    return (
      this.props.sckey == null ? <Redirect to="/login"></Redirect> :
      this.props.component === "home" ? <Redirect to="/"></Redirect> :
      this.props.component === "post" ? <Redirect to="/"></Redirect> :
      this.props.component === "editprofile" ? <Redirect to="/editprofile"></Redirect> :
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

 <Col xs={6} md={5}>
 <div class="col-space">
 <ul>
   {followList.reverse()}
     </ul>
     </div>
 
 </Col>
 <Col xs={6} md={4}>
 
 <div class="col-space">
        <div>
        <h1>Follow someone</h1>
          <div><input class="input-transfers" id="follow" placeholder="puclic key"/></div>
          <button onClick={() => this.follow()} class="btn-history">Follow</button>
          </div>          
          </div>
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
    profilepicture: state.profilepicture,
    followkey: state.followkey,
    followkeyname: state.followkeyname,
    followkeypic: state.followkeypic,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onUpdateCoverImage: updateCoverImage,
    onUpdateTab: updateTab,
    onUpdateComponent: updateComponent,
    onUpdateSCKey: updateSCKey,
    onUpdatePBKey: updatePBKey,
    onUpdateProfile: updateProfile,
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
export default connect(mapStateToProps, mapDispatchToProps)(Following);