<template>
  <footer class="site-footer">
    <div class="page-shell footer-grid">
      <div class="footer-brand">
        <img src="/brand/techstore-logo-dark.svg" alt="TechStore" />
        <p>Vue Product Showcase desarrollado como SPA modular para un catálogo tecnológico interactivo.</p>
      </div>
      <div>
        <strong>Navegación</strong>
        <router-link to="/">Catálogo</router-link>
        <router-link to="/favorites">Favoritos</router-link>
      </div>
      <div>
        <strong>Tecnologías</strong>
        <span>Vue 3 · Vue CLI</span>
        <span>Vuex · Axios</span>
        <span>Vuetify · Jest · Cypress</span>
      </div>
      <div>
        <strong>Arquitectura</strong>
        <span>Componentes reutilizables</span>
        <span>Estado global modular</span>
        <span>Responsive + tema claro/oscuro</span>
      </div>
    </div>
    <div class="page-shell footer-bottom">Proyecto académico · TechStore · 2026</div>
  </footer>
</template>

<style scoped>
.site-footer { margin-top: 86px; border-top: 1px solid var(--tech-border); background: #050b15; color: #f0f6ff; }
.footer-grid { padding-top: 46px; padding-bottom: 38px; display: grid; grid-template-columns: 1.45fr repeat(3, 1fr); gap: 34px; }
.footer-brand img { width: 205px; height: auto; display: block; background: transparent; }
.footer-brand p { max-width: 430px; color: #8fa6c3; line-height: 1.65; margin: 15px 0 0; font-size: .86rem; }
.footer-grid > div:not(.footer-brand) { display: flex; flex-direction: column; gap: 9px; }
.footer-grid strong { font-size: .86rem; margin-bottom: 2px; }
.footer-grid a, .footer-grid span { color: #8fa6c3; text-decoration: none; font-size: .78rem; line-height: 1.45; }
.footer-grid a:hover { color: #55e7ff; }
.footer-bottom { border-top: 1px solid rgba(130, 163, 202, .13); padding-top: 18px; padding-bottom: 22px; color: #68809e; font-size: .73rem; }
@media (max-width: 920px) { .footer-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr; } }
</style>
