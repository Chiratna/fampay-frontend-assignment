import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CardGroup, Cards, Convert } from './api/card-service';
import './App.css';
import CardContainer from './components/CardContainer';

function App() {
  const [cards, setCards] = useState<Array<CardGroup>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getData = async () =>{
    const res = await axios.get<Cards>("https://run.mocky.io/v3/4d8db890-5327-4c69-a3ef-b4f5f5225d17");
    const resData : Array<CardGroup> = res.data.card_groups;
    setCards(resData);  
    setLoading(false);
  }
  useEffect( ()=> {
    getData();
    
  }
  ,[])
  
  return (
    <div className='main'>
      <div className='fam_icon'>

      </div>
    {loading ? <p>Loading</p> : <CardContainer cardgroups={cards}/>}
    </div>
  );
}

export default App;
