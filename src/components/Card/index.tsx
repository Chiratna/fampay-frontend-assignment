import React from 'react'
import { Card, } from '../../api/card-service'
import HC16Card from '../HC1'

import "./styles.css"
interface CardComponentProps {
  cards : Card[],
  isScrollable : boolean
  cardType : string
}

const CardComponent : React.FC<CardComponentProps> =  ({cards, isScrollable, cardType} : CardComponentProps) => {
  return (
    <div className="scroll_wrapper" >
        {cards.map((card)=>{
          return <div className={`${isScrollable ? "scroll_style" : "no_scroll_style"}`}>
              <HC16Card cardType={"HC6"} card={card}/>
          </div>
        })}
    </div>
  )
}

export default CardComponent