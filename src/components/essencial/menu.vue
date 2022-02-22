<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <a class="navbar-brand" href="#">Lista de músicas</a>
      <button class="navbar-toggler d-lg-none" @click="collapse = !collapse">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="navbar-collapse"
        :class="collapse ? 'collapse' : ''"
        id="collapsibleNavId"
      >
        <v-tabs
          :vertical="$vuetify.breakpoint.xs"
          :grow="$vuetify.breakpoint.xs"
        >
          <v-tab to="/"
            ><v-icon v-text="icons.mdiHome" class="mr-4"></v-icon>Home</v-tab
          >
          <v-tab to="/berzek">
            <v-icon v-text="icons.mdiBootstrap" class="mr-4"></v-icon
            >Lista Berzek</v-tab
          >
          <v-tab to="/favorites">
            <v-icon v-text="icons.mdiStar" class="mr-4"></v-icon
            >Favoritos</v-tab
          >
           <v-tab to="/updates">
            <v-icon v-text="icons.mdiUpdate" class="mr-4"></v-icon
            >Novidades Raf</v-tab
          >
        </v-tabs>
      </div>
    </nav>
  </div>
</template>

<script>
import { mdiHome, mdiStar, mdiBootstrap } from "@mdi/js";
export default {
  data() {
    return {
      icons: {
        mdiHome,
        mdiStar,
        mdiBootstrap,
      },
      collapse: true
    };
  }
};
</script>

<style>
.navbar img {
  width: 5rem;
}
</style>