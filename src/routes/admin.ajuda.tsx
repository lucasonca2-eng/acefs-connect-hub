import { createFileRoute } from "@tanstack/react-router";
import { Newspaper, Images, Settings, FileText, Upload, Save, Eye, Trash2, Plus, AlertCircle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin/ajuda")({
  ssr: false,
  component: AjudaPage,
});

function AjudaPage() {
  return (
    <div className="bg-white border border-line rounded-lg p-6 md:p-8">
      <div className="mb-8">
        <h1 className="font-display font-semibold text-[26px] text-navy mb-2">
          Guia rápido do painel
        </h1>
        <p className="text-[14px] text-ink-soft max-w-[680px]">
          Bem-vindo ao painel de conteúdo da ACEFS! Este guia foi feito para ajudar você a usar o
          sistema de forma simples, sem precisar de conhecimento técnico. Se tiver dúvidas, fale
          com o responsável pelo site.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <NewsCard />
        <BannersCard />
        <SettingsCard />
        <TipsCard />
      </div>

      <div className="mt-8 p-4 bg-mint/50 border border-green/20 rounded-lg flex items-start gap-3">
        <AlertCircle className="text-green shrink-0 mt-0.5" size={18} />
        <div>
          <h3 className="font-semibold text-navy text-[14px]">Precisa de ajuda extra?</h3>
          <p className="text-[13px] text-ink-soft mt-0.5">
            Entre em contato com a equipe de tecnologia da ACEFS. Guarde sempre os seus dados de
            acesso em local seguro e não compartilhe a senha com outras pessoas.
          </p>
        </div>
      </div>
    </div>
  );
}

function NewsCard() {
  return (
    <div className="border border-line rounded-lg p-5 hover:border-green/40 transition-colors">
      <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center mb-4">
        <Newspaper className="text-green" size={20} />
      </div>
      <h2 className="font-display font-semibold text-[18px] text-navy mb-3">
        1. Como adicionar uma Notícia
      </h2>
      <ol className="space-y-3 text-[13.5px] text-ink-soft">
        <li className="flex gap-3">
          <span className="font-semibold text-green">1.</span>
          <span>
            No menu lateral, clique em <strong className="text-navy">Notícias</strong>.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-semibold text-green">2.</span>
          <span>
            Clique no botão verde <strong className="text-navy">Nova notícia</strong>.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-semibold text-green">3.</span>
          <span>
            Preencha o título, escolha uma categoria e escreva um resumo curto.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-semibold text-green">4.</span>
          <span className="flex items-center gap-1">
            Para a imagem de capa, clique em <Upload size={14} /> <strong className="text-navy">Fazer upload de foto</strong>, escolha a imagem do seu computador e aguarde o envio.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-semibold text-green">5.</span>
          <span>
            No campo <strong className="text-navy">Conteúdo completo</strong>, escreva o texto da matéria. Você pode usar negrito e organizar em parágrafos.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-semibold text-green">6.</span>
          <span className="flex items-center gap-1">
            Clique em <Save size={14} /> <strong className="text-navy">Salvar</strong>. Pronto! A notícia já aparece no site.
          </span>
        </li>
      </ol>
      <div className="mt-4 p-3 bg-cream rounded-md text-[12.5px] text-ink-soft">
        <strong className="text-navy">Dica:</strong> para editar uma notícia já publicada, clique no
        botão <strong>Editar</strong> ao lado dela na lista.
      </div>
    </div>
  );
}

function BannersCard() {
  return (
    <div className="border border-line rounded-lg p-5 hover:border-green/40 transition-colors">
      <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center mb-4">
        <Images className="text-green" size={20} />
      </div>
      <h2 className="font-display font-semibold text-[18px] text-navy mb-3">
        2. Como gerenciar os Banners da Home
      </h2>
      <ol className="space-y-3 text-[13.5px] text-ink-soft">
        <li className="flex gap-3">
          <span className="font-semibold text-green">1.</span>
          <span>
            No menu lateral, clique em <strong className="text-navy">Banners</strong>.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-semibold text-green">2.</span>
          <span>
            Você verá os banners que estão no carrossel da página inicial.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-semibold text-green">3.</span>
          <span className="flex items-center gap-1">
            Para adicionar um novo, clique em <Plus size={14} /> <strong className="text-navy">Novo banner</strong>.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-semibold text-green">4.</span>
          <span className="flex items-center gap-1">
            Clique em <Upload size={14} /> <strong className="text-navy">Fazer upload de foto</strong> e selecione a imagem. Banners geralmente ficam melhor em formato paisagem (largura maior que altura).
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-semibold text-green">5.</span>
          <span>
            Escolha a ordem de exibição (1, 2, 3…) e salve.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-semibold text-green">6.</span>
          <span className="flex items-center gap-1">
            Para remover, clique na lixeira <Trash2 size={14} /> e confirme.
          </span>
        </li>
      </ol>
      <div className="mt-4 p-3 bg-cream rounded-md text-[12.5px] text-ink-soft">
        <strong className="text-navy">Dica:</strong> mantenha entre 3 e 5 banners para o site
        carregar rápido e ficar organizado.
      </div>
    </div>
  );
}

function SettingsCard() {
  return (
    <div className="border border-line rounded-lg p-5 hover:border-green/40 transition-colors">
      <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center mb-4">
        <Settings className="text-green" size={20} />
      </div>
      <h2 className="font-display font-semibold text-[18px] text-navy mb-3">
        3. Como editar Configurações e Textos Institucionais
      </h2>
      <div className="space-y-4 text-[13.5px] text-ink-soft">
        <p>
          As informações gerais do site ficam em duas áreas do menu lateral:
        </p>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <CheckCircle2 className="text-green shrink-0" size={16} />
            <span>
              <strong className="text-navy">Configurações gerais:</strong> aqui você altera o logo, telefone, WhatsApp, redes sociais e os links do menu e rodapé.
            </span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="text-green shrink-0" size={16} />
            <span>
              <strong className="text-navy">Páginas institucionais:</strong> aqui você edita os textos das páginas <em>Quem Somos</em> e <em>Sobre Feira de Santana</em> usando um editor de texto simples.
            </span>
          </li>
        </ul>
        <p>
          Sempre que terminar as alterações, clique em <strong className="text-navy">Salvar</strong>{" "}
          no final da página. As mudanças aparecem no site automaticamente.
        </p>
      </div>
      <div className="mt-4 p-3 bg-cream rounded-md text-[12.5px] text-ink-soft">
        <strong className="text-navy">Dica:</strong> para editar links do menu, use caminhos como{" "}
        <code className="text-green bg-white px-1 py-0.5 rounded border border-line">/noticias</code>{" "}
        ou endereços completos começando com{" "}
        <code className="text-green bg-white px-1 py-0.5 rounded border border-line">https://</code>.
      </div>
    </div>
  );
}

function TipsCard() {
  return (
    <div className="border border-line rounded-lg p-5 hover:border-green/40 transition-colors">
      <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center mb-4">
        <FileText className="text-green" size={20} />
      </div>
      <h2 className="font-display font-semibold text-[18px] text-navy mb-3">
        Boas práticas
      </h2>
      <ul className="space-y-3 text-[13.5px] text-ink-soft">
        <li className="flex gap-3">
          <Eye className="text-green shrink-0 mt-0.5" size={16} />
          <span>
            <strong className="text-navy">Revise antes de salvar:</strong> confira o título, a imagem e o texto para garantir que tudo está correto.
          </span>
        </li>
        <li className="flex gap-3">
          <Upload className="text-green shrink-0 mt-0.5" size={16} />
          <span>
            <strong className="text-navy">Imagens leves:</strong> prefira imagens em JPG com até 1 MB. Isso deixa o site mais rápido.
          </span>
        </li>
        <li className="flex gap-3">
          <Trash2 className="text-green shrink-0 mt-0.5" size={16} />
          <span>
            <strong className="text-navy">Cuidado ao excluir:</strong> ao clicar na lixeira, uma janela de confirmação aparece. Só confirme se tiver certeza.
          </span>
        </li>
        <li className="flex gap-3">
          <Save className="text-green shrink-0 mt-0.5" size={16} />
          <span>
            <strong className="text-navy">Salve sempre:</strong> mesmo que pareça óbvio, muitas alterações só entram no site depois de clicar em Salvar.
          </span>
        </li>
      </ul>
    </div>
  );
}
