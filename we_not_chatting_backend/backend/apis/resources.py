from typing import Optional

import nanoid
from fastapi import File, UploadFile, status, Path
from fastapi.responses import JSONResponse, FileResponse

from backend.database import Files
from backend.models import SimpleResponseModel
from backend.models.resources_model import UploadResourceResponseModel, UploadResourceDataModel
from backend.app import app


@app.put("/api/v1/resources")
async def upload_resources(file: UploadFile = File(...)):
    id = nanoid.generate(size=32)
    storage_name = nanoid.generate()

    f = open(f"resources/{storage_name}", "wb")
    content = await file.read()
    f.write(content)
    f.close()

    f_db = Files.create(id=id, storage_name=storage_name, file_name=file.filename, type=file.content_type)
    f_db.save()

    res = UploadResourceResponseModel(data=UploadResourceDataModel(file_id=storage_name))
    return JSONResponse(res.dict(), status_code=status.HTTP_201_CREATED)


@app.get("/api/v1/resources/{id}")
def get_resources(id: Optional[str] = Path(None)):

    file: Optional[Files] = Files.get_or_none(storage_name=id)
    if file is None:
        res = SimpleResponseModel(code=404, msg="File Not Found")
        return JSONResponse(res, status_code=status.HTTP_404_NOT_FOUND)

    return FileResponse(f"resources/{id}", media_type=file.type, filename=file.file_name)
