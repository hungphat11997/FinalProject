import React, { Component } from 'react';
import NavBar from './NavBar';
import { Navbar, Row, Col } from 'react-bootstrap';
import Image from 'react-image-resizer';
import { connect } from 'react-redux';
import { updateCoverImage } from '../actions/updateCoverImage';
import { updateTab } from '../actions/updateTab';
import { bindActionCreators } from 'redux';
import { updateComponent } from '../actions/updateComponent';
import { Redirect } from 'react-router-dom';
import { updateSCKey } from '../actions/updateSCKey';
class Followers extends Component {
  render() {
    return (
      this.props.sckey == null ? <Redirect to="/login"></Redirect> :
      this.props.component === "post" ? <Redirect to="/"></Redirect> :
      this.props.component === "following" ? <Redirect to="/following"></Redirect> :
      this.props.component === "editprofile" ? <Redirect to="/editprofile"></Redirect> :
        <div class="content">
          <div>
            <div class="cover-div">
              <img class="cover-image"
                src={this.props.coverImage.cover}
              />
            </div>
            <NavBar postCount={this.props.mynewfeed.newfeed.length} component={this.props.component} tab={this.props.tab} onUpdateTab={this.props.onUpdateTab} onUpdateComponent={this.props.onUpdateComponent} />


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

            <Col xs={6} md={9}>
              <div class="follow-list">
                <Row>

                  <Col Col xs={6} md={4}>
                    <div class="follow-li ">
                      <div class="cover-div-small">
                        <img class="cover-image"
                          src={this.props.coverImage.cover}
                        />
                      </div>
                      <Row>
                        <Col Col xs={6} md={5}>

                          <div class="navbar-brand">
                            <img class="user-profile-small" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg" />
                          </div>

                          <div class="follow-name">
                            <a> Park Hang Seo</a>
                          </div>
                        </Col>
                        <Col Col xs={6} md={4}>
                          <button type="submit" class="button-follow">unfollow</button>

                        </Col>


                      </Row>
                    </div>
                  </Col>



                  <Col Col xs={6} md={4}>
                    <div class="follow-li ">
                      <div class="cover-div-small">
                        <img class="cover-image"
                          src={this.props.coverImage.cover}
                        />
                      </div>
                      <Row>
                        <Col Col xs={6} md={5}>

                          <div class="navbar-brand">
                            <img class="user-profile-small" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg" />
                          </div>

                          <div class="follow-name">
                            <a> Park Hang Seo</a>
                          </div>
                        </Col>
                        <Col Col xs={6} md={4}>
                          <button type="submit" class="button-follow">unfollow</button>

                        </Col>

                      </Row>
                    </div>

                  </Col>



                  <Col Col xs={6} md={4}>
                    <div class="follow-li ">
                      <div class="cover-div-small">
                        <img class="cover-image"
                          src={this.props.coverImage.cover}
                        />
                      </div>
                      <Row>
                        <Col Col xs={6} md={5}>

                          <div class="navbar-brand">
                            <img class="user-profile-small" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg" />
                          </div>

                          <div class="follow-name">
                            <a> Park Hang Seo</a>
                          </div>
                        </Col>
                        <Col Col xs={6} md={4}>
                          <button type="submit" class="button-follow">unfollow</button>

                        </Col>

                      </Row>
                    </div>

                  </Col>
                </Row>


                <Row>

                  <Col Col xs={6} md={4}>
                    <div class="follow-li ">
                      <div class="cover-div-small">
                        <img class="cover-image"
                          src={this.props.coverImage.cover}
                        />
                      </div>
                      <Row>
                        <Col Col xs={6} md={5}>

                          <div class="navbar-brand">
                            <img class="user-profile-small" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg" />
                          </div>

                          <div class="follow-name">
                            <a> Park Hang Seo</a>
                          </div>
                        </Col>
                        <Col Col xs={6} md={4}>
                          <button type="submit" class="button-follow">unfollow</button>

                        </Col>

                      </Row>
                    </div>
                  </Col>



                  <Col Col xs={6} md={4}>
                    <div class="follow-li ">
                      <div class="cover-div-small">
                        <img class="cover-image"
                          src={this.props.coverImage.cover}
                        />
                      </div>
                      <Row>
                        <Col Col xs={6} md={5}>

                          <div class="navbar-brand">
                            <img class="user-profile-small" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg" />
                          </div>

                          <div class="follow-name">
                            <a> Park Hang Seo</a>
                          </div>
                        </Col>
                        <Col Col xs={6} md={4}>
                          <button type="submit" class="button-follow">unfollow</button>

                        </Col>

                      </Row>
                    </div>

                  </Col>



                  <Col Col xs={6} md={4}>
                    <div class="follow-li ">
                      <div class="cover-div-small">
                        <img class="cover-image"
                          src={this.props.coverImage.cover}
                        />
                      </div>
                      <Row>
                        <Col Col xs={6} md={5}>

                          <div class="navbar-brand">
                            <img class="user-profile-small" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg" />
                          </div>

                          <div class="follow-name">
                            <a> Park Hang Seo</a>
                          </div>
                        </Col>
                        <Col Col xs={6} md={4}>
                          <button type="submit" class="button-follow">unfollow</button>

                        </Col>

                      </Row>
                    </div>

                  </Col>
                </Row>

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
    profile: state.profile,
    mynewfeed: state.mynewfeed,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onUpdateCoverImage: updateCoverImage,
    onUpdateTab: updateTab,
    onUpdateComponent: updateComponent,
    onUpdateSCKey: updateSCKey,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Followers);