
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from routes.routes import router

app = FastAPI()

# Disponibiliza arquivos estáticos, como CSS, JavaScript e imagens.
app.mount("/static", StaticFiles(directory="static"), name="static")

# Registra as rotas da aplicação.
app.include_router(router)
