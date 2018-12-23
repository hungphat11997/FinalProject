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
import { updatePaymentHistory } from '../actions/updatePaymentHistory';
import { updatePaymentUser } from '../actions/updatePaymentUser';
import { updatePaymentUserList } from '../actions/updatePaymentUserList';
import { updateTransfers } from '../actions/updateTransfers';
import { sign, encode, Transaction} from '../v1';
const { Keypair } = require('stellar-base');
class HomePage extends Component {
  openModal = () => {
    this.props.onUpdateDialog(true)
  }
  openModal2 = () => {
    this.nameOfPublicKey(this.props.paymentuser.payUser)
    var data = {
      pbk: this.props.pbkey,
    }
    // //paymenthistory
    // fetch(`/paymenthistory`, {method: "POST", body: JSON.stringify(data),
    // headers: {
    //   "Content-Type": "application/json"
    // },
    // credentials: "same-origin"})
    //   .then((res) => res.json())
    //    .then(res => this.props.onUpdatePaymentHistory({payHis: res.payHis}));

    //    //paymentuser
    // fetch(`/paymentuser`, {method: "POST", body: JSON.stringify(data),
    // headers: {
    //   "Content-Type": "application/json"
    // },
    // credentials: "same-origin"})
    //   .then((res) => res.json())
    //    .then(res => this.props.onUpdatePaymentUser({payUser: res.payUser}));
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
  openTransfers = () => {
    this.props.onUpdateTransfers(!this.props.transfers)
  }
  Transfers = () => {
    if(document.getElementById('to').value === "" || document.getElementById('amount').value === "") {
      alert("Missing infomation!")
    }
    else if(document.getElementById('amount').value === 0) {
      alert("Amount must be higher than 0!")
    }
    else {

        var key = {
          pbk: document.getElementById('to').value,
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
                //payment
                var data = {
                  pbk: this.props.pbkey,
                  sck: this.props.sckey,
                  receiver: document.getElementById('to').value,
                  amount: parseInt(document.getElementById('amount').value, 10),
                }

            fetch(`/payment`, {method: "POST", body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "same-origin"}).then(alert("Success!"))
            // .then(res => res.json())
            // .then((res) => {
            //   var tx = res;
            //   console.log(tx)

            // sign(tx, this.props.sckey);
            
            // var txHash = '0x' + encode(tx).toString('hex')
            // fetch("https://komodo.forest.network/broadcast_tx_commit?tx=" + txHash)
            // }
            // );
            
          }
            }
          );
        }

  }
  createAccount = () => {
    if(document.getElementById('create').value === "") {
      alert("Missing infomation!")
    }
    else {
      try {
        Keypair.fromPublicKey(document.getElementById('create').value);
        var key = {
          pbk: document.getElementById('create').value,
        }
    
        var data = {
          pbk: this.props.pbkey,
          sck: this.props.sckey,
          account: key.pbk,
        }
        //profile
        fetch(`/check`, {method: "POST", body: JSON.stringify(key),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"})
          .then((res) => res.json())
          .then((res) => {
            if(res.isValid === true)
              alert("Account exist!");
            else {
              fetch(`/createaccount`, {method: "POST", body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json"
              },
              credentials: "same-origin"}).then(alert("Create successful!"));
            }
          }
          )
      }
      catch(err) {
        alert("Key not exist!")
      }
    
    }
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
    // .then(res => res.json())
    // .then(
    //   (res) => {
    //     var tx = res;
    //     Transaction.encode(tx);
    // sign(tx, this.props.sckey);
    // var txHash = '0x' + encode(tx).toString('hex')
    // console.log(txHash)
    // fetch("https://komodo.forest.network/broadcast_tx_commit?tx=" + txHash)
    //   }
    // )
    }
    else {
      alert("Message cannot be empty!")
    }
    this.props.onUpdateMyNewfeed({newfeed: this.props.mynewfeed.newfeed.concat(data.post)})
    document.getElementById('txtarea').value = null;
  }

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

      //paymenthistory
    fetch(`/paymenthistory`, {method: "POST", body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"})
      .then((res) => res.json())
       .then(res => this.props.onUpdatePaymentHistory({payHis: res.payHis}));

       //paymentuser
    fetch(`/paymentuser`, {method: "POST", body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"})
      .then((res) => res.json())
       .then(res => this.props.onUpdatePaymentUser({payUser: res.payUser}));
      

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
              {/* <Image width={300} height={200} src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/> */}
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
            <div class="div-right follow">
              <button onClick={() => this.post()}class="button button1">Post</button>
              </div>
            </Col>
            </Row>
  </li>
      
    )
    const paymentHistory = Object.keys(this.props.paymenthistory.payHis).map((i) =>
              <li class="list-li">
              <Row className="show-grid">
              <Col xs={6} md={1}>
              <div><b>{i}.</b></div>
              </Col>
              
              <Col xs={6} md={11}>
              <div class="post-space">
              <p>{this.props.paymenthistory.payHis[i].concat(` ${this.props.paymentuserlist.payUserList[i] !== "" ? this.props.paymentuserlist.payUserList[i]:this.props.paymentuser.payUser[i]}`)}</p>
              </div>
              </Col>
              </Row>
              </li> 
  )
    return (
      this.props.sckey == null ? <Redirect to="/login"></Redirect> :
      this.props.component === "following" ? <Redirect to="/following"></Redirect> :
      // this.props.component === "followers" ? <Redirect to="/followers"></Redirect> :
      this.props.component === "editprofile" ? <Redirect to="/editprofile"></Redirect> :
        <div class="content">
          <div>
            <div class="cover-div">
            <img class="cover-image"
          src={this.props.coverImage.cover}
        />
        </div>
      <NavBar onUpdateSCKey={this.props.onUpdateSCKey} postCount={myNewfeedList.length} component={this.props.component} tab={this.props.tab} onUpdateTab={this.props.onUpdateTab} onUpdateComponent={this.props.onUpdateComponent} />
      
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
        <div class="div-left"><button onClick={() => this.openTransfers()} class="btn-history">Transfers</button></div>
        {this.props.transfers === true ? 
        <div>
          <div class="div-left"><p>To:</p></div><div class="div-right"><input class="input-transfers" id="to" placeholder="puclic key"/></div>
          <div class="div-left"><p>Amount:</p></div><div class="div-right"><input class="input-transfers" id="amount" type="number"/></div>
          <button onClick={() => this.Transfers()} class="btn-history">OK</button>
          </div> : null}
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
            {paymentHistory}
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
              {/* <Image width={300} height={200} src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/> */}
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
        <div>
          <h1>Create Account</h1>
          <div><input class="input-transfers" id="create" placeholder="puclic key"/></div>
          <button onClick={() => this.createAccount()} class="btn-history">Register</button>
          </div>          
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
    paymenthistory: state.paymenthistory,
    paymentuser: state.paymentuser,
    paymentuserlist: state.paymentuserlist,
    transfers: state.transfers,
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
    onUpdatePaymentHistory: updatePaymentHistory,
    onUpdatePaymentUser: updatePaymentUser,
    onUpdatePaymentUserList: updatePaymentUserList,
    onUpdateTransfers: updateTransfers,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
