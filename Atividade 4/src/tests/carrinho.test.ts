
import {
  calcularSubtotal,
  calcularDesconto,
  calcularTotal,
} from "../services/carrinho";

describe("Testes unitários - Carrinho Rabisco", () => {
  test("calcula o subtotal corretamente", () => {
    expect(calcularSubtotal(49.9, 2)).toBe(99.8);
  });

  test("calcula desconto de 10%", () => {
    expect(calcularDesconto(100, 10)).toBe(10);
  });

  test("calcula total do carrinho com desconto", () => {
    const produtos = [
      {
        id: 1,
        nome: "Camiseta Infantil",
        preco: 50,
        quantidade: 2,
      },
      {
        id: 2,
        nome: "Short Infantil",
        preco: 40,
        quantidade: 1,
      },
    ];

    expect(calcularTotal(produtos, 10)).toBe(126);
  });

  test("retorna zero para carrinho vazio", () => {
    expect(calcularTotal([])).toBe(0);
  });

  test("impede quantidade negativa", () => {
    expect(() => calcularSubtotal(50, -1)).toThrow(
      "Quantidade inválida"
    );
  });

  test("impede preço negativo", () => {
    expect(() => calcularSubtotal(-10, 2)).toThrow(
      "Preço inválido"
    );
  });

  test("impede desconto acima de 100%", () => {
    expect(() => calcularDesconto(100, 110)).toThrow(
      "Percentual inválido"
    );
  });
});
