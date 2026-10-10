from sqlalchemy.orm import sessionmaker
from core.database import engine
from models.models import Endereco

Session = sessionmaker(bind=engine)
"""
    Função que vai buscar todos os endereços cadastrados no banco de dados.
    Retorna uma lista de objetos Endereco ou None se não houver endereços cadastrados

"""
def buscar_endereco(session):
    try:
        endereco = session.query(Endereco).all()
        if not endereco:
            return None

        return endereco
    finally:
        session.close()