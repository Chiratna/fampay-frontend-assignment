import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { CardGroup, Cards, Convert } from './api/card-service';
import './App.css';
import CardContainer from './components/CardContainer';
import { api } from './constants/constants';
import fampayLogo from './images/fampaylogo.svg'

function App() {
  const [cards, setCards] = useState<Array<CardGroup>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getData = async () =>{
    setLoading(true);
    const res = await axios.get<Cards>(api);
    const resData : Array<CardGroup> = res.data.card_groups;
    setCards(resData);  
    setLoading(false);
  }
  useEffect( ()=> {
    getData();
    
  }
  ,[])

  const onRefreshHandler = ()=>{
    console.log("refresh");
    
  }
  
  return (
    <div className='main'>
      <div className='fam_icon'>
        <img src={fampayLogo}/>
      </div>
    {loading ? <div className='content_area'>
     <div className='spinner_container'><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
    </div> : <PullToRefresh refreshingContent={<div></div>} pullingContent={<div></div>} onRefresh={getData}><CardContainer cardgroups={cards}/></PullToRefresh>}
    </div>
  );
}

export default App;
