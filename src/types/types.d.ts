interface ActionResponse<T> {
  success: boolean
  message: string
  data?: T
}
