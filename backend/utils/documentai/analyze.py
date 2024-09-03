import json
import os
from fastapi import Request, UploadFile
from google.api_core.client_options import ClientOptions
from google.cloud import documentai_v1 as documentai
from config import config
from constants.errors_texts import INVALID_FILE_MIMETYPE
from google.auth import external_account, exceptions, transport
import os
from google.auth.transport.requests import AuthorizedSession

oidc_token: str | None = None


class CustomOIDCCredentials(external_account.Credentials):
    def retrieve_subject_token(self, request):
        # This code was developed based in vercel js lib: https://www.npmjs.com/package/@vercel/functions?activeTab=code
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


async def analyze_file(file: UploadFile, request: Request):
    """
    Extracts data from a file using Google Cloud Document AI.

    Args:
        file (bytes): The PDF file to extract data from.

    Returns:
        str: The extracted data from the PDF file.
    """
    if file.content_type not in config.VALID_MIMETYPES.split(","):
        raise TypeError(INVALID_FILE_MIMETYPE)

    global oidc_token
    oidc_token = request.headers.get("x-vercel-oidc-token")
    creds = CustomOIDCCredentials(
        audience=f"//iam.googleapis.com/projects/{os.getenv('GCP_PROJECT_NUMBER')}/locations/global/workloadIdentityPools/{os.getenv('GCP_WORKLOAD_IDENTITY_POOL_ID')}/providers/{os.getenv('GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID')}",
        subject_token_type="urn:ietf:params:oauth:token-type:jwt",
        token_url="https://sts.googleapis.com/v1/token",
        service_account_impersonation_url=f"https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/{os.getenv('GCP_SERVICE_ACCOUNT_EMAIL')}:generateAccessToken",
        # not used, but the external_account.Credentials don't mark it as optional
        credential_source=None,
        scopes=["https://www.googleapis.com/auth/cloud-platform"],
    )
    print("email: ", creds.service_account_email)
    # session = AuthorizedSession(creds)

    opts = ClientOptions(
        api_endpoint=f"{config.G_DOCUMENT_AI_LOCATION}-documentai.googleapis.com",
    )
    client = documentai.DocumentProcessorServiceClient(
        client_options=opts, credentials=creds
    )

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
    if not processor:
        raise LookupError("No processor")

    raw_document = documentai.RawDocument(
        content=file.file.read(), mime_type=file.content_type, creds=creds
    )

    documentai_request = documentai.ProcessRequest(
        name=processor.name, raw_document=raw_document, creds=creds
    )
    result = client.process_document(request=documentai_request)
    document = result.document

    return json.loads(documentai.Document.to_json(document))
