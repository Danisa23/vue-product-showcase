<template>
  <header class="site-header">
    <div class="page-shell header-inner">
      <router-link
        class="brand-link"
        to="/"
        aria-label="Ir al inicio de TechStore"
      >
        <img
          :src="logoSrc"
          alt="TechStore"
          class="brand-logo"
        />
      </router-link>

      <nav class="desktop-nav" aria-label="Navegación principal">
        <router-link
          to="/"
          :class="{ active: $route.name === 'home' }"
        >
          Catálogo
        </router-link>

        <router-link
          to="/favorites"
          :class="{ active: $route.name === 'favorites' }"
        >
          Favoritos
          <span v-if="favoriteCount" class="nav-badge">
            {{ favoriteCount }}
          </span>
        </router-link>
      </nav>

      <div class="header-actions">
        <button
          class="icon-button"
          type="button"
          :aria-label="isDark ? 'Activar tema claro' : 'Activar tema oscuro'"
          @click="toggleTheme"
        >
          <AppIcon
            :name="isDark ? 'sun' : 'moon'"
            :size="21"
          />
        </button>

        <button
          class="icon-button mobile-menu-button"
          type="button"
          aria-label="Abrir menú"
          @click="mobileOpen = !mobileOpen"
        >
          <AppIcon
            :name="mobileOpen ? 'close' : 'menu'"
            :size="23"
          />
        </button>
      </div>
    </div>

    <div
      v-if="mobileOpen"
      class="mobile-nav page-shell"
    >
      <router-link
        to="/"
        @click="mobileOpen = false"
      >
        Catálogo
      </router-link>

      <router-link
        to="/favorites"
        @click="mobileOpen = false"
      >
        Favoritos ({{ favoriteCount }})
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useTheme } from 'vuetify'
import AppIcon from './AppIcon.vue'

const store = useStore()
const theme = useTheme()

const mobileOpen = ref(false)

const favoriteCount = computed(
  () => store.getters['favorites/count']
)

const isDark = computed(
  () => theme.global.name.value === 'techDark'
)

const baseUrl = process.env.BASE_URL

const logoSrc = computed(() =>
  isDark.value
    ? `${baseUrl}brand/techstore-logo-dark.svg`
    : `${baseUrl}brand/techstore-logo-light.svg`
)

function setTheme(name) {
  theme.global.name.value = name

  try {
    window.localStorage.setItem(
      'techstore-theme',
      name
    )
  } catch {
    // No-op
  }
}

function toggleTheme() {
  setTheme(
    isDark.value
      ? 'techLight'
      : 'techDark'
  )
}

onMounted(() => {
  try {
    const saved =
      window.localStorage.getItem(
        'techstore-theme'
      )

    if (
      saved === 'techLight' ||
      saved === 'techDark'
    ) {
      setTheme(saved)
    }
  } catch {
    // No-op
  }
})
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--tech-border);
  background: color-mix(
    in srgb,
    rgb(var(--v-theme-background)) 88%,
    transparent
  );
  backdrop-filter: blur(18px);
}

.header-inner {
  min-height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

.brand-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  min-width: 0;
}

.brand-logo {
  display: block;
  width: 205px;
  max-width: 46vw;
  height: auto;
  background: transparent;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.desktop-nav a {
  min-height: 44px;
  padding: 0 17px;
  border-radius: 14px;
  color: var(--tech-muted);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-weight: 800;
  font-size: 0.9rem;
}

.desktop-nav a:hover,
.desktop-nav a.active {
  color: rgb(var(--v-theme-on-surface));
  background: rgba(var(--v-theme-primary), 0.11);
}

.nav-badge {
  min-width: 23px;
  height: 23px;
  padding: 0 6px;
  border-radius: 999px;
  display: inline-grid;
  place-items: center;
  background: rgb(var(--v-theme-primary));
  color: white;
  font-size: 0.72rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 9px;
}

.icon-button {
  width: 44px;
  height: 44px;
  border: 1px solid var(--tech-border);
  border-radius: 14px;
  background: rgba(var(--v-theme-surface-variant), 0.58);
  color: rgb(var(--v-theme-on-surface));
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: 0.2s ease;
}

.icon-button:hover {
  border-color: rgba(var(--v-theme-primary), 0.46);
  color: rgb(var(--v-theme-secondary));
  transform: translateY(-1px);
}

.mobile-menu-button {
  display: none;
}

.mobile-nav {
  display: none;
  padding-bottom: 16px;
  gap: 8px;
}

.mobile-nav a {
  text-decoration: none;
  color: rgb(var(--v-theme-on-surface));
  font-weight: 800;
  padding: 13px 15px;
  border-radius: 12px;
  background: rgba(var(--v-theme-surface-variant), 0.56);
}

@media (max-width: 760px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-button {
    display: grid;
  }

  .mobile-nav {
    display: grid;
  }

  .header-inner {
    min-height: 70px;
  }

  .brand-logo {
    width: 180px;
  }
}
</style>
