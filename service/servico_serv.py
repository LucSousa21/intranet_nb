from sqlalchemy.orm import sessionmaker
from core.database import engine
from models.models import Servico

Session = sessionmaker(bind=engine)
"""
    Função que vai buscar todos os serviços cadastrados no banco de dados.
    Retorna uma lista de objetos Servico ou None se não houver serviços cadastrados

"""
def servico(session):
    try:
        servico = session.query(Servico).all()
        if not servico:
            return None

        return servico

    finally:
        session.close()