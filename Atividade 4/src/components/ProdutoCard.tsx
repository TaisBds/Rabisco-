
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type ProdutoCardProps = {
  nome: string;
  preco: number;
  quantidade: number;
  onAdicionar: () => void;
  onRemover: () => void;
};

export default function ProdutoCard({
  nome,
  preco,
  quantidade,
  onAdicionar,
  onRemover,
}: ProdutoCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.nome}>{nome}</Text>

        <Text style={styles.preco}>
          R$ {preco.toFixed(2).replace(".", ",")}
        </Text>
      </View>

      <View style={styles.controles}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Remover produto"
          onPress={onRemover}
          style={styles.botao}
          testID="botao-remover"
        >
          <Text style={styles.botaoTexto}>−</Text>
        </TouchableOpacity>

        <Text testID="quantidade-produto" style={styles.quantidade}>
          {quantidade}
        </Text>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Adicionar produto"
          onPress={onAdicionar}
          style={styles.botao}
          testID="botao-adicionar"
        >
          <Text style={styles.botaoTexto}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E8EAF0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: "700",
    color: "#192942",
  },
  preco: {
    fontSize: 15,
    color: "#07877E",
    marginTop: 6,
    fontWeight: "600",
  },
  controles: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  botao: {
    backgroundColor: "#FF7417",
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoTexto: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },
  quantidade: {
    fontSize: 17,
    fontWeight: "700",
    color: "#192942",
  },
});
