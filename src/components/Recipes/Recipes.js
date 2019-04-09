import React, { Component } from 'react';
import Axios from 'axios';
import {Container, Row, Col, Image} from 'react-bootstrap';
import '../../index.css';
class Recipes extends Component {

    state = {
        recipes: [],
    };

    componentDidMount(){
        Axios.get(`http://recepista.com/api/api/post/read.php`)
        .then(res => {
            console.log(res.data);
            this.setState({recipes: res.data})
        })
    }
    render() {
      return (
        <div className="recipe-container">
        <h2 className="recipe-title">{this.props.page_content}</h2>
        <Container fluid>
       <Row className="recipe-scroll">
       {this.state.recipes.map(recipe => 
          <Col lg={3} md={6}>
          <div key={recipe.id}>
              <div>
                  <Image className="recipe-img" fluid src={recipe.img_url}/>
              </div>
              <div>
              <h4 className="recipe-title head">{recipe.title}</h4>
              <p>{recipe.short_details}</p>
              </div>
          </div>
          </Col>
          )}
       </Row>
      </Container>
        </div>
      );
    }
  };
  
  export default Recipes; 