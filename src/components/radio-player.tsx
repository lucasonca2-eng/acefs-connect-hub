import { useEffect, useRef, useState } from "react";

/**
 * === CONFIGURAÇÃO DO STREAM ===
 * Troque pela URL fornecida pelo serviço de streaming contratado
 * (ex: Zeno.FM, Radios.com.br, Radio.co — todos entregam uma URL
 * HTTP compatível com a tag <audio>).
 *
 * Exemplo Zeno.FM:  "https://stream.zeno.fm/xxxxxxxxxxxxx"
 * Deixe null para o player ficar em estado "Fora do ar" (sem quebrar o site).
 */
export const RADIO_STREAM_URL: string | null = null;

export const RADIO_PROGRAM_LABEL = "Programa do Comércio — boletim das 18h";

type RadioStatus = "idle" | "loading" | "playing" | "paused" | "offline" | "error";

function useRadioStream() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<RadioStatus>(RADIO_STREAM_URL ? "idle" : "offline");
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!RADIO_STREAM_URL) return;
    const audio = new Audio();
    audio.preload = "none";
    audio.src = RADIO_STREAM_URL;
    audioRef.current = audio;

    const onWaiting = () => setStatus("loading");
    const onPlaying = () => setStatus("playing");
    const onPause = () => setStatus((s) => (s === "error" || s === "offline" ? s : "paused"));
    const onError = () => setStatus("error");

    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
    };
  }, []);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) {
        setStatus("loading");
        await audio.play();
      } else {
        audio.pause();
      }
    } catch {
      setStatus("error");
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return { status, muted, toggle, toggleMute };
}

function LiveDot({ status }: { status: RadioStatus }) {
  const live = status === "playing" || status === "loading";
  return (
    <span
      className={`w-1.5 h-1.5 rounded-full ${
        status === "offline" || status === "error" ? "bg-white/30" : "bg-gold"
      } ${live ? "blink" : ""}`}
    />
  );
}

function statusLabel(status: RadioStatus) {
  switch (status) {
    case "playing":
      return "Ao vivo";
    case "loading":
      return "Conectando…";
    case "paused":
      return "Pausado";
    case "error":
      return "Sem sinal";
    default:
      return "Fora do ar";
  }
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3.5 2.2v9.6L11.5 7 3.5 2.2Z" fill="currentColor" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="3" y="2.2" width="3" height="9.6" fill="currentColor" />
      <rect x="8" y="2.2" width="3" height="9.6" fill="currentColor" />
    </svg>
  );
}
function VolumeIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M2 5.5h2.2L7.5 3v9L4.2 9.5H2v-4Z" fill="currentColor" />
      {!muted && (
        <path
          d="M10 5.2a3.6 3.6 0 0 1 0 4.6M11.6 3.6a6 6 0 0 1 0 7.8"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
      )}
      {muted && <path d="M10.5 5.5l3 3m0-3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />}
    </svg>
  );
}

/** Featured card — used on the home page / serviços page. */
export function RadioFeatureCard() {
  const { status, muted, toggle, toggleMute } = useRadioStream();
  const playing = status === "playing" || status === "loading";

  return (
    <div className="relative overflow-hidden rounded-lg bg-navy-deep text-white p-7 md:p-8">
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(ellipse at 85% 15%, rgba(201,162,75,0.22) 0%, transparent 55%)",
        }}
      />
      <div className="relative flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-gold font-semibold">
            <LiveDot status={status} />
            Rádio ACEFS
          </div>
          <span className="text-[11px] text-white/50">{statusLabel(status)}</span>
        </div>

        <div>
          <div className="font-display font-semibold text-[22px] leading-tight">
            Transmissão ao vivo direto da sede
          </div>
          <p className="mt-2 text-[14px] text-white/70 leading-relaxed max-w-[420px]">
            {RADIO_PROGRAM_LABEL}. Boletins, entrevistas e pauta econômica para o empresariado feirense.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            disabled={status === "offline"}
            aria-label={playing ? "Pausar rádio" : "Ouvir rádio ao vivo"}
            className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gold text-navy-deep hover:bg-gold-soft transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            onClick={toggleMute}
            disabled={status === "offline"}
            aria-label={muted ? "Ativar som" : "Silenciar"}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <VolumeIcon muted={muted} />
          </button>
          <span className="text-[12.5px] text-white/50">
            {status === "offline" ? "Transmissão ainda não configurada" : "Ouvir agora"}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Slim persistent bar — mount once in the root layout. */
export function RadioMiniPlayer() {
  const { status, muted, toggle, toggleMute } = useRadioStream();
  const playing = status === "playing" || status === "loading";

  if (status === "offline") return null; // hide entirely until a stream URL is configured

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="flex items-center gap-3 bg-navy-deep text-white rounded-full pl-4 pr-2 py-2 shadow-lg shadow-navy-deep/30 border border-white/10">
        <LiveDot status={status} />
        <div className="leading-none hidden sm:block">
          <div className="text-[11px] font-semibold tracking-wide">Rádio ACEFS</div>
          <div className="text-[10px] text-white/50">{statusLabel(status)}</div>
        </div>
        <button
          onClick={toggle}
          aria-label={playing ? "Pausar rádio" : "Ouvir rádio ao vivo"}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gold text-navy-deep hover:bg-gold-soft transition-colors"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          onClick={toggleMute}
          aria-label={muted ? "Ativar som" : "Silenciar"}
          className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white/70 hover:bg-white/10 transition-colors"
        >
          <VolumeIcon muted={muted} />
        </button>
      </div>
    </div>
  );
}
