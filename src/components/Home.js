import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Card, Button, Row } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: [],
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_SERVER}/api`).then((require) => {
      this.setState({
        drinks: require.data.drinks,
      });
    });
  }
  addfav = (index) => {
    const body ={
    strDrink: this.state.drinks[index].strDrink,
    strDrinkThumb: this.state.drinks[index].strDrinkThumb,
    idDrink: this.state.drinks[index].idDrink,
    email:this.props.auth0.user.email,
  };
  axios.post(`${process.env.REACT_APP_SERVER}/add`,body).then(res=>{ })
  };

  render() {
    return (
      <>
        <Row xs={1} md={4} className="g-4">
          {this.state.drinks.map((drink, idx) => {
            return (
              <Card key={idx} style={{ width: "18rem" }}>
                <Card.Img variant="top" src={drink.strDrinkThumb} />
                <Card.Body>
                  <Card.Title>{drink.strDrink}</Card.Title>
                  <Card.Text>{drink.idDrink}</Card.Text>
                  <Button onClick={() => this.addfav(idx)} variant="primary">
                  Add to Favorite
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

export default withAuth0(Home);
