import React, { Component } from 'react';
import NavBar from './NavBar';
import { Grid, Row, Col } from 'react-bootstrap';
import Image from 'react-image-resizer';
import { connect } from 'react-redux';
import { updateCoverImage } from '../actions/updateCoverImage';
import { updateTab } from '../actions/updateTab';
import { bindActionCreators } from 'redux';
import { updateComponent } from '../actions/updateComponent';
import { Redirect } from 'react-router-dom';
class HomePage extends Component {
  render() {
    console.log(this.props.component)
    return (
      this.props.component === "following" ? <Redirect to="/following"></Redirect> :
        <div class="content">
          <div>
            <div class="cover-div">
              <img class="cover-image"
                src={this.props.coverImage.cover}
              />
            </div>
            <NavBar component={this.props.component} tab={this.props.tab} onUpdateTab={this.props.onUpdateTab} onUpdateComponent={this.props.onUpdateComponent} />

            <Row className="show-grid">
              <Col xs={6} md={3}>
                <div class="col-space user-info">
                  <p> Name: ABC</p>
                  <p> Age: 20</p>
                  <p> Phone: 123456</p>
                </div>
              </Col>
              <Col xs={6} md={5}>
                <div class="col-space">
                  <ul>
                    <li class="list-li">
                      <Row className="show-grid">
                        <Col xs={6} md={1}>
                          <img class="user-image" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg" />
                        </Col>

                        <Col xs={6} md={11}>
                          <div class="post-space">
                            <p class="post-name">ABC</p>
                            <p>This is my 1st post</p>
                            <Image width={300} height={200} src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg" />
                            <i class="fa fa-comments-o icon-size cmt-icon"> 23</i>
                            <i class="fa fa-share-alt icon-size share-icon">10</i>
                            <i class="fa fa-heart-o icon-size like-icon">50</i>
                          </div>
                        </Col>
                      </Row>

                    </li>
                    <br />
                    <li class="list-li">
                      <Row className="show-grid">
                        <Col xs={6} md={1}>
                          <img class="user-image" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg" />
                        </Col>
                        <Col xs={6} md={11}>
                          <div class="post-space">
                            <p class="post-name">ABC</p>
                            <p>This is my 1st post</p>
                            <Image width={300} height={200} src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg" />
                            <i class="fa fa-comments-o icon-size cmt-icon"> 23</i>
                            <i class="fa fa-share-alt icon-size share-icon">10</i>
                            <i class="fa fa-heart-o icon-size like-icon">50</i>
                          </div>
                        </Col>
                      </Row>
                    </li>
                    <br />
                    <li class="list-li">
                      <Row className="show-grid">
                        <Col xs={6} md={1}>
                          <img class="user-image" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg" />
                        </Col>
                        <Col xs={6} md={11}>
                          <div class="post-space">
                            <p class="post-name">ABC</p>
                            <p>This is my 1st post</p>
                            <Image width={300} height={200} src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg" />
                            <i class="fa fa-comments-o icon-size cmt-icon"> 23</i>
                            <i class="fa fa-share-alt icon-size share-icon">10</i>
                            <i class="fa fa-heart-o icon-size like-icon">50</i>
                          </div>
                        </Col>
                      </Row>
                    </li>
                    <br />
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

const mapStateToProps = (state) => {
  return {
    coverImage: state.coverImage,
    tab: state.tab,
    component: state.component,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onUpdateCoverImage: updateCoverImage,
    onUpdateTab: updateTab,
    onUpdateComponent: updateComponent,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);