import React, { useEffect, useState } from 'react'
import '../styles/content.css'
import Card from './Card';

const Content = () => {
  const [cards, setCards] = useState([]);
  const fetchData = () => {
    fetch('http://localhost:3001/cards')
    .then(res => res.json())
    .then(data => {
      setCards(data);
    })
    .catch(err => console.log(err.message));
  }
  useEffect(() => {
    fetchData();
  }, []);

  console.log(cards);

  return (
    <div className='dashboard section'>
      <div className='row'>
        <div className='col-lg-8'>
          <div className='row'>
            {
              cards && cards>0 &&
              cards.map(card=><Card key={card._id} card={card} />)
            }
          </div>
        </div>
        <div className='col-lg-4'></div>
      </div>
    </div>
  )
}

export default Content