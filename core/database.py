
from .config import DATABASE_URL
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker


# Cria a engine responsável por gerenciar as conexões com o banco de dados.
engine = create_engine(DATABASE_URL)


# Configura a fábrica de sessões utilizadas para realizar operações no banco.
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# Classe base utilizada para declarar os modelos ORM da aplicação.
class Base(DeclarativeBase):
    pass


def get_db():
    """
    Gerencia o ciclo de vida da sessão do banco de dados.

    Disponibiliza uma sessão para quem precisar acessar o banco e garante
    seu fechamento ao final do uso, mesmo quando ocorre uma exceção.
    """
    db = SessionLocal()

    try:
        # Disponibiliza a sessão para a função ou rota que a utiliza.
        yield db
    finally:
        # Fecha a sessão e libera os recursos utilizados.
        db.close()