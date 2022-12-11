import React from 'react'
import { Formik, Form } from 'formik'
import Button from '@/components/Button'
import Input from '@/components/Input'
import * as Yup from 'yup'
import { register } from '@/api/register'

const validationSchema = Yup.object().shape({
  displayName: Yup.string().required('Display name is required')
})

const initialValues = {
  displayName: ''
}

const Register = () => {
  const handleSubmit = async (values: typeof initialValues) => {
    await register(values.displayName)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {() => {
        return (
          <Form>
            <Input name='displayName' label='Display name' placeholder='Richard Hendrix' />
            <Button type='submit'>Register</Button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Register
