import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [lista, setLista] = useState([]);

  function adicionarItem() {
    if (item.trim() === '' || quantidade.trim() === '') {
      return;
    }

    const novoItem = {
      id: Date.now().toString(),
      nome: item.trim(),
      quantidade: quantidade.trim(),
    };

    setLista([...lista, novoItem]);

    setItem('');
    setQuantidade('');
  }

  function excluirItem(id) {
    const novaLista = lista.filter((item) => item.id !== id);
    setLista(novaLista);
  }

  return (
    <View style={styles.container}>

      {/* CABEÇALHO */}
      <View style={styles.header}>
        <Text style={styles.icone}>🛒</Text>

        <View>
          <Text style={styles.titulo}>
            Lista de Compras
          </Text>

          <Text style={styles.subtitulo}>
            Organize suas compras
          </Text>
        </View>
      </View>

      {/* ÁREA DE ADICIONAR */}
      <View style={styles.caixaAdicionar}>

        <TextInput
          style={styles.input}
          placeholder="Digite o item..."
          placeholderTextColor="#999"
          value={item}
          onChangeText={setItem}
        />

        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          placeholderTextColor="#999"
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={adicionarItem}
        >
          <Text style={styles.mais}>+</Text>

          <Text style={styles.textoBotao}>
            Adicionar
          </Text>
        </TouchableOpacity>

      </View>

      {/* CABEÇALHO DA LISTA */}
      <View style={styles.cabecalhoLista}>
        <Text style={styles.tituloLista}>
          Meus itens
        </Text>

        <View style={styles.contador}>
          <Text style={styles.textoContador}>
            {lista.length}
          </Text>
        </View>
      </View>

      {/* LISTA */}
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}

        ListEmptyComponent={
          <View style={styles.listaVazia}>
            <Text style={styles.iconeVazio}>🛍️</Text>

            <Text style={styles.textoVazio}>
              Sua lista está vazia
            </Text>

            <Text style={styles.subtextoVazio}>
              Adicione seu primeiro item acima
            </Text>
          </View>
        }

        renderItem={({ item, index }) => (
          <View style={styles.cardItem}>

            {/* NÚMERO */}
            <View style={styles.numero}>
              <Text style={styles.textoNumero}>
                {index + 1}
              </Text>
            </View>

            {/* INFORMAÇÕES */}
            <View style={styles.informacoes}>
              <Text style={styles.textoItem}>
                {item.nome}
              </Text>

              <Text style={styles.quantidade}>
                Quantidade: {item.quantidade}
              </Text>
            </View>

            {/* BOTÃO EXCLUIR */}
            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() => excluirItem(item.id)}
            >
              <Text style={styles.iconeExcluir}>
                🗑️
              </Text>
            </TouchableOpacity>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  /* CABEÇALHO */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  icone: {
    fontSize: 42,
    marginRight: 12,
  },

  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  subtitulo: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 3,
  },

  /* ÁREA DE ADICIONAR */

  caixaAdicionar: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 25,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 3,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    marginBottom: 10,
  },

  botao: {
    height: 50,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  mais: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 8,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  /* CABEÇALHO DA LISTA */

  cabecalhoLista: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  tituloLista: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  contador: {
    backgroundColor: '#DBEAFE',
    minWidth: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoContador: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontSize: 14,
  },

  /* ITEM */

  cardItem: {
    backgroundColor: '#FFFFFF',
    minHeight: 75,
    borderRadius: 12,
    marginBottom: 10,
    paddingHorizontal: 15,

    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,

    elevation: 2,
  },

  numero: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  textoNumero: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  informacoes: {
    flex: 1,
  },

  textoItem: {
    fontSize: 17,
    color: '#374151',
    fontWeight: 'bold',
  },

  quantidade: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },

  /* BOTÃO EXCLUIR */

  botaoExcluir: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  iconeExcluir: {
    fontSize: 19,
  },

  /* LISTA VAZIA */

  listaVazia: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },

  iconeVazio: {
    fontSize: 50,
    marginBottom: 15,
  },

  textoVazio: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },

  subtextoVazio: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 6,
  },

});