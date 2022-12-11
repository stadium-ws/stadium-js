import React from 'react'
import { Formik, Form } from 'formik'
import Button from '@/components/Button'
import Input from '@/components/Input'
import * as Yup from 'yup'
import { register } from '@/api/register'
import { useSession } from '@/contexts/SessionContext'
import { useRouter } from 'next/navigation'
import { Route } from '@/constants/Route'

const validationSchema = Yup.object().shape({
  displayName: Yup.string().required('Display name is required')
})

const initialValues = {
  displayName: ''
}

const Register = () => {
  const session = useSession()
  const router = useRouter()

  const handleSubmit = async (values: typeof initialValues) => {
    const res = await register(values.displayName)
    session.setUser(res.user)
    router.push(Route.CHANNELS)
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
            <Input
              name='displayName'
              label='Display name'
              placeholder='Richard Hendrix'
            />
            <Button type='submit'>
              Join the chat
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Register
