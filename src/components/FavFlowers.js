import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Card, Button, Row } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import UpdateModel from "../components/UpdateModel";

class FavFlowers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favDrinks: [],
      updateObj: {},
      showUpdateModel: false,
    };
  }
  showingModel = (element) => {
    this.setState({
      updateObj: element,
      showUpdateModel: true,
    });
  };

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_SERVER}/fav?email=${this.props.auth0.user.email}`
      )
      .then((require) => {
        this.setState({
          favDrinks: require.data,
        });
      })
      .catch();
  }
  deletefav = (id) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER}/delete/${id}`)
      .then((results) => {
        this.setState({
          favDrinks: results.data,
        });
      });
  };

  updateFav = (event) => {
    const drinkId = this.state.updateObj._id;
    const body = {
      strDrink: event.target.strDrink.value,
      strDrinkThumb: event.target.strDrinkThumb.value,
      idDrink: event.target.idDrink.value,
    };
    axios
      .put(`${process.env.REACT_APP_SERVER}/update/${drinkId}`, body)
      .then((update) => {
        const drinkArray = this.state.favDrinks.map((drink) => {
          if (drink === drinkId) {
            drink.strDrink = update.data.strDrink;
            drink.strDrinkThumb = update.data.strDrinkThumb;
            drink.idDrink = update.data.idDrink;
            return drink;
          }
          return drink;
        });
        this.setState({
          favDrinks: drinkArray,
          showUpdateModel: false,
          updateObj: {},
        });
      });
  };

  render() {
    return (
      <>
        {this.showingModel && (
          <UpdateModel
            show={this.state.showUpdateModel}
            showingModel={this.showingModel}
            updateFav={this.updateFav}
            updateObj={this.state.updateObj}
          />
        )}
        <Row xs={1} md={4} className="g-4">
          {this.state.favDrinks.map((drink, idx) => {
            return (
              <Card key={idx} style={{ width: "18rem" }}>
                <Card.Img variant="top" src={drink.strDrinkThumb} />
                <Card.Body>
                  <Card.Title>{drink.strDrink}</Card.Title>
                  <Card.Text>{drink.idDrink}</Card.Text>
                  <Button style={{marginRight:'10px'}}
                    onClick={() => this.deletefav(drink._id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => this.showingModel(drink)}
                    variant="primary"
                  >
                    Update
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </>
    );
  }
}

export default withAuth0(FavFlowers);
