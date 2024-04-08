export type PageProps = {
  params: { slug: string; locale: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export type FormErrors = {
  required: string
  minimumOne: string
  minimum: string
  email: string
  phone: string
  tooManyPeople: string
  departureAfterArrival: string
  maximum: string
  invalidFlight: string
  form: string
}

export type Status = 'reserving' | 'paying' | undefined
