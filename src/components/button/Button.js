import React, { Fragment, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { ButtonStyle } from './Button.Style'
import { defaultTheme } from '../styles'

function Button({
  type,
  size,
  variation,
  className,
  leadingicon,
  trailingicon,
  animate,
  loading,
  disabled,
  shadow,
  ghost,
  children,
  ...rest
}) {
  const buttonref = useRef(null)
  useEffect(() => {
    const { current } = buttonref
    const rippleeffect = (e) => {
      const btn = e.target
      const x = e.pageX - btn.offsetLeft
      const y = e.pageY - btn.offsetTop

      const duration = 1000
      let animationFrame, animationStart
      const animationStep = function (timestamp) {
        if (!animationStart) {
          animationStart = timestamp
        }
        const frame = timestamp - animationStart
        if (frame < duration) {
          const easing = (frame / duration) * (2 - frame / duration)

          const circle = 'circle at ' + x + 'px ' + y + 'px'
          const color = 'rgba(162, 162, 162, ' + 0.5 * (1 - easing) + ')'
          const stop = 90 * easing + '%'
          btn.style.backgroundImage =
            'radial-gradient(' +
            circle +
            ', ' +
            color +
            ' ' +
            stop +
            ', transparent ' +
            stop +
            ')'
          animationFrame = window.requestAnimationFrame(animationStep)
        } else {
          btn.style.backgroundImage = 'none'
          window.cancelAnimationFrame(animationFrame)
        }
      }
      animationFrame = window.requestAnimationFrame(animationStep)
    }
    current !== null && current.addEventListener('click', rippleeffect)
    return () => {
      current !== null && current.removeEventListener('click', rippleeffect)
    }
  }, [])
  return (
    <Fragment>
      <ButtonStyle
        type={type}
        disabled={loading || disabled}
        ref={animate ? buttonref : null}
        className={`
                    suprim-btn suprim-btn-${variation} suprim-btn-size-${size}
                    ${shadow ? 'shadow-btn' : ''} 
                    ${ghost ? 'ghost' : ''} 
                    ${leadingicon ? 'leadingicon' : ''}
                    ${trailingicon ? 'trailingicon' : ''}
                    ${className || ''}
                `}
        {...rest}
      >
        {leadingicon}
        {children}
        {trailingicon}
      </ButtonStyle>
    </Fragment>
  )
}

ButtonStyle.defaultProps = {
  theme: defaultTheme
}

Button.defaultProps = {
  type: 'button',
  animate: true,
  loading: false,
  disabled: false,
  shadow: false,
  size: 'default',
  variation: 'default'
}

Button.propTypes = {
  variation: PropTypes.oneOf([
    'default',
    'warning',
    'primary',
    'danger',
    'success'
  ]),
  size: PropTypes.oneOf(['default', 'small', 'mid', 'large', 'auto', 'fluid']),
  className: PropTypes.string,
  animate: PropTypes.bool,
  shadow: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
}

export default Button
