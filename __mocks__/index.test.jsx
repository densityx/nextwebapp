import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import Posts from '../pages/posts/index'
import Login from '../pages/login'
import PostDetail from "../pages/posts/[id]";

describe('Home', () => {
    it('renders the homepage heading', () => {
        render(<Home />)

        const heading = screen.getByRole('heading', {
            name: /Welcome to the Next Webapp/i,
        })

        expect(heading).toBeInTheDocument()
    })
})

describe('All Posts', () => {
    const posts = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
    ];

    it('renders all posts page heading', async () => {
        render(<Posts posts={posts} />)

        const heading = screen.getByRole('heading', {
            name: /All Posts/i,
        })

        expect(heading).toBeInTheDocument()
    })

    it('has 10 dummy posts', async () => {
        render(<Posts posts={posts} />)

        const heading = screen.getByText(/10 posts/i)

        expect(heading).toBeInTheDocument()
    })
})

describe('Login', () => {
    it('renders login page heading', async () => {
        render(<Login />)

        const heading = screen.getByRole('heading', {
            name: /Login To Your Account/i,
        })

        expect(heading).toBeInTheDocument()
    })
})

describe('Post Details Page', () => {
    it('renders the post heading', async () => {
        render(
            <PostDetail
                post={{
                    id: 1,
                    title: 'Sunt Aut Facere Repellat Provident Occaecati Excepturi Optio Reprehenderit'
                }}
                comments={[
                    { id: 1, },
                    { id: 2, },
                    { id: 3, },
                    { id: 4, },
                    { id: 5, },
                ]}
            />
        )

        const heading = screen.getByRole('heading', {
            name: /Sunt Aut Facere Repellat Provident Occaecati Excepturi Optio Reprehenderit/i,
        })

        expect(heading).toBeInTheDocument()
    })

    it('has 5 comments', async () => {
        render(
            <PostDetail
                post={{
                    id: 1,
                    title: 'Sunt Aut Facere Repellat Provident Occaecati Excepturi Optio Reprehenderit'
                }}
                comments={[
                    { id: 1, },
                    { id: 2, },
                    { id: 3, },
                    { id: 4, },
                    { id: 5, },
                ]}
            />
        )

        const heading = screen.getByText(/5 comments/i)

        expect(heading).toBeInTheDocument()
    })
})
