from redis import Redis


VERIFICATION_CODE_DATABASE_NUM = 0
AUTH_TOKEN_DATABASE_NUM = 1


verification_cache = Redis(host="127.0.0.1", db=VERIFICATION_CODE_DATABASE_NUM)
auth_token_cache = Redis(host="127.0.0.1", db=AUTH_TOKEN_DATABASE_NUM)
