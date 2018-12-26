import React, { Component } from 'react';
import NavBar2 from './NavBar2';
import { Grid, Row, Col, Button, Modal } from 'react-bootstrap';
import { updateCoverImage } from '../actions/updateCoverImage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Textarea from 'react-textarea-autosize';
import { updateDialog } from '../actions/updateDialog';
import { updateComment } from '../actions/updateComment';
import { Redirect } from 'react-router-dom';
import { sign, encode, Transaction} from '../v1';
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
import { updateMyNewfeedHeight } from '../actions/updateMyNewfeedHeight';
import { updateReadyToLogin } from '../actions/updateReadyToLogin';
const { Keypair } = require('stellar-base');
var Buffer = require('buffer/').Buffer;
class Newfeed extends Component {
  openModal = (i) => {
    this.props.onUpdatePost(this.props.follownewsfeed.news[i]);
    this.props.onUpdatePostName(this.props.follownewsfeed.name[i]);
    this.props.onUpdatePostPic(this.props.follownewsfeed.pic[i]);
    this.props.onUpdatePostKey(this.props.follownewsfeedkey.newsfeedkey[i]);
    this.props.onUpdatePostHeight(this.props.follownewsfeedheight.newsfeedheight[i]);
    this.props.onUpdateDialog(true);
  }
  
  closeModal = () => {
    this.props.onUpdateDialog(false)
  }
  
  onClickComment = () => {
    
    this.props.onUpdateComment(!this.props.comment)
  }
  
  newsfeedOfPublicKey = async (followkey) => {
    console.log(followkey.length)
    var newsarr = [];
    var newsheightarr = [];
    var namearr = [];
    var picarr = [];
    var keyarr = [];
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
    var arrKey = [];
  for (let j = 0; j < newsfeed.length; j++) {
    arrName.push(name);
    arrPic.push(pic);
    arrKey.push(followkey[i]);
  }
  namearr = namearr.concat(arrName);
  picarr = picarr.concat(arrPic);
  newsarr = newsarr.concat(newsfeed);
  keyarr = keyarr.concat(arrKey);
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

        var temp5 = keyarr[i];
        keyarr[i] = keyarr[j];
        keyarr[j] = temp5;
      }
    }
    
  }
  this.props.onUpdateFollowNewsfeedHeight({newsfeedheight: newsheightarr});
  this.props.onUpdateFollowNewsfeedKey({newsfeedkey: keyarr});
  this.props.onUpdateFollowNewsfeed({
    name: namearr,
    pic: picarr,
    news: newsarr
  })
  }

  comment = () => {
    console.log(document.getElementById("comment-box").value)
    console.log(this.props.postheight)
    if(document.getElementById("comment-box").value === "" || document.getElementById("comment-box").value === undefined) {
      alert("Empty message!")
    }
    else {
    var data = {
      pbk: this.props.postkey,
      height: this.props.postheight,
    }
    //hash
    fetch(`/hash`, {method: "POST", body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"})
      .then((res) => res.json())
       .then(res => {
        console.log(res)
         var data2 = {
           pbk: this.props.pbkey,
           hash: res.hash,
           comment: document.getElementById("comment-box").value,
         }
        fetch(`/comment`, {method: "POST", body: JSON.stringify(data2),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"})
      .then((res) => res.json())
        .then((res) => {
          console.log(res)
          var tx = res;
          tx.memo = Buffer.from(tx.memo);
          tx.params.content = Buffer.from(tx.params.content);
          sign(tx, this.props.sckey);
          var txHash = '0x' + encode(tx).toString('hex')

          fetch(`https://komodo.forest.network/broadcast_tx_commit?tx=` + txHash)
          .then((res) => res.json())
          .then(res => console.log(res));
          document.getElementById("comment-box").value = "";
        })
    }
      );
    }
    
  }

  componentDidMount() {
    var data = {
      pbk: this.props.pbkey,
    }
    fetch(`/followkey`, {method: "POST", body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"})
      .then((res) => res.json())
       .then(res => {
         this.props.onUpdateFollowKey(res.followkey);
         this.newsfeedOfPublicKey(this.props.followkey);

       });
       
  }
  render() {
    //console.log(this.props.follownewsfeedheight)
      const myNewfeedList = Object.keys(this.props.follownewsfeed.news).map((i) =>
      <div>
      <li onClick={() => this.openModal(i)} class="list-li post-content">
              <Row className="show-grid">
              <Col xs={6} md={1}>
              <img class="user-image" src={"data:image/png;base64, " + this.props.follownewsfeed.pic[i]}/>
              </Col>
              
              <Col xs={6} md={11}>
              <div class="post-space">
              <p class="post-name div-left">{this.props.follownewsfeed.name[i]}<p class="post-height div-left">{this.props.follownewsfeedheight.newsfeedheight[i]}</p></p>
              <p class="div-left">{this.props.follownewsfeed.news[i]}</p>
              <div class="div-left">
              </div>
              </div>
              </Col>
              </Row>
              </li>
              <br/>
              </div>)

    return (
      this.props.sckey == null ? <Redirect to="/login"></Redirect> :
      this.props.component === "post" ? <Redirect to="/home"></Redirect> :
      this.props.component === "following" ? <Redirect to="/following"></Redirect> :
      this.props.component === "followers" ? <Redirect to="/followers"></Redirect> :
      this.props.component === "editprofile" ? <Redirect to="/editprofile"></Redirect> :
        <div class="content">
          <div>
            <div class="cover-div">
            <img class="cover-image"
          src={this.props.coverImage.cover}
        />
        </div>
        <NavBar2 
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
      <Row className="show-grid">
        <Col xs={6} md={3}>
        </Col>
        <Col xs={6} md={5}>
        <div class="col-space">

{/* post detail */}
    <Modal show={this.props.dialog} onHide={() =>this.closeModal()}>
    <Modal.Header>
    <div>
              <Row className="show-grid">
              <Col xs={6} md={1}>
              <img class="user-image" src={"data:image/png;base64, " + this.props.postpic}/>
              </Col>
              
              <Col xs={6} md={11}>
              <div class="post-space">
              <p class="post-name">{this.props.postname}</p>
              <p>{this.props.post}</p>
              {/* <Image width={300} height={200} src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/> */}
              <i onClick = {() => this.onClickComment()} class="far fa-comment icon-size cmt-icon"></i>
              <i class="far fa-thumbs-up icon-size like-icon" aria-hidden="true"></i>
              <i class="far fa-heart icon-size like-icon"></i>
              <i class='far fa-laugh-squint icon-size like-icon'></i>
              <i class='far fa-laugh icon-size like-icon'></i>
              <i class='far fa-sad-tear icon-size like-icon'></i>
              <i class='far fa-angry icon-size like-icon'></i>
              <br/>
              {this.props.comment === true ?
              <div>
              <img class="cmt-image" src={this.props.profilepicture}/>
              <Textarea id="comment-box" class="txt-area" autoFocus
              placeHolder="What're you thinking?"
              />
              <div class="div-right">
              <button class="btn-history" onClick={() => this.comment()}>Send</button>
              </div>
              </div>:<div></div>
              }
              </div>
              </Col>
              </Row>
              </div>
          </Modal.Header>
          <Modal.Body>
            <ul>
            <li class="list-li">
              <Row className="show-grid">
              <Col xs={6} md={1}>
              <img class="user-image" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/>
              </Col>
              
              <Col xs={6} md={11}>
              <div class="post-space">
              <p class="post-name">ABC</p>
              <p>hell</p>
              </div>
              </Col>
              </Row>
              </li> 
              </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() =>this.closeModal()}>Close</Button>
          </Modal.Footer>
        </Modal>
              
          <ul>
            {myNewfeedList.reverse()}
          </ul>
          </div>
        </Col>
        <Col xsHidden md={4}>
        </Col>
      </Row>
      </div>
</div>
  

    )
  }
}

const mapStateToProps = (state) => {
  return {
    coverImage: state.coverImage,
    dialog: state.dialog,
    comment: state.comment,
    component: state.component,
    sckey: state.sckey,
    pbkey: state.pbkey,
    profilepicture: state.profilepicture,
    mynewfeed: state.mynewfeed,
    followkey: state.followkey,
    follownewsfeed: state.follownewsfeed,
    post: state.post,
    postname: state.postname,
    postpic: state.postpic,
    follownewsfeedheight: state.follownewsfeedheight,
    postheight: state.postheight,
    follownewsfeedkey: state.follownewsfeedkey,
    postkey: state.postkey,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onUpdateCoverImage: updateCoverImage,
    onUpdateDialog: updateDialog,
    onUpdateTab: updateTab,
    onUpdateComment: updateComment,
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
export default connect(mapStateToProps, mapDispatchToProps)(Newfeed);
