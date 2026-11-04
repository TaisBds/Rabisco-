
import React, {
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  cor: string;
  icone: keyof typeof Ionicons.glyphMap;
};

type ModoLista = "ScrollView" | "FlatList";
type ModoRender = "normal" | "otimizado";
type Aba = "listas" | "renderizacao";

const LARANJA = "#FF7417";
const LARANJA_ESCURO = "#D85C0D";
const FUNDO = "#FFFCF8";
const TEXTO = "#192942";
const CINZA = "#667085";
const VERDE = "#07877E";

const CATALOGO = [
  {
    nome: "Camiseta Colorida",
    preco: 49.9,
    cor: "#FFE2D0",
    icone: "shirt-outline",
  },
  {
    nome: "Vestido Floral",
    preco: 79.9,
    cor: "#FCE2EE",
    icone: "flower-outline",
  },
  {
    nome: "Conjunto Infantil",
    preco: 89.9,
    cor: "#DDF3EF",
    icone: "layers-outline",
  },
  {
    nome: "Macacão Baby",
    preco: 69.9,
    cor: "#E7E2FF",
    icone: "happy-outline",
  },
  {
    nome: "Camiseta Aventura",
    preco: 54.9,
    cor: "#FFF0C6",
    icone: "sunny-outline",
  },
  {
    nome: "Shorts Conforto",
    preco: 39.9,
    cor: "#DCEEFF",
    icone: "color-palette-outline",
  },
  {
    nome: "Vestido Primavera",
    preco: 84.9,
    cor: "#FFE0EA",
    icone: "rose-outline",
  },
  {
    nome: "Conjunto Unissex",
    preco: 94.9,
    cor: "#DDF5DC",
    icone: "sparkles-outline",
  },
] as const;

// =====================================================
// GERAR PRODUTOS DEMONSTRATIVOS
// =====================================================

function criarProdutos(quantidade: number): Produto[] {
  return Array.from({ length: quantidade }, (_, index) => {
    const modelo = CATALOGO[index % CATALOGO.length];

    return {
      id: index + 1,
      nome: `${modelo.nome} ${
        Math.floor(index / CATALOGO.length) + 1
      }`,
      preco: modelo.preco,
      cor: modelo.cor,
      icone: modelo.icone,
    };
  });
}

function moeda(valor: number) {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

// =====================================================
// BOTÕES
// =====================================================

function Botao({
  titulo,
  ativo = false,
  onPress,
  icone,
}: {
  titulo: string;
  ativo?: boolean;
  onPress: () => void;
  icone?: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.botao,
        ativo && styles.botaoAtivo,
      ]}
    >
      {icone && (
        <Ionicons
          name={icone}
          size={17}
          color={ativo ? "#FFFFFF" : TEXTO}
        />
      )}

      <Text
        style={[
          styles.botaoTexto,
          ativo && styles.botaoTextoAtivo,
        ]}
      >
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

// =====================================================
// CARDS DE MÉTRICAS
// =====================================================

function CartaoMetrica({
  titulo,
  valor,
  icone,
  cor = LARANJA,
  fundo = "#FFF1E5",
}: {
  titulo: string;
  valor: string | number;
  icone: keyof typeof Ionicons.glyphMap;
  cor?: string;
  fundo?: string;
}) {
  return (
    <View
      style={[
        styles.metrica,
        { backgroundColor: fundo },
      ]}
    >
      <Ionicons
        name={icone}
        size={23}
        color={cor}
      />

      <Text style={styles.metricaTitulo}>
        {titulo}
      </Text>

      <Text
        style={[
          styles.metricaValor,
          { color: cor },
        ]}
      >
        {valor}
      </Text>
    </View>
  );
}

// =====================================================
// CARD DE PRODUTO
// =====================================================

function ProdutoCard({
  produto,
  mostrarRenderizacoes = false,
}: {
  produto: Produto;
  mostrarRenderizacoes?: boolean;
}) {
  const vezesRenderizado = useRef(0);

  vezesRenderizado.current += 1;

  return (
    <View style={styles.produtoCard}>
      <View
        style={[
          styles.produtoImagem,
          { backgroundColor: produto.cor },
        ]}
      >
        <Ionicons
          name={produto.icone}
          size={30}
          color={LARANJA}
        />
      </View>

      <View style={styles.produtoInformacoes}>
        <Text style={styles.produtoNome}>
          {produto.nome}
        </Text>

        <Text style={styles.produtoPreco}>
          {moeda(produto.preco)}
        </Text>

        <Text style={styles.produtoCodigo}>
          Produto {String(produto.id).padStart(2, "0")}
        </Text>
      </View>

      {mostrarRenderizacoes && (
        <View style={styles.renderBadge}>
          <Ionicons
            name="refresh-outline"
            size={15}
            color={VERDE}
          />

          <Text style={styles.renderBadgeTexto}>
            {vezesRenderizado.current}x
          </Text>
        </View>
      )}
    </View>
  );
}

const ProdutoMemo = memo(ProdutoCard);

// =====================================================
// TELA 1 - SCROLLVIEW VS FLATLIST
// =====================================================

function TelaListas() {
  const [quantidade, setQuantidade] = useState(100);

  const [modo, setModo] =
    useState<ModoLista>("FlatList");

  const produtos = useMemo(
    () => criarProdutos(quantidade),
    [quantidade]
  );

  const renderizarProduto = useCallback(
    ({ item }: { item: Produto }) => (
      <ProdutoMemo produto={item} />
    ),
    []
  );

  return (
    <View style={styles.tela}>
      <View style={styles.tituloLinha}>
        <Ionicons
          name="list-outline"
          size={27}
          color={LARANJA}
        />

        <Text style={styles.tituloSecao}>
          Otimização de listas
        </Text>
      </View>

      <Text style={styles.descricao}>
        Compare ScrollView e FlatList ao carregar
        diferentes quantidades de roupas infantis.
        Observe a fluidez da rolagem e o
        comportamento da interface.
      </Text>

      <View style={styles.painel}>
        <Text style={styles.campoTitulo}>
          Quantidade de produtos
        </Text>

        <View style={styles.grupoBotoes}>
          {[100, 500, 1000].map((valor) => (
            <Botao
              key={valor}
              titulo={String(valor)}
              ativo={quantidade === valor}
              onPress={() => setQuantidade(valor)}
            />
          ))}
        </View>

        <Text style={styles.campoTitulo}>
          Estratégia de renderização
        </Text>

        <View style={styles.grupoBotoes}>
          <Botao
            titulo="ScrollView"
            icone="reader-outline"
            ativo={modo === "ScrollView"}
            onPress={() => setModo("ScrollView")}
          />

          <Botao
            titulo="FlatList"
            icone="list-outline"
            ativo={modo === "FlatList"}
            onPress={() => setModo("FlatList")}
          />
        </View>

        <View style={styles.metricasLinha}>
          <CartaoMetrica
            titulo="Produtos"
            valor={quantidade}
            icone="shirt-outline"
          />

          <CartaoMetrica
            titulo="Estratégia"
            valor={modo}
            icone="layers-outline"
            cor={VERDE}
            fundo="#EAF7F2"
          />
        </View>
      </View>

      <View style={styles.infoBox}>
        <Ionicons
          name="information-circle-outline"
          size={21}
          color={LARANJA_ESCURO}
        />

        <Text style={styles.infoTexto}>
          {modo === "FlatList"
            ? "FlatList utiliza virtualização e renderização em lotes, evitando manter todos os itens montados ao mesmo tempo."
            : "ScrollView renderiza seus elementos filhos de uma vez. Com listas grandes, isso pode aumentar o trabalho inicial e o consumo de memória."}
        </Text>
      </View>

      <Text style={styles.listaTitulo}>
        Catálogo demonstrativo
      </Text>

      {modo === "FlatList" ? (
        <FlatList
          key={`flat-${quantidade}`}
          data={produtos}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderizarProduto}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={
            Platform.OS === "android"
          }
          contentContainerStyle={
            styles.listaConteudo
          }
          style={styles.listaRolavel}
        />
      ) : (
        <ScrollView
          key={`scroll-${quantidade}`}
          style={styles.listaRolavel}
          contentContainerStyle={
            styles.listaConteudo
          }
        >
          {produtos.map((produto) => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

// =====================================================
// EXPERIMENTO DE RENDERIZAÇÃO
// =====================================================

function ExperimentoRenderizacao({
  modo,
}: {
  modo: ModoRender;
}) {
  const [contador, setContador] = useState(0);

  const produtos = useMemo(
    () => criarProdutos(20),
    []
  );

  const otimizacaoAtiva =
    modo === "otimizado";

  const renderizacoesEsperadas =
    otimizacaoAtiva
      ? produtos.length
      : produtos.length * (contador + 1);

  return (
    <View style={styles.experimento}>
      <View style={styles.metricasLinha}>
        <CartaoMetrica
          titulo="Produtos"
          valor={produtos.length}
          icone="shirt-outline"
        />

        <CartaoMetrica
          titulo="Contador"
          valor={contador}
          icone="refresh-outline"
        />

        <CartaoMetrica
          titulo="Renderizações esperadas"
          valor={renderizacoesEsperadas}
          icone="analytics-outline"
          cor={VERDE}
          fundo="#EAF7F2"
        />
      </View>

      <TouchableOpacity
        style={styles.botaoPrincipal}
        activeOpacity={0.85}
        onPress={() =>
          setContador((anterior) => anterior + 1)
        }
      >
        <Ionicons
          name="add-circle-outline"
          size={23}
          color="#FFFFFF"
        />

        <Text style={styles.botaoPrincipalTexto}>
          Incrementar contador
        </Text>
      </TouchableOpacity>

      <View style={styles.explicacao}>
        <Ionicons
          name={
            otimizacaoAtiva
              ? "checkmark-circle-outline"
              : "alert-circle-outline"
          }
          size={23}
          color={
            otimizacaoAtiva
              ? VERDE
              : LARANJA_ESCURO
          }
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.explicacaoTitulo}>
            {otimizacaoAtiva
              ? "Com otimização"
              : "Sem otimização"}
          </Text>

          <Text style={styles.explicacaoTexto}>
            {otimizacaoAtiva
              ? "Os cards utilizam React.memo. Como suas propriedades não mudam quando o contador é incrementado, o React pode reutilizar a renderização anterior."
              : "Os cards não utilizam React.memo. Ao incrementar o contador, o componente pai é renderizado novamente e os cards também são executados."}
          </Text>
        </View>
      </View>

      <View style={styles.listaCabecalho}>
        <Text style={styles.listaTitulo}>
          Produtos monitorados
        </Text>

        <Text style={styles.listaSubtitulo}>
          20 produtos
        </Text>
      </View>

      {produtos.map((produto) =>
        otimizacaoAtiva ? (
          <ProdutoMemo
            key={produto.id}
            produto={produto}
            mostrarRenderizacoes
          />
        ) : (
          <ProdutoCard
            key={produto.id}
            produto={produto}
            mostrarRenderizacoes
          />
        )
      )}

      <View style={styles.nota}>
        <Ionicons
          name="flask-outline"
          size={20}
          color="#6652B8"
        />

        <Text style={styles.notaTexto}>
          O número de renderizações esperadas
          considera uma execução inicial por produto
          e uma execução adicional a cada incremento
          no modo sem otimização. Em desenvolvimento,
          o React pode executar renderizações extras.
          Os valores não medem tempo nem memória.
        </Text>
      </View>
    </View>
  );
}

// =====================================================
// TELA 2 - OTIMIZAÇÃO DE RENDERIZAÇÃO
// =====================================================

function TelaRenderizacao() {
  const [modo, setModo] =
    useState<ModoRender>("otimizado");

  const { width } = useWindowDimensions();

  const duasColunas = width >= 1100;

  return (
    <ScrollView
      style={styles.scrollPrincipal}
      contentContainerStyle={styles.renderTela}
    >
      <View style={styles.tituloLinha}>
        <Ionicons
          name="layers-outline"
          size={29}
          color={LARANJA}
        />

        <Text style={styles.tituloSecao}>
          Otimização de renderização
        </Text>
      </View>

      <Text style={styles.descricao}>
        Compare o comportamento dos mesmos cards
        de produtos com e sem React.memo. Observe
        quantas vezes eles são renderizados ao
        atualizar o contador.
      </Text>

      <View
        style={[
          styles.layoutExperimento,
          {
            flexDirection: duasColunas
              ? "row"
              : "column",
          },
        ]}
      >
        {/* COLUNA PRINCIPAL */}

        <View
          style={[
            styles.colunaPrincipal,
            !duasColunas && {
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: "auto",
              width: "100%",
            },
          ]}
        >
          <View style={styles.painel}>
            <View style={styles.grupoBotoes}>
              <Botao
                titulo="Sem otimização"
                icone="code-slash-outline"
                ativo={modo === "normal"}
                onPress={() => setModo("normal")}
              />

              <Botao
                titulo="Com React.memo"
                icone="layers-outline"
                ativo={modo === "otimizado"}
                onPress={() => setModo("otimizado")}
              />
            </View>

            <ExperimentoRenderizacao
              key={modo}
              modo={modo}
            />
          </View>
        </View>

        {/* CARDS EXPLICATIVOS */}

        <View
          style={[
            styles.colunaExplicativa,
            !duasColunas && {
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: "auto",
              width: "100%",
            },
          ]}
        >
          <View
            style={[
              styles.cardExplicativo,
              {
                backgroundColor: "#FFF2E9",
              },
            ]}
          >
            <View style={styles.cardTituloLinha}>
              <Ionicons
                name="help-circle-outline"
                size={25}
                color={LARANJA}
              />

              <Text style={styles.cardTitulo}>
                O que este teste mostra?
              </Text>
            </View>

            <Text style={styles.cardTexto}>
              Um card de produto é um componente
              React. Quando o contador muda, o
              componente pai é atualizado. O
              experimento mostra como React.memo
              pode evitar novas renderizações dos
              cards que recebem as mesmas
              propriedades.
            </Text>
          </View>

          <View
            style={[
              styles.cardExplicativo,
              {
                backgroundColor: "#EAF7F2",
              },
            ]}
          >
            <View style={styles.cardTituloLinha}>
              <Ionicons
                name="checkmark-circle-outline"
                size={25}
                color={VERDE}
              />

              <Text style={styles.cardTitulo}>
                Resultado esperado
              </Text>
            </View>

            <Text style={styles.cardTexto}>
              Sem otimização: os 20 cards são
              executados novamente após cada
              incremento.
            </Text>

            <Text
              style={[
                styles.cardTexto,
                { marginTop: 10 },
              ]}
            >
              Com React.memo: os cards podem
              manter a renderização anterior
              porque suas propriedades permanecem
              iguais.
            </Text>
          </View>

          <View
            style={[
              styles.cardExplicativo,
              {
                backgroundColor: "#F1EEFF",
              },
            ]}
          >
            <View style={styles.cardTituloLinha}>
              <Ionicons
                name="information-circle-outline"
                size={25}
                color="#6652B8"
              />

              <Text style={styles.cardTitulo}>
                Observação acadêmica
              </Text>
            </View>

            <Text style={styles.cardTexto}>
              A redução de renderizações não
              significa, automaticamente, uma
              redução mensurável de tempo. Para
              avaliar o desempenho real, são
              necessários testes controlados
              e ferramentas de profiling.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// =====================================================
// APLICATIVO PRINCIPAL
// =====================================================

export default function App() {
  const [aba, setAba] =
    useState<Aba>("renderizacao");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Image
          source={require(
            "./assets/logo-rabisco.png.png"
          )}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.headerTexto}>
          <Text style={styles.marca}>
            rabisco.
          </Text>

          <Text style={styles.headerSubtitulo}>
            Performance Lab
          </Text>
        </View>

        <View style={styles.headerIcone}>
          <Ionicons
            name="speedometer-outline"
            size={30}
            color="#FFFFFF"
          />
        </View>
      </View>

      <View style={styles.navegacao}>
        <Botao
          titulo="Listas"
          icone="grid-outline"
          ativo={aba === "listas"}
          onPress={() => setAba("listas")}
        />

        <Botao
          titulo="Renderização"
          icone="layers-outline"
          ativo={aba === "renderizacao"}
          onPress={() => setAba("renderizacao")}
        />
      </View>

      {aba === "listas" ? (
        <TelaListas />
      ) : (
        <TelaRenderizacao />
      )}
    </SafeAreaView>
  );
}

// =====================================================
// ESTILOS
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FUNDO,
  },

  header: {
    backgroundColor: LARANJA,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  logo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
  },

  headerTexto: {
    flex: 1,
  },

  marca: {
    fontSize: 29,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  headerSubtitulo: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  headerIcone: {
    padding: 8,
  },

  navegacao: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0E9E3",
  },

  botao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F1F3F7",
    borderRadius: 12,
  },

  botaoAtivo: {
    backgroundColor: LARANJA,
  },

  botaoTexto: {
    fontSize: 13,
    fontWeight: "700",
    color: TEXTO,
  },

  botaoTextoAtivo: {
    color: "#FFFFFF",
  },

  tela: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 20,
  },

  scrollPrincipal: {
    flex: 1,
  },

  renderTela: {
    padding: 20,
    paddingBottom: 40,
  },

  tituloLinha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },

  tituloSecao: {
    fontSize: 23,
    fontWeight: "900",
    color: TEXTO,
    flexShrink: 1,
  },

  descricao: {
    fontSize: 14,
    lineHeight: 22,
    color: CINZA,
    marginBottom: 20,
  },

  // RESPONSIVIDADE CORRIGIDA

  layoutExperimento: {
    gap: 18,
    alignItems: "stretch",
  },

  colunaPrincipal: {
    flexGrow: 2,
    flexShrink: 1,
    flexBasis: 0,
    minWidth: 0,
  },

  colunaExplicativa: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    gap: 14,
    minWidth: 0,
  },

  painel: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F0E9E3",
    marginBottom: 14,
  },

  campoTitulo: {
    fontSize: 14,
    fontWeight: "800",
    color: TEXTO,
    marginBottom: 10,
  },

  grupoBotoes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },

  experimento: {
    gap: 0,
  },

  metricasLinha: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },

  metrica: {
    flexGrow: 1,
    flexBasis: 130,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    paddingVertical: 17,
    paddingHorizontal: 10,
    minHeight: 110,
  },

  metricaTitulo: {
    fontSize: 12,
    color: TEXTO,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 6,
  },

  metricaValor: {
    fontSize: 24,
    fontWeight: "900",
    marginTop: 4,
    textAlign: "center",
  },

  botaoPrincipal: {
    backgroundColor: LARANJA,
    borderRadius: 13,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    marginBottom: 14,
  },

  botaoPrincipalTexto: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  explicacao: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#F7FAF9",
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
  },

  explicacaoTitulo: {
    fontWeight: "800",
    color: TEXTO,
    fontSize: 14,
    marginBottom: 4,
  },

  explicacaoTexto: {
    color: CINZA,
    fontSize: 12,
    lineHeight: 19,
  },

  listaCabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  listaTitulo: {
    fontSize: 17,
    fontWeight: "800",
    color: TEXTO,
    marginBottom: 10,
  },

  listaSubtitulo: {
    fontSize: 12,
    color: CINZA,
  },

  listaRolavel: {
    flex: 1,
  },

  listaConteudo: {
    paddingBottom: 28,
  },

  produtoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    padding: 11,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: "#EFE8E2",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  produtoImagem: {
    width: 62,
    height: 62,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  produtoInformacoes: {
    flex: 1,
  },

  produtoNome: {
    fontSize: 14,
    fontWeight: "800",
    color: TEXTO,
  },

  produtoPreco: {
    color: LARANJA_ESCURO,
    fontWeight: "800",
    marginTop: 3,
    fontSize: 13,
  },

  produtoCodigo: {
    fontSize: 11,
    color: CINZA,
    marginTop: 3,
  },

  renderBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#EAF7F2",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
  },

  renderBadgeTexto: {
    color: VERDE,
    fontSize: 13,
    fontWeight: "800",
  },

  cardExplicativo: {
    borderRadius: 16,
    padding: 18,
  },

  cardTituloLinha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },

  cardTitulo: {
    color: TEXTO,
    fontSize: 16,
    fontWeight: "800",
    flex: 1,
  },

  cardTexto: {
    fontSize: 13,
    color: "#344054",
    lineHeight: 21,
  },

  infoBox: {
    backgroundColor: "#FFF0E5",
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },

  infoTexto: {
    color: "#8C4C22",
    fontSize: 12,
    lineHeight: 19,
    flex: 1,
  },

  nota: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#F1EEFF",
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
  },

  notaTexto: {
    flex: 1,
    fontSize: 12,
    color: "#54458A",
    lineHeight: 19,
  },
});
