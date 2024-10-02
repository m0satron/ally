<template>
  <div class="card">
    <h2 class="title">{{ title }}</h2>
    <div class="item"> 
      <img src="~/assets/icons/clock-icon.svg" >
      {{ time }} 
    </div>
    <div class="item"> 
      <img src="~/assets/icons/money-icon.svg" >
      {{ cost }} 
    </div>
    <div class="item">
      <img src="~/assets/icons/thunder-icon.svg" >
       {{ effort }} 
    </div>
    <div class="item"> 
      <img src="~/assets/icons/thunder-icon.svg" >
      {{ involvement }} 
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RequirementCardProps } from '~/types/components/Card'



const props = defineProps<RequirementCardProps>()


const localeTitle = {
  en: 'What do you need?',
  fr: 'De quoi avez-vous besoin?',
  nl: 'Wat heb je nodig?'
}

const localeTime = {
  en: 'hrs per employee',
  fr: 'heures par employé',
  nl: 'uren per werknemer',
}

const localeEffort = {
  low: {
    en: 'low effort',
    fr: 'faible effort',
    nl: 'weinig moeite',
  },
  medium: {
  en: 'low effort',
  fr: 'effort moyen',
  nl: 'gemiddelde inspanning',
},
  high: {
    en: 'high effort',
    fr: 'effort élevé',
    nl: 'veel moeite',
  }
}

const localeInvolvement = {
  team: {
    en: 'team',
    fr: 'équipe',
    nl: 'team',
  },
  decision_maker: {
    en: 'decision maker',
    fr: 'décideur',
    nl: 'besluitvormer',
  },
  all: {
    en: 'team, including decision maker',
    fr: 'équipe, y compris le décideur',
    nl: 'team, inclusief beslisser',
  }
}

const localeCost = {
  low: {
    en: 'low cost',
    fr: 'faible coût',
    nl: 'lage kosten',
  },
  medium: {
    en: 'medium cost',
    nl: 'gemiddelde kosten',
    fr: 'coût moyen'
  },
  high: {
    en: 'high cost',
    nl: 'hoge kosten',
    fr: 'coût élevé'
  }
}


const title = computed(()=> localeTitle[props.locale])

const time = computed(() => 
`${props.minHrs}-${props.maxHrs} ${localeTime[props.locale]}`
)

const effort = computed(() => localeEffort?.[props.effort]?.[props.locale])

const cost = computed(() =>  localeCost?.[props.cost]?.[props.locale])

const involvement = computed(() => localeInvolvement?.[props.involvement]?.[props.locale])

</script>

<style scoped lang="scss">
@use '/assets/scss/colors' as *;
@use '/assets/scss/typography' as *;
@use 'sass:color';

.card {
  width: 24rem;
  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  color: $text-color;
  background-color: white;
  border-radius: 0.315rem;
  padding: 1.25rem;
  cursor: default;
  border: 1px solid $light-blue;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
}

.item {
  display: flex;
  align-items: center;
  font-weight: $text-medium-bold;
  gap: 1rem
}

img {
  max-width: 2rem;
}

</style>
