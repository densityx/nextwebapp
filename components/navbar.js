import Link from "next/link";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import fetchJson from "../lib/fetchJson";

export default function Navbar() {
    const { user, mutateUser } = useUser();

    const router = useRouter();

    const handleLogout = async (event) => {
        event.preventDefault();

        mutateUser(
            await fetchJson("/api/logout", { method: "POST" }),
            false,
        );

        await router.push("/login");
    }

    return (
        <header className="py-4 shadow-sm bg-white">
            <div className="px-4 container flex justify-between mx-auto">
                <Link href="/">
                    <a className="inline-flex items-center select-none">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-double"
                             className="w-6 h-6 text-blue-400" role="img" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path fill="currentColor" d="M169.4 246.6C175.6 252.9 183.8 256 192 256s16.38-3.125 22.62-9.375l160-160C380.9 80.38 384 72.19 384 64c0-18.28-14.95-32-32-32c-8.188 0-16.38 3.125-22.62 9.375L192 178.8L134.6 121.4C128.4 115.1 120.2 112 112 112c-17.05 0-32 13.73-32 32c0 8.188 3.125 16.38 9.375 22.62L169.4 246.6zM480 192c0-18.28-14.95-32-32-32c-8.188 0-16.38 3.125-22.62 9.375L192 402.8L86.63 297.4C80.38 291.1 72.19 288 64 288c-17.05 0-32 13.73-32 32c0 8.188 3.125 16.38 9.375 22.62l128 128C175.6 476.9 183.8 480 192 480s16.38-3.125 22.62-9.375l256-256C476.9 208.4 480 200.2 480 192z"/>
                        </svg>

                        <span className="hidden lg:inline-block ml-2 text-lg text-blue-400 font-bold">
                            Next Webapp
                        </span>
                    </a>
                </Link>

                <nav className="flex items-center space-x-6">
                    {user?.isLoggedIn && (
                        <div className="flex items-center px-2 py-1 rounded-2xl bg-blue-50">
                            <div className="w-8 h-8 rounded-full bg-white flex-shrink-0 overflow-hidden">
                                <img src={`https://avatars.dicebear.com/api/adventurer/${user.id}.svg`} alt="Profile picture"/>
                            </div>

                            <span
                                className="hidden lg:inline-block ml-2 text-blue-400 text-sm font-medium"
                                title={user.name}
                            >
                                {user.name}
                            </span>
                        </div>
                    )}

                    <Link href="/posts">
                        <a className="text-gray-800 hover:text-blue-400 select-none">
                            Posts
                        </a>
                    </Link>

                    {user?.isLoggedIn === false ? (
                        <Link href="/login">
                            <a className="text-gray-800 hover:text-blue-400 select-none">
                                Login
                            </a>
                        </Link>
                    ) : (
                        <a
                            className="text-gray-800 hover:text-blue-400 select-none cursor-pointer"
                            onClick={handleLogout}
                        >
                            Logout
                        </a>
                    )}
                </nav>
            </div>
        </header>
    )
}