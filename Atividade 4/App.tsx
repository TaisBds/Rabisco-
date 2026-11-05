
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProdutoCard from "./src/components/ProdutoCard";
import {
  calcularSubtotal,
  calcularDesconto,
  calcularTotal,
  Produto,
} from "./src/services/carrinho";

type Aba = "carrinho" | "testes";

type ProdutoCatalogo = {
  id: number;
  nome: string;
  preco: number;
  icone: keyof typeof Ionicons.glyphMap;
};

const CORES = {
  laranja: "#FF7417",
  laranjaClaro: "#FFF0E5",
  azul: "#192942",
  verde: "#07877E",
  verdeClaro: "#E6F6F3",
  fundo: "#F7F8FB",
  branco: "#FFFFFF",
  cinza: "#697586",
  borda: "#E6EAF0",
};

const catalogo: ProdutoCatalogo[] = [
  {
    id: 1,
    nome: "Camiseta Colorida",
    preco: 49.9,
    icone: "shirt-outline",
  },
  {
    id: 2,
    nome: "Conjunto Infantil",
    preco: 89.9,
    icone: "color-palette-outline",
  },
  {
    id: 3,
    nome: "Short Infantil",
    preco: 39.9,
    icone: "layers-outline",
  },
  {
    id: 4,
    nome: "Vestido Estampado",
    preco: 79.9,
    icone: "sparkles-outline",
  },
];

const cenariosUnitarios = [
  "Cálculo correto do subtotal",
  "Aplicação de desconto de 10%",
  "Cálculo do total com desconto",
  "Carrinho vazio",
  "Validação de quantidade negativa",
  "Validação de preço negativo",
  "Validação de desconto acima de 100%",
];

const cenariosComponentes = [
  "Exibição do nome e preço",
  "Exibição da quantidade",
  "Acionamento do botão adicionar",
  "Acionamento do botão remover",
];

function moeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function CartaoResumo({
  titulo,
  valor,
  icone,
  cor,
}: {
  titulo: string;
  valor: string;
  icone: keyof typeof Ionicons.glyphMap;
  cor: string;
}) {
  return (
    <View style={styles.resumoCard}>
      <View style={[styles.resumoIcone, { backgroundColor: cor + "15" }]}>
        <Ionicons name={icone} size={22} color={cor} />
      </View>

      <Text style={styles.resumoTitulo}>{titulo}</Text>
      <Text style={styles.resumoValor}>{valor}</Text>
    </View>
  );
}

function PainelCenarios({
  titulo,
  descricao,
  cenarios,
  icone,
}: {
  titulo: string;
  descricao: string;
  cenarios: string[];
  icone: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={styles.painel}>
      <View style={styles.painelCabecalho}>
        <View style={styles.painelIcone}>
          <Ionicons name={icone} size={22} color={CORES.laranja} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.painelTitulo}>{titulo}</Text>
          <Text style={styles.painelDescricao}>{descricao}</Text>
        </View>
      </View>

      <View style={styles.cenariosLista}>
        {cenarios.map((cenario, indice) => (
          <View key={indice} style={styles.cenario}>
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color={CORES.verde}
            />
            <Text style={styles.cenarioTexto}>{cenario}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function App() {
  const { width } = useWindowDimensions();
  const duasColunas = width >= 1050;

  const [aba, setAba] = useState<Aba>("carrinho");
  const [quantidades, setQuantidades] = useState<Record<number, number>>({});
  const [desconto, setDesconto] = useState(10);

  const produtosCarrinho: Produto[] = useMemo(
    () =>
      catalogo.map((produto) => ({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: quantidades[produto.id] ?? 0,
      })),
    [quantidades]
  );

  const subtotal = useMemo(
    () =>
      produtosCarrinho.reduce(
        (soma, produto) =>
          soma + calcularSubtotal(produto.preco, produto.quantidade),
        0
      ),
    [produtosCarrinho]
  );

  const valorDesconto = calcularDesconto(subtotal, desconto);
  const total = calcularTotal(produtosCarrinho, desconto);

  const quantidadeTotal = produtosCarrinho.reduce(
    (soma, produto) => soma + produto.quantidade,
    0
  );

  function adicionar(id: number) {
    setQuantidades((anterior) => ({
      ...anterior,
      [id]: (anterior[id] ?? 0) + 1,
    }));
  }

  function remover(id: number) {
    setQuantidades((anterior) => ({
      ...anterior,
      [id]: Math.max(0, (anterior[id] ?? 0) - 1),
    }));
  }

  function limparCarrinho() {
    setQuantidades({});
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View style={styles.headerConteudo}>
          <View style={styles.marca}>
            <View style={styles.logo}>
              <Ionicons
                name="color-palette"
                size={25}
                color={CORES.branco}
              />
            </View>

            <View>
              <Text style={styles.logoTexto}>rabisco.</Text>
              <Text style={styles.logoSubtitulo}>Testing Lab</Text>
            </View>
          </View>

          <View style={styles.headerSelo}>
            <Ionicons
              name="flask-outline"
              size={17}
              color={CORES.verde}
            />
            <Text style={styles.headerSeloTexto}>Atividade 04</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudo}
      >
        <View style={styles.introducao}>
          <Text style={styles.eyebrow}>QUALIDADE DE SOFTWARE</Text>

          <Text style={styles.titulo}>Laboratório de Testes</Text>

          <Text style={styles.subtitulo}>
            Explore regras de negócio e interações de componentes
            em uma aplicação React Native.
          </Text>
        </View>

        <View style={styles.abas}>
          <TouchableOpacity
            style={[
              styles.abaBotao,
              aba === "carrinho" && styles.abaAtiva,
            ]}
            onPress={() => setAba("carrinho")}
          >
            <Ionicons
              name="bag-handle-outline"
              size={19}
              color={
                aba === "carrinho" ? CORES.branco : CORES.cinza
              }
            />
            <Text
              style={[
                styles.abaTexto,
                aba === "carrinho" && styles.abaTextoAtivo,
              ]}
            >
              Laboratório
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.abaBotao,
              aba === "testes" && styles.abaAtiva,
            ]}
            onPress={() => setAba("testes")}
          >
            <Ionicons
              name="checkmark-done-outline"
              size={19}
              color={aba === "testes" ? CORES.branco : CORES.cinza}
            />
            <Text
              style={[
                styles.abaTexto,
                aba === "testes" && styles.abaTextoAtivo,
              ]}
            >
              Testes automatizados
            </Text>
          </TouchableOpacity>
        </View>

        {aba === "carrinho" ? (
          <>
            <View style={styles.resumoGrid}>
              <CartaoResumo
                titulo="Produtos disponíveis"
                valor="04"
                icone="pricetags-outline"
                cor={CORES.laranja}
              />

              <CartaoResumo
                titulo="Itens no carrinho"
                valor={String(quantidadeTotal).padStart(2, "0")}
                icone="bag-outline"
                cor={CORES.azul}
              />

              <CartaoResumo
                titulo="Total calculado"
                valor={moeda(total)}
                icone="calculator-outline"
                cor={CORES.verde}
              />
            </View>

            <View
              style={[
                styles.layoutPrincipal,
                {
                  flexDirection: duasColunas ? "row" : "column",
                },
              ]}
            >
              <View style={styles.coluna}>
                <View style={styles.secaoCabecalho}>
                  <View>
                    <Text style={styles.secaoTitulo}>
                      Catálogo de produtos
                    </Text>
                    <Text style={styles.secaoDescricao}>
                      Utilize os controles para simular interações.
                    </Text>
                  </View>
                </View>

                {catalogo.map((produto) => (
                  <ProdutoCard
                    key={produto.id}
                    nome={produto.nome}
                    preco={produto.preco}
                    quantidade={quantidades[produto.id] ?? 0}
                    onAdicionar={() => adicionar(produto.id)}
                    onRemover={() => remover(produto.id)}
                  />
                ))}

                <View style={styles.observacao}>
                  <Ionicons
                    name="information-circle-outline"
                    size={22}
                    color={CORES.verde}
                  />
                  <Text style={styles.observacaoTexto}>
                    Os controles utilizam o mesmo componente
                    ProdutoCard empregado nos testes automatizados.
                  </Text>
                </View>
              </View>

              <View style={styles.coluna}>
                <View style={styles.painel}>
                  <View style={styles.painelCabecalho}>
                    <View style={styles.painelIcone}>
                      <Ionicons
                        name="receipt-outline"
                        size={22}
                        color={CORES.laranja}
                      />
                    </View>

                    <View>
                      <Text style={styles.painelTitulo}>
                        Resumo do carrinho
                      </Text>
                      <Text style={styles.painelDescricao}>
                        Cálculos utilizando funções testadas
                      </Text>
                    </View>
                  </View>

                  <View style={styles.linhaResumo}>
                    <Text style={styles.linhaRotulo}>Subtotal</Text>
                    <Text style={styles.linhaValor}>
                      {moeda(subtotal)}
                    </Text>
                  </View>

                  <Text style={styles.descontoTitulo}>
                    Aplicar desconto
                  </Text>

                  <View style={styles.descontoOpcoes}>
                    {[0, 5, 10, 15, 20].map((valor) => (
                      <TouchableOpacity
                        key={valor}
                        style={[
                          styles.descontoBotao,
                          desconto === valor &&
                            styles.descontoBotaoAtivo,
                        ]}
                        onPress={() => setDesconto(valor)}
                      >
                        <Text
                          style={[
                            styles.descontoTexto,
                            desconto === valor &&
                              styles.descontoTextoAtivo,
                          ]}
                        >
                          {valor}%
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.linhaResumo}>
                    <Text style={styles.linhaRotulo}>
                      Desconto ({desconto}%)
                    </Text>
                    <Text
                      style={[
                        styles.linhaValor,
                        { color: CORES.verde },
                      ]}
                    >
                      - {moeda(valorDesconto)}
                    </Text>
                  </View>

                  <View style={styles.totalBox}>
                    <Text style={styles.totalRotulo}>Total final</Text>
                    <Text style={styles.totalValor}>
                      {moeda(total)}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.limparBotao}
                    onPress={limparCarrinho}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={18}
                      color={CORES.cinza}
                    />
                    <Text style={styles.limparTexto}>
                      Limpar carrinho
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.observacao}>
                  <Ionicons
                    name="code-slash-outline"
                    size={22}
                    color={CORES.verde}
                  />
                  <Text style={styles.observacaoTexto}>
                    As funções calcularSubtotal, calcularDesconto e
                    calcularTotal possuem testes unitários com Jest.
                  </Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.resumoGrid}>
              <CartaoResumo
                titulo="Testes unitários"
                valor="07"
                icone="calculator-outline"
                cor={CORES.laranja}
              />

              <CartaoResumo
                titulo="Testes de componentes"
                valor="04"
                icone="layers-outline"
                cor={CORES.azul}
              />

              <CartaoResumo
                titulo="Cenários implementados"
                valor="11"
                icone="checkmark-done-outline"
                cor={CORES.verde}
              />
            </View>

            <View
              style={[
                styles.layoutPrincipal,
                {
                  flexDirection: duasColunas ? "row" : "column",
                },
              ]}
            >
              <View style={styles.coluna}>
                <PainelCenarios
                  titulo="Testes unitários"
                  descricao="Jest — funções do carrinho"
                  icone="calculator-outline"
                  cenarios={cenariosUnitarios}
                />
              </View>

              <View style={styles.coluna}>
                <PainelCenarios
                  titulo="Testes de componentes"
                  descricao="React Native Testing Library"
                  icone="layers-outline"
                  cenarios={cenariosComponentes}
                />
              </View>
            </View>

            <View style={styles.comandoPainel}>
              <View style={styles.comandoTituloLinha}>
                <Ionicons
                  name="terminal-outline"
                  size={23}
                  color={CORES.branco}
                />
                <Text style={styles.comandoTitulo}>
                  Executar os testes
                </Text>
              </View>

              <Text style={styles.comandoDescricao}>
                Abra o terminal na raiz do projeto e execute:
              </Text>

              <View style={styles.codigoBox}>
                <Text style={styles.codigoTexto}>
                  npx.cmd jest --runInBand
                </Text>
              </View>

              <Text style={styles.comandoNota}>
                Os 11 testes foram aprovados na execução realizada
                durante o desenvolvimento. Esta tela apresenta os
                cenários implementados e não executa o Jest.
              </Text>
            </View>
          </>
        )}

        <View style={styles.rodape}>
          <Text style={styles.rodapeTexto}>
            Rabisco Testing Lab — Atividade 04: Testes
          </Text>
          <Text style={styles.rodapeSubtexto}>
            React Native · Expo · TypeScript · Jest
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  header: {
    backgroundColor: CORES.branco,
    borderBottomWidth: 1,
    borderBottomColor: CORES.borda,
    paddingHorizontal: 24,
    paddingVertical: 15,
  },
  headerConteudo: {
    width: "100%",
    maxWidth: 1250,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  marca: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: CORES.laranja,
    alignItems: "center",
    justifyContent: "center",
  },
  logoTexto: {
    color: CORES.azul,
    fontSize: 25,
    fontWeight: "900",
  },
  logoSubtitulo: {
    color: CORES.cinza,
    fontSize: 12,
    fontWeight: "600",
  },
  headerSelo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: CORES.verdeClaro,
  },
  headerSeloTexto: {
    color: CORES.verde,
    fontSize: 12,
    fontWeight: "700",
  },
  scroll: {
    flex: 1,
  },
  conteudo: {
    width: "100%",
    maxWidth: 1250,
    alignSelf: "center",
    padding: 22,
    paddingBottom: 40,
  },
  introducao: {
    marginBottom: 24,
    gap: 8,
  },
  eyebrow: {
    color: CORES.laranja,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  titulo: {
    color: CORES.azul,
    fontSize: 31,
    fontWeight: "900",
  },
  subtitulo: {
    color: CORES.cinza,
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 650,
  },
  abas: {
    flexDirection: "row",
    backgroundColor: CORES.branco,
    borderRadius: 15,
    padding: 5,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: CORES.borda,
    gap: 5,
  },
  abaBotao: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 13,
    paddingHorizontal: 8,
    borderRadius: 11,
  },
  abaAtiva: {
    backgroundColor: CORES.laranja,
  },
  abaTexto: {
    fontSize: 13,
    fontWeight: "700",
    color: CORES.cinza,
  },
  abaTextoAtivo: {
    color: CORES.branco,
  },
  resumoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 25,
  },
  resumoCard: {
    flexGrow: 1,
    flexBasis: 190,
    backgroundColor: CORES.branco,
    borderRadius: 17,
    padding: 20,
    borderWidth: 1,
    borderColor: CORES.borda,
    minWidth: 0,
  },
  resumoIcone: {
    width: 43,
    height: 43,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
  },
  resumoTitulo: {
    color: CORES.cinza,
    fontSize: 12,
    marginBottom: 6,
  },
  resumoValor: {
    color: CORES.azul,
    fontSize: 23,
    fontWeight: "900",
  },
  layoutPrincipal: {
    width: "100%",
    gap: 20,
    alignItems: "stretch",
  },
  coluna: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    minWidth: 0,
  },
  secaoCabecalho: {
    marginBottom: 15,
  },
  secaoTitulo: {
    color: CORES.azul,
    fontSize: 20,
    fontWeight: "800",
  },
  secaoDescricao: {
    color: CORES.cinza,
    fontSize: 13,
    marginTop: 5,
  },
  painel: {
    backgroundColor: CORES.branco,
    borderRadius: 17,
    padding: 22,
    borderWidth: 1,
    borderColor: CORES.borda,
    marginBottom: 15,
  },
  painelCabecalho: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 22,
  },
  painelIcone: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: CORES.laranjaClaro,
    alignItems: "center",
    justifyContent: "center",
  },
  painelTitulo: {
    color: CORES.azul,
    fontSize: 17,
    fontWeight: "800",
  },
  painelDescricao: {
    color: CORES.cinza,
    fontSize: 12,
    marginTop: 4,
  },
  linhaResumo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    gap: 12,
  },
  linhaRotulo: {
    color: CORES.cinza,
    fontSize: 14,
  },
  linhaValor: {
    color: CORES.azul,
    fontSize: 14,
    fontWeight: "700",
  },
  descontoTitulo: {
    color: CORES.azul,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 12,
  },
  descontoOpcoes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 22,
  },
  descontoBotao: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 9,
    backgroundColor: CORES.fundo,
    borderWidth: 1,
    borderColor: CORES.borda,
  },
  descontoBotaoAtivo: {
    backgroundColor: CORES.laranja,
    borderColor: CORES.laranja,
  },
  descontoTexto: {
    color: CORES.cinza,
    fontWeight: "700",
    fontSize: 13,
  },
  descontoTextoAtivo: {
    color: CORES.branco,
  },
  totalBox: {
    backgroundColor: CORES.verdeClaro,
    borderRadius: 13,
    padding: 19,
    marginTop: 5,
    marginBottom: 16,
  },
  totalRotulo: {
    color: CORES.verde,
    fontSize: 12,
    fontWeight: "700",
  },
  totalValor: {
    color: CORES.verde,
    fontSize: 29,
    fontWeight: "900",
    marginTop: 5,
  },
  limparBotao: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
  },
  limparTexto: {
    color: CORES.cinza,
    fontSize: 13,
    fontWeight: "700",
  },
  observacao: {
    backgroundColor: CORES.verdeClaro,
    borderRadius: 13,
    padding: 17,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 16,
  },
  observacaoTexto: {
    color: CORES.verde,
    fontSize: 12,
    lineHeight: 19,
    flex: 1,
  },
  cenariosLista: {
    gap: 15,
  },
  cenario: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cenarioTexto: {
    color: CORES.azul,
    fontSize: 13,
    flex: 1,
    lineHeight: 20,
  },
  comandoPainel: {
    backgroundColor: CORES.azul,
    borderRadius: 17,
    padding: 24,
    marginTop: 8,
  },
  comandoTituloLinha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  comandoTitulo: {
    color: CORES.branco,
    fontSize: 19,
    fontWeight: "800",
  },
  comandoDescricao: {
    color: "#CAD3E0",
    fontSize: 13,
    marginTop: 14,
    marginBottom: 14,
  },
  codigoBox: {
    backgroundColor: "#101D31",
    padding: 17,
    borderRadius: 10,
  },
  codigoTexto: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  comandoNota: {
    color: "#CAD3E0",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 15,
  },
  rodape: {
    marginTop: 35,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: CORES.borda,
    alignItems: "center",
    gap: 6,
  },
  rodapeTexto: {
    color: CORES.azul,
    fontSize: 12,
    fontWeight: "700",
  },
  rodapeSubtexto: {
    color: CORES.cinza,
    fontSize: 11,
  },
});
