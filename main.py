
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from routes.routes import router

from fastapi import FastAPI

app = FastAPI(
    title="API de Endereços de Unidades",
    description="API para consulta de endereços das unidades da Hapvida",
    version="1.0.0",
    docs_url="/swagger",
    redoc_url="/redoc"
)

# Disponibiliza arquivos estáticos, como CSS, JavaScript e imagens.
app.mount("/static", StaticFiles(directory="static"), name="static")

# Registra as rotas da aplicação.
app.include_router(router)
