import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "./quem-somos";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — ACEFS" },
      { name: "description", content: "Fale com a ACEFS. Endereço, telefone, e-mail e formulário de contato para associados e empresas." },
      { property: "og:title", content: "Contato — ACEFS" },
      { property: "og:description", content: "Fale com a ACEFS: endereço, telefone e formulário." },
    ],
  }),
  component: Contato,
});

function Contato() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow="Fale conosco"
        title="Entre em contato"
        subtitle="Estamos à disposição para associados, empresas e imprensa. Retornamos em até 1 dia útil."
      />
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-6">
            <InfoBlock title="Endereço" lines={["Rua Senhor dos Passos, 100", "Centro — Feira de Santana, BA", "CEP 44001-000"]} />
            <InfoBlock title="Telefone" lines={["(75) 3221-0000"]} link={{ label: "Ligar agora", href: "tel:+557532210000" }} />
            <InfoBlock title="E-mail" lines={["contato@acefs.com.br"]} link={{ label: "Enviar e-mail", href: "mailto:contato@acefs.com.br" }} />
            <InfoBlock title="Horário" lines={["Segunda a sexta, 08h às 18h"]} />
          </div>
          <div className="md:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="bg-cream border border-line rounded-lg p-6 md:p-8 space-y-5"
            >
              <h2 className="font-display font-semibold text-[24px] text-navy">Envie sua mensagem</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nome" name="nome" required />
                <Field label="Empresa" name="empresa" />
                <Field label="E-mail" name="email" type="email" required />
                <Field label="Telefone" name="telefone" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-ink mb-1.5">Mensagem</label>
                <textarea
                  name="mensagem"
                  rows={5}
                  required
                  className="w-full bg-white border border-line rounded-md px-3.5 py-2.5 text-[14px] text-ink focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-md font-semibold text-[14px] hover:bg-navy-deep transition-colors"
              >
                Enviar mensagem
              </button>
              {sent && (
                <p className="text-[14px] text-navy bg-gold/20 border border-gold/40 rounded-md px-4 py-3">
                  Mensagem recebida! Retornaremos em breve.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoBlock({ title, lines, link }: { title: string; lines: string[]; link?: { label: string; href: string } }) {
  return (
    <div className="border-b border-line pb-5 last:border-0">
      <div className="text-[11px] tracking-[0.22em] uppercase text-gold font-semibold mb-2">{title}</div>
      <ul className="space-y-0.5 text-[15px] text-ink">
        {lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      {link && (
        <a href={link.href} className="mt-2 inline-block text-[13px] font-semibold text-navy hover:text-gold">
          {link.label} →
        </a>
      )}
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-ink mb-1.5">
        {label}{required && <span className="text-gold ml-0.5">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full bg-white border border-line rounded-md px-3.5 py-2.5 text-[14px] text-ink focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10"
      />
    </div>
  );
}