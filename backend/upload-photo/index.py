import json
import os
import uuid
import base64
import boto3

def handler(event: dict, context) -> dict:
    """Загружает фото работы мастера в S3 и возвращает публичный URL."""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    image_data = body.get("image")
    content_type = body.get("contentType", "image/jpeg")

    if not image_data:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "image is required"}),
        }

    # Декодируем base64 (убираем data URL префикс если есть)
    if "," in image_data:
        image_data = image_data.split(",", 1)[1]

    file_bytes = base64.b64decode(image_data)

    # Определяем расширение
    ext_map = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
        "image/gif": "gif",
    }
    ext = ext_map.get(content_type, "jpg")
    file_key = f"works/{uuid.uuid4()}.{ext}"

    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )

    s3.put_object(
        Bucket="files",
        Key=file_key,
        Body=file_bytes,
        ContentType=content_type,
    )

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/files/{file_key}"

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"url": cdn_url}),
    }
