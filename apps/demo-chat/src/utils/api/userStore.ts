import { nanoid } from 'nanoid'

type User = {
  id: string
  displayName: string
  createdAt: Date
}

class UserStore {
  private users: User[] = []

  register (displayName: string): User {
    const newUser: User = {
      id: nanoid(),
      displayName,
      createdAt: new Date()
    }

    this.users.push(newUser)
    return newUser
  }
}

const userStore = new UserStore()

export default userStore
