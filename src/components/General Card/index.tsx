import React from 'react'
import { Card, Entity } from '../../api/card-service'
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
   let entityTitleIndex : number = 0;
   let entityDescriptionIndex : number = 0;
   const cardStyle ={
        background : `${card.bg_color === undefined ? "#FBAF03" : card.bg_color}`, 
        backgroundImage : `url(${card.bg_image?.image_url})`, 
        aspectRatio : `${card.bg_image?.aspect_ratio}`, 
        backgroundSize : 'contain',
    };


  const handleOnClick = (url : string)=>{
    window.location.replace(url);
  }

  
  return (
    <div className = {cardClassName} style={cardStyle} onClick={()=>{
      handleOnClick(card.url)
    }}>
       {card.icon && <img src={card.icon.image_url} alt='card-img' style={{aspectRatio : `${card.icon.aspect_ratio}`}} className='card_icon'/>}
       {card.title && 
       <div className='card_text'>
            {card.title && 
            <div className='title text_container'>
                {card.formatted_title && card.formatted_title.text.split(" ").map((word, i)=>{
                  let e : Entity;
                  if(word.includes("{}"))
                    {
                        let e : Entity = card.formatted_title?.entities[entityTitleIndex]!;
                        entityTitleIndex++;
                        if(e.url)
                            return <a href={e.url} style={{color : `${e!.color}`, fontStyle : `${e!.font_style}`}}>{`${e.text} `}</a>
                            else
                            return <span style={{color : `${e!.color}`, fontStyle : `${e!.font_style}`}}>{`${e.text} `}</span>
                    }
                  return <span>{`${word} `}</span>
                })}
                {card.formatted_title === undefined && card.title.split(" ").map((word)=>{
                  return <span>{`${word} `}</span>
                })
                }
            </div>}
           {card.description &&
            <div className='description text_container'>
            {card.formatted_description && card.formatted_description.text.split(" ").map((word, i)=>{
                  if(word.includes("{}"))
                    {
                        let e : Entity = card.formatted_description?.entities[entityDescriptionIndex]!;
                        entityDescriptionIndex++;
                        if(e.url)
                            return <a href={e.url} style={{color : `${e!.color}`, fontStyle : `${e!.font_style}`}}>{`${e.text} `}</a>
                            else
                            return <span style={{color : `${e!.color}`, fontStyle : `${e!.font_style}`}}>{`${e.text} `}</span>
                    }
                  return <span>{`${word} `}</span>
                })}
                {card.formatted_description === undefined && card.description.split(" ").map((word)=>{
                  return <span>{`${word} `}</span>
                })
                }
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