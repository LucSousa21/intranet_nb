from sqlalchemy.orm import sessionmaker
from core.database import engine
from models.models import TipoUnidade

Session = sessionmaker(bind=engine)
"""
    Função que vai buscar todos os tipos de unidade cadastrados no banco de dados.
    Retorna uma lista de objetos TipoUnidade ou None se não houver tipos de unidade cadastrados
"""
def buscar_TipoUnidade(session):
    try:
        tipo_unidade = session.query(TipoUnidade).all()
        if not tipo_unidade:
            return "Nothing found"

        return tipo_unidade
    finally:
        session.close()
""" def cadastrar_TipoUnidade(session):
    nome = input("Informe o tipo de unidade: ").strip()
    if not nome:
        return "O nome do tipo de unidade não pode ficar vazio."
    nomeformatado = nome.capitalize()
    tipo_unidade = TipoUnidade(nome=nomeformatado)
    session.add(tipo_unidade)
    session.commit()
    session.close()

    return f"Tipo de unidade cadastrado {tipo_unidade.nome} com sucesso!" """