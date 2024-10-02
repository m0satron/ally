import { createDirectus, rest, readItems, readItem } from '@directus/sdk'
import type { DirectusBuildingBlock, DirectusExternalLink, ExternalLink } from '~/types/directus/BuildingBlock'
import { useGlobalStore } from './global'

const client = createDirectus('https://fari-cms.directus.app').with(rest())

export const useBuildingBlockStore = defineStore('buildingBlocks', () => {
  const error = ref(null)
  const loading = ref(false)

  const blocks = ref([])
  const selectedBlock = ref()

  async function getBlocks(){
    const data = await client.request(
      readItems('ally_building_block', {
        fields: [
          '*.*', 
        ]
      })
    ) as DirectusBuildingBlock[]
    
    blocks.value = await Promise.all(
      data
      .map(item => { delete item?.alternative_building_blocks; return item})
      .map(parseBlock))
  }

  async function findBlock(id: number) {
    if(selectedBlock.value && selectedBlock.value?.id === id) return 

    if(!blocks.value) return await getBlock(id)
    
    if(blocks.value) {
      const found = blocks.value.find(block => block.id === id )
      if(found) selectedBlock.value = found
      else await getBlock(id)
      return selectedBlock.value
    } 
  }
  
  async function getBlock(id: number) {
    let external_links: DirectusExternalLink[] = []
    let alternative_building_blocks: DirectusBuildingBlock[] = []
    const data = await client.request(
      readItem('ally_building_block', id, {
        fields: [
          '*.*',
        ]
      })
    ) as DirectusBuildingBlock

    if(data.external_links && data.external_links.length) 
      external_links = await client.request(
        readItems('ally_external_link', {
          fields: [
            '*.*', 
          ]
        })
      ) as DirectusExternalLink[]
    
      if(data.alternative_building_blocks && data.alternative_building_blocks.length)
        alternative_building_blocks = await client.request(
          readItems('ally_building_block', {
            fields: [
              '*.*', 
            ], 
            filter: {
              id: {
                _in: data.alternative_building_blocks.map(({id}) => id) || []
              }
            }
          })
        ) as DirectusBuildingBlock[]

        delete alternative_building_blocks?.alternative_building_blocks

    selectedBlock.value = await parseBlock({...data, alternative_building_blocks, external_links})

    console.log(selectedBlock.value)
  }

  return { 
    blocks,
    selectedBlock,
    error, 
    loading,
    findBlock,
    getBlock,
    getBlocks,
  }
    
})

 async function parseBlock(buildingBlock: DirectusBuildingBlock) {
  const { 
    id, 
    cost, 
    effort, 
    involvement, 
    maximum_hours_required, 
    minimum_hours_required, 
    category, 
    translations,
    alternative_building_blocks = [],
    external_links
  } = buildingBlock;

  const { findBuildingBlockCategory } = useGlobalStore()

  const block = {
    title: {},
    description: {},
    sections: [],
  };

  const sectionMap = {};

  const blockCategory = await findBuildingBlockCategory(category?.slug)
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

  console.log({alternative_building_blocks})

  return {
    id,
    cost,
    effort,
    involvement,
    maximum_hours_required,
    minimum_hours_required,
    category: blockCategory,
    alternative_building_blocks: await Promise.all(alternative_building_blocks.map(parseBlock)),
    external_links: external_links.map(parseExternalLink),
    ...block,
  };
}



function parseExternalLink(link: DirectusExternalLink): ExternalLink {
  const { url, slug, translations } = link
  
  const item = {
    url,
    slug,
    title: {},
    description: {}
  } as  ExternalLink;

  translations?.forEach(({languages_code, title, description}) => {
    item.title[languages_code] = title;
    item.description[languages_code] = description;
  })

  return item
}
