import json
import os
from fastapi import Request, UploadFile
from google.api_core.client_options import ClientOptions
from google.cloud import documentai_v1 as documentai
from config import config
from constants.errors_texts import INVALID_FILE_MIMETYPE

# from google.auth.transport.requests import AuthorizedSession
# import google.auth
from google.auth import identity_pool, exceptions, external_account


# class CustomSubjectTokenSupplier(identity_pool.SubjectTokenSupplier):
#     def get_subject_token(self, context, request):
#         audience = context.audience
#         subject_token_type = context.subject_token_type
#         try:
#             return os.getenv("VERCEL_OIDC_TOKEN")
#         except Exception as e:
#             # If token retrieval fails, raise a refresh error, setting retryable to true if the client should
#             # attempt to retrieve the subject token again.
#             raise exceptions.RefreshError(e, retryable=True)


# supplier = CustomSubjectTokenSupplier()
# credentials = identity_pool.Credentials(
#     # type="external_account"
#     audience=f"//iam.googleapis.com/projects/${os.getenv('GCP_PROJECT_NUMBER')}/locations/global/workloadIdentityPools/${os.getenv('GCP_WORKLOAD_IDENTITY_POOL_ID')}/providers/${os.getenv('GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID')}",  # Set GCP Audience.
#     token_url="https://sts.googleapis.com/v1/token",  # Set subject token type.
#     subject_token_type="urn:ietf:params:oauth:token-type:jwt",
#     subject_token_supplier=supplier,  # Set supplier.
#     # service_account_impersonation_url=f"https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${os.getenv('GCP_SERVICE_ACCOUNT_EMAIL')}:generateAccessToken",
#     # workforce_pool_user_project=os.getenv(
#     #     "GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID"
#     # ),  # Set workforce pool user project.
# )
import google.auth
from google.auth import external_account
from google.auth.transport import requests
import os


class CustomOIDCCredentials(external_account.Credentials):
    def __init__(self, oidc_token, *args, **kwargs):
        self.oidc_token = oidc_token
        super(CustomOIDCCredentials, self).__init__(*args, **kwargs)

    def retrieve_subject_token(self, request):
        # This code was developed based in vercel js lib: https://www.npmjs.com/package/@vercel/functions?activeTab=code
        try:
            env_token = os.getenv("VERCEL_OIDC_TOKEN")
            print("env_token: ", env_token)
            if env_token:
                return env_token

            print("vercel_oidc_token: ", self.oidc_token)
            return self.oidc_token
            # response = request(self._token_url)
            # response_headers = response.headers
            #  print("Response headers: ", response_headers)
            # token = response_headers.get("x-vercel-oidc-token")
            token = app.x_vercel_oidc_token
            print("Token: ", token)
            if not token:
                raise ValueError(
                    "The 'x-vercel-oidc-token' header is missing from the request. Do you have the OIDC option enabled in the Vercel project settings?"
                )
            return token

        except Exception as e:
            raise exceptions.RefreshError(e, retryable=True)


# creds = external_account.IdentityPoolCredentials(
#     audience=f"//iam.googleapis.com/projects/{os.getenv('GCP_PROJECT_NUMBER')}/locations/global/workloadIdentityPools/{os.getenv('GCP_WORKLOAD_IDENTITY_POOL_ID')}/providers/{os.getenv('GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID')}",
#     subject_token_type="urn:ietf:params:oauth:token-type:jwt",
#     token_url="https://sts.googleapis.com/v1/token",
#     subject_token_supplier=supplier,
#     service_account_impersonation_url=f"https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/{os.getenv('GCP_SERVICE_ACCOUNT_EMAIL')}:generateAccessToken",
# )


async def analyze_file(file: UploadFile, request: Request):
    """
    Extracts data from a file using Google Cloud Document AI.

    Args:
        file (bytes): The PDF file to extract data from.

    Returns:
        str: The extracted data from the PDF file.
    """
    # Instantiate your custom credentials
    print("headers: ", request.headers)
    if file.content_type not in config.VALID_MIMETYPES.split(","):
        raise TypeError(INVALID_FILE_MIMETYPE)

    creds = CustomOIDCCredentials(
        audience=f"//iam.googleapis.com/projects/{os.getenv('GCP_PROJECT_NUMBER')}/locations/global/workloadIdentityPools/{os.getenv('GCP_WORKLOAD_IDENTITY_POOL_ID')}/providers/{os.getenv('GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID')}",
        subject_token_type="urn:ietf:params:oauth:token-type:jwt",
        token_url="https://sts.googleapis.com/v1/token",
        service_account_impersonation_url=f"https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/{os.getenv('GCP_SERVICE_ACCOUNT_EMAIL')}:generateAccessToken",
        credential_source="https://iamcredentials.googleapis.com/v1",
        scopes=["https://www.googleapis.com/auth/cloud-platform"],
        oidc_token=request.headers.get("x_vercel_oidc_token"),
    )

    # Use the credentials to authenticate
    request = google.auth.transport.requests.Request()
    creds.refresh(request)

    # credentials, project = google.auth.default()
    opts = ClientOptions(
        api_endpoint=f"{config.G_DOCUMENT_AI_LOCATION}-documentai.googleapis.com",
    )
    client = documentai.DocumentProcessorServiceClient(client_options=opts)

    parent = client.common_location_path(
        config.G_DOCUMENT_AI_PROJECT_ID, config.G_DOCUMENT_AI_LOCATION
    )
    processor_list = client.list_processors(parent=parent)
    processor = next(
        filter(
            lambda v: v.display_name == config.G_DOCUMENT_AI_PROCESSOR, processor_list
        ),
        None,
    )

    raw_document = documentai.RawDocument(
        content=file.file.read(),
        mime_type=file.content_type,
    )

    request = documentai.ProcessRequest(name=processor.name, raw_document=raw_document)
    result = client.process_document(request=request)
    document = result.document

    return json.loads(documentai.Document.to_json(document))
