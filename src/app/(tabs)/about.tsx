import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <Ionicons name="musical-notes" size={64} color={Colors.primary} />
          <Text style={styles.appName}>Cânticos Espirituais IPB</Text>
          <Text style={styles.version}>Versão 2.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o Hinário</Text>
          <Text style={styles.sectionText}>
            Este aplicativo reúne os cânticos espirituais da Igreja Presbiteriana do Brasil (IPB),
            com 138 músicas do hinário oficial. Encontre, leia e compartilhe as letras de forma
            rápida e simples.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Funcionalidades</Text>
          <Text style={styles.bullet}>• Busca por título e letra das músicas</Text>
          <Text style={styles.bullet}>• Filtro por letra do alfabeto</Text>
          <Text style={styles.bullet}>• Favoritos com persistência entre sessões</Text>
          <Text style={styles.bullet}>• Histórico dos cânticos vistos recentemente</Text>
          <Text style={styles.bullet}>• Controle de tamanho de fonte na leitura</Text>
          <Text style={styles.bullet}>• Compartilhamento de letras</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contato</Text>
          <Text style={styles.sectionText}>Desenvolvido por Guilherme Studio</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Feito com ♥ para a Igreja Presbiteriana do Brasil
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: Colors.surface,
    marginBottom: 16,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  section: {
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
  },
  bullet: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 26,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  footerText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
})
