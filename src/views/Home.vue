<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center">
      <img
        src="../assets/Logo.png"
        max-width="100"
        alt="Logo videoke Augusto"
        style="width: 30vw"
    /></v-col>
    <v-col cols="12">
      <List :db="db" />
      <div class="d-flex justify-center mt-10" v-if="loading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import validBd from "../mixins/validBd.js";

export default {
  mixins: [validBd],
  data() {
    return {
      db: [],
      loading: false
    };
  },
  components: {
    List: () => import("../components/List.vue")
  },
  created() {
    this.valid();
  }
};
</script>

<style>
</style>
