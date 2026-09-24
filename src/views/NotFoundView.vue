<template>
  <main class="page-shell not-found">
    <div class="code">404</div>
    <h1>Página no encontrada</h1>
    <p>La ruta solicitada no existe dentro de TechStore.</p>
    <v-btn color="primary" to="/">Volver al catálogo</v-btn>
  </main>
</template>

<style scoped>
.not-found { min-height: 65vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
.code { font-size: clamp(5rem, 16vw, 10rem); line-height: 1; font-weight: 900; letter-spacing: -.08em; color: rgba(var(--v-theme-primary), .20); }
h1 { margin: -12px 0 8px; } p { color: var(--tech-muted); margin: 0 0 20px; }
</style>
