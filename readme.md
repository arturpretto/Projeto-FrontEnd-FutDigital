PROJETO 3: FRONTEND (Portal do Aluno) <br>
Nome: Portal do Estudante - RevisãoOnline <br>
Objetivo: Interface onde o estudante envia textos e visualiza graficamente seu desempenho.
📅 <br>
Cronograma e Sprints (Frontend) <br>
Mês 1: Onboarding e Perfil <br>
• Foco: O aluno entra e configura sua "casa". <br>
• Entregáveis (Git): <br>
• [ ] Setup: Vite + React Router Dom. <br>
• [ ] Telas de Acesso: Login e Cadastro (com validação de campos). <br>
• [ ] Tela de Perfil: Formulário onde ele escolhe o curso dos sonhos (Select box: 
Medicina, Direito, Engenharia). Isso define o "tema" do dashboard. <br>
• [ ] Componente de Proteção: Rota privada que só acessa com Token. <br>
Mês 2: Sala de Redação<br>
• Foco: Ação principal de estudar. <br>
• Entregáveis (Git): <br>
• [ ] Lista de Redações: Card para cada redação enviada. <br>
• Visual: Badge Amarelo para "Em Correção" e Verde para "Corrigida (Nota: 
920)". <br>
• [ ] Nova Redação: Formulário com campo de Título, Tema e um Textarea grande 
para digitar o texto. <br>
• [ ] Integração: Conectar com o POST /essays da API. <br>
• [ ] Feedback Visual: Toast de sucesso ao enviar. <br>
Mês 3: Dashboard de Evolução <br>
• Foco: Retenção e gamificação. <br>
• Entregáveis (Git): <br>
• [ ] Gráfico de Linha: Consumir a API para mostrar a evolução das notas nas últimas 
5 redações. <br>
• [ ] Card de Meta: Mostrar visualmente o quão longe ele está da nota de corte (Ex: 
Uma barra de progresso "850/900"). <br>
• [ ] Responsividade: Garantir que o aluno consiga ver a nota pelo celular. <br>
• [ ] Deploy na Vercel: Link funcional
