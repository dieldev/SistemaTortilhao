# Sistema Web para Pizzaria

Este é um sistema web responsivo desenvolvido para gerenciamento de pizzarias, incluindo dashboard, cadastro de clientes e reserva de mesas.

## Funcionalidades

### 🏠 Dashboard
- Visualização das reservas do dia
- Lista de aniversariantes dos próximos 7 dias
- Interface limpa e aconchegante

### 👥 Cadastro de Clientes
- Formulário completo com campos: nome, sobrenome, telefone, email, data de nascimento
- Listagem de clientes cadastrados
- Funcionalidades de editar e excluir clientes
- Validação automática de campos

### 📅 Reserva de Mesas
- Seleção de cliente já cadastrado
- Definição de data, horário e número de pessoas
- Opção entre Rodízio ou À la carte
- Listagem de reservas existentes
- Funcionalidades de editar e cancelar reservas

### 📋 Detalhes da Reserva
- Visualização completa dos dados da reserva
- Opções para editar ou cancelar
- Interface intuitiva e clara

## Design

### Paleta de Cores
- **Primária**: #D32F2F (vermelho pizzaria)
- **Secundária**: #FFA726 (laranja/amarelo)
- **Accent**: #FFEB3B (amarelo)
- **Fundo**: #FFF8E1 (bege claro)
- **Neutros**: #FFFFFF, #F5F5F5, #424242

### Características
- Design moderno e minimalista
- Tema aconchegante de pizzaria
- Tipografia sem serifa, legível e amigável
- Componentes bem destacados (cards, botões, tabelas)
- UX amigável com botões sempre visíveis

## Responsividade

### Desktop
- Menu lateral fixo
- Cards lado a lado no dashboard
- Formulários em grid
- Tabelas completas

### Mobile
- Menu hambúrguer
- Layout empilhado
- Cards em coluna única
- Botões de ação otimizados para touch
- Formulários adaptados

## Estrutura de Arquivos

```
pizzaria-system/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos CSS responsivos
├── js/
│   └── script.js       # Funcionalidades JavaScript
├── images/             # Pasta para imagens (vazia)
└── README.md           # Esta documentação
```

## Como Usar

1. **Abrir o Sistema**
   - Abra o arquivo `index.html` em qualquer navegador moderno
   - O sistema funciona offline, sem necessidade de servidor

2. **Navegação**
   - Use o menu lateral (desktop) ou hambúrguer (mobile)
   - Navegue entre: Início, Clientes, Reservas, Configurações

3. **Cadastrar Clientes**
   - Vá para a seção "Clientes"
   - Preencha o formulário e clique em "Cadastrar"
   - Use os botões de editar/excluir na tabela

4. **Fazer Reservas**
   - Vá para a seção "Reservas"
   - Selecione um cliente cadastrado
   - Preencha data, horário, número de pessoas
   - Escolha entre Rodízio ou À la carte
   - Clique em "Reservar"

5. **Ver Detalhes**
   - Na lista de reservas, clique no ícone de "olho"
   - Visualize todos os detalhes da reserva
   - Use os botões para editar ou cancelar

## Funcionalidades JavaScript

### Dados Simulados
- O sistema vem com dados de exemplo pré-carregados
- Clientes e reservas de demonstração
- Dados são mantidos apenas durante a sessão

### Validações
- Formatação automática de telefone
- Validação de email
- Data mínima para reservas (hoje)
- Campos obrigatórios

### Interatividade
- Navegação SPA (Single Page Application)
- Menu mobile responsivo
- Formulários dinâmicos
- Tabelas interativas

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos responsivos com Flexbox e Grid
- **JavaScript ES6+**: Funcionalidades interativas
- **Font Awesome**: Ícones
- **Media Queries**: Responsividade

## Compatibilidade

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Dispositivos móveis (iOS/Android)

## Próximos Passos

Para expandir o sistema, considere:

1. **Backend Integration**
   - Conectar com banco de dados
   - API REST para CRUD operations
   - Autenticação de usuários

2. **Funcionalidades Avançadas**
   - Sistema de notificações
   - Relatórios e estatísticas
   - Integração com WhatsApp/SMS
   - Sistema de pagamentos

3. **Melhorias UX/UI**
   - Animações mais elaboradas
   - Tema escuro
   - Personalização de cores
   - PWA (Progressive Web App)

## Suporte

Este é um projeto base que pode ser customizado conforme suas necessidades. O código é limpo, comentado e fácil de modificar.

---

**Desenvolvido com ❤️ para pizzarias que querem modernizar seu atendimento!**

