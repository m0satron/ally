<template>
  <main class="main">
    <HeroDesktop v-bind="pageData.hero" />
    <div
      class="content-wrapper"
    >
      <div class="section">
        <PageSection 
          v-for="section in pageData.sections"
          :key="section.title"
          v-bind="section"
          />
        <ButtonSecondary 
          :label="CTALabel[locale]" 
          icon="arrow-right" 
          class="action"
          @click="navigateTo('/building-blocks')"
        />
      </div>
      <div class="categories-overview">
        <div v-for="card in blockData" :key="card.title" class="card">
          <h2 class="title">{{ card.title }}</h2>
          <p>{{ card.description }}</p>
        </div>
      </div>
    </div>
    <BannerDesktop v-if="banner" v-bind="pageData.banner" />
  </main>
</template>

<script setup lang="ts">

definePageMeta({
  name: 'pathfinder',
})

const { getBuildingBlockCategories } = useGlobalStore()
const { getStaticPage } = useStaticPageStore()
const { locale, buildingBlockCategories, banner } = storeToRefs(useGlobalStore())
const { pages } = storeToRefs(useStaticPageStore())

onMounted(getBuildingBlockCategories)
onMounted( async () => getStaticPage('home'))

const pageData = computed(() => {
  if (!pages.value.home )return {
    title: null,
    sections: []
  }

  const title = pages.value.home?.title[locale.value]

  const sections = pages.value.home?.sections.map((section) => ({
    title: section.title[locale.value],
    description: section.description[locale.value]
  }))


  const hero =  {
    media: pages.value.home.hero?.media,
    title: pages.value.home.hero?.title[locale.value],
    description: pages.value.home.hero?.description[locale.value]
  }

  const pageBanner = {
    title: banner.value?.title[locale.value],
    description: banner.value?.description[locale.value],
    action: {
      label: banner.value?.action.label[locale.value],
      url: banner.value?.action.url
    }
  }

  return {
    title,
    sections,
    hero,
    banner: pageBanner
  }
})

const blockData = computed(() => {
  if(!buildingBlockCategories.value) return []

  return buildingBlockCategories.value.map(({title, description}) => ({
    title: title[locale.value],
    description: description[locale.value]
  }))
})


const CTALabel = {
  fr: 'découvrir tous les blocs de construction',
  en: 'discover all building blocks',
  nl: ';ontdek alle bouwstenen'
}

</script>

<style scoped lang="scss">
@use '/assets/scss/colors' as *;
@use '/assets/scss/spacing' as *;

.content-wrapper {
  display: flex;
  justify-content: space-between;
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

.action {
  margin-top: 1rem;
  gap: 1rem;
}

.categories-overview {
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
  margin-bottom: 1rem;
  .title {
    font-weight: bold;
  }
}
</style>
