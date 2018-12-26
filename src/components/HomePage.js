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
import { Redirect } from 'react-router-dom';
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
import { updateTransfers } from '../actions/updateTransfers';
import { updateDialog2 } from '../actions/updateDialog2';
import { sign, encode, Transaction } from '../v1';
import { updateMyNewfeedHeight } from '../actions/updateMyNewfeedHeight';
import { updatePostHeight } from '../actions/updatePostHeight';
import { updateFollowNewsfeedHeight } from '../actions/updateFollowNewsfeedHeight';
import { updateFollowNewsfeedKey } from '../actions/updateFollowNewsfeedKey';
import { updatePostKey } from '../actions/updatePostKey';
import { updateReadyToLogin } from '../actions/updateReadyToLogin';
var Buffer = require('buffer/').Buffer;
const { Keypair } = require('stellar-base');
class HomePage extends Component {
  openModal = (i) => {
    this.props.onUpdatePost(this.props.mynewfeed.newfeed[i])
    this.props.onUpdatePostHeight(this.props.mynewfeedheight.newfeedheight[i])
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
              if(parseInt(document.getElementById('amount').value, 10) > this.props.profile.balance)
              {
                alert("Not enough balance!")
              }
              else {
                //payment
                var data = {
                  pbk: this.props.pbkey,
                  receiver: document.getElementById('to').value,
                  amount: parseInt(document.getElementById('amount').value, 10),
                }

            fetch(`/payment`, {method: "POST", body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "same-origin"})
            .then(res => res.json())
              .then((res) => {
                var tx = res;
                //tx.params.address = Buffer.from(tx.params.address)
                tx.memo = Buffer.from(tx.memo)
                sign(tx, this.props.sckey);
                var txHash = '0x' + encode(tx).toString('hex')
                fetch("https://komodo.forest.network/broadcast_tx_commit?tx=" + txHash).then(res => res.json())
                alert("Success!")
              });
              this.props.onUpdateProfile({name: this.props.profile.name, seq: this.props.profile.seq + 1, balance: this.props.profile.balance - data.amount});
          }
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
              credentials: "same-origin"})
              .then(res => res.json())
              .then((res) => {
                var tx = res;
                //tx.params.address = Buffer.from(tx.params.address)
                tx.memo = Buffer.from(tx.memo)
                sign(tx, this.props.sckey);
                var txHash = '0x' + encode(tx).toString('hex')
                fetch("https://komodo.forest.network/broadcast_tx_commit?tx=" + txHash).then(res => res.json())
                .then((res) => {
                  //mynewfeedheight
                  fetch(`/mynewfeedheight`, {method: "POST", body: JSON.stringify(data),
                  headers: {
                    "Content-Type": "application/json"
                  },
                  credentials: "same-origin"}) 
                    .then(res2 => res2.json())
                    .then((res2) => {
                      this.props.onUpdateMyNewfeedHeight({newfeedheight: res2.newfeedheight});
                      this.props.onUpdateMyNewfeed({newfeed: this.props.mynewfeed.newfeed.concat(`Create account ${data.account.substring(0,15)}...`)});
                    })
                  alert("Create successful!")
                })
              });
              this.props.onUpdateProfile({name: this.props.profile.name, seq: this.props.profile.seq + 1, balance: this.props.profile.balance});
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
      post: document.getElementById('txtarea').value,
    }
    if(data.post !== "" && data.post !== undefined) {
      //post
    fetch(`/post`, {method: "POST", body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"})
    .then(res => res.json())
    .then(
      (res) => {
        var tx = res;
        tx.params.content = Buffer.from(tx.params.content)
        tx.memo = Buffer.from(tx.memo)
        sign(tx, this.props.sckey);
    var txHash = '0x' + encode(tx).toString('hex')
    fetch("https://komodo.forest.network/broadcast_tx_commit?tx=" + txHash)
    .then(res => res.json())
    .then(() => {
        //mynewfeedheight
        fetch(`/mynewfeedheight`, {method: "POST", body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"}) 
          .then(res2 => res2.json())
          .then((res2) => {
            this.props.onUpdateMyNewfeedHeight({newfeedheight: res2.newfeedheight});
            this.props.onUpdateMyNewfeed({newfeed: this.props.mynewfeed.newfeed.concat(data.post)});
          });
    })
      }
    )
    //
    document.getElementById('txtarea').value = null;
    this.props.onUpdateProfile({name: this.props.profile.name, seq: this.props.profile.seq + 1, balance: this.props.profile.balance});
    
  }
    else {
      alert("Message cannot be empty!")
    }
    
  }

  comment = () => {
    if(document.getElementById("comment-box").value === "" || document.getElementById("comment-box").value === undefined) {
      alert("Empty message!")
    }
    else {
    var data = {
      pbk: this.props.pbkey,
      height: this.props.postheight,
    }
    //profile
    fetch(`/hash`, {method: "POST", body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"})
      .then((res) => res.json())
       .then(res => {
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

      //mynewfeedheight
    fetch(`/mynewfeedheight`, {method: "POST", body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"}) 
      .then(res => res.json())
      .then(res => this.props.onUpdateMyNewfeedHeight({newfeedheight: res.newfeedheight}));

      //paymenthistory
    fetch(`/paymenthistory`, {method: "POST", body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"})
      .then((res) => res.json())
       .then(res => this.props.onUpdatePaymentHistory({payHis: res.payHis}));
      
       //following key
fetch(`/followkey`, {method: "POST", body: JSON.stringify(data),
headers: {
  "Content-Type": "application/json"
},
credentials: "same-origin"})
  .then((res) => res.json())
   .then(res => this.props.onUpdateFollowKey(res.followkey));

  }
  render() {
console.log(this.props.mynewfeedheight)

      const myNewfeedList = Object.keys(this.props.mynewfeed.newfeed).map((i) =>
      <div>
      <li onClick = {() => this.openModal(i)} class="list-li post-content">
              <Row className="show-grid">
              <Col xs = {6} md = {1}>
              <img class="user-image" src = {this.props.profilepicture !== "" ? this.props.profilepicture:this.props.coverImage.profile}/>
              </Col>
              
              <Col xs = {6} md = {11}>
              <div class="post-space">
              <p class="post-name div-left">{this.props.profile.name}<p class="post-height div-left">{this.props.mynewfeedheight.newfeedheight[i]}</p></p>
              <p class="div-left">{this.props.mynewfeed.newfeed[i]}</p>
              {/* <Image width = {300} height = {200} src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/> */}
              <div class="div-left">
              </div>
              </div>
              </Col>
              </Row>
              </li>
              <br/>
              </div>)
      const postArea = (<li class="post-area list-li">
      <Row className="show-grid">
            <Col xs = {6} md = {1}>
            <div class="img-post">
            <img class="user-image-post" src = {this.props.profilepicture !== "" ? this.props.profilepicture:this.props.coverImage.profile}/>
            </div>
            </Col>
            <Col xs = {6} md = {11}>
            <div class="post-space">
            <Textarea id="txtarea" class="txt-area" autoFocus
            placeHolder="What're you thinking?"
            />
            </div>
            <div class="div-right follow">
              <button onClick = {() => this.post()}class="button button1">Post</button>
              </div>
            </Col>
            </Row>
  </li>
      
    )
    const paymentHistory = Object.keys(this.props.paymenthistory.payHis).map((i) =>
              <li class="list-li">
              <Row className="show-grid">
              <Col xs = {6} md = {1}>
              <div><b>{i}.</b></div>
              </Col>
              
              <Col xs = {6} md = {11}>
              <div class="post-space">
              <p>{this.props.paymenthistory.payHis[i].concat(` ${this.props.paymentuserlist.payUserList[i] !== "" ? this.props.paymentuserlist.payUserList[i]:this.props.paymentuser.payUser[i]}`)}</p>
              </div>
              </Col>
              </Row>
              </li> 
  )
    return (
      this.props.sckey == null ? <Redirect to="/login"></Redirect> :
      this.props.component === "home" ? <Redirect to="/"></Redirect> :
      this.props.component === "following" ? <Redirect to="/following"></Redirect> :
      this.props.component === "editprofile" ? <Redirect to="/editprofile"></Redirect> :
        <div class="content">
          <div>
            <div class="cover-div">
            <img class="cover-image"
          src = {this.props.coverImage.cover}
        />
        </div>
      <NavBar profilepic = {this.props.coverImage.profile} 
      profilepicture = {this.props.profilepicture} 
      postCount = {myNewfeedList.length}
      followCount = {this.props.followkey.length}
      component = {this.props.component}
      tab = {this.props.tab}
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
        <Col xs = {6} md = {3}>
        <Row className="show-grid">
        <Col xs = {6} md = {6}>
        </Col>
        <Col xs = {6} md = {6}>
        <div class="user-info">
        <div class="div-left"><p> Name: <b>{this.props.profile.name}</b></p></div>
        <div class="div-left"><p> Sequence: <b>{this.props.profile.seq}</b></p></div>
        <div class="div-left"><p> Balance: <b>{this.props.profile.balance}</b></p></div>
        <div class="div-left"><button onClick = {() => this.openModal2()} class="btn-history">Payment history</button></div>
        <div class="div-left"><button onClick = {() => this.openTransfers()} class="btn-history">Transfers</button></div>
        {this.props.transfers === true ? 
        <div>
          <div class="div-left"><p>To:</p></div><div class="div-right"><input class="input-transfers" id="to" placeholder="puclic key"/></div>
          <div class="div-left"><p>Amount:</p></div><div class="div-right"><input class="input-transfers" id="amount" type="number"/></div>
          <button onClick = {() => this.Transfers()} class="btn-history">OK</button>
          </div> : null}
          </div>
        </Col>
        </Row>
        
        </Col>
        <Col xs = {6} md = {5}>
        <div class="col-space">
{/* payment history */}
<Modal show = {this.props.dialog2} onHide = {() =>this.closeModal2()}>
    <Modal.Header>
    <div><b>Payment History</b></div>
          </Modal.Header>
          <Modal.Body>
            <ul>
            {paymentHistory}
              </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick = {() =>this.closeModal2()}>Close</Button>
          </Modal.Footer>
        </Modal>
{/* post detail */}
    <Modal show = {this.props.dialog} onHide = {() =>this.closeModal()}>
    <Modal.Header>
    <div>
              <Row className="show-grid">
              <Col xs = {6} md = {1}>
              <img class="user-image" src = {this.props.profilepicture}/>
              </Col>
              
              <Col xs = {6} md = {11}>
              <div class="post-space">
              <p class="post-name">{this.props.profile.name}</p>
              <p>{this.props.post}</p>
              {/* <Image width = {300} height = {200} src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/> */}
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
              <img class="cmt-image" src = {this.props.profilepicture}/>
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
              <Col xs = {6} md = {1}>
              <img class="user-image" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/>
              </Col>
              
              <Col xs = {6} md = {11}>
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
            <Button onClick = {() =>this.closeModal()}>Close</Button>
          </Modal.Footer>
        </Modal>
              
          <ul>
            {postArea}
            {myNewfeedList.reverse()}
          </ul>
          </div>
        </Col>
        <Col xsHidden md = {4}>
        <div class="col-space">
        <div>
          <h1>Create Account</h1>
          <div><input class="input-transfers" id="create" placeholder="puclic key"/></div>
          <button onClick = {() => this.createAccount()} class="btn-history">Register</button>
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
    mynewfeedheight: state.mynewfeedheight,
    followkey: state.followkey,
    paymenthistory: state.paymenthistory,
    paymentuser: state.paymentuser,
    paymentuserlist: state.paymentuserlist,
    transfers: state.transfers,
    profilepicture: state.profilepicture,
    post: state.post,
    postheight: state.postheight,
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
    onUpdatePBKey: updatePBKey,
    onUpdateProfile: updateProfile,
    onUpdateMyNewfeed: updateMyNewfeed,
    onUpdateMyNewfeedHeight: updateMyNewfeedHeight,
    onUpdatePaymentHistory: updatePaymentHistory,
    onUpdatePaymentUser: updatePaymentUser,
    onUpdatePaymentUserList: updatePaymentUserList,
    onUpdateTransfers: updateTransfers,
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
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
