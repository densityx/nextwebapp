import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
    return (
        <div className="h-full bg-gray-50">
            <Navbar />

            <main className="container mx-auto my-6 px-4">
                {children}
            </main>

            <Footer />
        </div>
    )
}