<template>
  <section class="hero page-shell" aria-labelledby="hero-title">
    <div class="hero-panel">
      <div class="hero-copy">
        <div class="eyebrow"><span></span> VUE PRODUCT SHOWCASE</div>
        <h1 id="hero-title">Tecnología<br />que <em>te mueve.</em></h1>
        <p>Explora un catálogo interactivo, compara categorías y guarda tus favoritos en una SPA moderna construida con Vue.</p>
        <div class="hero-actions">
          <v-btn color="primary" size="large" href="#catalogo" class="hero-btn">
            Explorar productos <AppIcon name="arrow-right" :size="18" />
          </v-btn>
          <v-btn variant="text" size="large" to="/favorites" class="hero-secondary">
            <AppIcon name="heart-outline" :size="18" /> Ver favoritos
          </v-btn>
        </div>
        <div class="tech-stack" aria-label="Tecnologías principales">
          <div><strong>Vue 3</strong><small>Componentes</small></div>
          <div><strong>Vuex</strong><small>Estado global</small></div>
          <div><strong>Axios</strong><small>API REST</small></div>
          <div><strong>Vuetify</strong><small>UI profesional</small></div>
        </div>
      </div>

      <div class="hero-visual" aria-hidden="true">
        <img src="/images/hero-techstore.webp" alt="" />
        <div class="hero-glow"></div>
        <div class="floating-card floating-top"><AppIcon name="lightning" :size="18" /><span>Rápido y responsive</span></div>
        <div class="floating-card floating-bottom"><AppIcon name="shield-check" :size="18" /><span>Arquitectura modular</span></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
</script>

<style scoped>
.hero { padding-top: 34px; }
.hero-panel { min-height: 590px; overflow: hidden; display: grid; grid-template-columns: 1.02fr .98fr; border-radius: 34px; border: 1px solid rgba(75, 143, 240, .30); background: linear-gradient(115deg, #071b37 0%, #09284f 52%, #0b315d 100%); box-shadow: 0 30px 80px rgba(0, 0, 0, .20); }
.hero-copy { padding: 74px 70px 62px; display: flex; flex-direction: column; justify-content: center; color: #fff; }
.eyebrow { color: #67e7ff; font-size: .78rem; font-weight: 900; letter-spacing: .18em; display: flex; align-items: center; gap: 11px; }
.eyebrow span { width: 30px; height: 2px; background: #55e7ff; border-radius: 4px; }
h1 { margin: 22px 0 20px; font-size: clamp(3.4rem, 6vw, 6.1rem); letter-spacing: -.055em; line-height: .92; font-weight: 900; }
h1 em { color: #4e9dff; font-style: normal; }
.hero-copy > p { max-width: 610px; margin: 0; color: #d7e4f7; font-size: 1.05rem; line-height: 1.75; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 31px; }
.hero-btn :deep(.v-btn__content), .hero-secondary :deep(.v-btn__content) { display: flex; gap: 9px; align-items: center; font-weight: 800; }
.hero-secondary { color: #edf6ff; }
.tech-stack { margin-top: 42px; padding-top: 28px; border-top: 1px solid rgba(255, 255, 255, .13); display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.tech-stack div { display: flex; flex-direction: column; }
.tech-stack strong { font-size: .95rem; }
.tech-stack small { color: #8fb6e3; margin-top: 4px; }
.hero-visual { position: relative; min-height: 590px; background: #eaf1fb; overflow: hidden; }
.hero-visual img { width: 100%; height: 100%; object-fit: cover; display: block; }
.hero-visual::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(7, 27, 55, .20), transparent 25%, transparent 72%, rgba(31, 95, 160, .08)); pointer-events: none; }
.hero-glow { position: absolute; width: 300px; height: 300px; right: -120px; top: -130px; border-radius: 50%; background: rgba(76, 156, 255, .28); filter: blur(50px); }
.floating-card { position: absolute; z-index: 2; display: flex; align-items: center; gap: 9px; padding: 13px 16px; border-radius: 16px; background: rgba(6, 17, 31, .90); color: #edf7ff; border: 1px solid rgba(116, 164, 220, .26); backdrop-filter: blur(14px); font-size: .78rem; font-weight: 800; box-shadow: 0 16px 36px rgba(0,0,0,.18); }
.floating-top { right: 26px; top: 58px; color: #bce9ff; }
.floating-bottom { left: 24px; bottom: 42px; color: #9df0d4; }
@media (max-width: 1020px) {
  .hero-panel { grid-template-columns: 1fr; }
  .hero-copy { padding: 58px 46px; }
  .hero-visual { min-height: 390px; }
  .tech-stack { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .hero { padding-top: 18px; }
  .hero-panel { border-radius: 24px; }
  .hero-copy { padding: 44px 24px 38px; }
  h1 { font-size: clamp(3rem, 16vw, 4.25rem); }
  .hero-actions { align-items: stretch; flex-direction: column; }
  .hero-actions .v-btn { width: 100%; }
  .hero-visual { min-height: 300px; }
  .floating-card { display: none; }
}
</style>
