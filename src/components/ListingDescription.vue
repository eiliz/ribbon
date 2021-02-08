<template functional>
  <section :class="data.staticClass">
    <div v-for="(section, i) in props.listing.Kenmerken" :key="i">
      <h3>{{ section.Titel }}</h3>
      <div v-for="(subsection, i) in section.Kenmerken" :key="i">
        {{ subsection }}
      </div>
    </div>
  </section>
</template>
