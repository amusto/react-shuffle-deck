import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import cardBack from './assets/images/Gray_back.jpg';

class DeckComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
			deck: [],
	    // resetFn: this.reset
	    shuffleFn: this.shuffle,
	    dealFn: this.deal,
	    selectedCard: ''
    };

    this.shuffle = this.shuffle.bind(this);
    this.deal = this.deal.bind(this);
  }

	deal(){
	  this.setState({
		  selectedCard: this.state.deck.pop()
	  });
	}

	shuffle() {
		let deck = [];

		const suits = ['H', 'S', 'C', 'D'];
    const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

    for (let suit in suits) {
      for (let value in values) {
        deck.push(`${values[value]}${suits[suit]}`);
      }
    }

	  let m = deck.length, i;

	  while (m) {
	    i = Math.floor(Math.random() * m--);

	    [deck[m], deck[i]] = [deck[i], deck[m]];
	  }

	  this.setState({
		  deck,
		  selectedCard: ''
	  });
	}

	componentDidMount() {
  	this.shuffle();
	}

  render() {
    const { deck, selectedCard } = this.state;
		const images = require.context('./assets/images', true);

		console.log('deck', deck);

    return (
		<Container className='board-container'>
			<Row>
				<Col className='xs-12 app-header'>
          <Button variant="primary" onClick={() => this.shuffle()}>Shuffle Deck</Button>{' '}
				</Col>
			</Row>
		  <Row>
				<Col className='deck-column' xs={6}>
					<Card className='card-deck' onClick={this.deal}>
					  <Card.Img variant="top" src={cardBack} />
					</Card>
				</Col>
				<Col className='deck-column' xs={6}>
					<Card className='card-deck'>
						{!selectedCard &&
							<Card.Img variant="top" src={cardBack} />
						}
						{selectedCard &&
						  <Card.Body>
						    <Card.Text>
					        <Card.Img variant="top" src={images(`./${selectedCard}.jpg`)} />
						    </Card.Text>
						  </Card.Body>
						}
					</Card>
				</Col>
		  </Row>
		</Container>
    );
  }
}

export default DeckComponent;
