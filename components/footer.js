import Link from "next/link";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import fetchJson from "../lib/fetchJson";

export default function Footer() {
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
        <footer className="p-6 bg-white shadow-sm">
            <nav className="container mx-auto flex justify-center space-x-6">
                <span className="text-gray-800 select-none">
                    ©2022 Ahmad Aziz
                </span>

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
                        className="text-gray-800 hover:text-blue-400 select-none"
                        onClick={handleLogout}
                    >
                        Logout
                    </a>
                )}
            </nav>
        </footer>
    )
}