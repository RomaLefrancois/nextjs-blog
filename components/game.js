import useSWR from 'swr'
import Image from 'next/image'

export default function Game() {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR('https://api.rawg.io/api/games/388309?key=81b107760b4a4d73bdf249eb7b30c88d', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      <Image
        src="https://i.bingedb.com/movie/army-of-the-dead/poster-z8CE_large.jpg"
        alt="Picture of the author"
        width={265}
        height={387}
      />
      <div>hello {data.name}!</div>
    </>
  )
}