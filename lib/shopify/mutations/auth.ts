import customerFragment from "../fragments/customer";

export const createCustomerMutation = /* GraphQL */ `
    mutation createCustomer($email: String!, $password: String!) {
        customerCreate(input: { email: $email, password: $password }) {
            customer {
                ...customer
            }
            customerUserErrors {
                field
                message
                code
            }
        }
    }
    ${customerFragment}
`;

export const createCustomerAccessTokenMutation = /* GraphQL */ `
    mutation createCustomerAccessToken($email: String!, $password: String!) {
        customerAccessTokenCreate(input: { email: $email, password: $password }) {
            customerAccessToken {
                accessToken
            }
            customerUserErrors {
                message
            }
        }
    }
`;