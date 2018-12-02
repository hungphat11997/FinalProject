import React from 'react';
import { Navbar, FormGroup, FormControl, Button, Grid, Row, Col, NavItem, Nav } from 'react-bootstrap';
import '../App.css';
class NavBar extends React.Component {

    render() {
        return(
      <Navbar>
          <Row className="show-grid">
        <Col xs={6} md={4}>
        
            <div >
        <img class="user-profile" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/>
      </div>
        </Col>
        <Col xs={6} md={4}>
            <div class="div-left">
        <div class="nav-item nav-item-text">
        <p >Following</p>
        <p class="text-center">200</p>
        </div>

        <div class="nav-item nav-item-text">
        <p >Followers</p>
        <p class="text-center">20000</p>
        </div>
        </div>
        </Col>
        <Col xsHidden md={4} >
            <div class="div-center follow">
          <button type="submit" class="button button1">Follow</button>
          </div>
        </Col>
      </Row>
      
      
    </Navbar>)
    }
}
export default (NavBar)