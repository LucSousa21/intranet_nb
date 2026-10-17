from sqlalchemy import select
from models.models import Endereco, Unidade, UnidadeEndereco


def buscar_unidade_endereco(session, filial):
    """
    Busca as unidades e seus respectivos endereços no banco de dados.

    Retorna uma lista de dicionários contendo o nome e o tipo da unidade,
    além dos dados do endereço. Retorna uma lista vazia caso não existam
    resultados.
    """
    try:
        stmt = (
            select(
                Unidade.nome.label("unidade_nome"),
                Unidade.tipo_id.label("tipo_unidade_id"),
                Endereco.id.label("endereco_id"),
                Endereco.logradouro,
                Endereco.numero,
                Endereco.ponto_referencia,
                Endereco.bairro
            )
            .join(
                UnidadeEndereco,
                UnidadeEndereco.unidade_id == Unidade.id
            )
            .join(
                Endereco,
                UnidadeEndereco.endereco_id == Endereco.id
            )
            .where(Unidade.filial == filial)
        )

        resultados = session.execute(stmt).mappings().all()

        return [dict(resultado) for resultado in resultados]

    except Exception:
        raise