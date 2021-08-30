import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export class UpdateModel extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.showingModel}>
        <Modal.Header>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>

        <Form onSubmit={(e)=>this.props.updateFav(e)}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>name</Form.Label>
            <Form.Control type="text" placeholder="name" defaultValue={this.props.updateObj.strDrink} name="strDrink"/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>image</Form.Label>
            <Form.Control type="text" placeholder="image" defaultValue={this.props.updateObj.strDrinkThumb} name="strDrinkThumb" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>id</Form.Label>
            <Form.Control type="text" placeholder="id" defaultValue={this.props.updateObj.idDrink} name="idDrink"/>
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>

      </Modal>
    );
  }
}

export default UpdateModel;
