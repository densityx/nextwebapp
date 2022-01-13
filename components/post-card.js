import Link from 'next/link';

export default function PostCard({ post }) {
    return (
        <Link
            href={{
                pathname: '/posts/[id]',
                query: { id: post.id }
            }}
        >
            <a className="relative p-4 w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer group duration-300 ease-in-out transition-transform transform hover:-translate-y-1">
                <div className="flex justify-center items-center w-full h-[120px] bg-blue-50 rounded-2xl">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="window-restore"
                         className="w-12 h-auto text-blue-100" role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 512 512">
                        <path fill="currentColor" d="M432 48H208C190.3 48 176 62.33 176 80V96H128V80C128 35.82 163.8 0 208 0H432C476.2 0 512 35.82 512 80V304C512 348.2 476.2 384 432 384H416V336H432C449.7 336 464 321.7 464 304V80C464 62.33 449.7 48 432 48zM320 128C355.3 128 384 156.7 384 192V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V192C0 156.7 28.65 128 64 128H320zM64 464H320C328.8 464 336 456.8 336 448V256H48V448C48 456.8 55.16 464 64 464z"/>
                    </svg>
                </div>

                <h3 className="mt-4 text-base md:text-xl font-medium text-blue-400 line-clamp-1 capitalize">
                    {post.title}
                </h3>

                <p className="mt-4 text-base text-gray-600 line-clamp-3 capitalize">
                    {post.body}
                </p>

                <p className="inline-flex items-center mt-2 text-gray-600 group-hover:text-blue-400">
                    Read More

                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right"
                         className="ml-2 w-3 h-auto" role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 448 512">
                        <path fill="currentColor" d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"/>
                    </svg>
                </p>

                <div className="mt-4 flex items-center">
                    <span className="text-sm font-medium text-gray-600">
                        Posted by
                    </span>

                    <div className="ml-2 w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
                        <img
                            src={`https://avatars.dicebear.com/api/adventurer/${post.userId}.svg`}
                            alt="Profile picture"
                        />
                    </div>
                </div>
            </a>
        </Link>
    )
}