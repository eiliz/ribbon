<template>
  <div id="app">
    <transition name="fade" appear>
      <div>
        <router-view />

        <portal-target name="modals"></portal-target>
      </div>
    </transition>
  </div>
</template>
