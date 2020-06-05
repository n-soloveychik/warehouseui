import React from 'react'
import {
  Card,
  CardHeader,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@material-ui/core'
import classes from './CheckItemsCard.module.scss'

const CheckItemsCard = (props) => {
  console.log(props.item)
  return (
    <Card>
      <CardHeader title={props.item.item_num} />
      <CardMedia className={classes.image} image={props.item.image} />
    </Card>
  )
}

export default CheckItemsCard
