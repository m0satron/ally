<template>
  <div class="wrapper">
    <div class="logos">
      <img src="/assets/logos/Logo_KDM_EN_wit 2.png" class="logo">
      <img src="/assets/logos/AI_Flanders_logo.png" class="logo">
      <img src="/assets/logos/FARI_logo_white.png" class="logo">
      <img src="/assets/logos/ULB_VUB_white.png" class="logo">
      <p>&copy; 2021</p>
    </div>
    <div class="menu">
      <a> Privacy</a>
      <a> Cookie policy</a>
      <a> Contact </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
}
.logos {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
}

.logo {
  height: 2.5rem;
  width: auto;
}

.menu {
  color: white;
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 2rem;
}
</style>
