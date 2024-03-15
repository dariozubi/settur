export type PageProps = {
  params: { slug: string; locale: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export type Zone =
  | 'zone1'
  | 'zone2'
  | 'zone3'
  | 'zone4'
  | 'zone5'
  | 'zone6'
  | 'zone7'
  | 'zone8'
  | 'zone9'

export type FormErrors = {
  required: string
  minimumOne: string
  minimum: string
  email: string
  phone: string
  tooManyPeople: string
}
