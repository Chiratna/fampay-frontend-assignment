import { useSpring, animated } from '@react-spring/web'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CardGroup, Cards} from './api/card-service';
import './App.css';
import CardContainer from './components/CardContainer';
import { url } from './constants/constants';
import fampayLogo from './images/fampaylogo.svg'

function App() {
  const [cards, setCards] = useState<Array<CardGroup>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  let pStartY : number = 0;
  let pCurrentY : number = 0;
  const getData = async () =>{
    setLoading(true);
    const res = await axios.get<Cards>(url);
    const resData : Array<CardGroup> = res.data.card_groups;
    const filteredCard : Array<CardGroup> = [];
    resData.forEach((e)=>{
      if(e.design_type==="HC3")
        filteredCard.push(e);
    });
    resData.forEach((e)=>{
      if(e.design_type==="HC5")
        filteredCard.push(e);
    });
    resData.forEach((e)=>{
      if(e.design_type==="HC6")
        filteredCard.push(e);
    });

    resData.forEach((e)=>{
      if(e.design_type==="HC9")
        filteredCard.push(e);
    });

    resData.forEach((e)=>{
      if(e.design_type==="HC1")
        filteredCard.push(e);
    });
    
    setCards(filteredCard);  
    setLoading(false);
  }
  useEffect( ()=> {

    getData();
    
  }
  ,[])

// const bind = useDrag((state)=>{
  
// })

  const swipeStart = (e:any) =>{
      if(!loading){
        let touch  = e.targetTouches[0];
        pStartY = touch.screenY;
      }
  }

  const swipe = (e:any) =>{
    if(!loading){
      let touch  = e.targetTouches[0];
      pCurrentY = touch.screenY;

      let changeY = pStartY < pCurrentY ? Math.abs(pStartY - pCurrentY) : 0;

      if(changeY <= 300){
      console.log("pulling to refresh", changeY);
      api.start({
        y : changeY > 250 ? 0 : changeY + 90
      })
      }
      if(changeY >300){
        console.log("pulled to refresh");
      }
    }
  }

  const swipeEnd = (e : any) => {
    getData();
  };
  
  return (
      <div  className='main'>
      <div className='fam_icon'>
        <img src={fampayLogo} alt='fampay logo'/>
      </div>
    {loading ? <div className='content_area'>
     <div className='spinner_container'><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
    </div> : <animated.div style={{x,y}} className='main_card_wrapper' onTouchStart={swipeStart} onTouchMove={swipe} onTouchEnd={swipeEnd}><CardContainer getData={getData} cardgroups={cards}/></animated.div> }
    </div>
  );
}
export default App;
