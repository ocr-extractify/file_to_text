FROM tiangolo/uvicorn-gunicorn-fastapi:python3.10 AS builder

WORKDIR /app/

COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY . /app

ENV GOOGLE_APPLICATION_CREDENTIALS /app/g_document_ai_creds.json
ENV MONGODB_URL mongodb://mongodb:27017

EXPOSE 8000

CMD ["fastapi", "run", "main.py", "--port", "8000"]