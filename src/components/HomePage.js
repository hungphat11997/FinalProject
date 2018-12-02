import React, { Component } from 'react';
import NavBar from './NavBar';
import { Grid, Row, Col } from 'react-bootstrap';
import Image from 'react-image-resizer';
class HomePage extends Component {
  render() {
    return (
        <div class="content">
        <div>
            <div class="cover-div">
            <img class="cover-image"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Monasterio_Khor_Virap%2C_Armenia%2C_2016-10-01%2C_DD_25.jpg/1200px-Monasterio_Khor_Virap%2C_Armenia%2C_2016-10-01%2C_DD_25.jpg"
        />
        </div>
      <NavBar/>
      
      <Row className="show-grid">
        <Col xs={6} md={4}>
        <div class="col-space user-info">
         <p> Name: ABC</p>
         <p> Age: 20</p>
         <p> Phone: 123456</p>
          </div>
        </Col>
        <Col xs={6} md={4}>
        <div class="col-space">
          <ul>
              <li class="list-li">
              <Row className="show-grid">
              <Col xs={6} md={2}>
              <img class="user-image" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/>
              </Col>
              <Col xs={6} md={10}>
              <p class="post-name">ABC</p>
              <p>This is my 1st post</p>
              <Image width={300} height={200} src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/>
              <i class="fa fa-comments-o icon-size cmt-icon"> 23</i>
              <i class="fa fa-share-alt icon-size share-icon">10</i>
              <i class="fa fa-heart-o icon-size like-icon">50</i>
              </Col>
              </Row>
              </li>
              <br/>
              <li class="list-li">
              <Row className="show-grid">
              <Col xs={6} md={2}>
              <img class="user-image" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/>
              </Col>
              <Col xs={6} md={10}>
              <p class="post-name">ABC</p>
              <p>This is my 1st post</p>
              <Image width={300} height={200} src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/>
              <i class="fa fa-comments-o icon-size cmt-icon"> 23</i>
              <i class="fa fa-share-alt icon-size share-icon">10</i>
              <i class="fa fa-heart-o icon-size like-icon">50</i>
              </Col>
              </Row>
              </li>
              <br/>
              <li class="list-li">
              <Row className="show-grid">
              <Col xs={6} md={2}>
              <img class="user-image" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/>
              </Col>
              <Col xs={6} md={10}>
              <p class="post-name">ABC</p>
              <p>This is my 1st post</p>
              <Image width={300} height={200} src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"/>
              <i class="fa fa-comments-o icon-size cmt-icon"> 23</i>
              <i class="fa fa-share-alt icon-size share-icon">10</i>
              <i class="fa fa-heart-o icon-size like-icon">50</i>
              </Col>
              </Row>
              </li>
              <br/>
          </ul>
          </div>
        </Col>
        <Col xsHidden md={4}>
        <div class="col-space">
          <code>{'<Col xsHidden md={4} />'}</code>
          </div>
        </Col>
      </Row>
      </div>
</div>
    )
  }
}

export default HomePage;