
export type Produto = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
};

export function calcularSubtotal(
  preco: number,
  quantidade: number
): number {
  if (!Number.isFinite(preco) || preco < 0) {
    throw new Error("Preço inválido");
  }

  if (!Number.isInteger(quantidade) || quantidade < 0) {
    throw new Error("Quantidade inválida");
  }

  return Number((preco * quantidade).toFixed(2));
}

export function calcularDesconto(
  subtotal: number,
  percentual: number
): number {
  if (!Number.isFinite(subtotal) || subtotal < 0) {
    throw new Error("Subtotal inválido");
  }

  if (
    !Number.isFinite(percentual) ||
    percentual < 0 ||
    percentual > 100
  ) {
    throw new Error("Percentual inválido");
  }

  return Number(
    (subtotal * (percentual / 100)).toFixed(2)
  );
}

export function calcularTotal(
  produtos: Produto[],
  percentualDesconto = 0
): number {
  const subtotal = produtos.reduce(
    (total, produto) =>
      total + calcularSubtotal(produto.preco, produto.quantidade),
    0
  );

  const desconto = calcularDesconto(
    subtotal,
    percentualDesconto
  );

  return Number((subtotal - desconto).toFixed(2));
}
