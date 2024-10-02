<template>
  <main class="main">
    <div class="about-container">
      <PageTitle title="Page title" class="about-container__title" />
      <p class="about-container__description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      </p>
    </div>
    <!-- <PageTitle v-if="title" v-bind="{ title }" />
    <p v-if="description">{{ description }}</p> -->

    <!-- <div
      class="content-wrapper"

    >
      <div class="logos">//logos here</div>

      <PageSection
        v-bind="{
          title: section.title,
          description: section.description
        }"
      />

      <template v-if="cards && cards.length">
        <div class="card-wrapper">
          <div v-for="card in cards" :key="card.url" class="card">
            <img :src="card.image" class="image" />
          </div>
        </div>
        <CardContainer
          v-bind="{
            cards,
            mobile
          }"
        />
      </template>
    </div>
    <BannerDesktop v-if="banner" v-bind="banner" /> -->
  </main>
</template>

<script setup lang="ts">
// import FariLogo from '~/assets/logos/fari-logo.svg'
// import KDMLogo from '~/assets/logos/knowledge-center-logo.svg'
// import type { Breakpoints } from '@/types/Breakpoints'

// const {
//   title,
//   description
//   // hero,
//   // cards,
//   // banner
//   // sections
// } = useGetPageData()

// const bp = inject<Breakpoints>('breakpoints') as Breakpoints

// const { breakpoints } = bp

// const mobile = computed(() => breakpoints.isSmallerOrEqual('laptop'))

// const section = {
//   title: 'About the creators',
//   description: 'Text about collaboration'
// }

// const cards = [
//   {
//     image: FariLogo,
//     url: 'path/to/url'
//   },
//   {
//     image: KDMLogo,
//     url: 'path/to/url'
//   }
// ]

// const banner = {
//   title: 'Unsure where your journey starts?',
//   description:
//     'Check what policy actions have priority on your path towards an ethical policy on AI',
//   url: 'path/to/url',
//   linkDescription: 'Discover your own path'
// }
</script>

<style scoped lang="scss">
@use '/assets/scss/colors' as *;
@use '/assets/scss/spacing' as *;

.about-container {
  background-color: $deep-purple;
  border-radius: 0.8rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  height: 100%;

  &__title {
    color: white;
  }
  &__description {
    color: white;
  }
}

.content-wrapper {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 2rem;
  gap: 3rem;
}

.content-wrapper > *:first-child {
  flex: 1;
}

.content-wrapper > *:nth-child(2) {
  flex: 2;
}

.column {
  flex-direction: column;
}

.card-wrapper {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.card {
  height: 16rem;
  color: $text-color;
  background-color: white;
  border-radius: 0.315rem;
  padding: 1.25rem;
  border: 1px solid $light-blue;
  flex: calc(50% - 2rem);
  display: flex;
  margin-bottom: 1rem;
  .image {
    margin-top: auto;
  }
}
</style>
