<template>
  <main class="main">
    <div class="search-container">
      <div class="search-container__text-content">
        <h1 v-if="pages.blocks" class="search-container__title" >
          {{ pages.blocks.title[locale] }}
        </h1>
        <p v-if="pages.blocks" class="search-container__description">
          {{ pages.blocks?.sections?.[0].description[locale] }}
        </p>

      </div>

      <div class="search-filter">
        <div class="search-bar">
          <FormSearchBar v-model="searchTerm" @submit="submitSearch" />
          <ButtonPrimary label="Search" icon="arrow-right" @click="submitSearch" />
        </div>

        <div class="dropdowns">
          <FormDropDown v-model="selectedCategory" :options="categories" placeholder="Category" />
          <FormDropDown v-model="selectedCost" :options="cost" placeholder="Budget" />
          <FormDropDown v-model="selectedDifficulty" :options="difficulty" placeholder="Difficulty" />
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <template v-if="!selectedCategory || selectedCategory.value === 'governance_values'">

        <PageSection v-bind="governanceSection" />
    
        <CardDesktop 
          v-for="block in governanceBlocks" 
          :key="block.id"
          :title="block.title[locale]"
          :description="block.description[locale]"
          :categories="[block.category.title[locale]]"
          :url="block.id"
          @click="navigateTo(`/building-blocks/${block.id}`)"
        />
        <CardDesktop 
        v-if="!governanceBlocks.length" 
        title="Not found"
        description="Try another search filter"
      />
    </template>

    <template v-if="!selectedCategory || selectedCategory.value === 'culture_skills'">

      <PageSection v-if="cultureSection" v-bind="cultureSection" />

      <CardDesktop 
        v-for="block in cultureBlocks" 
        :key="block.id"
        :title="block.title[locale]"
        :description="block.description[locale]"
        :categories="[block.category.title[locale]]"
        :url="block.id"
        @click="navigateTo(`/building-blocks/${block.id}`)"
      />
      <CardDesktop 
        v-if="!cultureBlocks.length" 
        title="Not found"
        description="Try another search filter"
      />

    </template>

    <template 
      v-if="!selectedCategory || selectedCategory.value === 'communication_involvement'"
    >
        <PageSection 
          v-if="communicationSection" 
          v-bind="communicationSection" 
        />

        <CardDesktop 
          v-for="block in communicationBlocks" 
          :key="block.id"
          :title="block.title[locale]"
          :description="block.description[locale]"
          :categories="[block.category.title[locale]]"
          :url="block.id"
          @click="navigateTo(`/building-blocks/${block.id}`)"
        />
        <CardDesktop 
        v-if="!cultureBlocks.length" 
        title="Not found"
        description="Try another search filter"
      />

      </template>
      <template v-if="!selectedCategory || selectedCategory.value === 'methods_processes'">
        <PageSection v-if="methodsSection" v-bind="methodsSection" />

          <CardDesktop 
            v-for="block in methodsBlocks" 
            :key="block.id"
            :title="block.title[locale]"
           :description="block.description[locale]"
            :categories="[block.category.title[locale]]"
                      :url="block.id"
            @click="navigateTo(`/building-blocks/${block.id}`)"
          />
          <CardDesktop 
        v-if="!cultureBlocks.length" 
        title="Not found"
        description="Try another search filter"
      />
    </template>

        </div>
  </main>
</template>

<script setup lang="ts">
const { locale, buildingBlockCategories } = storeToRefs(useGlobalStore())
const { pages } = storeToRefs(useStaticPageStore())
const { getStaticPage } = useStaticPageStore()
const { blocks } = storeToRefs(useBuildingBlockStore())
const { getBlocks } = useBuildingBlockStore()
const { getBuildingBlockCategories } = useGlobalStore()

onMounted(async() => 
  await Promise.all([getBuildingBlockCategories(),getBlocks(), getStaticPage('blocks')])
)

const governanceSection = computed(() => {
  if(!buildingBlockCategories.value) return
  const section = buildingBlockCategories.value?.find(({slug }) => slug === 'governance_values')
  return {
    title: section?.title[locale.value],
    description: section?.description[locale.value]
  }
})

const governanceBlocks = computed(() => {
  if(!blocks.value) return []

  return blocks.value
    .filter(({category}) => category?.slug ===  'governance_values')
    .filter((block) => {
      if(!selectedDifficulty.value) return true
      return selectedDifficulty.value?.value === block.effort
    })
    .filter(block => {
      if(!selectedCost.value) return true
      return selectedCost.value?.value === block.cost
    })
    .filter(block => {
      if(!selectedCost.value) return true
      return selectedCost.value?.value === block.cost
    })
})


const cultureSection = computed(() => {
  if(!buildingBlockCategories.value) return
  const section = buildingBlockCategories.value?.find(({slug }) => slug === 'culture_skills')
  return {
    title: section?.title[locale.value],
    description: section?.description[locale.value]
  }
})

const cultureBlocks = computed(() => {
  if(!blocks.value) return []

  return blocks.value
    .filter(({category}) => category?.slug ===  'culture_skills')
    .filter((block) => {
      if(!selectedDifficulty.value) return true
      return selectedDifficulty.value?.value === block.effort
    })
    .filter(block => {
      if(!selectedCost.value) return true
      return selectedCost.value?.value === block.cost
    })
    .filter(block => {
      if(!selectedCost.value) return true
      return selectedCost.value?.value === block.cost
    })
})


const communicationSection = computed(() => {
  if(!buildingBlockCategories.value) return
  const section = buildingBlockCategories.value?.find(({slug }) => slug === 'communication_involvement')
  return {
    title: section?.title[locale.value],
    description: section?.description[locale.value]
  }
})

const communicationBlocks = computed(() => {
  if(!blocks.value) return []

  return blocks.value
    .filter(({category}) => category?.slug ===  'communication_involvement')
    .filter((block) => {
      if(!selectedDifficulty.value) return true
      return selectedDifficulty.value?.value === block.effort
    })
    .filter(block => {
      if(!selectedCost.value) return true
      return selectedCost.value?.value === block.cost
    })
    .filter(block => {
      if(!selectedCost.value) return true
      return selectedCost.value?.value === block.cost
    })
})

const methodsSection = computed(() => {
  if(!buildingBlockCategories.value) return
  const section = buildingBlockCategories.value?.find(({slug }) => slug === 'methods_processes')
  return {
    title: section?.title[locale.value],
    description: section?.description[locale.value]
  }
})

const methodsBlocks = computed(() => {
  if(!blocks.value) return []

  return blocks.value
    .filter(({category}) => category?.slug ===  'methods_processes')
    .filter((block) => {
      if(!selectedDifficulty.value) return true
      return selectedDifficulty.value?.value === block.effort
    })
    .filter(block => {
      if(!selectedCost.value) return true
      return selectedCost.value?.value === block.cost
    })
    .filter(block => {
      if(!selectedCost.value) return true
      return selectedCost.value?.value === block.cost
    })
})


const searchTerm = ref<string>('')

const categories = [
  { label: 'Governance & values', value: 'governance_values' },
  { label: 'Culture & skills', value: 'culture_skills' },
  { label: 'Communication & involvement', value: 'communication_involvement' },
  { label: 'Methods & processes', value: 'methods_processes ' }
]

const cost = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' }
]

const difficulty = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' }
]

const selectedCategory = ref<Option | undefined>()
const selectedCost = ref<Option | undefined>()
const selectedDifficulty = ref<Option | undefined>()

</script>

<style scoped lang="scss">
@use '/assets/scss/colors' as *;
@use '/assets/scss/spacing' as *;

.search-container {
  background-color: $deep-purple;
  border-radius: 0.8rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 10rem;
  height: 100%;
  margin-bottom: 4rem;

  &__text-content {
    display: flex;
    flex-direction: column;
    gap: 1 rem;
    margin-bottom: 2rem;
  }

  &__title {
    color: white;
    text-align: center;
    font-size: 2.2rem;
    font-weight: 700;
  }
  &__description {
    color: white;
    text-align: center;
    font-size: 1.3rem;
  }
}

.search-filter {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.search-bar {
  display: flex;
  gap: 8px;
  padding-bottom: 1rem;
  input {
    flex: 1;
    padding: 8px;
    border-radius: 0.5rem;
    border: none;
  }
}

.dropdowns {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.content-wrapper {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 2rem;
  gap: 3rem;
}

.categories-overview {
  margin-top: 1rem;
  flex: 50%;
}

.content-wrapper > *:first-child {
  flex: 1;
}

.content-wrapper > *:nth-child(2) {
  flex: 2;
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
