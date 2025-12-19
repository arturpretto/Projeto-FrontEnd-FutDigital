PROJETO 3: FRONTEND (Portal do Aluno)
Nome: Portal do Estudante - RevisãoOnline 
Objetivo: Interface onde o estudante envia textos e visualiza graficamente seu desempenho.
📅
Cronograma e Sprints (Frontend)
Mês 1: Onboarding e Perfil
• Foco: O aluno entra e configura sua "casa".
• Entregáveis (Git):
• [ ] Setup: Vite + React Router Dom.
• [ ] Telas de Acesso: Login e Cadastro (com validação de campos).
• [ ] Tela de Perfil: Formulário onde ele escolhe o curso dos sonhos (Select box: 
Medicina, Direito, Engenharia). Isso define o "tema" do dashboard.
• [ ] Componente de Proteção: Rota privada que só acessa com Token.
Mês 2: Sala de Redação
• Foco: Ação principal de estudar.
• Entregáveis (Git):
• [ ] Lista de Redações: Card para cada redação enviada.
• Visual: Badge Amarelo para "Em Correção" e Verde para "Corrigida (Nota: 
920)".
• [ ] Nova Redação: Formulário com campo de Título, Tema e um Textarea grande 
para digitar o texto.
• [ ] Integração: Conectar com o POST /essays da API.
• [ ] Feedback Visual: Toast de sucesso ao enviar.
Mês 3: Dashboard de Evolução
• Foco: Retenção e gamificação.
• Entregáveis (Git):
• [ ] Gráfico de Linha: Consumir a API para mostrar a evolução das notas nas últimas 
5 redações.
• [ ] Card de Meta: Mostrar visualmente o quão longe ele está da nota de corte (Ex: 
Uma barra de progresso "850/900").
• [ ] Responsividade: Garantir que o aluno consiga ver a nota pelo celular.
• [ ] Deploy na Vercel: Link funcional
