import os
from dotenv import load_dotenv

load_dotenv(override=True)

DATABASE_URL = os.getenv("SUPABASE_URL")

if not DATABASE_URL:
    raise ValueError(
        "SUPABASE_URL não foi definida no arquivo .env"
    )