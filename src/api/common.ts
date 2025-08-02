export type ListReponse<T> = {
  data?: T[]
  items?: T[]
}

export type DetailReponse<T> = {
  data: T
}
