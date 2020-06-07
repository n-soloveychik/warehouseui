import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@material-ui/core'
import Carousel from 're-carousel'
import classes from './CardClaim.module.scss'

const CardClaim = ({ claim, closeClaim }) => {
  return (
    <Card
      className={[
        classes.card,
        claim.closed ? classes['card--closed'] : '',
      ].join(' ')}
    >
      <div className={classes['image-container']}>
        <Carousel className={classes.carousel}>
          {claim.images.map((link, index) => (
            <CardMedia
              style={{ backgroundSize: 'contain' }}
              className={classes.img}
              key={index}
              image={link}
            />
          ))}
        </Carousel>
      </div>
      <CardContent className={classes.content}>
        <Typography>{claim.claim_description}</Typography>
      </CardContent>
      {!claim.closed && (
        <CardActions className={classes.buttons}>
          <Button
            onClick={() => closeClaim(claim.claim_id)}
            variant='outlined'
            color='secondary'
          >
            Закрыть претензию
          </Button>
        </CardActions>
      )}
    </Card>
  )
}

export default CardClaim
