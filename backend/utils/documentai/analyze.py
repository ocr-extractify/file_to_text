import json
from fastapi import UploadFile
from google.auth.transport.requests import Request
from google.auth.external_account import Credentials as ExternalAccountCredentials
from google.cloud import documentai_v1 as documentai
from google.api_core.client_options import ClientOptions
from config import config
from constants.errors_texts import INVALID_FILE_MIMETYPE
import os


async def analyze_file(file: UploadFile):
    """
    Extracts data from a file using Google Cloud Document AI.

    Args:
        file (bytes): The PDF file to extract data from.

    Returns:
        str: The extracted data from the PDF file.
    """
    if file.content_type not in config.VALID_MIMETYPES.split(","):
        raise TypeError(INVALID_FILE_MIMETYPE)

    # Load environment variables
    project_number = os.getenv("GCP_PROJECT_NUMBER")
    workload_identity_pool_id = os.getenv("GCP_WORKLOAD_IDENTITY_POOL_ID")
    workload_identity_pool_provider_id = os.getenv(
        "GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID"
    )
    service_account_email = os.getenv("GCP_SERVICE_ACCOUNT_EMAIL")

    # Set up the external account credentials
    audience = f"//iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{workload_identity_pool_id}/providers/{workload_identity_pool_provider_id}"
    service_account_impersonation_url = f"https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/{service_account_email}:generateAccessToken"

    credentials = ExternalAccountCredentials.from_info(
        {
            "type": "external_account",
            "audience": audience,
            "subject_token_type": "urn:ietf:params:oauth:token-type:jwt",
            "token_url": "https://sts.googleapis.com/v1/token",
            "service_account_impersonation_url": service_account_impersonation_url,
            "subject_token_supplier": {
                "getSubjectToken": lambda: get_vercel_oidc_token(),
            },
        }
    )

    credentials.refresh(Request())

    # Initialize the Document AI client with the external account credentials
    opts = ClientOptions(
        api_endpoint=f"{config.G_DOCUMENT_AI_LOCATION}-documentai.googleapis.com"
    )
    client = documentai.DocumentProcessorServiceClient(
        client_options=opts, credentials=credentials
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

    raw_document = documentai.RawDocument(
        content=file.file.read(),
        mime_type=file.content_type,
    )

    request = documentai.ProcessRequest(name=processor.name, raw_document=raw_document)
    result = client.process_document(request=request)
    document = result.document

    return json.loads(documentai.Document.to_json(document))


def get_vercel_oidc_token():
    """
    Fetch the OIDC token from Vercel environment.

    Returns:
        str: The OIDC token.
    """
    # vercel oidc token is an environment variable available in vercel runtime:
    # "getVercelOidcToken() returns the OIDC token from the VERCEL_OIDC_TOKEN environment variable in builds and local development environments or the x-vercel-oidc-token in serverless functions. (ref: https://vercel.com/docs/security/secure-backend-access/oidc/reference#helper-libraries)"
    token = os.getenv("VERCEL_OIDC_TOKEN")
    if not token:
        raise ValueError("OIDC token not found in environment variables")
    return token
