
import React from "react";
import {
  render,
  fireEvent,
  screen,
} from "@testing-library/react-native";

import ProdutoCard from "../components/ProdutoCard";

describe("Testes de componentes - ProdutoCard", () => {
  test("exibe nome e preço corretamente", () => {
    render(
      <ProdutoCard
        nome="Camiseta Infantil"
        preco={49.9}
        quantidade={1}
        onAdicionar={jest.fn()}
        onRemover={jest.fn()}
      />
    );

    expect(screen.getByText("Camiseta Infantil")).toBeTruthy();
    expect(screen.getByText("R$ 49,90")).toBeTruthy();
  });

  test("exibe a quantidade informada", () => {
    render(
      <ProdutoCard
        nome="Camiseta Infantil"
        preco={49.9}
        quantidade={2}
        onAdicionar={jest.fn()}
        onRemover={jest.fn()}
      />
    );

    expect(screen.getByTestId("quantidade-produto").props.children).toBe(2);
  });

  test("executa a ação de adicionar", () => {
    const adicionar = jest.fn();

    render(
      <ProdutoCard
        nome="Camiseta Infantil"
        preco={49.9}
        quantidade={1}
        onAdicionar={adicionar}
        onRemover={jest.fn()}
      />
    );

    fireEvent.press(screen.getByTestId("botao-adicionar"));

    expect(adicionar).toHaveBeenCalledTimes(1);
  });

  test("executa a ação de remover", () => {
    const remover = jest.fn();

    render(
      <ProdutoCard
        nome="Camiseta Infantil"
        preco={49.9}
        quantidade={1}
        onAdicionar={jest.fn()}
        onRemover={remover}
      />
    );

    fireEvent.press(screen.getByTestId("botao-remover"));

    expect(remover).toHaveBeenCalledTimes(1);
  });
});
