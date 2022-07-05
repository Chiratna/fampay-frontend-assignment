import React from 'react'
import {CardGroup} from '../../api/card-service'
import GeneralCard from '../General Card'
import HC3Card from '../HC3'


import './styles.css'
interface CardContainerProps{
  cardgroups : CardGroup[],
}
const scrollableStyle ={

}
const CardContainer : React.FC<CardContainerProps> = ({cardgroups} : CardContainerProps) => {
  return (
    <div className="card_main">
      {cardgroups.map((cardgroup)=>{
        return <div className="scroll_wrapper">
        {cardgroup.cards.map((card)=>{
          return <div className={`${cardgroup.design_type==="HC9" ? "": cardgroup.is_scrollable ? "scroll_style" : "no_scroll_style" } card_wrapper`} style={{height : `${cardgroup.design_type=="HC9" && `${cardgroup.height}px`}`}}>
              {cardgroup.design_type === "HC3" ? <HC3Card card={card}/> : <GeneralCard card={card} cardType={cardgroup.design_type}/>}
          </div>
        })}
    </div>
      })}
     
    </div>
  )
}

export default CardContainer