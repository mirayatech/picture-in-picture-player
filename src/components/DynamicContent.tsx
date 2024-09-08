export function DynamicContent() {
  return (
    <div className="space-y-3 pt-8 text-lg leading-relaxed text-slate-800 opacity-70">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className={`w-full rounded-md bg-slate-200 ${
            Math.random() > 0.5 ? "h-20" : "h-48"
          }`}
        />
      ))}
    </div>
  );
}
