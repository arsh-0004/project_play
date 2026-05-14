 export type changePassword = {
    email: string,
    password: string,
    newPassword: string
}

 export type UpdateVenueInput = {
  name?: string
  address?: string
  city?: string
  state?: string
  status?: string
  gameAvailable?: string[]
}