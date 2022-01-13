import Head from 'next/head'
import Layout from "../components/layout";
import Image from 'next/image'

export default function Home() {
    return (
        <Layout>
            <div className="w-full">
                <div className="flex flex-col justify-center px-6 py-12 bg-white rounded-2xl shadow-sm">
                    <Image
                        src="/images/idea.svg"
                        height={400}
                        width={400}
                        alt="Welcome to Next App"
                    />

                    <h1 className="text-2xl font-semibold text-gray-800 text-center">
                        Welcome to the Next Webapp
                    </h1>

                    <div className="mt-6 prose max-w-none text-gray-600 text-center">
                        <p>
                            This is a Next Js demo webapp developed by Ahmad Aziz (ahmadaziz97@live.com)
                        </p>

                        <p>
                            This webapp is powered by Next.js + Tailwind CSS + Typicode API
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
