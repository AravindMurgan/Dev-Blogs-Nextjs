import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import Layout from '../../../components/Layout';
import Pagination from '../../../components/Pagination';
import Post from '../../../components/Post';
import { POSTS_PER_PAGE } from '../../../config';
import { sortByDate } from '../../../utils';


export default function BlogPage({ posts,numPages,currentPage }) {
	console.log(posts);
	return (
		<Layout title='Blog'>
			<h1 className='text-5xl border-b-4 p-5 font-bold'>Blogs</h1>

			<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 '>
				{posts.map((post, index) => (
					<Post key={index} post={post} />
				))}
			</div>

			<Pagination currentPage={currentPage} numPages={numPages} />
		</Layout>
	);
}

export async function getStaticPaths() {
	const files = fs.readdirSync(path.join('posts'));

	const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

	let paths = [];

	for (let i = 1; i <= numPages; i++) {
		paths.push({
			params: { page_index: i.toString() },
		});
	}

	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps = async ({ params }) => {
	const page = parseInt((params && params.page_index) || 1);

	const files = fs.readdirSync(path.join('posts'));

	const posts = files.map((filename) => {
		const slug = filename.replace('.md', '');

		const markdownWithMeta = fs.readFileSync(
			path.join('posts', filename),
			'utf-8'
		);

		const { data: frontmatter } = matter(markdownWithMeta);

		return {
			slug,
			frontmatter,
		};
	});

	const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
	const pageIndex = page - 1;
	const orderedPosts = posts
		.sort(sortByDate)
		.slice(pageIndex  * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE);

	return {
		props: {
			numPages,
			currentPage: page,
			posts: orderedPosts,
		},
	};
};
