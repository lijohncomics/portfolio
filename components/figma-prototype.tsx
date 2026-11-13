export function FigmaPrototype({ src, title }: { src: string; title: string }) {
  return (
    <div className="relative aspect-video w-full">
      <iframe
        src={src}
        title={title}
        allow="fullscreen"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
        className="absolute inset-0 h-full w-full"
        loading="lazy"
      />
    </div>
  );
}
