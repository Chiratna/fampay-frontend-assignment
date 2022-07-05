import React from 'react'
import { Card } from '../../api/card-service'
import './styles.css'
import remind from "../../images/remind.svg"
import dismiss from "../../images/dismiss.svg"
interface HC3CardProps {
    card : Card,
}
const HC3Card : React.FC<HC3CardProps> = ({card} : HC3CardProps) => {
  
  return (
    <div className='hc3_container' style={{aspectRatio : `${card.bg_image?.aspect_ratio}`}}>
        <div className='background_action'>
                <div className='btn_container'>
                    <img src={remind} alt="remind" height={18} width={20}/>
                    <span className='bg_btn_text'>remind later</span>
                </div>
                <div className='btn_container'>
                    <img src={dismiss} alt="dismiss" height={18} width={20}/>
                    <span className='bg_btn_text'>dismiss</span>
                </div>
        </div>
        <div className='foreground' style={{background : `${card.bg_color === undefined ? "#FBAF03" : card.bg_color}`, backgroundImage : `url(${card.bg_image?.image_url})`, aspectRatio : `${card.bg_image?.aspect_ratio}`, backgroundSize : 'contain'}}>
            <div className='foreground_container'>
                <div className='text_container'>
                    <span className='h3_title'>{card.title}</span>
                </div>
                <div className='text_container'>
                    <span className='h3_description'>{card.title}</span>
                </div>

                <div className='cta_btn_container'>
                    {
                        card.cta && card.cta.map((cta)=>{
                            return <button className='cta_btn' style={{background :`${cta.bg_color}`, color : `${cta.text_color}`}}>{cta.text}</button>
                        })
                    }
                {/* {card.cta && <>
                    <button className='cta_btn' style={{background :`${card.cta[0].bg_color}`, color : `${card.cta[0].text_color}`}}>{card.cta[0].text}</button>
                <button className='cta_btn' style={{background :`${card.cta[0].bg_color}`, color : `${card.cta[0].text_color}`}}>{card.cta[0].text}</button>
                <button className='cta_btn' style={{background :`${card.cta[0].bg_color}`, color : `${card.cta[0].text_color}`}}>{card.cta[0].text}</button>
                <button className='cta_btn' style={{background :`${card.cta[0].bg_color}`, color : `${card.cta[0].text_color}`}}>{card.cta[0].text}</button>
                </>} */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default HC3Card