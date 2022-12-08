import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Button.module.scss'
import clsx from 'clsx'

const Button = ({to, href, primary, disable, children, onClick, ...passProps}) => {
    let Comp ='button'
    const props = {
        onClick,
        ...passProps
    }
    
    let temp
    if(primary){
        temp =styles.primary
    }

    if(to){
        props.to = to
        Comp = Link
    }else if(href){
        props.href = href
        Comp = 'a'
    }

    const classes = clsx(styles.wrapper,{
        [styles.primary]: primary
    })

    return (
        <div>
            <Comp type="submit" className={classes} {...props}>
                <span>{children}</span>
            </Comp>
        </div>
  )
}

export default Button