import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  // Button,
  // CardActions,
} from '@material-ui/core'
import Carousel from 're-carousel'
import classes from './CardClaim.module.scss'

const CardClaim = ({ claim }) => {
  console.log(claim)
  return (
    <Card className={classes.card}>
      <div className={classes['image-container']}>
        <Carousel className={classes.carousel}>
          {claim.images.map((link, index) => (
            <CardMedia
              className={classes.img}
              key={index}
              image={link}
              title='Неисправность'
            />
          ))}
        </Carousel>
      </div>
      <CardContent className={classes.content}>
        <Typography>{claim.claim_description}</Typography>
      </CardContent>
      {/* <CardActions className={classes.buttons}>
        <Button>Закрыть претензию</Button>
      </CardActions> */}
    </Card>
  )
}

export default CardClaim
