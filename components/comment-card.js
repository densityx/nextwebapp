import {useState} from "react";
import _ from "lodash";
import useUser from "../lib/useUser";

export default function CommentCard({ comment, onCommentDelete }) {
    const { user } = useUser();

    const [state, setState] = useState({
        editMode: false,
        body: comment.body,
    });

    const handleBodyInputChange = (event) => {
        setState({
            ...state,
            body: event.target.value
        });
    }

    const toggleEditMode = () => {
        setState({
            body: comment.body,
            editMode: !state.editMode,
        })
    }

    const updateComment = () => {
        if (state.body.length > 0) {
            console.log(state.body)

            fetch(`https://jsonplaceholder.typicode.com/comments/${comment.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
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
                        body: json.body,
                    })

                    console.log(json.body);
                });
        }
    }

    const deleteComment = () => {
        fetch(`https://jsonplaceholder.typicode.com/comments/${comment.id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((json) => {
                if (_.isEmpty(json)) {
                    onCommentDelete(comment.id)
                }
            })
    }

    return (
        <div
            className="flex items-start relative p-4 w-full bg-white rounded-2xl overflow-hidden shadow-sm"
        >
            <div className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
                <img src={`https://avatars.dicebear.com/api/adventurer/${comment.email}.svg`} alt=""/>
            </div>

            <div className="ml-3 w-full">
                <p className="text-blue-400 font-medium capitalize">
                    {comment.name}
                </p>

                <p className="text-sm text-gray-400">
                    {comment.email}
                </p>

                {!state.editMode ? (
                    <p className="mt-4 text-sm text-gray-600 capitalize">
                        {state.body}
                    </p>
                ) : (
                    <>
                        <h2 className="mt-4 font-medium text-lg text-gray-600">
                            Edit Comment
                        </h2>

                        <div className="mt-4">
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
                        </div>
                    </>
                )}

                {user?.isLoggedIn && user?.admin && (
                    <div className="flex items-center space-x-4 mt-6">
                        {!state.editMode ? (
                            <button
                                className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-600 text-sm font-medium rounded-2xl"
                                onClick={toggleEditMode}
                            >
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" className="h-4 w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M497.9 74.16L437.8 14.06c-18.75-18.75-49.19-18.75-67.93 0l-56.53 56.55l127.1 128l56.56-56.55C516.7 123.3 516.7 92.91 497.9 74.16zM290.8 93.23l-259.7 259.7c-2.234 2.234-3.755 5.078-4.376 8.176l-26.34 131.7C-1.921 504 7.95 513.9 19.15 511.7l131.7-26.34c3.098-.6191 5.941-2.141 8.175-4.373l259.7-259.7L290.8 93.23z"/>
                                </svg>
                            </button>
                        ) : (
                            <button
                                className="inline-flex items-center px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-2xl"
                                onClick={updateComment}
                            >
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="floppy-disk" className="h-4 w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M433.1 129.1l-83.9-83.9C342.3 38.32 327.1 32 316.1 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V163.9C448 152.9 441.7 137.7 433.1 129.1zM224 416c-35.34 0-64-28.66-64-64s28.66-64 64-64s64 28.66 64 64S259.3 416 224 416zM320 208C320 216.8 312.8 224 304 224h-224C71.16 224 64 216.8 64 208v-96C64 103.2 71.16 96 80 96h224C312.8 96 320 103.2 320 112V208z"/>
                                </svg>
                            </button>
                        )}

                        <button
                            className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-2xl"
                            onClick={deleteComment}
                        >
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-can" className="h-4 w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z"/>
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}