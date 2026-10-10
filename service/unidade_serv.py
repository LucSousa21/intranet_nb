from sqlalchemy.orm import sessionmaker
from core.database import engine
from models.models import Unidade

Session = sessionmaker(bind=engine)

"""
    Função que vai buscar todas as unidades cadastradas no banco de dados.
    Retorna uma lista de objetos Unidade ou None se não houver unidades cadastradas
"""
def buscar_unidade(session):
    try:
        unidade = session.query(Unidade).all()
        if not unidade:
            return "Nothing found"

        return unidade
    finally:
        session.close()
