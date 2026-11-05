
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";

const COLORS = {
  orange: "#FF7417",
  orangeLight: "#FFF0E5",
  navy: "#192942",
  teal: "#07877E",
  background: "#F5F7FB",
  white: "#FFFFFF",
  text: "#27364B",
  muted: "#718096",
  border: "#E3E9F1",
  red: "#D94848",
  greenLight: "#E8F7F3",
};

const SESSION_KEY = "rabisco_demo_session";
const DEMO_EMAIL = "admin@rabisco.com";
const DEMO_PASSWORD = "Rabisco@123";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

type Session = {
  email: string;
  createdAt: string;
  token: string;
};

function createDemoSession(): Session {
  return {
    email: DEMO_EMAIL,
    createdAt: new Date().toISOString(),
    token: `demo-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  };
}

async function saveSession(session: Session) {
  const value = JSON.stringify(session);

  if (Platform.OS === "web") {
    // Apenas memória durante a execução da página.
    // Não há armazenamento seguro equivalente no Expo Web.
    return;
  }

  await SecureStore.setItemAsync(SESSION_KEY, value);
}

async function loadSession(): Promise<Session | null> {
  if (Platform.OS === "web") {
    return null;
  }

  const value = await SecureStore.getItemAsync(SESSION_KEY);

  if (!value) return null;

  try {
    const parsed = JSON.parse(value);

    if (
      typeof parsed.email !== "string" ||
      typeof parsed.createdAt !== "string" ||
      typeof parsed.token !== "string"
    ) {
      return null;
    }

    return parsed as Session;
  } catch {
    return null;
  }
}

async function deleteSession() {
  if (Platform.OS !== "web") {
    await SecureStore.deleteItemAsync(SESSION_KEY);
  }
}

function IconBox({
  name,
  color = COLORS.orange,
  background = COLORS.orangeLight,
}: {
  name: IconName;
  color?: string;
  background?: string;
}) {
  return (
    <View style={[styles.iconBox, { backgroundColor: background }]}>
      <Ionicons name={name} size={23} color={color} />
    </View>
  );
}

function StatusBadge({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) {
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: active
            ? COLORS.greenLight
            : COLORS.orangeLight,
        },
      ]}
    >
      <View
        style={[
          styles.statusDot,
          {
            backgroundColor: active
              ? COLORS.teal
              : COLORS.orange,
          },
        ]}
      />
      <Text
        style={[
          styles.badgeText,
          { color: active ? COLORS.teal : COLORS.orange },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: IconName;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.infoCard}>
      <IconBox name={icon} />
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoDescription}>{description}</Text>
    </View>
  );
}

export default function App() {
  const { width } = useWindowDimensions();
  const wide = width >= 900;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [selectedTab, setSelectedTab] = useState<
    "laboratorio" | "conceitos"
  >("laboratorio");

  useEffect(() => {
    let mounted = true;

    async function restore() {
      try {
        const saved = await loadSession();

        if (mounted) {
          setSession(saved);
        }
      } catch {
        if (mounted) {
          setMessage("Não foi possível recuperar a sessão.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    restore();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleLogin() {
    if (busy) return;

    setMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setMessage("Informe o e-mail e a senha.");
      return;
    }

    if (
      normalizedEmail !== DEMO_EMAIL ||
      password !== DEMO_PASSWORD
    ) {
      setFailedAttempts((current) => current + 1);
      setMessage("Credenciais inválidas. Tente novamente.");
      return;
    }

    setBusy(true);

    try {
      const newSession = createDemoSession();

      await saveSession(newSession);

      setSession(newSession);
      setPassword("");
      setFailedAttempts(0);
      setMessage("");
    } catch {
      setMessage("Não foi possível salvar a sessão com segurança.");
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    if (busy) return;

    setBusy(true);

    try {
      await deleteSession();

      setSession(null);
      setEmail("");
      setPassword("");
      setMessage("");
    } catch {
      Alert.alert(
        "Erro",
        "Não foi possível encerrar a sessão armazenada."
      );
    } finally {
      setBusy(false);
    }
  }

  const isAuthenticated = session !== null;
  const isNative = Platform.OS !== "web";

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.brand}>
              <View style={styles.brandIcon}>
                <Ionicons
                  name="shield-checkmark"
                  size={25}
                  color={COLORS.white}
                />
              </View>

              <View>
                <Text style={styles.brandName}>rabisco.</Text>
                <Text style={styles.brandSubtitle}>Security Lab</Text>
              </View>
            </View>

            <View style={styles.activityBadge}>
              <Text style={styles.activityText}>Atividade 05</Text>
            </View>
          </View>

          <View style={styles.hero}>
            <View style={styles.heroLabel}>
              <Ionicons
                name="shield-checkmark-outline"
                size={16}
                color={COLORS.orange}
              />
              <Text style={styles.heroLabelText}>
                SEGURANÇA EM APLICAÇÕES MÓVEIS
              </Text>
            </View>

            <Text style={styles.heroTitle}>
              Central de Segurança
            </Text>

            <Text style={styles.heroDescription}>
              Laboratório prático de autenticação, controle de
              acesso e armazenamento seguro de sessões.
            </Text>
          </View>

          <View style={styles.tabs}>
            <Pressable
              onPress={() => setSelectedTab("laboratorio")}
              style={[
                styles.tab,
                selectedTab === "laboratorio" && styles.activeTab,
              ]}
            >
              <Ionicons
                name="flask-outline"
                size={18}
                color={
                  selectedTab === "laboratorio"
                    ? COLORS.orange
                    : COLORS.muted
                }
              />
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "laboratorio" &&
                    styles.activeTabText,
                ]}
              >
                Laboratório
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSelectedTab("conceitos")}
              style={[
                styles.tab,
                selectedTab === "conceitos" && styles.activeTab,
              ]}
            >
              <Ionicons
                name="book-outline"
                size={18}
                color={
                  selectedTab === "conceitos"
                    ? COLORS.orange
                    : COLORS.muted
                }
              />
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "conceitos" &&
                    styles.activeTabText,
                ]}
              >
                Conceitos
              </Text>
            </Pressable>
          </View>

          {selectedTab === "laboratorio" ? (
            <>
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <IconBox name="person-circle-outline" />
                  <Text style={styles.statLabel}>Autenticação</Text>
                  <Text style={styles.statValue}>
                    {isAuthenticated ? "Ativa" : "Inativa"}
                  </Text>
                </View>

                <View style={styles.statCard}>
                  <IconBox
                    name="lock-closed-outline"
                    color={COLORS.teal}
                    background={COLORS.greenLight}
                  />
                  <Text style={styles.statLabel}>Área protegida</Text>
                  <Text style={styles.statValue}>
                    {isAuthenticated ? "Liberada" : "Bloqueada"}
                  </Text>
                </View>

                <View style={styles.statCard}>
                  <IconBox name="server-outline" />
                  <Text style={styles.statLabel}>Ambiente</Text>
                  <Text style={styles.statValue}>
                    {isNative ? "Mobile" : "Web"}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.mainGrid,
                  { flexDirection: wide ? "row" : "column" },
                ]}
              >
                <View style={styles.mainColumn}>
                  <View style={styles.panel}>
                    <View style={styles.panelHeader}>
                      <IconBox
                        name={
                          isAuthenticated
                            ? "checkmark-circle-outline"
                            : "log-in-outline"
                        }
                      />

                      <View style={styles.panelHeaderText}>
                        <Text style={styles.panelTitle}>
                          {isAuthenticated
                            ? "Sessão autenticada"
                            : "Acesso ao sistema"}
                        </Text>

                        <Text style={styles.panelSubtitle}>
                          {isAuthenticated
                            ? "Usuário autenticado no laboratório"
                            : "Entre para acessar a área restrita"}
                        </Text>
                      </View>
                    </View>

                    {loading ? (
                      <ActivityIndicator
                        color={COLORS.orange}
                        size="large"
                      />
                    ) : isAuthenticated ? (
                      <View style={styles.authenticatedContent}>
                        <StatusBadge
                          label="Acesso autorizado"
                          active
                        />

                        <View style={styles.detailBox}>
                          <Text style={styles.detailLabel}>
                            Usuário autenticado
                          </Text>
                          <Text style={styles.detailValue}>
                            {session.email}
                          </Text>
                        </View>

                        <View style={styles.detailBox}>
                          <Text style={styles.detailLabel}>
                            Início da sessão
                          </Text>
                          <Text style={styles.detailValue}>
                            {new Date(
                              session.createdAt
                            ).toLocaleString("pt-BR")}
                          </Text>
                        </View>

                        <Pressable
                          onPress={handleLogout}
                          disabled={busy}
                          style={[
                            styles.logoutButton,
                            busy && styles.disabledButton,
                          ]}
                        >
                          <Ionicons
                            name="log-out-outline"
                            size={19}
                            color={COLORS.red}
                          />
                          <Text style={styles.logoutText}>
                            Encerrar sessão
                          </Text>
                        </Pressable>
                      </View>
                    ) : (
                      <>
                        <Text style={styles.inputLabel}>
                          E-mail
                        </Text>

                        <View style={styles.inputWrapper}>
                          <Ionicons
                            name="mail-outline"
                            size={19}
                            color={COLORS.muted}
                          />

                          <TextInput
                            style={styles.input}
                            placeholder="Digite seu e-mail"
                            placeholderTextColor="#9BA6B5"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            testID="email-input"
                          />
                        </View>

                        <Text style={styles.inputLabel}>
                          Senha
                        </Text>

                        <View style={styles.inputWrapper}>
                          <Ionicons
                            name="key-outline"
                            size={19}
                            color={COLORS.muted}
                          />

                          <TextInput
                            style={styles.input}
                            placeholder="Digite sua senha"
                            placeholderTextColor="#9BA6B5"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                            testID="password-input"
                          />

                          <Pressable
                            onPress={() =>
                              setShowPassword((current) => !current)
                            }
                            accessibilityLabel={
                              showPassword
                                ? "Ocultar senha"
                                : "Mostrar senha"
                            }
                          >
                            <Ionicons
                              name={
                                showPassword
                                  ? "eye-off-outline"
                                  : "eye-outline"
                              }
                              size={20}
                              color={COLORS.muted}
                            />
                          </Pressable>
                        </View>

                        {!!message && (
                          <View style={styles.errorBox}>
                            <Ionicons
                              name="alert-circle-outline"
                              size={18}
                              color={COLORS.red}
                            />
                            <Text style={styles.errorText}>
                              {message}
                            </Text>
                          </View>
                        )}

                        <Pressable
                          style={[
                            styles.loginButton,
                            busy && styles.disabledButton,
                          ]}
                          disabled={busy}
                          onPress={handleLogin}
                          testID="login-button"
                        >
                          {busy ? (
                            <ActivityIndicator color="white" />
                          ) : (
                            <>
                              <Ionicons
                                name="log-in-outline"
                                size={20}
                                color="white"
                              />
                              <Text style={styles.loginText}>
                                Entrar no sistema
                              </Text>
                            </>
                          )}
                        </Pressable>

                        <View style={styles.demoCredentials}>
                          <Text style={styles.demoTitle}>
                            Credenciais de demonstração
                          </Text>
                          <Text style={styles.demoText}>
                            E-mail: {DEMO_EMAIL}
                          </Text>
                          <Text style={styles.demoText}>
                            Senha: {DEMO_PASSWORD}
                          </Text>
                          <Text style={styles.demoHint}>
                            Credenciais fictícias utilizadas
                            exclusivamente nesta POC.
                          </Text>
                        </View>
                      </>
                    )}
                  </View>
                </View>

                <View style={styles.mainColumn}>
                  <View style={styles.panel}>
                    <View style={styles.panelHeader}>
                      <IconBox
                        name="lock-closed-outline"
                        color={COLORS.teal}
                        background={COLORS.greenLight}
                      />

                      <View style={styles.panelHeaderText}>
                        <Text style={styles.panelTitle}>
                          Área restrita
                        </Text>

                        <Text style={styles.panelSubtitle}>
                          Demonstração de controle de acesso
                        </Text>
                      </View>
                    </View>

                    <StatusBadge
                      label={
                        isAuthenticated
                          ? "Acesso permitido"
                          : "Acesso negado"
                      }
                      active={isAuthenticated}
                    />

                    {isAuthenticated ? (
                      <View style={styles.protectedBox}>
                        <Ionicons
                          name="shield-checkmark"
                          size={35}
                          color={COLORS.teal}
                        />

                        <Text style={styles.protectedTitle}>
                          Bem-vindo à área protegida!
                        </Text>

                        <Text style={styles.protectedText}>
                          Este conteúdo só é exibido após a
                          autenticação no laboratório.
                        </Text>

                        <View style={styles.protectedFeature}>
                          <Ionicons
                            name="checkmark-circle"
                            size={18}
                            color={COLORS.teal}
                          />
                          <Text style={styles.featureText}>
                            Sessão demonstrativa ativa
                          </Text>
                        </View>

                        <View style={styles.protectedFeature}>
                          <Ionicons
                            name="checkmark-circle"
                            size={18}
                            color={COLORS.teal}
                          />
                          <Text style={styles.featureText}>
                            Conteúdo restrito liberado
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.lockedBox}>
                        <Ionicons
                          name="lock-closed"
                          size={42}
                          color={COLORS.muted}
                        />

                        <Text style={styles.lockedTitle}>
                          Conteúdo bloqueado
                        </Text>

                        <Text style={styles.lockedText}>
                          Realize o login para visualizar
                          as informações protegidas.
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.panel}>
                    <View style={styles.panelHeader}>
                      <IconBox name="analytics-outline" />

                      <View style={styles.panelHeaderText}>
                        <Text style={styles.panelTitle}>
                          Monitoramento
                        </Text>
                        <Text style={styles.panelSubtitle}>
                          Indicadores da sessão atual
                        </Text>
                      </View>
                    </View>

                    <View style={styles.monitorRow}>
                      <Text style={styles.monitorLabel}>
                        Tentativas inválidas
                      </Text>
                      <Text style={styles.monitorValue}>
                        {failedAttempts}
                      </Text>
                    </View>

                    <View style={styles.monitorRow}>
                      <Text style={styles.monitorLabel}>
                        Sessão armazenada
                      </Text>
                      <Text style={styles.monitorValue}>
                        {isAuthenticated
                          ? isNative
                            ? "SecureStore"
                            : "Memória"
                          : "Nenhuma"}
                      </Text>
                    </View>

                    <View style={styles.monitorRow}>
                      <Text style={styles.monitorLabel}>
                        Plataforma
                      </Text>
                      <Text style={styles.monitorValue}>
                        {Platform.OS.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.notice}>
                <Ionicons
                  name="information-circle-outline"
                  size={22}
                  color={COLORS.orange}
                />
                <Text style={styles.noticeText}>
                  Esta aplicação é uma POC acadêmica. A
                  autenticação é simulada localmente, sem
                  servidor, e não deve ser utilizada para
                  proteger dados reais. Em produção, a
                  validação de credenciais e a autorização
                  devem ocorrer no backend.
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.conceptsGrid}>
              <InfoCard
                icon="person-circle-outline"
                title="Autenticação"
                description="Processo de verificar a identidade de um usuário. Nesta POC, a validação é local e demonstrativa."
              />

              <InfoCard
                icon="lock-closed-outline"
                title="Controle de acesso"
                description="Restrição de funcionalidades conforme o estado da sessão. O painel protegido só aparece após o login."
              />

              <InfoCard
                icon="shield-checkmark-outline"
                title="Armazenamento seguro"
                description="No Android e iOS, o Expo SecureStore oferece armazenamento protegido para pequenos dados sensíveis, como tokens de sessão."
              />

              <InfoCard
                icon="globe-outline"
                title="Segurança no ambiente Web"
                description="O Expo SecureStore não fornece armazenamento seguro equivalente no navegador. Nesta POC, a sessão Web permanece apenas em memória."
              />

              <InfoCard
                icon="alert-circle-outline"
                title="Validação de entradas"
                description="Campos vazios e credenciais inválidas são identificados antes da criação da sessão demonstrativa."
              />

              <InfoCard
                icon="server-outline"
                title="Segurança em produção"
                description="Sistemas reais exigem backend, autenticação robusta, tokens validados pelo servidor, HTTPS e regras de autorização."
              />
            </View>
          )}

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Rabisco Security Lab · Atividade 05 — Segurança
            </Text>
            <Text style={styles.footerText}>
              React Native + Expo + TypeScript
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    width: "100%",
    maxWidth: 1250,
    alignSelf: "center",
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 36,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  brandIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: COLORS.orange,
    justifyContent: "center",
    alignItems: "center",
  },
  brandName: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.navy,
    letterSpacing: -1,
  },
  brandSubtitle: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: -2,
  },
  activityBadge: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: COLORS.orangeLight,
  },
  activityText: {
    color: COLORS.orange,
    fontSize: 12,
    fontWeight: "800",
  },
  hero: {
    marginBottom: 27,
  },
  heroLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 11,
  },
  heroLabelText: {
    color: COLORS.orange,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: COLORS.navy,
    letterSpacing: -1,
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 15,
    color: COLORS.muted,
    lineHeight: 23,
    maxWidth: 680,
  },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 25,
    gap: 25,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 5,
    paddingBottom: 15,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: COLORS.orange,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.muted,
  },
  activeTabText: {
    color: COLORS.orange,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginBottom: 22,
  },
  statCard: {
    flexGrow: 1,
    flexBasis: 180,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 19,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  iconBox: {
    width: 43,
    height: 43,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.muted,
    fontWeight: "600",
  },
  statValue: {
    fontSize: 21,
    color: COLORS.navy,
    fontWeight: "900",
  },
  mainGrid: {
    gap: 20,
    alignItems: "flex-start",
  },
  mainColumn: {
    flex: 1,
    width: "100%",
    gap: 20,
  },
  panel: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 23,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 16,
  },
  panelHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 5,
  },
  panelHeaderText: {
    flex: 1,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.navy,
  },
  panelSubtitle: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 4,
  },
  inputLabel: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: "700",
    marginBottom: -8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#F8FAFD",
    borderRadius: 12,
    paddingHorizontal: 13,
    height: 52,
    gap: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    color: COLORS.text,
    fontSize: 14,
    outlineStyle: "none",
  } as any,
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF0F0",
    borderRadius: 10,
    padding: 12,
    gap: 8,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    flex: 1,
  },
  loginButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: COLORS.orange,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 3,
  },
  disabledButton: {
    opacity: 0.6,
  },
  loginText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800",
  },
  demoCredentials: {
    backgroundColor: COLORS.orangeLight,
    borderRadius: 13,
    padding: 15,
    gap: 6,
  },
  demoTitle: {
    fontSize: 13,
    color: COLORS.orange,
    fontWeight: "900",
    marginBottom: 3,
  },
  demoText: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: "600",
  },
  demoHint: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
    lineHeight: 17,
  },
  authenticatedContent: {
    gap: 15,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 7,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "800",
  },
  detailBox: {
    backgroundColor: "#F8FAFD",
    padding: 14,
    borderRadius: 12,
    gap: 5,
  },
  detailLabel: {
    color: COLORS.muted,
    fontSize: 12,
  },
  detailValue: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: "800",
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: "#F4CDCD",
    borderRadius: 12,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  logoutText: {
    color: COLORS.red,
    fontSize: 14,
    fontWeight: "800",
  },
  lockedBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 34,
    gap: 12,
  },
  lockedTitle: {
    fontSize: 18,
    color: COLORS.navy,
    fontWeight: "900",
  },
  lockedText: {
    fontSize: 13,
    color: COLORS.muted,
    textAlign: "center",
    lineHeight: 21,
    maxWidth: 280,
  },
  protectedBox: {
    backgroundColor: "#F3FAF8",
    borderRadius: 15,
    padding: 20,
    alignItems: "flex-start",
    gap: 13,
  },
  protectedTitle: {
    color: COLORS.navy,
    fontSize: 17,
    fontWeight: "900",
  },
  protectedText: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  protectedFeature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  featureText: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: "600",
  },
  monitorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 13,
    gap: 12,
  },
  monitorLabel: {
    fontSize: 13,
    color: COLORS.muted,
    flex: 1,
  },
  monitorValue: {
    fontSize: 13,
    color: COLORS.navy,
    fontWeight: "800",
  },
  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 18,
    borderRadius: 15,
    backgroundColor: COLORS.orangeLight,
    marginTop: 22,
  },
  noticeText: {
    flex: 1,
    color: COLORS.text,
    fontSize: 12,
    lineHeight: 20,
  },
  conceptsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  infoCard: {
    flexGrow: 1,
    flexBasis: 290,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 22,
    gap: 12,
  },
  infoTitle: {
    fontSize: 17,
    color: COLORS.navy,
    fontWeight: "900",
  },
  infoDescription: {
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 21,
  },
  footer: {
    marginTop: 35,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  footerText: {
    color: COLORS.muted,
    fontSize: 11,
  },
});
