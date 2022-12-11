import React from 'react'
import styled from 'styled-components'

const Component = styled.div`
  margin-bottom: 2rem;
`

interface FormControl {
  children: React.ReactNode
}

const FormControl = ({ children }: FormControl) => {
  return (
    <Component>
      {children}
    </Component>
  )
}

const Label = styled.div`
  margin-bottom: 1rem;
`

interface FormControlLabel {
  children: React.ReactNode
}

const FormControlLabel = ({ children }: FormControlLabel) => {
  return (
    <Label>
      {children}
    </Label>
  )
}

FormControl.Label = FormControlLabel

const Error = styled.div`
  margin-top: .5rem;
  color: ${props => props.theme.colors.error};
`

interface FormControlErrorMessage {
  children: React.ReactNode
}

const FormControlErrorMessage = ({ children }: FormControlErrorMessage) => {
  return (
    <Error>
      {children}
    </Error>
  )
}

FormControl.ErrorMessage = FormControlErrorMessage

export default FormControl
