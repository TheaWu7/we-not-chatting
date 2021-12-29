from backend.app import app
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi import status
from backend.apis.common_response import MISSING_ARGS_RESPONSE


@app.exception_handler(RequestValidationError)
def handle_validation_error(_, __):
    return JSONResponse(MISSING_ARGS_RESPONSE)
