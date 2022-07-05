import React from 'react'
import { CardGroup, Card } from '../../api/card-service'
import CardComponent from '../Card'

import styles from './styles.module.css'
interface CardContainerProps{
  cardgroups : CardGroup[],
}
const scrollableStyle ={

}
const CardContainer : React.FC<CardContainerProps> = ({cardgroups} : CardContainerProps) => {
  return (
    <div className={styles.main}>
      {cardgroups.map((cardgroup)=>{
        return cardgroup.design_type === "HC1" ? <CardComponent isScrollable={cardgroup.is_scrollable} cards={cardgroup.cards} cardType={cardgroup.design_type}/> : <div/>
      })}
     
    </div>
  )
}

export default CardContainer