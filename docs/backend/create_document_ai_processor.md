Here you'll see how create your document AI processor at GCP.

1. Enable `Document AI Api` in google cloud.
    ![enable doc ai api](/docs/assets/create_document_ai_processor/image_1.png)
2. Create a `Document OCR` processor. Take care to choose the right one! These processors are pretty expensive.
    ![choose processor](/docs/assets/create_document_ai_processor/image_2.png)
3. Input the processor name and the region. 
    ![fill processor inputs](/docs/assets/create_document_ai_processor/image_3.png)
4. Go to the processor and store these keys: 
    ```bash
    G_DOCUMENT_AI_PROJECT_ID=XXXXXXXXXXX
    G_DOCUMENT_AI_LOCATION=us
    G_DOCUMENT_AI_PROCESSOR=XXXXXXXXXXX
    ```
    ![fill processor inputs](/docs/assets/create_document_ai_processor/image_4.png)