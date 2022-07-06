import React from 'react'
import { Card, Entity } from '../../api/card-service'
import './styles.css'
import chev from "../../images/famchev.svg"
interface GeneralCardProps {
  card: Card
  cardType: string
}

/**
 * @descriprion This Card is a general Card that displays every card except H3
 * @param card - It contains all the card display details
 * @param cardType - It contains the card type.
 */

const GeneralCard: React.FC<GeneralCardProps> = ({ card, cardType }: GeneralCardProps) => {
    /**
   * @description - This decides the card class name dynamically ( used to handle HC9 Card)
   */
  const cardClassName: string = `${cardType === "HC9" ? "hc9_config" : "card_config"} card_container`;



  /**
   * @description - This decides the cardStyle dynamically
   */
  const cardStyle = {
    background: `${card.bg_color === undefined ? "#FBAF03" : card.bg_color}`,
    backgroundImage: `url(${card.bg_image?.image_url})`,
    aspectRatio: `${card.bg_image?.aspect_ratio}`,
    backgroundSize: 'contain',
  };

  let entityTitleIndex: number = 0;
  let entityDescriptionIndex: number = 0;


  const handleOnClick = (url: string) => {
    window.location.replace(url);
  }


  return (
    <div className={cardClassName} style={cardStyle} onClick={() => {
      handleOnClick(card.url)
    }}>
      {card.icon && <img src={card.icon.image_url} alt='card-img' style={{ aspectRatio: `${card.icon.aspect_ratio}` }} className='card_icon' />}
      {card.title &&
        <div className='card_text'>
          {card.title &&
            <div className='title text_container'>
              {/* Here the enitity format options are applied to the title */}
              {card.formatted_title && card.formatted_title.text.split(" ").map((word, i) => {
                if (word.includes("{}")) {
                  let e: Entity = card.formatted_title?.entities[entityTitleIndex]!;
                  entityTitleIndex++;
                  if (e.url)
                    return <a key={i} href={e.url} style={{ color: `${e!.color}`, fontStyle: `${e!.font_style}` }}>{`${e.text} `}</a>
                  else
                    return <span key={i} style={{ color: `${e!.color}`, fontStyle: `${e!.font_style}` }}>{`${e.text} `}</span>
                }
                return <span key={i}>{`${word} `}</span>
              })}
              {card.formatted_title === undefined && card.title.split(" ").map((word,j) => {
                return <span key={j}>{`${word} `}</span>
              })
              }
            </div>}
          {card.description &&
            <div className='description text_container'>
              {/* Here the enitity format options are applied to the description */}
              {card.formatted_description && card.formatted_description.text.split(" ").map((word, i) => {
                if (word.includes("{}")) {
                  let e: Entity = card.formatted_description?.entities[entityDescriptionIndex]!;
                  entityDescriptionIndex++;
                  if (e.url)
                    return <a key={i} href={e.url} style={{ color: `${e!.color}`, fontStyle: `${e!.font_style}` }}>{`${e.text} `}</a>
                  else
                    return <span key={i} style={{ color: `${e!.color}`, fontStyle: `${e!.font_style}` }}>{`${e.text} `}</span>
                }
                return <span key={i}>{`${word} `}</span>
              })}
              {card.formatted_description === undefined && card.description.split(" ").map((word,j) => {
                return <span key={j}>{`${word} `}</span>
              })
              }
            </div>
          }
        </div>
      }
      {cardType === "HC6" && <img src={chev} alt='chevron icon' />}
    </div>
  )
}
//hc1659
export default GeneralCard