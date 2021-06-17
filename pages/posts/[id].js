import Layout from '../../components/layout'
import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import Game from '../../components/game'
import utilStyles from '../../styles/utils.module.css'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id)

  const gameData = await fetcher('https://api.rawg.io/api/games/3328?key=81b107760b4a4d73bdf249eb7b30c88d')

  return {
    props: {
      postData,
      gameData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export default function Post({ postData, gameData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
          <div>{gameData.name_original}</div>
          <Game />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}