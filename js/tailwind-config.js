globalThis.tailwind = globalThis.tailwind || {};
globalThis.tailwind.config = {
  theme: {
    extend: {
      colors: {
        ink: "#0b0f17",         // Novo fundo escuro nobre
        ember: "#f59e0b",       // Amarelo/Âmbar moderno e limpo
        gold: "#fbbf24",        // Destaques em amarelo ouro claro
        smoke: "#1e293b"        // Cinza escuro para componentes e hovers
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui"],
        body: ["Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        glow: "0 24px 80px rgba(245, 158, 11, 0.15)" // Sombra neon amarela sutil
      }
    }
  }
};
