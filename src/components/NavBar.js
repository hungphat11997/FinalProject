import React from 'react';
import { Navbar, FormGroup, FormControl, Button, Grid, Row, Col, NavItem, Nav } from 'react-bootstrap';
import '../App.css';

class NavBar extends React.Component {

    
onClickTab = (value) => {
    this.props.onUpdateTab(value);
    this.props.onUpdateComponent(value);
}
goNewsfeed = () => {
    this.props.onUpdateTab("post");
    this.props.onUpdateComponent("home");
}
logout = () => {
    this.props.onUpdateComponent("/");
    this.props.onUpdateFollowKeyName({followkeyname: []});
    this.props.onUpdateFollowKeyPic({followkeypic: []})
    this.props.onUpdateFollowKey([]);
    const initState = {
        name: [],
        pic: [],
        news: []
    }
    this.props.onUpdateFollowNewsfeed(initState);
    this.props.onUpdateFollowNewsfeedHeight({newsfeedheight: []});
    this.props.onUpdateFollowNewsfeedKey({newsfeedkey: []});
    this.props.onUpdateMyNewfeed({newfeed: []});
    this.props.onUpdateMyNewfeedHeight({newfeedheight: []});
    this.props.onUpdatePaymentHistory({payHis: []});
    this.props.onUpdatePaymentUserList({payUserList: []});
    this.props.onUpdatePaymentUser({payUser: []});
    this.props.onUpdatePostName("");
    this.props.onUpdatePostPic("");
    this.props.onUpdatePost("");
    this.props.onUpdatePostHeight(null);
    this.props.onUpdatePostKey("");
    this.props.onUpdateProfilePicture("");
    this.props.onUpdateProfile({name: "", seq: 0, balance: 0});
    this.props.onUpdateTab("post");
    this.props.onUpdateReadyToLogin(false);
    this.props.onUpdateSCKey(null);
    this.props.onUpdatePBKey(null);
}


    render() {
        return(
      <Navbar>
          <Row className="show-grid">
        <Col xs={6} md={3}>
        <Navbar.Brand>
            <div >
        <img class="user-profile" src={this.props.profilepicture !== "" ? this.props.profilepicture:this.props.profilepic}/>
      </div>
      </Navbar.Brand>

        </Col>
        <Col xs={6} md={5}>
        <Col xs={6} md={8}>
            <div class="div-left">
            <div onClick={() => this.onClickTab("post")} class={this.props.tab === "post" ? "nav-item nav-item-text nav-item-text-click": "nav-item nav-item-text"}>
        <p >News<p class="text-center">{this.props.postCount}</p></p>
        </div>
        
        <div onClick={() => this.onClickTab("following")} 
        class={this.props.tab === "following" ? "nav-item nav-item-text nav-item-text-click"
        : "nav-item nav-item-text"}>   
        <p >Following<p class="text-center">{this.props.followCount}</p></p>
        </div>

        </div>
        </Col>
        <Col xs={6} md={4}>
        <div class="div-right newfeed-link">
        <p onClick={() => this.goNewsfeed()}><b><i class="fa fa-bars"></i>Newsfeed</b></p>
        </div>
        </Col>
        </Col>
        <Col xs={6} md={4} >
            <div class="div-center">
          <div onClick={() => this.onClickTab("editprofile")} 
        class={this.props.tab === "editprofile" ? "nav-item nav-item-text nav-item-text-click"
        : "nav-item nav-item-text"}>   
        <p >Edit<p class="text-center">Profile</p></p>
        </div>
        <button onClick={() => this.logout()} class="btn-history">Log out</button>
          </div>

          
        </Col>
      </Row>    
    </Navbar>)
    }
}
export default (NavBar)