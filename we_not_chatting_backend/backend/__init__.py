from fastapi import FastAPI
import backend.database
from backend.database import *
from backend import cache
import backend.cache
from backend.cache import verification_cache

app = FastAPI()
