import React from 'react';
import { Navbar, FormGroup, FormControl, Button, Grid, Row, Col, NavItem, Nav } from 'react-bootstrap';
import '../App.css';

class NavBar2 extends React.Component {

    
goHome = () => {
    this.props.onUpdateComponent("post");
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
    this.props.onUpdateMyNewfeed({newfeed: []});
    this.props.onUpdatePaymentHistory({payHis: []});
    this.props.onUpdatePaymentUserList({payUserList: []});
    this.props.onUpdatePaymentUser({payUser: []});
    this.props.onUpdatePostName("");
    this.props.onUpdatePostPic("");
    this.props.onUpdatePost("");
    this.props.onUpdateProfilePicture("");
    this.props.onUpdateProfile({name: "", seq: 0, balance: 0});
    this.props.onUpdateTab("post");
    this.props.onUpdateSCKey(null);
    this.props.onUpdatePBKey(null);
}


    render() {
        return(
      <Navbar>
          <Row className="show-grid">
        <Col xs={6} md={3}>
        <Navbar.Brand>
            <div>
        <h1 class="home-brand"onClick={() => this.goHome()}>Home</h1>
      </div>
      </Navbar.Brand>

        </Col>
        <Col xs={6} md={5}>
        </Col>
        <Col xsHidden md={4} >
            <div class="div-center follow">

        <button onClick={() => this.logout()} class="btn-history">Log out</button>
          </div>
        </Col>
      </Row>    
    </Navbar>)
    }
}
export default (NavBar2)