<template>
  <div class="wrapper">
    <div class="header">
      <button class="hamburger" @click="(event: MouseEvent) => toggleMenu()">
        <span :class="{ open: isMenuOpen }"/>
        <span :class="{ open: isMenuOpen }"/>
        <span :class="{ open: isMenuOpen }"/>
      </button>
      <div class="menu" :class="{ visible: isMenuOpen }">
        <div class="menu-title">
          <LanguageSelector
            :locales="[
              { label: 'EN', value: 'en' },
              { label: 'FR', value: 'fr' },
              { label: 'NL', value: 'nl' }
            ]"
            :locale="locale"
            @change="(e: string) => $emit('change:locale', e)"
          />
          <img
            src="@/assets/close-button.svg"
            class="close-button"
            alt="close-button"
            @click="() => toggleMenu()"
          >
        </div>

        <NavbarMobile class="navbar" :items="$props.items" />
      </div>
      <span class="title"> Ally - Ethical policy toolbox </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Locale } from '~/types/Locale'

defineProps<{ items?: unknown[]; locale: Locale }>()

const [isMenuOpen, toggleMenu] = useToggle(false)
</script>

<style scoped lang="scss">
@use 'src/assets/colors' as *;
@use 'src/assets/spacing' as *;

.wrapper {
  display: flex;
  flex-direction: column;
  position: relative;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    position: sticky;
    top: 0;

    .title {
      margin-right: auto;
      color: $medium-purple;
      text-transform: uppercase;
    }

    .hamburger {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 1.5rem;
      padding: 0.25rem;
      transition: transform 0.3s ease;
      margin-right: auto;

      span {
        display: block;
        width: 1.5rem;
        height: 0.2rem;
        background-color: $medium-purple;
        transition: all 0.3s ease;
      }
    }
  }

  .menu {
    display: flex;
    flex-direction: column;
    background-color: white;
    position: absolute;
    left: -40rem;
    width: 24rem;
    height: 100vh;
    top: 0;
    z-index: 999;
    padding: 2rem;
    transition: all 0.3s ease;
    -webkit-box-shadow: 10px 0px 35px -14px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 10px 0px 35px -14px rgba(0, 0, 0, 0.4);
    box-shadow: 10px 0px 35px -14px rgba(0, 0, 0, 0.4);
    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      .title {
        color: $medium-purple;
        text-transform: uppercase;
      }
      .close-button {
        cursor: pointer;
        margin-left: auto;
      }
    }
  }

  .visible {
    left: -4rem;
  }

  .navbar {
    padding: 2.5rem 0;
  }
}
</style>
