<template>
  <v-app>
    <!-- <v-app-bar app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title>
        <v-img
          src="./assets/Logo.png"
          max-width="100"
          alt="Logo videoke Augusto"
        ></v-img>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-tabs align-with-title>
        <v-tab>Tab 1</v-tab>
        <v-tab>Tab 2</v-tab>
        <v-tab>Tab 3</v-tab>
      </v-tabs>
    </v-app-bar> -->
    <menuBar />

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <footerBar />
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    menuBar: () => import("./components/essencial/menu.vue"),
    footerBar: () => import("./components/essencial/footer.vue")
  }
};
</script>
<style>
.bg-green {
  background-color: #e1f1de;
}
</style>
