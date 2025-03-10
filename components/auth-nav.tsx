import { auth } from "../auth";

export default async function AuthNav() {
    const session = await auth();

    console.log("Session:", session);
    return (
        <div>
            <h1>
                {session && session.user.name}
            </h1>
        </div>
    );
}