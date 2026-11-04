
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  StatusBar,
  Platform,
  useWindowDimensions,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

type Tela =
  | "Início"
  | "Categorias"
  | "Ofertas"
  | "Favoritos"
  | "Carrinho"
  | "Perfil";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  imagem: string;
};

type ItemCarrinho = {
  id: string;
  produtoId: number;
  tamanho: number;
  quantidade: number;
};

type Perfil = {
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
};

type Pagamento = "Pix" | "Crédito" | "Débito" | "Boleto";

const LARANJA = "#FF7417";
const FUNDO = "#FFFCF8";
const TEXTO = "#452719";
const TURQUESA = "#119C9D";

const TAMANHOS = Array.from(
  { length: 14 },
  (_, i) => i + 1
);

const produtos: Produto[] = [
  {
    id: 1,
    nome: "Vestido Floral",
    preco: 89.9,
    categoria: "Meninas",
    imagem:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500",
  },
  {
    id: 2,
    nome: "Conjunto Infantil",
    preco: 119.9,
    categoria: "Meninos",
    imagem:
      "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=500",
  },
  {
    id: 3,
    nome: "Macacão Baby",
    preco: 69.9,
    categoria: "Bebês",
    imagem:
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500",
  },
  {
    id: 4,
    nome: "Camiseta Colorida",
    preco: 49.9,
    categoria: "Unissex",
    imagem:
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500",
  },
  {
    id: 5,
    nome: "Jardineira Infantil",
    preco: 99.9,
    categoria: "Unissex",
    imagem:
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500",
  },
  {
    id: 6,
    nome: "Vestido de Verão",
    preco: 79.9,
    categoria: "Meninas",
    imagem:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500",
  },
  {
    id: 7,
    nome: "Conjunto Casual",
    preco: 109.9,
    categoria: "Meninos",
    imagem:
      "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=500",
  },
  {
    id: 8,
    nome: "Look Baby",
    preco: 59.9,
    categoria: "Bebês",
    imagem:
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500",
  },
];

const categorias = [
  { nome: "Meninas", cor: "#FFDDE5", icone: "heart-outline" },
  { nome: "Meninos", cor: "#D8F1F9", icone: "star-outline" },
  { nome: "Bebês", cor: "#FFF0BB", icone: "happy-outline" },
  { nome: "Unissex", cor: "#DDF4E5", icone: "color-palette-outline" },
] as const;

const perfilInicial: Perfil = {
  nome: "",
  telefone: "",
  email: "",
  endereco: "",
  numero: "",
  bairro: "",
  cidade: "",
  estado: "",
  cep: "",
};

const moeda = (valor: number) =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default function App() {
  const { width } = useWindowDimensions();

  const [tela, setTela] = useState<Tela>("Início");
  const [categoria, setCategoria] = useState("Todas");
  const [busca, setBusca] = useState("");
  const [pesquisando, setPesquisando] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [mostrarMais, setMostrarMais] = useState(false);

  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [perfil, setPerfil] = useState<Perfil>(perfilInicial);
  const [tamanhos, setTamanhos] = useState<Record<number, number>>({});
  const [pagamento, setPagamento] = useState<Pagamento>("Pix");
  const [carregado, setCarregado] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const larguraBanner = Math.max(0, Math.min(width, 900) - 32);
  const alturaBanner = larguraBanner * (1024 / 1600);

  // PERSISTÊNCIA

  useEffect(() => {
    async function carregarDados() {
      try {
        const dados = await AsyncStorage.multiGet([
          "@rabisco:carrinho",
          "@rabisco:favoritos",
          "@rabisco:perfil",
        ]);

        const carrinhoSalvo = dados[0][1];
        const favoritosSalvos = dados[1][1];
        const perfilSalvo = dados[2][1];

        if (favoritosSalvos) {
          const lista = JSON.parse(favoritosSalvos);
          if (Array.isArray(lista)) setFavoritos(lista);
        }

        if (perfilSalvo) {
          setPerfil({
            ...perfilInicial,
            ...JSON.parse(perfilSalvo),
          });
        }

        if (carrinhoSalvo) {
          const lista = JSON.parse(carrinhoSalvo);

          if (Array.isArray(lista)) {
            const itens: ItemCarrinho[] = [];

            lista.forEach((item: any) => {
              // Compatibilidade com o carrinho antigo
              if (typeof item === "number") {
                const chave = `${item}-1`;
                const existente = itens.find(
                  (i) => i.id === chave
                );

                if (existente) {
                  existente.quantidade += 1;
                } else {
                  itens.push({
                    id: chave,
                    produtoId: item,
                    tamanho: 1,
                    quantidade: 1,
                  });
                }
              } else if (
                item &&
                typeof item.produtoId === "number"
              ) {
                const tamanho = Number(item.tamanho) || 1;
                const chave = `${item.produtoId}-${tamanho}`;
                const existente = itens.find(
                  (i) => i.id === chave
                );
                const quantidade = Math.max(
                  1,
                  Number(item.quantidade) || 1
                );

                if (existente) {
                  existente.quantidade += quantidade;
                } else {
                  itens.push({
                    id: chave,
                    produtoId: item.produtoId,
                    tamanho,
                    quantidade,
                  });
                }
              }
            });

            setCarrinho(itens);
          }
        }
      } catch (erro) {
        setMensagem("Não foi possível carregar os dados salvos.");
      } finally {
        setCarregado(true);
      }
    }

    carregarDados();
  }, []);

  useEffect(() => {
    if (!carregado) return;

    AsyncStorage.setItem(
      "@rabisco:carrinho",
      JSON.stringify(carrinho)
    ).catch(() => setMensagem("Erro ao salvar o carrinho."));
  }, [carrinho, carregado]);

  useEffect(() => {
    if (!carregado) return;

    AsyncStorage.setItem(
      "@rabisco:favoritos",
      JSON.stringify(favoritos)
    ).catch(() => setMensagem("Erro ao salvar os favoritos."));
  }, [favoritos, carregado]);

  // NAVEGAÇÃO

  function navegar(destino: Tela) {
    setTela(destino);
    setMenuAberto(false);
    setCategoria("Todas");
    setBusca("");
    setPesquisando(false);
  }

  // FAVORITOS

  function alternarFavorito(id: number) {
    if (!carregado) return;

    setFavoritos((atual) =>
      atual.includes(id)
        ? atual.filter((item) => item !== id)
        : [...atual, id]
    );
  }

  // TAMANHOS E CARRINHO

  function selecionarTamanho(id: number, tamanho: number) {
    setTamanhos((atual) => ({
      ...atual,
      [id]: tamanho,
    }));
  }

  function adicionarCarrinho(produto: Produto) {
    if (!carregado) return;

    const tamanho = tamanhos[produto.id];

    if (!tamanho) {
      setMensagem(
        `Selecione o tamanho de ${produto.nome} antes de adicionar.`
      );
      return;
    }

    const chave = `${produto.id}-${tamanho}`;

    setCarrinho((atual) => {
      const existente = atual.find((item) => item.id === chave);

      if (existente) {
        return atual.map((item) =>
          item.id === chave
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [
        ...atual,
        {
          id: chave,
          produtoId: produto.id,
          tamanho,
          quantidade: 1,
        },
      ];
    });

    setMensagem(
      `${produto.nome}, tamanho ${tamanho}, adicionado ao carrinho!`
    );
  }

  function alterarQuantidade(id: string, diferenca: number) {
    setCarrinho((atual) =>
      atual
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantidade: item.quantidade + diferenca,
              }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function removerCarrinho(id: string) {
    setCarrinho((atual) =>
      atual.filter((item) => item.id !== id)
    );
  }

  const quantidadeCarrinho = carrinho.reduce(
    (soma, item) => soma + item.quantidade,
    0
  );

  const total = carrinho.reduce((soma, item) => {
    const produto = produtos.find(
      (p) => p.id === item.produtoId
    );

    return soma + (produto?.preco || 0) * item.quantidade;
  }, 0);

  // PERFIL

  function atualizarPerfil(campo: keyof Perfil, valor: string) {
    setPerfil((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  }

  async function salvarPerfil() {
    if (!carregado) return;

    try {
      await AsyncStorage.setItem(
        "@rabisco:perfil",
        JSON.stringify(perfil)
      );

      setMensagem("Perfil salvo com sucesso!");
    } catch {
      setMensagem("Não foi possível salvar o perfil.");
    }
  }

  // FILTRO DE PRODUTOS

  const listaFiltrada = produtos.filter((produto) => {
    const nome = produto.nome.toLowerCase();
    const termo = busca.toLowerCase();

    const buscaOk = nome.includes(termo);
    const categoriaOk =
      categoria === "Todas" || produto.categoria === categoria;
    const favoritoOk =
      tela !== "Favoritos" || favoritos.includes(produto.id);

    const quantidadeOk =
      tela !== "Início" ||
      mostrarMais ||
      categoria !== "Todas" ||
      busca.trim() !== "" ||
      produto.id <= 4;

    return buscaOk && categoriaOk && favoritoOk && quantidadeOk;
  });

  // CARD DE PRODUTO

  function renderProduto(produto: Produto) {
    const favorito = favoritos.includes(produto.id);

    return (
      <View key={produto.id} style={styles.cardProduto}>
        <Image
          source={{ uri: produto.imagem }}
          style={styles.imagemProduto}
          resizeMode="cover"
        />

        <TouchableOpacity
          style={styles.botaoFavorito}
          onPress={() => alternarFavorito(produto.id)}
        >
          <Ionicons
            name={favorito ? "heart" : "heart-outline"}
            size={23}
            color={LARANJA}
          />
        </TouchableOpacity>

        <View style={styles.infoProduto}>
          <Text style={styles.etiqueta}>
            {produto.categoria}
          </Text>

          <Text style={styles.nomeProduto}>
            {produto.nome}
          </Text>

          <Text style={styles.preco}>
            {moeda(produto.preco)}
          </Text>

          <Text style={styles.labelTamanho}>
            Selecione o tamanho
          </Text>

          <View style={styles.gradeTamanhos}>
            {TAMANHOS.map((tamanho) => (
              <TouchableOpacity
                key={tamanho}
                style={[
                  styles.botaoTamanho,
                  tamanhos[produto.id] === tamanho &&
                    styles.tamanhoAtivo,
                ]}
                onPress={() =>
                  selecionarTamanho(produto.id, tamanho)
                }
              >
                <Text
                  style={[
                    styles.textoTamanho,
                    tamanhos[produto.id] === tamanho &&
                      styles.textoTamanhoAtivo,
                  ]}
                >
                  {tamanho}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.botaoAdicionar}
            onPress={() => adicionarCarrinho(produto)}
            disabled={!carregado}
          >
            <Ionicons
              name="cart-outline"
              size={17}
              color="#FFFFFF"
            />
            <Text style={styles.textoAdicionar}>
              Adicionar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function campoPerfil(
    titulo: string,
    campo: keyof Perfil,
    placeholder: string
  ) {
    return (
      <View style={styles.campoPerfil} key={campo}>
        <Text style={styles.labelPerfil}>{titulo}</Text>

        <TextInput
          style={styles.inputPerfil}
          value={perfil[campo]}
          onChangeText={(valor) =>
            atualizarPerfil(campo, valor)
          }
          placeholder={placeholder}
          placeholderTextColor="#A49790"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* CABEÇALHO */}

      <View style={styles.topo}>
        <TouchableOpacity
          onPress={() => setMenuAberto(!menuAberto)}
          style={styles.acaoTopo}
        >
          <Ionicons name="menu-outline" size={29} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoCircular}
          onPress={() => navegar("Início")}
        >
          <Image
            source={require("./assets/logo-rabisco.png.png")}
            style={styles.imagemLogo}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.acoesTopo}>
          <TouchableOpacity
            onPress={() => {
              setPesquisando(!pesquisando);
              if (tela === "Carrinho" || tela === "Perfil") {
                setTela("Início");
              }
            }}
          >
            <Ionicons
              name="search-outline"
              size={23}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navegar("Perfil")}>
            <Ionicons
              name="person-circle-outline"
              size={25}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navegar("Carrinho")}
            style={styles.iconeCarrinho}
          >
            <Ionicons
              name="cart-outline"
              size={26}
              color="white"
            />

            {quantidadeCarrinho > 0 && (
              <View style={styles.contador}>
                <Text style={styles.textoContador}>
                  {quantidadeCarrinho}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* MENU */}

      {menuAberto && (
        <View style={styles.menu}>
          {(
            [
              "Início",
              "Categorias",
              "Ofertas",
              "Favoritos",
              "Carrinho",
              "Perfil",
            ] as Tela[]
          ).map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.menuItem}
              onPress={() => navegar(item)}
            >
              <Text style={styles.menuTexto}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* PESQUISA */}

      {pesquisando && (
        <TextInput
          style={styles.pesquisa}
          placeholder="Pesquisar roupinhas..."
          value={busca}
          onChangeText={setBusca}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        {/* BANNER */}

        {tela === "Início" && (
          <View style={styles.bannerContainer}>
            <Image
              source={require("./assets/banner-rabisco.png.png")}
              style={{
                width: larguraBanner,
                height: alturaBanner,
              }}
              resizeMode="contain"
            />
          </View>
        )}

        {/* CATEGORIAS */}

        {(tela === "Início" || tela === "Categorias") && (
          <View style={styles.secao}>
            <Text style={styles.titulo}>
              Nossas categorias
            </Text>

            <View style={styles.gradeCategorias}>
              {categorias.map((item) => (
                <TouchableOpacity
                  key={item.nome}
                  style={[
                    styles.cardCategoria,
                    { backgroundColor: item.cor },
                    categoria === item.nome &&
                      styles.categoriaAtiva,
                  ]}
                  onPress={() =>
                    setCategoria(
                      categoria === item.nome
                        ? "Todas"
                        : item.nome
                    )
                  }
                >
                  <Ionicons
                    name={item.icone}
                    size={29}
                    color={TEXTO}
                  />
                  <Text style={styles.nomeCategoria}>
                    {item.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* PRODUTOS E FAVORITOS */}

        {tela !== "Carrinho" && tela !== "Perfil" && (
          <View style={styles.secao}>
            <Text style={styles.titulo}>
              {tela === "Favoritos"
                ? "Meus favoritos"
                : tela === "Ofertas"
                ? "Coleção em destaque"
                : "Coleção Rabisco"}
            </Text>

            <Text style={styles.descricao}>
              {tela === "Favoritos"
                ? "As roupinhas que você mais gostou."
                : "Escolha os favoritos dos pequenos."}
            </Text>

            <View style={styles.gradeProdutos}>
              {listaFiltrada.map(renderProduto)}
            </View>

            {listaFiltrada.length === 0 && (
              <View style={styles.estadoVazio}>
                <Ionicons
                  name={
                    tela === "Favoritos"
                      ? "heart-outline"
                      : "search-outline"
                  }
                  size={43}
                  color={LARANJA}
                />

                <Text style={styles.textoVazio}>
                  {tela === "Favoritos"
                    ? "Você ainda não adicionou roupas aos favoritos."
                    : "Nenhuma peça encontrada."}
                </Text>
              </View>
            )}

            {tela === "Início" &&
              categoria === "Todas" &&
              !busca && (
                <TouchableOpacity
                  style={styles.botaoMais}
                  onPress={() => setMostrarMais(!mostrarMais)}
                >
                  <Text style={styles.textoMais}>
                    {mostrarMais
                      ? "Ver menos peças"
                      : "Mais peças"}
                  </Text>
                  <Ionicons
                    name={
                      mostrarMais
                        ? "chevron-up"
                        : "chevron-down"
                    }
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              )}
          </View>
        )}

        {/* TELA EXCLUSIVA DO CARRINHO */}

        {tela === "Carrinho" && (
          <View style={styles.secao}>
            <Text style={styles.titulo}>
              Meu carrinho
            </Text>

            <Text style={styles.descricao}>
              Confira suas peças antes de finalizar.
            </Text>

            {carrinho.length === 0 ? (
              <View style={styles.estadoVazio}>
                <Ionicons
                  name="cart-outline"
                  size={48}
                  color={LARANJA}
                />
                <Text style={styles.textoVazio}>
                  Seu carrinho está vazio.
                </Text>

                <TouchableOpacity
                  style={styles.botaoMais}
                  onPress={() => navegar("Início")}
                >
                  <Text style={styles.textoMais}>
                    Ver produtos
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {carrinho.map((item) => {
                  const produto = produtos.find(
                    (p) => p.id === item.produtoId
                  );

                  if (!produto) return null;

                  return (
                    <View
                      key={item.id}
                      style={styles.itemCarrinho}
                    >
                      <Image
                        source={{ uri: produto.imagem }}
                        style={styles.fotoCarrinho}
                      />

                      <View style={styles.detalhesCarrinho}>
                        <Text style={styles.nomeProduto}>
                          {produto.nome}
                        </Text>

                        <Text style={styles.textoDetalhe}>
                          Tamanho: {item.tamanho} anos
                        </Text>

                        <Text style={styles.preco}>
                          {moeda(produto.preco)}
                        </Text>

                        <View style={styles.controlesQuantidade}>
                          <TouchableOpacity
                            style={styles.botaoQuantidade}
                            onPress={() =>
                              alterarQuantidade(item.id, -1)
                            }
                          >
                            <Ionicons
                              name="remove"
                              size={18}
                              color={TEXTO}
                            />
                          </TouchableOpacity>

                          <Text style={styles.quantidade}>
                            {item.quantidade}
                          </Text>

                          <TouchableOpacity
                            style={styles.botaoQuantidade}
                            onPress={() =>
                              alterarQuantidade(item.id, 1)
                            }
                          >
                            <Ionicons
                              name="add"
                              size={18}
                              color={TEXTO}
                            />
                          </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                          style={styles.removerItem}
                          onPress={() =>
                            removerCarrinho(item.id)
                          }
                        >
                          <Ionicons
                            name="trash-outline"
                            size={16}
                            color="#D9472B"
                          />
                          <Text style={styles.textoRemover}>
                            Remover
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}

                <View style={styles.resumoCarrinho}>
                  <Text style={styles.tituloResumo}>
                    Resumo do pedido
                  </Text>

                  <View style={styles.linhaTotal}>
                    <Text style={styles.textoDetalhe}>
                      Quantidade de peças
                    </Text>
                    <Text>{quantidadeCarrinho}</Text>
                  </View>

                  <View style={styles.linhaTotal}>
                    <Text style={styles.totalLabel}>
                      Total
                    </Text>
                    <Text style={styles.totalValor}>
                      {moeda(total)}
                    </Text>
                  </View>
                </View>

                {/* PAGAMENTO */}

                <View style={styles.pagamentoCard}>
                  <Text style={styles.tituloResumo}>
                    Forma de pagamento
                  </Text>

                  {(
                    [
                      ["Pix", "qr-code-outline"],
                      ["Crédito", "card-outline"],
                      ["Débito", "card-outline"],
                      ["Boleto", "document-text-outline"],
                    ] as const
                  ).map(([nome, icone]) => (
                    <TouchableOpacity
                      key={nome}
                      style={[
                        styles.opcaoPagamento,
                        pagamento === nome &&
                          styles.pagamentoAtivo,
                      ]}
                      onPress={() => setPagamento(nome)}
                    >
                      <Ionicons
                        name={icone}
                        size={22}
                        color={TURQUESA}
                      />

                      <Text style={styles.textoPagamento}>
                        {nome === "Crédito"
                          ? "Cartão de crédito"
                          : nome === "Débito"
                          ? "Cartão de débito"
                          : nome}
                      </Text>

                      <Ionicons
                        name={
                          pagamento === nome
                            ? "radio-button-on"
                            : "radio-button-off"
                        }
                        size={21}
                        color={LARANJA}
                      />
                    </TouchableOpacity>
                  ))}

                  <TouchableOpacity
                    style={styles.botaoFinalizar}
                    onPress={() =>
                      Alert.alert(
                        "Pedido demonstrativo",
                        `Total: ${moeda(total)}\nPagamento: ${pagamento}\n\nEsta versão não realiza cobranças reais.`
                      )
                    }
                  >
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={21}
                      color="white"
                    />
                    <Text style={styles.textoFinalizar}>
                      Finalizar pedido
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.avisoPagamento}>
                    Demonstração acadêmica. Nenhum pagamento
                    será processado.
                  </Text>
                </View>
              </>
            )}
          </View>
        )}

        {/* PERFIL */}

        {tela === "Perfil" && (
          <View style={styles.secao}>
            <Text style={styles.titulo}>
              Meu perfil
            </Text>

            <View style={styles.perfilCabecalho}>
              <Ionicons
                name="person-circle-outline"
                size={67}
                color={LARANJA}
              />
              <View>
                <Text style={styles.tituloResumo}>
                  {perfil.nome || "Meu cadastro"}
                </Text>
                <Text style={styles.textoDetalhe}>
                  Dados pessoais e endereço
                </Text>
              </View>
            </View>

            <View style={styles.formulario}>
              <Text style={styles.tituloResumo}>
                Dados pessoais
              </Text>

              {campoPerfil(
                "Nome completo",
                "nome",
                "Digite seu nome"
              )}

              {campoPerfil(
                "Telefone",
                "telefone",
                "(61) 99999-9999"
              )}

              {campoPerfil(
                "E-mail",
                "email",
                "seuemail@exemplo.com"
              )}

              <Text style={styles.tituloResumo}>
                Endereço
              </Text>

              {campoPerfil(
                "CEP",
                "cep",
                "00000-000"
              )}

              {campoPerfil(
                "Rua / Avenida",
                "endereco",
                "Nome da rua"
              )}

              {campoPerfil(
                "Número",
                "numero",
                "Número da residência"
              )}

              {campoPerfil(
                "Bairro",
                "bairro",
                "Seu bairro"
              )}

              {campoPerfil(
                "Cidade",
                "cidade",
                "Sua cidade"
              )}

              {campoPerfil(
                "Estado",
                "estado",
                "UF"
              )}

              <TouchableOpacity
                style={styles.botaoFinalizar}
                onPress={salvarPerfil}
              >
                <Ionicons
                  name="save-outline"
                  size={20}
                  color="white"
                />
                <Text style={styles.textoFinalizar}>
                  Salvar meu perfil
                </Text>
              </TouchableOpacity>

              <Text style={styles.avisoPagamento}>
                Seus dados são armazenados localmente
                neste dispositivo.
              </Text>
            </View>
          </View>
        )}

        {/* MENSAGEM */}

        {mensagem !== "" && (
          <TouchableOpacity
            style={styles.aviso}
            onPress={() => setMensagem("")}
          >
            <Text style={styles.avisoTexto}>
              {mensagem}
            </Text>
            <Ionicons
              name="close"
              size={18}
              color="#176A49"
            />
          </TouchableOpacity>
        )}

        <Text style={styles.rodape}>
          Rabisco — Liberdade em cada traço.
        </Text>
      </ScrollView>

      {/* NAVEGAÇÃO INFERIOR */}

      <View style={styles.navegacao}>
        {(
          [
            ["Início", "home-outline"],
            ["Categorias", "grid-outline"],
            ["Ofertas", "pricetag-outline"],
            ["Favoritos", "heart-outline"],
            ["Perfil", "person-outline"],
          ] as const
        ).map(([nome, icone]) => (
          <TouchableOpacity
            key={nome}
            style={[
              styles.navItem,
              tela === nome && styles.navAtivo,
            ]}
            onPress={() => navegar(nome)}
          >
            <Ionicons
              name={icone}
              size={23}
              color={tela === nome ? LARANJA : TEXTO}
            />

            <Text
              style={[
                styles.navTexto,
                tela === nome && { color: LARANJA },
              ]}
            >
              {nome}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FUNDO,
    paddingTop: Platform.OS === "web" ? 0 : 35,
  },

  topo: {
    backgroundColor: LARANJA,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  acaoTopo: {
    width: 70,
  },

  logoCircular: {
    width: 125,
    height: 125,
    borderRadius: 65,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "#FFCD43",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  imagemLogo: {
    width: "100%",
    height: "100%",
  },

  acoesTopo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },

  iconeCarrinho: {
    position: "relative",
    padding: 3,
  },

  contador: {
    position: "absolute",
    top: -7,
    right: -7,
    backgroundColor: "#FFCD43",
    minWidth: 19,
    height: 19,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  textoContador: {
    fontSize: 11,
    fontWeight: "bold",
    color: TEXTO,
  },

  menu: {
    backgroundColor: "white",
    paddingHorizontal: 16,
  },

  menuItem: {
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderColor: "#F2E5DC",
  },

  menuTexto: {
    color: TEXTO,
    fontSize: 15,
    fontWeight: "600",
  },

  pesquisa: {
    backgroundColor: "white",
    margin: 12,
    padding: 13,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EADBD0",
  },

  conteudo: {
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
    paddingBottom: 25,
  },

  bannerContainer: {
    margin: 16,
    borderRadius: 22,
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "#FFF5E8",
  },

  secao: {
    paddingHorizontal: 16,
    marginTop: 22,
  },

  titulo: {
    fontSize: 23,
    fontWeight: "900",
    color: TEXTO,
    marginBottom: 12,
  },

  descricao: {
    color: "#806E64",
    fontSize: 13,
    marginBottom: 16,
  },

  gradeCategorias: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 7,
  },

  cardCategoria: {
    width: "23%",
    borderRadius: 19,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 3,
  },

  categoriaAtiva: {
    borderWidth: 2,
    borderColor: LARANJA,
  },

  nomeCategoria: {
    color: TEXTO,
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 8,
  },

  gradeProdutos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  cardProduto: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 17,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F0E8E2",
    elevation: 2,
  },

  imagemProduto: {
    width: "100%",
    height: 165,
    backgroundColor: "#F6EAE1",
  },

  botaoFavorito: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  infoProduto: {
    padding: 11,
  },

  etiqueta: {
    backgroundColor: "#FFE0E6",
    color: "#B43F58",
    alignSelf: "flex-start",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: "hidden",
    fontSize: 11,
    marginBottom: 8,
  },

  nomeProduto: {
    color: TEXTO,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },

  preco: {
    color: "#E85B00",
    fontSize: 19,
    fontWeight: "900",
    marginVertical: 7,
  },

  labelTamanho: {
    color: TEXTO,
    fontSize: 12,
    fontWeight: "600",
    marginVertical: 8,
  },

  gradeTamanhos: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginBottom: 13,
  },

  botaoTamanho: {
    minWidth: 31,
    height: 30,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: "#E8D7CC",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFCF8",
  },

  tamanhoAtivo: {
    backgroundColor: LARANJA,
    borderColor: LARANJA,
  },

  textoTamanho: {
    color: TEXTO,
    fontSize: 11,
    fontWeight: "600",
  },

  textoTamanhoAtivo: {
    color: "white",
  },

  botaoAdicionar: {
    backgroundColor: LARANJA,
    paddingVertical: 12,
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  textoAdicionar: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },

  botaoMais: {
    backgroundColor: TURQUESA,
    borderRadius: 13,
    paddingVertical: 15,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },

  textoMais: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },

  estadoVazio: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 17,
    alignItems: "center",
    gap: 14,
    marginTop: 15,
  },

  textoVazio: {
    textAlign: "center",
    color: "#806E64",
    fontSize: 14,
  },

  itemCarrinho: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    gap: 15,
    borderWidth: 1,
    borderColor: "#F0E8E2",
  },

  fotoCarrinho: {
    width: 100,
    height: 120,
    borderRadius: 12,
    backgroundColor: "#F6EAE1",
  },

  detalhesCarrinho: {
    flex: 1,
  },

  textoDetalhe: {
    color: "#806E64",
    fontSize: 13,
    lineHeight: 21,
  },

  controlesQuantidade: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    marginTop: 8,
  },

  botaoQuantidade: {
    backgroundColor: "#FFF0E5",
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  quantidade: {
    fontSize: 15,
    fontWeight: "bold",
    color: TEXTO,
  },

  removerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },

  textoRemover: {
    color: "#D9472B",
    fontSize: 12,
    fontWeight: "600",
  },

  resumoCarrinho: {
    backgroundColor: "#FFF0E5",
    borderRadius: 17,
    padding: 20,
    marginTop: 15,
  },

  tituloResumo: {
    color: TEXTO,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  linhaTotal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: TEXTO,
  },

  totalValor: {
    fontSize: 23,
    fontWeight: "900",
    color: "#E85B00",
  },

  pagamentoCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 17,
    marginTop: 17,
  },

  opcaoPagamento: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EADBD0",
    borderRadius: 12,
    marginBottom: 10,
  },

  pagamentoAtivo: {
    borderColor: LARANJA,
    backgroundColor: "#FFF6ED",
  },

  textoPagamento: {
    flex: 1,
    fontSize: 14,
    color: TEXTO,
  },

  botaoFinalizar: {
    backgroundColor: TURQUESA,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 12,
  },

  textoFinalizar: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },

  avisoPagamento: {
    fontSize: 11,
    color: "#806E64",
    textAlign: "center",
    marginTop: 13,
    lineHeight: 18,
  },

  perfilCabecalho: {
    backgroundColor: "#FFF0E5",
    padding: 18,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 18,
  },

  formulario: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 17,
  },

  campoPerfil: {
    marginBottom: 15,
  },

  labelPerfil: {
    color: TEXTO,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 7,
  },

  inputPerfil: {
    borderWidth: 1,
    borderColor: "#EADBD0",
    backgroundColor: FUNDO,
    paddingHorizontal: 13,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 14,
    color: TEXTO,
  },

  aviso: {
    backgroundColor: "#DDF4E5",
    marginHorizontal: 16,
    marginTop: 15,
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  avisoTexto: {
    flex: 1,
    color: "#176A49",
    fontSize: 13,
    fontWeight: "600",
  },

  rodape: {
    textAlign: "center",
    color: "#806E64",
    fontSize: 12,
    marginVertical: 24,
  },

  navegacao: {
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#F0E6E0",
    paddingVertical: 9,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    borderRadius: 12,
  },

  navAtivo: {
    backgroundColor: "#FFF0E5",
  },

  navTexto: {
    fontSize: 10,
    color: TEXTO,
    fontWeight: "600",
    marginTop: 5,
  },
});
