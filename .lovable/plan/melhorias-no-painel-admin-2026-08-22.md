# Melhorias no painel /admin

Sugestões priorizadas para deixar o painel mais rápido, seguro e fácil de usar por leigos.

## 1. Dashboard inicial de verdade (alta prioridade)
Hoje "/admin" abre direto em Configurações gerais. Proposta: uma tela inicial com:
- Cards de resumo: total de notícias, banners ativos, serviços, eventos futuros.
- Lista "Últimas edições" (5 conteúdos mais recentes, com link para editar).
- Atalhos grandes: "Nova notícia", "Novo banner", "Novo evento".
- Configurações gerais viram um item próprio no menu.

## 2. Fluxo de conteúdo mais seguro
- Rascunho x Publicado: campo de status em notícias/eventos/serviços, com filtro no admin e o site público mostrando só publicados.
- Botão "Ver no site" em cada item (abre a página pública em nova aba).
- Aviso de alterações não salvas ao sair de um formulário preenchido.
- Salvamento com feedback melhor: botão em estado "Salvando…" e toast único.

## 3. Listas mais usáveis
- Busca por título e filtro por categoria/data em Notícias.
- Paginação (ou "carregar mais") quando passar de ~20 itens.
- Ordenação por arrastar nos Banners e Serviços (campo `ordem`).
- Estado vazio ilustrado com botão de criar o primeiro item.

## 4. Upload de imagens
- Área de arrastar-e-soltar com pré-visualização antes de salvar.
- Compressão/redimensionamento no navegador antes do envio (evita fotos de 8 MB).
- Campo obrigatório de texto alternativo (acessibilidade e SEO).
- Aviso do tamanho recomendado por local (banner 1920x800, notícia 1200x675).

## 5. Experiência e acessibilidade
- Layout responsivo no celular: menu lateral vira menu recolhível no topo.
- Estados de carregamento em esqueleto no lugar de tela vazia.
- Foco visível e navegação por teclado nos botões/links do painel.
- Breadcrumb simples ("Painel › Notícias › Editar").

## 6. Conta e permissões
- Item "Minha conta": trocar senha e nome sem depender do fluxo de recuperação.
- Na Equipe: mostrar último acesso, permitir desativar usuário e reenviar convite.
- Para jornalista, esconder por completo os itens bloqueados (hoje há tela de bloqueio ao acessar por URL — manter, mas sem link visível).

## Detalhes técnicos
- Novo `src/routes/admin.index.tsx` como dashboard; mover o conteúdo atual para `src/routes/admin.configuracoes.tsx`.
- Contadores via `count: 'exact', head: true` no Supabase, agrupados em um hook `useAdminStats`.
- Status: coluna `status text default 'rascunho'` em `noticias`, `eventos`, `servicos` + ajuste das políticas de leitura pública para `status = 'publicado'`.
- Ordenação: coluna `ordem int` + atualização em lote no drop.
- Upload: redimensionar via `canvas` antes de `storage.upload`; coluna `image_alt`.
- Sidebar responsiva com `Sheet` do shadcn no mobile.

## Escopo
Posso implementar tudo, ou começar pelos itens 1 a 3, que são os de maior impacto para o cliente final.
