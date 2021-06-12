import Layout from "@/components/Layout"
import Image from 'next/image'


export default function PageNotFound() {
    return (
        <Layout title='404 Not Found' >
            <div className='flex flex-col items-center mt-20' >
                <Image src='/images/logo.png' width={70} height={70} className='bg-gray-800 rounded-2xl' ></Image>
                
                <h1 className='text-6xl my-5' >404-error</h1>
                <h2 className='text-4xl text-gray-400 mb-5' >
                    This page doesnt exist
                </h2>
            </div>

        </Layout>
    )
}
