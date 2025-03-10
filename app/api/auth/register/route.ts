import { createCustomer } from "lib/shopify";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        console.log("Creating account in POST endpoint with email:", email);

        const data = await createCustomer({ email, password });
        console.log("Created customer:", data.customer);

        return new Response(JSON.stringify(data.customer), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error: any) {
        console.log("Error creating customer:", error);
        return new Response(error.message, {
            status: 500,
            statusText: "Internal Server Error",
        });
    }
}