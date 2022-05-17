import { hashSync } from 'bcrypt'
import { v4 } from 'uuid'
import { getDate } from '../utils'

let USERS_DB = [
  {
    uuid: '1',
    name: 'Gabriel',
    email: 'gabriel@gabriel',
    password: hashSync('123', 10),
    isAdmin: true,
    createdOn: getDate(),
    updatedOn: getDate(),
  },
]

export default USERS_DB
