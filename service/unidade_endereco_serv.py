from sqlalchemy.orm import sessionmaker
from core.database import engine
from models.models import UnidadeEndereco

Session = sessionmaker(bind=engine)

"""
    Função que vai buscar todos os endereços de unidade cadastrados no banco de dados.
    Retorna uma lista de objetos UnidadeEndereco ou None se não houver endereços de unidade cadastrados
"""
def buscar_unidade_endereco(session):
    try:
        unidade_endereco = session.query(UnidadeEndereco).all()
        if not unidade_endereco:
            return None

        return unidade_endereco
    finally:
        session.close()