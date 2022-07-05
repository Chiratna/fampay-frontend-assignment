import React from 'react'
import { Card } from '../../api/card-service'
import "./style.css"
import chev from "../../images/famchev.svg"
interface HC16CardProps {
    card : Card,
    cardType : "HC1" | "HC6"
}
const HC16Card : React.FC<HC16CardProps> = ({card, cardType} : HC16CardProps) => {
  return (
    <div className='hc1_container' style={{background : `${card.bg_color === undefined ? "#FBAF03" : card.bg_color}`}}>
        {card.icon && <img src={card.icon.image_url} alt='card-img' style={{aspectRatio : `${card.icon.aspect_ratio}`}} className='card_icon'/>}
        <div className='hc1_text'>
            <div className='title text_container'>
                <span>{card.title}</span>
            </div>
            <div className='despcription tex_container'>
            <span>{card.description}</span>
            </div>
        </div>
        { cardType === "HC6" && <img src={chev}/>}
    </div>
  )
}

export default HC16Card


