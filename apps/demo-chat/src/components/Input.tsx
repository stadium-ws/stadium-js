import React from 'react'
import styled from 'styled-components'
import FormControl from '@/components/FormControl'
import { useField } from 'formik'

const InnerInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, .1);
  background: transparent;
  color: inherit;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
`

interface Input {
  name: string
  label: string
  placeholder: string
}

const Input = ({ name, label, placeholder }: Input) => {
  const [field, meta] = useField(name)

  return (
    <FormControl>
      <FormControl.Label>
        {label}
      </FormControl.Label>
      <InnerInput
        name={name}
        placeholder={placeholder}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
      {meta.touched && meta.error && (
        <FormControl.ErrorMessage>
          {meta.error}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  )
}

export default Input
