import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(
    async function loginRoute(req, res) {
        try {
            if (req.method === "POST") {
                const {email, password} = await req.body;

                if (
                    email === 'ahmadaziz97@live.com' && password === 'secretsecret'
                    || email === 'johndoe@gmail.com' && password === 'secretsecret'
                ) {
                    const isOwner = (email === 'ahmadaziz97@live.com');

                    const user = {
                        id: isOwner ? 1 : 2,
                        name: isOwner ? 'Ahmad Aziz' : 'John Doe',
                        email: isOwner ? 'ahmadaziz97@live.com' : 'johndoe@gmail.com',
                        username: isOwner ? 'densityx' : 'johndoe',
                        isLoggedIn: true,
                        admin: isOwner,
                    };

                    req.session.user = user;

                    await req.session.save();

                    res.json(user);
                } else {
                    res.status(500)
                        .json({
                            message: 'Whoops, it looks like the user credentials are invalid'
                        });
                }
            }
        } catch (error) {
            res.status(500)
                .json({
                    message: error.message
                });
        }
    },
    sessionOptions
);