import { useSpring, animated } from '@react-spring/web'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CardGroup, Cards } from './api/card-service';
import './App.css';
import CardContainer from './components/CardContainer';
import { url } from './constants/constants';
import fampayLogo from './images/fampaylogo.svg'

function App() {
  const [cards, setCards] = useState<Array<CardGroup>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const { ref, inView, entry } = useInView({
    threshold: 1,
  });
  /**
   * @variables use to store users current and starting touch Y coordinates
   */
  let pStartY: number = 0;
  let pCurrentY: number = 0;

  /**
   * @function getData() An asynchronous function that fetches the data from the api and modifies
   *                     it according to the UI order of the card groups.
   */
  const getData = async () => {
    setLoading(true);
    const res = await axios.get<Cards>(url);
    const resData: Array<CardGroup> = res.data.card_groups;
    const filteredCard: Array<CardGroup> = [];
    
    resData.forEach((e) => {
      if (e.design_type === "HC3")
        filteredCard.push(e);
    });
    resData.forEach((e) => {
      if (e.design_type === "HC5")
        filteredCard.push(e);
    });
    resData.forEach((e) => {
      if (e.design_type === "HC6")
        filteredCard.push(e);
    });

    resData.forEach((e) => {
      if (e.design_type === "HC9")
        filteredCard.push(e);
    });

    resData.forEach((e) => {
      if (e.design_type === "HC1")
        filteredCard.push(e);
    });

    setCards(filteredCard);
    setLoading(false);
  }

  useEffect(() => {
    // console.log('is view', inView);
    
    getData();
  },[])


  /**
   * @param e  The event parameter
   * The handler is attached to onTouchStart Synthetic Event of React and stores the initial touch position.
   */
  const swipeStart = (e: any) => {
    if (!loading && inView) {
      let touch = e.targetTouches[0];
      pStartY = touch.screenY;
    }
  }
  /**
   * @param e The event parameter
   * The handler is attached to onTouchMove Synthetic Event of React and handles the pull effect on View
   */
  const swipe = (e: any) => {
    if (!loading) {
      let touch = e.targetTouches[0];
      pCurrentY = touch.screenY;

      let changeY = pStartY < pCurrentY ? Math.abs(pStartY - pCurrentY) : 0;

      if (changeY>0 && changeY <= 200 && inView) {
        console.log("pulling to refresh", changeY);
        api.start({
          y: changeY > 150 ? 0 : changeY + 120
        })
      }
      if (changeY > 200 && inView) {
        console.log("pulled to refresh");
        getData();
      }
    }
  }
  /**
   * @param e - The event parameter
   * The handler is attached to onTouchEnd Synthetic Event of React and handles the pull to refresh
   */
  const swipeEnd = (e: any) => {
    
  };
  console.log('log',inView);
  
  return (
    <div className='main'>
      <div className='fam_icon'>
        <img ref={ref} src={fampayLogo} alt='fampay logo' />
      </div>
      {loading ? <div className='content_area'>
        <div className='spinner_container'><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
      </div> : <animated.div style={{ x, y }} className='main_card_wrapper' onTouchStart={swipeStart} onTouchMove={swipe} onTouchEnd={swipeEnd}><CardContainer cardgroups={cards} /></animated.div>}
    </div>
  );
}
export default App;
