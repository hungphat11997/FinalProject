import React, { Component } from 'react';
import NavBar from './NavBar';
import { Grid, Row, Col, Button, Modal } from 'react-bootstrap';
import Image from 'react-image-resizer';
import { updateCoverImage } from '../actions/updateCoverImage';
import { updateTab } from '../actions/updateTab';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Textarea from 'react-textarea-autosize';
import { updateDialog } from '../actions/updateDialog';
import { updateComment } from '../actions/updateComment';
import { updateComponent } from '../actions/updateComponent';
import { Redirect } from 'react-router-dom';
import { updateSCKey } from '../actions/updateSCKey';
import { updateProfile } from '../actions/updateProfile';
import { updateMyNewfeed } from '../actions/updateMyNewfeed';
import { updateDialog2 } from '../actions/updateDialog2';

class HomePage extends Component {
  openModal = () => {
    this.props.onUpdateDialog(true)
  }
  openModal2 = () => {
    this.props.onUpdateDialog2(true)
  }
  closeModal = () => {
    this.props.onUpdateDialog(false)
  }
  closeModal2 = () => {
    this.props.onUpdateDialog2(false)
  }
  onClickComment = () => {
    this.props.onUpdateComment(!this.props.comment)
  }
  post = () => {
    var data = {
      pbk: this.props.pbkey,
      sck: this.props.sckey,
      post: document.getElementById('txtarea').value,
    }
    if(data.post !== "" && data.post !== undefined) {
      //post
    fetch(`/post`, {method: "POST", body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"})
    }
    else {
      alert("Message cannot be empty!")
    }
    this.props.onUpdateMyNewfeed({newfeed: this.props.mynewfeed.newfeed.concat(data.post)})
    document.getElementById('txtarea').value = null;
  }
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

    //mynewfeed
    fetch(`/mynewfeed`, {method: "POST", body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"}) 
      .then(res => res.json())
      .then(res => this.props.onUpdateMyNewfeed({newfeed: res.newfeed}));
  }
  render() {

      const myNewfeedList = Object.keys(this.props.mynewfeed.newfeed).map((i) =>
      <div>
      <li onClick={() => this.openModal()} class="list-li post-content">
              <Row className="show-grid">
              <Col xs={6} md={1}>
              <img class="user-image" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/>
              </Col>
              
              <Col xs={6} md={11}>
              <div class="post-space">
              <p class="post-name div-left">{this.props.profile.name}</p>
              <p class="div-left">{this.props.mynewfeed.newfeed[i]}</p>
              <Image width={300} height={200} src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/>
              <div class="div-left">
              <i onClick={() => this.openModal()} class="fa fa-comments-o icon-size cmt-icon"> 23</i>
              <i onClick class="fa fa-share-alt icon-size share-icon">10</i>
              <i onClick class="fa fa-heart-o icon-size like-icon">50</i>
              </div>
              </div>
              </Col>
              </Row>
              </li>
              <br/>
              </div>)
      const postArea = (<li class="post-area list-li">
      <Row className="show-grid">
            <Col xs={6} md={1}>
            <div class="img-post">
            <img class="user-image-post" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/>
            </div>
            </Col>
            <Col xs={6} md={11}>
            <div class="post-space">
            <Textarea id="txtarea" class="txt-area" autoFocus
            placeHolder="What're you thinking?"
            />
            </div>
            <div class="div-center follow">
              <button onClick={() => this.post()}class="button button1">Post</button>
              </div>
            </Col>
            </Row>
  </li>
      
    )
    return (
      this.props.sckey == null ? <Redirect to="/login"></Redirect> :
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
      <NavBar postCount={myNewfeedList.length} component={this.props.component} tab={this.props.tab} onUpdateTab={this.props.onUpdateTab} onUpdateComponent={this.props.onUpdateComponent} />
      
      <Row className="show-grid">
        <Col xs={6} md={3}>
        <Row className="show-grid">
        <Col xs={6} md={6}>
        </Col>
        <Col xs={6} md={6}>
        <div class="user-info">
        <div class="div-left"><p> Name: <b>{this.props.profile.name}</b></p></div>
        <div class="div-left"><p> Sequence: <b>{this.props.profile.seq}</b></p></div>
        <div class="div-left"><p> Balance: <b>{this.props.profile.balance}</b></p></div>
        <div class="div-left"><button onClick={() => this.openModal2()} class="btn-history">Payment history</button></div>
          </div>
        </Col>
        </Row>
        
        </Col>
        <Col xs={6} md={5}>
        <div class="col-space">
{/* payment history */}
<Modal show={this.props.dialog2} onHide={() =>this.closeModal2()}>
    <Modal.Header>
    <div><b>Payment History</b></div>
          </Modal.Header>
          <Modal.Body>
            <ul>
            <li class="list-li">
              <Row className="show-grid">
              <Col xs={6} md={1}>
              <div><b>1.</b></div>
              </Col>
              
              <Col xs={6} md={11}>
              <div class="post-space">
              <p>Receive 100 CEL from abc</p>
              </div>
              </Col>
              </Row>
              </li> 
              </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() =>this.closeModal2()}>Close</Button>
          </Modal.Footer>
        </Modal>
{/* post detail */}
    <Modal show={this.props.dialog} onHide={() =>this.closeModal()}>
    <Modal.Header>
    <div>
              <Row className="show-grid">
              <Col xs={6} md={1}>
              <img class="user-image" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/>
              </Col>
              
              <Col xs={6} md={11}>
              <div class="post-space">
              <p class="post-name">ABC</p>
              <p>This is my 1st post</p>
              <Image width={300} height={200} src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/>
              <i onClick={() => this.onClickComment()} class="fa fa-comments-o icon-size cmt-icon"> 23</i>
              <i class="fa fa-share-alt icon-size share-icon">10</i>
              <i class="fa fa-heart-o icon-size like-icon">50</i>
              <br/>
              {this.props.comment === true ?
              <div>
              <img class="cmt-image" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/>
              <Textarea class="txt-area" autoFocus
              placeHolder="What're you thinking?"
              />
              <div class="div-right">
              <button>Send</button>
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
              <p class="post-name">{this.props.profile.name}</p>
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
            {postArea}
            {myNewfeedList.reverse()}
          </ul>
          </div>
        </Col>
        <Col xsHidden md={4}>
        <div class="col-space">

          </div>
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
    tab: state.tab,
    dialog: state.dialog,
    dialog2: state.dialog2,
    comment: state.comment,
    component: state.component,
    sckey: state.sckey,
    pbkey: state.pbkey,
    profile: state.profile,
    mynewfeed: state.mynewfeed,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onUpdateCoverImage: updateCoverImage,
    onUpdateTab: updateTab,
    onUpdateDialog: updateDialog,
    onUpdateDialog2: updateDialog2,
    onUpdateComment: updateComment,
    onUpdateComponent: updateComponent,
    onUpdateSCKey: updateSCKey,
    onUpdateProfile: updateProfile,
    onUpdateMyNewfeed: updateMyNewfeed,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
