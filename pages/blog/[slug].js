import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Layout from '../../components/Layout'
import CategoryLabel from '../../components/CategoryLabel'
import Link from 'next/link'



export default function PostPage({frontmatter:{title,category,date,cover_image,author,author_image},content,slug}) {
    return (
        <Layout title={title} >
            
        </Layout>
    )
}

export const getStaticPaths= async ()=>{
    const files = fs.readdirSync(path.join('posts'))

    const paths = files.map(filename=>(
        {
            params: {
                slug:filename.replace('.md','')
            }
        }
    ))

    return{
        paths,
        fallback:false
    }
}

export const getStaticProps=({params: {slug}})=>{
    const markdownWithMeta = fs.readFileSync(path.join('posts',slug + '.md'),'utf-8')

    const {data:frontmatter,content} = matter(markdownWithMeta)


    return {
        props: {
            frontmatter,
            content,
            slug
        }
    }
}