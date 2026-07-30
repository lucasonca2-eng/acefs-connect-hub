import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "./quem-somos";

export const Route = createFileRoute("/curriculo")({
  head: () => ({
    meta: [
      { title: "Cadastre seu Currículo — ACEFS" },
      { name: "description", content: "Cadastre seu currículo no banco de talentos da ACEFS e concorra às vagas das empresas associadas." },
      { property: "og:title", content: "Cadastre seu Currículo — ACEFS" },
      { property: "og:description", content: "Banco de currículos da ACEFS para as empresas associadas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Curriculo,
});

const FIELD =
  "w-full rounded-md border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-all duration-200 focus:border-navy focus:ring-2 focus:ring-navy/10";
const LABEL = "block text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink-soft mb-2";

function Curriculo() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow="Banco de talentos"
        title="Cadastre seu currículo"
        subtitle="Informe seus dados corretamente e faça parte da nossa base de currículos."
      />
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[860px] px-6 md:px-10">
          {sent ? (
            <div className="rounded-lg border border-line bg-cream p-8 text-center">
              <h2 className="font-display font-semibold text-[24px] text-navy">Currículo cadastrado</h2>
              <p className="mt-3 text-[15px] text-ink-soft">
                Seus dados foram registrados. As empresas associadas entrarão em contato caso o perfil seja compatível.
              </p>
            </div>
          ) : (
            <form
              className="grid md:grid-cols-2 gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="md:col-span-2">
                <label className={LABEL} htmlFor="nome">Nome completo</label>
                <input id="nome" name="nome" required className={FIELD} />
              </div>
              <div>
                <label className={LABEL} htmlFor="email">E-mail</label>
                <input id="email" name="email" type="email" required className={FIELD} />
              </div>
              <div>
                <label className={LABEL} htmlFor="telefone">Telefone</label>
                <input id="telefone" name="telefone" className={FIELD} />
              </div>
              <div>
                <label className={LABEL} htmlFor="nascimento">Data de nascimento</label>
                <input id="nascimento" name="nascimento" type="date" className={FIELD} />
              </div>
              <div>
                <label className={LABEL} htmlFor="sexo">Sexo</label>
                <select id="sexo" name="sexo" className={FIELD} defaultValue="">
                  <option value="" disabled>Selecione</option>
                  <option>Masculino</option>
                  <option>Feminino</option>
                </select>
              </div>
              <div>
                <label className={LABEL} htmlFor="estado-civil">Estado civil</label>
                <select id="estado-civil" name="estado-civil" className={FIELD} defaultValue="">
                  <option value="" disabled>Selecione</option>
                  <option>Solteiro(a)</option>
                  <option>Casado(a)</option>
                </select>
              </div>
              <div>
                <label className={LABEL} htmlFor="escolaridade">Escolaridade</label>
                <select id="escolaridade" name="escolaridade" className={FIELD} defaultValue="">
                  <option value="" disabled>Selecione</option>
                  <option>Ensino fundamental</option>
                  <option>Ensino médio incompleto</option>
                  <option>Ensino médio completo</option>
                  <option>Superior incompleto</option>
                  <option>Superior completo</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={LABEL} htmlFor="area">Área de interesse</label>
                <input id="area" name="area" placeholder="Ex.: Comercial, Administrativo, Logística" className={FIELD} />
              </div>
              <div className="md:col-span-2">
                <label className={LABEL} htmlFor="experiencia">Experiência profissional</label>
                <textarea id="experiencia" name="experiencia" rows={5} className={FIELD} />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-navy text-white px-7 py-3.5 rounded-md font-semibold text-[14px] hover:bg-navy-deep transition-all duration-200 active:scale-[0.98]"
                >
                  Cadastrar currículo
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}