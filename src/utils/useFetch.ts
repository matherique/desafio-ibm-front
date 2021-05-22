import useSWR from 'swr'

type FetchResponse<Data, Error> = {
  data: Data
  error: Error
}

export function useFetch<Data, Error = any>(
  url: string
): FetchResponse<Data, Error> {
  const { data, error } = useSWR<Data, Error>(url, async url => {
    const response = await fetch(url)
    const data = await response.json()

    return data
  })

  return { data, error }
}
