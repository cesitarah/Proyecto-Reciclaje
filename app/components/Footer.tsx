export default function Footer() {
  return (
    <footer className="mt-8 border-t border-[#A8D5BA] bg-[#39734A] text-white sm:mt-10">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 text-center sm:px-6 sm:py-10 lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px]">
        <p className="nv-animate-float inline-block text-2xl">♻️</p>

        <p className="mt-3 text-base font-bold tracking-wide text-[#F5F3EC] sm:text-lg">
          Nueva Vida
        </p>

        <p className="mt-1 text-xs text-[#C3F4D4] sm:text-sm">
          Plataforma de reciclaje sostenible
        </p>

        <p className="mt-5 text-sm text-[#E8F5EC]">
          Creado por{" "}
          <span className="font-semibold text-[#B9E6F2]">Kasandra</span> y{" "}
          <span className="font-semibold text-[#B9E6F2]">Cesar</span>
        </p>

        <p className="mt-2 text-[11px] text-[#B9E6F2]/75">
          Desarrollo de Aplicaciones Web · 2026
        </p>
      </div>
    </footer>
  );
}
