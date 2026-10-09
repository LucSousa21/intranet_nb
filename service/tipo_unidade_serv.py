from sqlalchemy.orm import sessionmaker
from core.database import engine
from models.models import (
    TipoUnidade,
    Unidade,
    UnidadeEndereco,
    Endereco,
    Servico
)

Session = sessionmaker(bind=engine)
def cadastrar_TipoUnidade(session):
    nome = input("Informe o tipo de unidade: ").strip()
    if not nome:
        return "O nome do tipo de unidade não pode ficar vazio."
    nomeformatado = nome.capitalize()
    tipo_unidade = TipoUnidade(nome=nomeformatado)
    session.add(tipo_unidade)
    session.commit()
    session.refresh(tipo_unidade)

    return f"Tipo de unidade cadastrado {tipo_unidade.nome} com sucesso!"