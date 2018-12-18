import React, { Component } from 'react';
import NavBar from './NavBar';
import { Navbar } from 'react-bootstrap';
import {
  Row,
  Label,
  Col,
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Form,
  FormGroup,
  Input,
  InputGroup,
} from 'reactstrap';
import Image from 'react-image-resizer';
import { connect } from 'react-redux';
import { updateCoverImage } from '../actions/updateCoverImage';
import { updateTab } from '../actions/updateTab';
import { bindActionCreators } from 'redux';
import { updateComponent } from '../actions/updateComponent';
import { Redirect } from 'react-router-dom';
class EditProfile extends Component {
  render() {
    return (
      this.props.component === "post" ? <Redirect to="/"></Redirect> :
        this.props.component === "following" ? <Redirect to="/following"></Redirect> :
          this.props.component === "followers" ? <Redirect to="/followers"></Redirect> :
            <div class="content">
              <div>
                <div class="cover-div">
                  <img class="cover-image"
                    src={this.props.coverImage.cover}
                  />
                </div>
                <NavBar component={this.props.component} tab={this.props.tab} onUpdateTab={this.props.onUpdateTab} onUpdateComponent={this.props.onUpdateComponent} />
                <Col xs={6} md={3}>
                  <div class="col-space user-info">
                    <p> Name: ABC</p>
                    <p> Age: 20</p>
                    <p> Phone: 123456</p>
                  </div>
                </Col>

                <Col xs={6} md={8}>
                  <Card>
                    <CardHeader color="Info">
                      <strong>Your Profile</strong>
                    </CardHeader>
                    <br></br>
                    <CardBody className="text-center">
                      <Form action="" method="post" class="form-horizontal">
                        <FormGroup row>
                          <Label for="name" sm={4}>Name</Label>
                          <Col sm={4} md="4">
                            <InputGroup>
                              <Input type="text" id="name" name="name" placeholder="Name"/>
                            </InputGroup>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="Image" sm={4}>Upload Image</Label>
                          <Col sm={4} md="4">
                            <InputGroup>
                            <input id="picture" type="file" name="picture"/>
                            </InputGroup>
                          </Col>
                        </FormGroup>
                      </Form>
                    </CardBody>
                    <br></br>


                    <CardFooter>
                      <Button type="submit" size="sm" sm={2} color="success"><i className="fa fa-save" />Save</Button>{' '}
                      <Button type="reset" size="sm" color="danger"><i className="fa fa-ban" /> Cancel</Button>
                    </CardFooter>
                <br></br>
                  </Card>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onUpdateCoverImage: updateCoverImage,
    onUpdateTab: updateTab,
    onUpdateComponent: updateComponent,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);