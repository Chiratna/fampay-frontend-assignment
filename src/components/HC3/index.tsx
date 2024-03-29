import React from 'react'
import { Card, Entity } from '../../api/card-service'
import './styles.css'
import remind from "../../images/remind.svg"
import dismiss from "../../images/dismiss.svg"
interface HC3CardProps {
  card: Card,
  foreGroundClass: string
  handleRemindLater: any
  handleDismiss: any
}

/**
 * @description : The HC3 card that is used to display the HC3 card group.
 * @param card The HC3 card content
 * @param foreGroundClass : The foreGroundClass name
 * @param handleRemindLater : A callback function to handle remind later functionality
 * @param handleDismiss : A callback function to handle dismiss functionality 
 */

const HC3Card: React.FC<HC3CardProps> = ({ card, foreGroundClass, handleRemindLater, handleDismiss }: HC3CardProps) => {
  let entityTitleIndex: number = 0;
  let entityDescriptionIndex: number = 0;

  const handleOnClick = (url: string) => {
    window.location.replace(url);
  }

  return (
    <div className='hc3_container' style={{ aspectRatio: `${card.bg_image?.aspect_ratio}` }}>
      <div className='background_action'>
        <div onClick={handleRemindLater} className='btn_container'>
          <img src={remind} alt="remind" height={18} width={20} />
          <span className='bg_btn_text'>remind later</span>
        </div>
        <div onClick={handleDismiss} className='btn_container'>
          <img src={dismiss} alt="dismiss" height={18} width={20} />
          <span className='bg_btn_text'>dismiss</span>
        </div>
      </div>
      <div className={foreGroundClass} style={{ background: `${card.bg_color === undefined ? "#FBAF03" : card.bg_color}`, backgroundImage: `url(${card.bg_image?.image_url})`, aspectRatio: `${card.bg_image?.aspect_ratio}`, backgroundSize: 'contain' }}>
        <div className='foreground_container' onClick={() => {
          handleOnClick(card.url);
        }}>
          {card.title &&
            <div className='h3_title'>
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
            </div>
          }
          {card.description &&
            <div className='h3_description'>
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

          <div className='cta_btn_container'>
            {
              card.cta && card.cta.map((cta,i) => {
                return <button key={i} className='cta_btn' onClick={() => {
                  handleOnClick(cta.url);
                }} style={{ background: `${cta.bg_color}`, color: `${cta.text_color}` }}>{cta.text}</button>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default HC3Card