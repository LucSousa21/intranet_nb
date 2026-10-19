
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from routes.routes import router

app = FastAPI(
    title="API de Endereços de Unidades",
    description="API para consulta de endereços das unidades da Hapvida",
    version="1.0.0",
    docs_url="/swagger",
    redoc_url="/redoc"
)

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Libera acesso de qualquer origem
    allow_credentials=False,
    allow_methods=["*"],  # Libera todos os métodos HTTP
    allow_headers=["*"],  # Libera todos os cabeçalhos
)

# Arquivos estáticos
app.mount("/static", StaticFiles(directory="static"), name="static")

# Registra as rotas
app.include_router(router)
