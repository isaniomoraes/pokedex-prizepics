import React from 'react'
import './Button.css'

interface Props {
  id: string
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  rounded?: boolean
  disabled?: boolean
}

const Button: React.FC<Props> = (props: Props) => {
  const { id, variant, size, children, onClick, rounded, disabled } = props

  return (
    <button
      id={id}
      className={`button ${variant ? `button--${variant}` : ''} ${
        size ? `button--${size}` : ''
      } ${!rounded ? 'button--flat' : 'button--rounded'}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="button__text">{children}</span>
    </button>
  )
}

export default Button
