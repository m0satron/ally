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

   
    </div>

    <div class="chips">
          <ChipItem 
            v-for="{label, value} in categories"
            :key="value"
            :label="label"
            :class="filters.includes(value) ? 'selected' : ''"
            @click="() => toggleFilterItem(value)"
          />
        </div>

    <div class="content-wrapper">
        <CardDesktop 
          v-for="block in filteredBlocks" 
          :key="block.id"
          :title="block.title[locale]"
          :description="block.description[locale]"
                    :url="block.id"
          @click="navigateTo(`/cases/${block.id}`)"
        />
        
        <CardDesktop 
        v-if="!filteredBlocks.length" 
        title="Not found"
        description="Try another search filter"
      />
        </div>
  </main>
</template>

<script setup lang="ts">
const { locale } = storeToRefs(useGlobalStore())
const { pages } = storeToRefs(useStaticPageStore())
const { getStaticPage } = useStaticPageStore()
const { cases } = storeToRefs(useCasesStore())
const { getCases } = useCasesStore()
const { getBuildingBlockCategories } = useGlobalStore()

onMounted(async() => 
  await Promise.all([getBuildingBlockCategories(),getCases(), getStaticPage('blocks')])
)

// const filteredBlocks = computed(() => {
//   if(!cases.value) return []
//   return cases.value
//     .filter(({building_blocks_used}) => {
//       //implement filter here

//       building_blocks_used.some()
//     })
// })

// const filteredBlocks = computed(() => {
//   if (!cases.value || !filters.value.length) return cases.value;

//   return cases.value.filter((caseItem) => {
//     // Check if the case has building blocks and each block has a category
//     return caseItem.building_blocks_used.some(block => {
//       const blockCategory = block._custom.value.category._custom.value.slug;
//       // Return true if the block's category matches any of the selected filters
//       return filters.value.includes(blockCategory);
//     });
//   });
// });

const filteredBlocks = computed(() => {
  if (!cases.value) return [];

  if (!filters.value.length) return cases.value;

  return cases.value.filter((caseItem) => 
    caseItem.building_blocks_used.some(({category}) => filters.value.includes(category.slug)
    )
  )
});


function toggleFilterItem(category: string) {
  const index = filters.value.indexOf(category);

  if (index > -1) 
    filters.value.splice(index, 1);
  else 
    filters.value.push(category);

}
const filters = ref([])


const categories = [
  { label: 'Governance & values', value: 'governance_values' },
  { label: 'Culture & skills', value: 'culture_skills' },
  { label: 'Communication & involvement', value: 'communication_involvement' },
  { label: 'Methods & processes', value: 'methods_processes ' }
]



</script>

<style scoped lang="scss">
@use '/assets/scss/colors' as *;
@use '/assets/scss/spacing' as *;
@use 'sass:color';

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

.chips {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.chip {
  cursor: pointer;  
  transition: all 200ms ease;
}

.selected {
  color:white;
  background-color: color.adjust($medium-purple, $alpha: -0.15);

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
