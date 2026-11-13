"use client";

import { useEffect, useRef } from "react";

const PLAYER_STATE_PLAYING = 1;
const UNMUTE_FALLBACK_DELAY_MS = 1200;

type YouTubeReelProps = {
  videoId: string;
  caption?: string;
  title: string;
  note?: string;
};

export function YouTubeReel({
  videoId,
  caption,
  title,
  note,
}: YouTubeReelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let playing = false;
    let soundAttempted = false;
    let lastState: number | null = null;
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

    const post = (func: string, args: Array<string | number> = []) => {
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "*"
      );
    };

    const onMessage = (event: MessageEvent) => {
      if (event.source !== iframe.contentWindow) return;
      let data: unknown;
      try {
        data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }
      if (!data || typeof data !== "object") return;
      const payload = data as { event?: string; info?: unknown };
      if (
        payload.event === "onStateChange" &&
        typeof payload.info === "number"
      ) {
        lastState = payload.info;
      } else if (
        payload.event === "infoDelivery" &&
        payload.info &&
        typeof payload.info === "object"
      ) {
        const playerState = (payload.info as { playerState?: unknown })
          .playerState;
        if (typeof playerState === "number") lastState = playerState;
      }
    };

    const fallBackToMuted = () => {
      if (!playing || lastState === PLAYER_STATE_PLAYING) return;
      post("mute");
      post("playVideo");
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !playing) {
          playing = true;
          if (!soundAttempted) {
            soundAttempted = true;
            post("unMute");
            post("setVolume", [100]);
            post("playVideo");
            fallbackTimer = setTimeout(
              fallBackToMuted,
              UNMUTE_FALLBACK_DELAY_MS
            );
          } else {
            post("playVideo");
          }
        } else if (!entry.isIntersecting && playing) {
          playing = false;
          post("pauseVideo");
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(iframe);
    window.addEventListener("message", onMessage);
    return () => {
      observer.disconnect();
      window.removeEventListener("message", onMessage);
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, []);

  const src = `https://www.youtube-nocookie.com/embed/${videoId}?mute=1&loop=1&playlist=${videoId}&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`;

  return (
    <figure className="dark-section border border-black/20 -mt-px">
      <div className="relative aspect-video">
        <iframe
          ref={iframeRef}
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <figcaption className="marginalia flex items-center justify-between gap-4 px-4 py-3">
        <span>{caption ?? note ?? "шоу рил"}</span>
        <span aria-hidden="true">{note ?? "видео / youtube"}</span>
      </figcaption>
    </figure>
  );
}
