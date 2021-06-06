import fs from 'fs';
import path from 'path';
import Layout from '../../components/Layout';
import matter from 'gray-matter'

export default function BlogPage() {
	return <Layout title='Blog'>Blog</Layout>;
}

export const getStaticProps = async () => {
	const files = fs.readdirSync(path.join('posts'));

	const posts = files.map((filename) => {
		const slug = filename.replace('.md', '');

        const markdownWithMeta = fs.readFileSync(path.join('posts',filename),'utf-8')

        const {data:frontmatter}=  matter(markdownWithMeta);

		return {
			slug,
            frontmatter
		};
	});

   

	return {
		props: {},
	};
};
