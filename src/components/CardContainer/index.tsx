import React, { useEffect, useState } from 'react'
import { useLongPress } from 'use-long-press'
import {CardGroup} from '../../api/card-service'
import GeneralCard from '../General Card'
import HC3Card from '../HC3'


import './styles.css'
interface CardContainerProps{
  cardgroups : CardGroup[],
  getData : any
}

const CardContainer : React.FC<CardContainerProps> = ({cardgroups, getData} : CardContainerProps) => {
  const [foreGroundClass, setForegroundClass] = useState<string>("foreground");
  const [remindLaterCards,setRemindLater] = useState<string[]>([]);
  const [allDissMissCard,setDissmiss] = useState<string[]>([]);
  const bind = useLongPress(()=>{
    console.log("Long Pressed");
    if(foreGroundClass==="foreground"){
        setForegroundClass("foreground_slide");
    }
    
    if(foreGroundClass==="foreground_slide"){
        setForegroundClass("foreground");
    }
  })
  const handleRemindLater = (cardId : string)=>{
    remindLaterCards.push(cardId);
    setRemindLater([...remindLaterCards]);
  }

  const handleDismiss = (cardId : string)=>{
    if(!allDissMissCard.includes(cardId))
      allDissMissCard.push(cardId);
    window.sessionStorage.setItem('dismiss', JSON.stringify(allDissMissCard));
    setDissmiss([...allDissMissCard])
  }

  useEffect(()=>{
    let sessionValue = window.sessionStorage.getItem('dismiss');
    if(sessionValue){
      let dissMissCards : string[] = JSON.parse(sessionValue);
      setDissmiss([...dissMissCards]);
    }
    
  },[])
  return (
    <div className="card_main">
    {cardgroups.map((cardgroup)=>{
      return <div className="scroll_wrapper">
      {cardgroup.cards.map((card)=>{
        let cardId : string = `${card.name}${cardgroup.id}`
        if(remindLaterCards.includes(cardId) || allDissMissCard.includes(cardId))
          return;
        return <div className={`${cardgroup.design_type==="HC9" ? "": cardgroup.is_scrollable ? "scroll_style" : "no_scroll_style" } card_wrapper`} style={{height : `${cardgroup.design_type==="HC9" && `${cardgroup.height}px`}`}}>
            {cardgroup.design_type === "HC3" ? <div {...bind()}>
              <HC3Card 
              handleDismiss={()=>{
                handleDismiss(`${card.name}${cardgroup.id}`)
              }}
              handleRemindLater={()=>{
                handleRemindLater(`${card.name}${cardgroup.id}`)
              }}    
              card={card} foreGroundClass ={foreGroundClass} />
              </div>  : <GeneralCard card={card} cardType={cardgroup.design_type}/>}
        </div>
      })}
  </div>
    })}
   
    </div>
  )
}

export default CardContainer