import json
from fastapi import UploadFile
from google.api_core.client_options import ClientOptions
from google.cloud import documentai
from config import config
from constants.errors_texts import INVALID_FILE_MIMETYPE
from google.cloud.documentai_v1 import Document


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

    opts = ClientOptions(
        api_endpoint=f"{config.G_DOCUMENT_AI_LOCATION}-documentai.googleapis.com"
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

    return json.loads(Document.to_json(document))
