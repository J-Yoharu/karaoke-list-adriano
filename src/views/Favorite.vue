<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="db"
      disable-pagination
      :mobile-breakpoint="0"
      hide-default-footer
      no-data-text="Pesquise por um cantor ou música"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="(music, index) in items"
            :key="index"
            :class="index % 2 == 0 ? 'bg-green' : ''"
          >
            <td>{{ music.cantor }}</td>
            <td>{{ music.titulo }}</td>
            <td>{{ music.cod }}</td>
            <td class="text-center">
              <v-btn icon @click="removeFavorite(index)">
                <v-icon v-text="icons.mdiDelete"></v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <div v-if="db.length == 0" class="text-center mt-10">
      Você ainda não tem músicas nos favoritos, vá na tela inicial
      <router-link to="/" tag="a"> clicando aqui </router-link> e depois e
      clique no icone de <v-icon icon v-text="icons.mdiPlus"></v-icon> ao lado
      da música para adicionar músicas aqui!!!
    </div>
    <div class="fixed-bottom">
      <v-snackbar color="green" :value="snackbar.value" absolute bottom right>
        {{ snackbar.message }}
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { mdiStar, mdiDelete, mdiPlus } from "@mdi/js";
export default {
  components: {},
  data() {
    return {
      icons: {
        mdiStar,
        mdiDelete,
        mdiPlus
      },

      snackbar: {
        value: false,
        message: null
      },

      db: [],
      headers: [
        {
          text: "Cantor",
          value: "cantor"
        },
        {
          text: "Música",
          value: "titulo"
        },
        {
          text: "Código",
          value: "cod"
        },
        {
          text: "",
          value: "actions",
          sortable: false
        }
      ]
    };
  },
  methods: {
    removeFavorite(index) {
      let db = JSON.parse(localStorage.dbKaraoke);

      db.forEach(music => {
        if (music.cod == this.db[index].cod) {
          music.favorite = false;
          return true;
        }
      });
      //remove do front
      this.db.splice(index, 1);

      localStorage.dbKaraoke = JSON.stringify(db);
      this.showSnackBar("Musica removida dos favoritos com sucesso!");
    },
    showSnackBar(message) {
      this.snackbar.value = true;
      this.snackbar.message = message;
      setTimeout(() => {
        this.clearSnackBar();
      }, 1000);
    },
    clearSnackBar() {
      this.snackbar.value = false;
      this.snackbar.message = null;
    }
  },
  created() {
    let db = JSON.parse(localStorage.dbKaraoke).filter(music => {
      return music.favorite == true;
    });
    console.log(db);
    this.db = db;
  }
};
</script>

<style>
</style>