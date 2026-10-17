from fastapi import FastAPI, APIRouter, Request, Depends
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from core.database import get_db
from service.unidade_endereco_serv import buscar_unidade_endereco

templates = Jinja2Templates(directory="templates")

app = FastAPI()
router = APIRouter()


@router.get("/")
def pagina_inicial(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="idex.html"
    )


def consultar_filial(filial: str, db: Session):
    return buscar_unidade_endereco(db, filial)


@router.get("/api-fortaleza")
def api_fortaleza(db: Session = Depends(get_db)):
    return consultar_filial("Fortaleza", db)


@router.get("/api-salvador")
def api_salvador(db: Session = Depends(get_db)):
    return consultar_filial("Salvador", db)


@router.get("/api-camacari")
def api_camacari(db: Session = Depends(get_db)):
    return consultar_filial("Camaçari", db)


@router.get("/api-lauro-de-freitas")
def api_lauro_de_freitas(db: Session = Depends(get_db)):
    return consultar_filial("Lauro de Freitas", db)


@router.get("/api-recife")
def api_recife(db: Session = Depends(get_db)):
    return consultar_filial("Recife", db)


@router.get("/api-manaus")
def api_manaus(db: Session = Depends(get_db)):
    return consultar_filial("Manaus", db)


@router.get("/api-belem")
def api_belem(db: Session = Depends(get_db)):
    return consultar_filial("Belém", db)


@router.get("/api-goiania")
def api_goiania(db: Session = Depends(get_db)):
    return consultar_filial("Goiânia", db)


app.include_router(router)
