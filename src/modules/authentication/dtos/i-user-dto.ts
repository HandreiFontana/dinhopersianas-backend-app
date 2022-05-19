interface IUserDTO {
  id?: string
  email: string
  name: string
  password: string
  avatar?: string
  isBlocked?: boolean
  isDisabled?: boolean
}

export { IUserDTO }
