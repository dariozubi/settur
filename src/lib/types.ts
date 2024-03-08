export type PageProps = {
  params: { slug: string; locale: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}
