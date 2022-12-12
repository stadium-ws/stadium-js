import React from 'react'
import styled from 'styled-components'

export enum ButtonVariant {
  PRIMARY = 'primary'
}

const Component = styled.button<{
  variant: ButtonVariant
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  padding: .5rem;
  font-size: .85rem;
  font-weight: 500;
  cursor: pointer;
  color: #fff;
  font-family: inherit;
  background-color: ${({ theme }) => theme.colors.primary};
`

const Content = styled.div``

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariant
}

const Button = ({
  children,
  variant = ButtonVariant.PRIMARY,
  type = 'button',
  ...props
}: IButton) => {
  return (
    <Component
      variant={variant}
      type={type}
      {...props}
    >
      <Content>
        {children}
      </Content>
    </Component>
  )
}

export default Button
