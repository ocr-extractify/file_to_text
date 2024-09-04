import os
from google.auth import external_account, exceptions

oidc_token: str | None = None


class CustomOIDCCredentials(external_account.Credentials):
    def retrieve_subject_token(self, request):
        # https://www.npmjs.com/package/@vercel/functions?activeTab=code
        try:
            env_token = os.getenv("VERCEL_OIDC_TOKEN")
            if env_token:
                return env_token

            if not oidc_token:
                raise ValueError(
                    "The 'x-vercel-oidc-token' header is missing from the request. Do you have the OIDC option enabled in the Vercel project settings?"
                )

            return oidc_token

        except Exception as e:
            raise exceptions.RefreshError(e, retryable=True)
