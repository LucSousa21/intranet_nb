from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.dabase import Base

class TipoUnidade(Base):
    __tablename__ = "tipo_unidade"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nome: Mapped[str] = mapped_column(String, unique=False, index=True)

class Unidade(Base):
    __tablename__ = "unidades"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nome: Mapped[str] = mapped_column(String, unique=True, index=True)
    tipo_id: Mapped[int] = mapped_column(Integer, ForeignKey("tipo_unidade.id"))

class UnidadeEndereco(Base):
    __tablename__ = "unidade_endereco"

    unidade_id: Mapped[int] = mapped_column(Integer, ForeignKey("unidades.id"),primary_key=True)
    endereco_id: Mapped[int] = mapped_column(Integer,  ForeignKey("enderecos.id"),primary_key=True)

class Endereco(Base):
    __tablename__ = "enderecos"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    logradouro: Mapped[str] = mapped_column(String, index=True)
    numero: Mapped[str] = mapped_column(String, index=True)
    ponto_referencia: Mapped[str] = mapped_column(String, index=True)

class Servico(Base):
    __tablename__ = "servicos"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    descricao: Mapped[str] = mapped_column(String, index=True)

