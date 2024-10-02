import { createDirectus, rest, readItems, readItem } from '@directus/sdk'
import type { Directuscase, DirectusExternalLink } from '~/types/directus/case'
// import { useGlobalStore } from './global'
// import { parseBlock } from './parsers'

const client = createDirectus('https://fari-cms.directus.app').with(rest())

export const useCasesStore = defineStore('cases', () => {
  const error = ref(null)
  const loading = ref(false)

  const cases = ref([])
  const selectedCase = ref()

  async function getCases(){
    const data = await client.request(
      readItems('ally_case', {
        fields: [
          '*.*', 
        ]
      })
    ) as Directuscase[]
    
    cases.value = await Promise.all(
      data
      .map(item => { delete item?.alternative_cases; return item})
      .map(parseCase))

      console.log('cases',cases.value)
  }

  async function findCase(id: number) {
    if(selectedCase.value && selectedCase.value?.id === id) return 

    if(!cases.value) return await getCase(id)
    
    if(cases.value) {
      const found = cases.value.find(block => block.id === id )
      if(found) selectedCase.value = found
      else await getCase(id)
    } 
  }
  
  async function getCase(id: number) {
    let external_links: DirectusExternalLink[] = []
    let alternative_cases: Directuscase[] = []
    const data = await client.request(
      readItem('ally_case', id, {
        fields: [
          '*.*',
        ]
      })
    ) as Directuscase

    if(data.external_links && data.external_links.length) 
      external_links = await client.request(
        readItems('ally_external_link', {
          fields: [
            '*.*', 
          ]
        })
      ) as DirectusExternalLink[]
    
      if(data.alternative_cases && data.alternative_cases.length)
        alternative_cases = await client.request(
          readItems('ally_case', {
            fields: [
              '*.*', 
            ], 
            filter: {
              id: {
                _in: data.alternative_cases.map(({id}) => id) || []
              }
            }
          })
        ) as Directuscase[]

        delete alternative_cases?.alternative_cases

    selectedCase.value = await parseCase({...data, alternative_cases, external_links})

    console.log(selectedCase.value)
  }

  return { 
    cases,
    selectedCase,
    error, 
    loading,
    findCase,
    getCase,
    getCases,
  }
    
})

async function parseCase(caseItem) {
  console.log({caseItem})

  const { 
    id, 
    translations,
    alternative_cases = [],
    building_blocks_used,
  } = caseItem;

  const block = {
    title: {},
    description: {},
    sections: [],
  };

  const sectionMap = {};

  const { findBlock } = useBuildingBlockStore()

  translations.forEach(({ title, description, content, languages_code }) => {
    block.title[languages_code] = title;
    block.description[languages_code] = description;

    let currentSection = null;
    let sectionIndex = 0;
    const { blocks } = content;

    blocks.forEach(contentBlock => {
      if (contentBlock.type === 'header') {
        currentSection = sectionMap[sectionIndex] || { title: {}, description: {}, action: null };
        currentSection.title[languages_code] = contentBlock.data.text;
        sectionMap[sectionIndex] = currentSection;

        sectionIndex++;
      } else if (contentBlock.type === 'paragraph' && currentSection) {
        currentSection.description[languages_code] = contentBlock.data.text;
      }
    });
  });

  Object.keys(sectionMap).forEach(index => {
    block.sections.push(sectionMap[index]);
  });

  return {
    id,
    alternative_cases: await Promise.all(alternative_cases.map(parseCase)),
    ...block,
    building_blocks_used: await Promise.all(building_blocks_used.map(({id}: {id: number} ) => findBlock(id))  )
  };
}

