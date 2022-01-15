import _ from 'lodash';
import { useState } from 'react';
import Layout from "../../components/layout";
import CommentCard from "../../components/comment-card";
import { useRouter } from 'next/router';
import useUser from "../../lib/useUser";

export default function PostDetail({ post, comments }) {
    const router = useRouter();

    const { user } = useUser();

    const [commentState, setCommentState] = useState([
        ...comments
    ]);

    const [state, setState] = useState({
        editMode: false,
        title: post.title,
        body: post.body,
    });

    const handleTitleInputChange = (event) => {
        setState({
            ...state,
            title: event.target.value,
        });
    }

    const handleBodyInputChange = (event) => {
        setState({
            ...state,
            body: event.target.value
        });
    }

    const toggleEditMode = () => {
        setState({
            title: state.title,
            body: state.body,
            editMode: !state.editMode,
        })
    }

    const updatePost = () => {
        if (state.title.length > 0 && state.body.length > 0) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: state.title,
                    body: state.body
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    setState({
                        editMode: false,
                        title: json.title,
                        body: json.body,
                    })
                });
        }
    }

    const deletePost = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((json) => {
                if (_.isEmpty(json)) {
                    router.push('/posts')
                }
            })
    }

    const deleteComment = (id) => {
        let commentIndex = commentState.findIndex(comment => comment.id === id);

        commentState.splice(commentIndex, 1);

        setCommentState([...commentState])
    }

    return (
        <Layout>
            <div className="w-full lg:w-8/12 mx-auto p-6 bg-white rounded-2xl shadow-sm">
                <div className="flex justify-center items-center w-full h-[120px] bg-blue-50 rounded-2xl">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="window-restore"
                         className="w-12 h-auto text-blue-100" role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 512 512">
                        <path fill="currentColor" d="M432 48H208C190.3 48 176 62.33 176 80V96H128V80C128 35.82 163.8 0 208 0H432C476.2 0 512 35.82 512 80V304C512 348.2 476.2 384 432 384H416V336H432C449.7 336 464 321.7 464 304V80C464 62.33 449.7 48 432 48zM320 128C355.3 128 384 156.7 384 192V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V192C0 156.7 28.65 128 64 128H320zM64 464H320C328.8 464 336 456.8 336 448V256H48V448C48 456.8 55.16 464 64 464z"/>
                    </svg>
                </div>

                {!state.editMode ? (
                    <h1 className="mt-6 text-2xl font-semibold text-gray-800 capitalize">
                        {state.title}
                    </h1>
                ) : (
                    <>
                        <h2 className="mt-6 font-medium text-lg text-gray-600">
                            Edit Post
                        </h2>

                        <div className="mt-6">
                            <label className="font-medium text-sm text-gray-600">
                                Title
                            </label>

                            <input
                                type="text"
                                className="mt-4 px-4 py-3 w-full rounded-md bg-gray-100 border-0 focus:bg-white focus:ring-0 text-sm focus:outline-blue-500"
                                placeholder="Post title"
                                value={state.title}
                                onChange={handleTitleInputChange}
                            />
                        </div>
                    </>
                )}

                <div className="mt-6">
                    {!state.editMode ? (
                        <>
                            <div className="prose max-w-none">
                                <p className="capitalize text-600">
                                    {state.body}
                                </p>
                            </div>

                            <div className="mt-6 flex items-center">
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
                        </>
                    ) : (
                        <>
                            <label className="font-medium text-sm text-gray-600">
                                Body
                            </label>

                            <textarea
                                type="text"
                                rows="4"
                                className="mt-4 px-4 py-3 w-full rounded-md bg-gray-100 border-0 focus:bg-white focus:ring-0 text-sm focus:outline-blue-500"
                                placeholder="Post body"
                                value={state.body}
                                onChange={handleBodyInputChange}
                            />
                        </>
                    )}

                    {user?.isLoggedIn && user?.admin && (
                        <div className="flex items-center space-x-4 mt-6">
                            {!state.editMode ? (
                                <button
                                    className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-600 text-sm font-medium rounded-2xl"
                                    onClick={toggleEditMode}
                                >
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" className="h-4 w-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M497.9 74.16L437.8 14.06c-18.75-18.75-49.19-18.75-67.93 0l-56.53 56.55l127.1 128l56.56-56.55C516.7 123.3 516.7 92.91 497.9 74.16zM290.8 93.23l-259.7 259.7c-2.234 2.234-3.755 5.078-4.376 8.176l-26.34 131.7C-1.921 504 7.95 513.9 19.15 511.7l131.7-26.34c3.098-.6191 5.941-2.141 8.175-4.373l259.7-259.7L290.8 93.23z"/>
                                    </svg>

                                    Edit
                                </button>
                            ) : (
                                <button
                                    className="inline-flex items-center px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-2xl"
                                    onClick={updatePost}
                                >
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="floppy-disk" className="h-4 w-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor" d="M433.1 129.1l-83.9-83.9C342.3 38.32 327.1 32 316.1 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V163.9C448 152.9 441.7 137.7 433.1 129.1zM224 416c-35.34 0-64-28.66-64-64s28.66-64 64-64s64 28.66 64 64S259.3 416 224 416zM320 208C320 216.8 312.8 224 304 224h-224C71.16 224 64 216.8 64 208v-96C64 103.2 71.16 96 80 96h224C312.8 96 320 103.2 320 112V208z"/>
                                    </svg>

                                    Update
                                </button>
                            )}

                            <button
                                className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-2xl"
                                onClick={deletePost}
                            >
                                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-can" className="h-4 w-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z"/>
                                </svg>

                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full lg:w-8/12 mx-auto mt-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-medium text-gray-800">
                        Comments
                    </h1>

                    <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-400 rounded-2xl">
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="comment"
                             className="mr-2 w-4 h-auto text-blue-400" role="img" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path fill="currentColor" d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z"/>
                        </svg>

                        {`${commentState.length} ${commentState.length > 1 ? 'comments' : 'comment'}`}
                    </div>
                </div>

                {
                    commentState.length ?
                        commentState.map(comment => (
                            <CommentCard
                                key={comment.id}
                                comment={comment}
                                onCommentDelete={deleteComment}
                            />
                        ))
                    :
                        <div className="p-6 bg-white rounded-2xl shadow-sm">
                            <p className="text-center text-gray-600">There are currently no comments available</p>
                        </div>
                }
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ params }) {
    const post = await (await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)).json()
    const comments = await (await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}/comments`)).json()

    if (!post) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            post,
            comments
        }
    }
}