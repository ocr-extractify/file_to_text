# Summary: 

OpenID Connect is an interoperable authentication protocol based on the OAuth 2.0 framework of specifications (IETF RFC 6749 and 6750). It simplifies the way to verify the identity of users based on the authentication performed by an Authorization Server and to obtain user profile information in an interoperable and REST-like manner.

OpenID Connect enables application and website developers to launch sign-in flows and receive verifiable assertions about users across Web-based, mobile, and JavaScript clients. And the specification suite is extensible to support a range of optional features such as encryption of identity data, discovery of OpenID Providers, and session logout.

For developers, it provides a secure and verifiable answer to the question “What is the identity of the person currently using the browser or mobile app that is connected?” Best of all, it removes the responsibility of setting, storing, and managing passwords which is frequently associated with credential-based data breaches.

# How it works:

OpenID Connect enables an Internet identity ecosystem through easy integration and support, security and privacy-preserving configuration, interoperability, wide support of clients and devices, and enabling any entity to be an OpenID Provider (OP).
The OpenID Connect protocol, in abstract, follows these steps:

![alt text](/docs/assets/vercel_and_gcp_integration/image_9.png)

# Vercel

When you create long-lived, persistent credentials in your backend to allow access from your web applications, you increase the security risk of these credentials being leaked and hacked. You can mitigate this risk with OpenID Connect (OIDC) federation which issues short-lived, non-persistent tokens that are signed by Vercel's OIDC Identity Provider (IdP).

Cloud providers such as Amazon Web Services, Google Cloud Platform, and Microsoft Azure can trust these tokens and exchange them for short-lived credentials. This way, you can avoid storing long-lived credentials as Vercel environment variables.

vercel specify how you must integrate gcp with their host in https://vercel.com/docs/security/secure-backend-access/oidc/gcp

Basically, you should create an identity pool pointing to their identity. 

in the vercel project dashboard you can get the oidc credentials: https://vercel.com/your-account/your-project/settings/security

![alt text](/docs/assets/vercel_and_gcp_integration/image_10.png)

the `audience`, `subject` and `issuer` must be properly configured in GCP.

This is my pool configuration: 

![alt text](/docs/assets/vercel_and_gcp_integration/image_11.png)

![alt text](/docs/assets/vercel_and_gcp_integration/image_12.png)

## Service Account Roles

Since you created the service account following the Vercel guide, it won't function correctly if the appropriate roles are not assigned.

You need two essential roles: DocumentAI API, which allows you to list processors and process documents using DocumentAI, and Service Account Token Creator, which enables the generation of OIDC tokens.

However, you can't use the default DocumentAI API role because it lacks the necessary documentai.processors.list permission and includes the excessive human review permission that we don't need.

Therefore, the best practice is to create a custom role:

![alt text](/docs/assets/vercel_and_gcp_integration/image_13.png)

Make sure to set the `Role Launch Stage` to `General Availability`; otherwise, you won't be able to attach it to the Vercel service account.

Finally, just assign the roles in the `IAM` screen:

![alt text](/docs/assets/vercel_and_gcp_integration/image_14.png)

![alt text](/docs/assets/vercel_and_gcp_integration/image_15.png)


It's worth checking if the service account `principal` has the correct Vercel configuration values.

![alt text](/docs/assets/vercel_and_gcp_integration/image_16.png)

# References: 

1. https://developers.google.com/identity/openid-connect/openid-connect
2. https://openid.net/developers/how-connect-works/
3. https://vercel.com/docs/security/secure-backend-access/oidc
4. https://vercel.com/docs/security/secure-backend-access/oidc/gcp
5. https://cloud.google.com/docs/authentication/provide-credentials-adc
6. https://googleapis.dev/python/google-auth/2.6.6/reference/google.auth.identity_pool.html
7. https://cloud.google.com/iam/docs/workload-identity-federation-with-other-clouds
8. https://vercel.com/changelog/oidc-federation-now-available-in-beta
9. https://vercel.com/blog/enhancing-security-of-backend-connectivity-with-openid-connect
10. https://cloud.google.com/iam/docs/service-account-permissions
11. https://www.googlecloudcommunity.com/gc/Serverless/Error-Code-403-Permission-iam-serviceAccounts-getAccessToken/td-p/717693
12. https://cloud.google.com/iam/docs/manage-access-service-accounts#iam-view-access-sa-console