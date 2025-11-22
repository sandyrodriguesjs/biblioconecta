export interface Exemplar {
  codigo_exemplar: string;
  situacao: string; // exemplo: "disponivel", "reservado", "emprestado"
}

export interface Book {
  titulo: string;
  autor: string;
  isbn: string;
  editora: string;
  ano_publicacao: number;
  sinopse: string;
  categoria: string;
  capa_url?: string | null;

  id_livro: string;

  exemplares?: Exemplar[];
}
