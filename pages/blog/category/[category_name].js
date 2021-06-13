import CategoryList from '@/components/CategoryList';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import { getPosts } from '@/lib/posts';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export default function CategoryBlogPage({ posts, categoryName, categories }) {
	return (
		<Layout title='Blog'>
			<div className='flex justify-between'>
				<div className='w-3/4 mr-10 '>
					<h1 className='text-5xl border-b-4 p-5 font-bold'>
						{' '}
						Posts in {categoryName}{' '}
					</h1>

					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 '>
						{posts.map((post, index) => (
							<Post key={index} post={post} />
						))}
					</div>
				</div>

				<div className='w-1/4'>
					<CategoryList categories={categories} />
				</div>
			</div>
		</Layout>
	);
}

export const getStaticPaths = async () => {
	const files = fs.readdirSync(path.join('posts'));

	const categories = files.map((filename) => {
		const markdownWithMeta = fs.readFileSync(
			path.join('posts', filename),
			'utf-8'
		);

		const { data: frontmatter } = matter(markdownWithMeta);

		return frontmatter.category.toLowerCase();
	});

	const paths = categories.map((category) => ({
		params: { category_name: category },
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params: { category_name } }) => {
	const posts = getPosts();

	//unqiue-categories//
	const categories = posts.map((post) => post.frontmatter.category);

	const uniqueCategories = [...new Set(categories)];

	//Filter Posts//
	const categoryPosts = posts.filter(
		(post) => post.frontmatter.category.toLowerCase() === category_name
	);

	return {
		props: {
			posts: categoryPosts,
			categoryName: category_name,
			categories: uniqueCategories,
		},
	};
};
