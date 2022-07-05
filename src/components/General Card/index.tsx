import React from 'react'
import { Card } from '../../api/card-service'
import './styles.css'
import chev from "../../images/famchev.svg"
import remind from "../../images/remind.svg"
import dismiss from "../../images/dismiss.svg"
interface GeneralCardProps{
    card : Card
    cardType : string
}

const GeneralCard : React.FC<GeneralCardProps> = ({card, cardType} : GeneralCardProps) => {
   const cardClassName :string = `${cardType === "HC9" ? "hc9_config" : "card_config"} card_container`;
   const cardStyle ={
        background : `${card.bg_color === undefined ? "#FBAF03" : card.bg_color}`, 
        backgroundImage : `url(${card.bg_image?.image_url})`, 
        aspectRatio : `${card.bg_image?.aspect_ratio}`, 
        backgroundSize : 'contain',
    };
  return (
    <div className = {cardClassName} style={cardStyle}>
       {card.icon && <img src={card.icon.image_url} alt='card-img' style={{aspectRatio : `${card.icon.aspect_ratio}`}} className='card_icon'/>}
       {card.title && 
       <div className='card_text'>
            {card.title && 
            <div className='title text_container'>
                {card.title.split(" ").map((word)=>{
                  return <span>{`${word} `}</span>
                })}
            </div>}
           {card.description &&
            <div className='description text_container'>
            <span>{card.description}</span>
            </div>
            }
        </div>
        }
        { cardType === "HC6" && <img src={chev}/>}
    </div>
  )
}
//hc1659
export default GeneralCard