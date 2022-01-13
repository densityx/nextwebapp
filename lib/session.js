// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
export const sessionOptions = {
    password: "AqjcSQfrCYBCZckvpto5ZXXnZZG1IGca", // process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "next_webapp",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};