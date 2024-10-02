<template>
  <main class="main">
    <Suspense>
      <HeroDesktop 
        dense
        :title="selectedBlock?.title[locale]" 
        :description="selectedBlock?.description[locale]"
        :categories="[selectedBlock?.category.title[locale]]"
        />
    </Suspense>
    <Suspense>
    <div class="page-items">
      <div class="sections">
        <PageSection
          v-for="section in selectedBlock?.sections" 
          :key="section.title[locale]"
          :title="section.title[locale]"
          :description="section.description[locale]"
          />

      </div>
      <div class="sidebar">
          <CardBlockRequirement
            class="requirements"
            :locale="locale"
            :cost="selectedBlock?.cost"
            :effort="selectedBlock?.effort"
            :involvement="selectedBlock?.involvement"
            :min-hrs="selectedBlock?.minimum_hours_required"
            :max-hrs="selectedBlock?.maximum_hours_required"
            />

            <h2
            v-if="selectedBlock?.alternative_building_blocks.length"
              class="alternatives-title"> {{ alterativesTitle[locale]}} </h2>

            <CardDesktop 
              v-for="block in selectedBlock?.alternative_building_blocks" 
              :key="block.id"
              :title="block.title[locale]"
              :description="block.description[locale]"
              :categories="[block.category?.title[locale]]"
              :url="block.id"
              @click="navigateTo(`/building-blocks/${block.id}`)"
        />
      </div>

    </div>
  </Suspense>
    <Suspense>
    <div class="links">
      <CardLink 
              v-for="link in selectedBlock?.external_links" 
              :key="link.id"
              :title="link.title[locale]"
              :description="link.description[locale]"
              :url="link.id"
              @click="navigateTo(`/building-blocks/${link.id}`)"
        />
    </div>
      </Suspense>

      <BannerDesktop 
        v-if="banner" 
        class="banner"
        :title="banner.title[locale]"
        :description="banner.description[locale]"
        :link-description="banner.action.label[locale]"
        :url="banner.action.url"
        
        />
  </main>
</template>
<script setup lang="ts">
const { locale, banner } = storeToRefs(useGlobalStore())
const { selectedBlock } = storeToRefs(useBuildingBlockStore())
const { findBlock } = useBuildingBlockStore()
const route = useRoute()


onMounted(async () => await findBlock(route.params.id))


const alterativesTitle = {
  en: 'Alternative building blocks',
  nl: 'Alternatieve bouwstenen',
  fr: 'Blocs de construction alternatifs'
}

</script>

<style scoped lang="scss">
@use '/assets/scss/colors' as *;
@use '/assets/scss/spacing' as *;


.page-items {
  display: flex;
  margin: 2rem 0;
  justify-content: space-between;
}


.sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 50%;
}

.requirements {
  min-width: 20%;
}

.banner, .links {
  margin-bottom: 2rem;
}


.sidebar {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2rem;
}

.alternatives-title {
  align-self: center;
  font-weight: bold
}

</style>
