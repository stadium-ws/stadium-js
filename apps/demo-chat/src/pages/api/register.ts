import { NextApiRequest, NextApiResponse } from 'next'
import userStore from '@/utils/api/userStore'
import stadium from '@/utils/api/stadium'

async function register (req: NextApiRequest, res: NextApiResponse) {
  const { displayName } = req.body
  const newUser = userStore.register(displayName)

  const createUserRes = await stadium.createUser({
    displayName,
    meta: {
      internalUserId: newUser.id
    }
  })

  res.send(createUserRes)
}

export default register
