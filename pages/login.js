import Layout from "../components/layout";
import useUser from "../lib/useUser";
import React, { useState } from "react";
import fetchJson, { FetchError } from "../lib/fetchJson";

export default function Login() {
    // here we just check if user is already logged in and redirect to posts page
    const { mutateUser } = useUser({
        redirectTo: "/posts",
        redirectIfFound: true,
    });

    const [errorMsg, setErrorMsg] = useState("");

    const submitForm = async (event) => {
        event.preventDefault();

        const body = {
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value,
        };

        try {
            mutateUser(
                await fetchJson("/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }),
            );
        } catch (error) {
            if (error instanceof FetchError) {
                setErrorMsg(error.data.message);
            } else {
                console.error("An unexpected error happened:", error);
            }
        }
    }

    return (
        <Layout>
            <div className="w-full md:w-1/2 lg:w-2/3 mx-auto">
                <div className="px-6 py-20 bg-white rounded-2xl shadow-sm">
                    <h1 className="text-2xl font-semibold text-gray-800 text-center">
                        Login To Your Account
                    </h1>

                    {errorMsg && (
                        <p className="flex items-center mt-6 p-4 text-red-400 bg-red-50 rounded-xl">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                 data-icon="circle-exclamation" className="mr-2 w-4 h-auto text-red-400"
                                 role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"/>
                            </svg>

                            {errorMsg}
                        </p>
                    )}

                    <form
                        className="flex flex-col mt-6"
                        onSubmit={submitForm}
                    >
                        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                            <input
                                type="email"
                                name="email"
                                className="w-full lg:w-1/2 px-4 py-3 w-full rounded-md bg-gray-100 border-0 focus:bg-white focus:ring-0 text-sm focus:outline-blue-500"
                                placeholder="Email address"
                                required
                            />

                            <input
                                type="password"
                                name="password"
                                className="w-full lg:w-1/2 px-4 py-3 w-full rounded-md bg-gray-100 border-0 focus:bg-white focus:ring-0 text-sm focus:outline-blue-500"
                                placeholder="Password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-6 px-4 py-3 leading-6 text-lg font-semibold rounded-md border border-transparent text-white focus:outline-none bg-blue-400 hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-6 p-4 bg-gray-100 rounded-xl text-gray-600">
                        <h2 className="text-xl font-medium">
                            User Credentials
                        </h2>

                        <div className="mt-6">
                            <p className="font-medium">Admin User</p>
                            <p>Email: ahmadaziz97@live.com</p>
                            <p>Password: secretsecret</p>
                        </div>

                        <div className="mt-6">
                            <p className="font-medium">Normal User</p>
                            <p>Email: johndoe@gmail.com</p>
                            <p>Password: secretsecret</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}