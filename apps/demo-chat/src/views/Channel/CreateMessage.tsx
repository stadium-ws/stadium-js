import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Formik, Form, FormikProps } from 'formik'
import Button from '@/components/Button'
import stadium from '@/utils/stadium'

const Component = styled(Form)`
  display: flex;
  padding: .5rem;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 4px;
`

const Input = styled.input`
  background: 0;
  border: 0;
  font-family: inherit;
  width: 100%;
  color: white;
  outline: 0;
  margin-right: .5rem;
`

const Controls = styled.div``

interface CreateMessageFormFields {
  message: string
}

const initialValues: CreateMessageFormFields = {
  message: ''
}

interface CreateMessageState {
  isSubmitting: boolean
}

interface CreateMessage {
  channelId: string
}

const CreateMessage = ({ channelId }: CreateMessage) => {
  const refForm = useRef<FormikProps<CreateMessageFormFields>>(null)
  const [state, setState] = useState<CreateMessageState>({
    isSubmitting: false
  })

  const handleSubmit = async (values: CreateMessageFormFields) => {
    const newMessageResponse = await stadium.createEvent({
      channelId,
      content: values.message,

      // TODO: create an enum for event types
      type: 0
    })

    const form = refForm.current
    form!.resetForm()
  }

  return (
    <Formik
      innerRef={refForm}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ handleChange, values }) => {
        return (
          <Component>
            <Input
              name='message'
              type='text'
              autoFocus
              onChange={handleChange}
              value={values.message}
              placeholder='Write a new message...'
            />
            <Controls>
              <Button type='submit'>Send</Button>
            </Controls>
          </Component>
        )
      }}
    </Formik>
  )
}

export default CreateMessage
