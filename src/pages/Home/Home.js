import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@material-ui/core'
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded'
import SubdirectoryArrowRightRoundedIcon from '@material-ui/icons/SubdirectoryArrowRightRounded'
import classes from './Home.module.scss'
import styles from './Home.styles'

class Home extends Component {
  render() {
    const buttonStyle = {
      border: styles.button.border,
      borderRadius: styles.button.borderRadius,
    }

    return (
      <div className={classes.layout}>
        <div className={classes.buttons}>
          <Button
            startIcon={
              <SubdirectoryArrowRightRoundedIcon
                className={[classes.icon, classes['icon--start']].join(' ')}
              />
            }
            size='large'
            variant='outlined'
            className={[classes.button, classes['button--in']].join(' ')}
            style={{ ...buttonStyle, color: styles.button.in.color }}
          >
            Приём
          </Button>
          <hr className={classes.line} />
          <NavLink to='/warehouse'>
            <Button
              size='large'
              variant='outlined'
              className={[classes.button, classes['button--warehouse']].join(
                ' ',
              )}
              style={{ ...buttonStyle, color: styles.button.warehouse.color }}
            >
              Склад
            </Button>
          </NavLink>
          <hr className={classes.line} />
          <Button
            endIcon={
              <ArrowRightAltRoundedIcon
                className={[classes.icon, classes['icon--end']].join(' ')}
              />
            }
            size='large'
            variant='outlined'
            className={[classes.button, classes['button--out']].join(' ')}
            style={{ ...buttonStyle, color: styles.button.out.color }}
          >
            Отгрузка
          </Button>
        </div>
      </div>
    )
  }
}

export default Home
