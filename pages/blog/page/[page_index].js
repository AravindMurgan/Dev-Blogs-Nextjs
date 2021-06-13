import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import Post from '@/components/Post';
import { POSTS_PER_PAGE } from '@/config/index';
import { getPosts } from '@/lib/posts';
import fs from 'fs';
import path from 'path';

export default function BlogPage({ posts, numPages, currentPage }) {
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

	const posts = getPosts();

	//unqiue-categories//
	const categories = posts.map((post) => post.frontmatter.category);
	
	const uniqueCategories = [...new Set(categories)]

	console.log(uniqueCategories);

	const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
	const pageIndex = page - 1;
	const orderedPosts = posts.slice(
		pageIndex * POSTS_PER_PAGE,
		(pageIndex + 1) * POSTS_PER_PAGE
	);

	return {
		props: {
			numPages,
			currentPage: page,
			posts: orderedPosts,
		},
	};
};
