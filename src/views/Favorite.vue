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
            <td class="d-flex">
              <div class="mr-1">{{ music.cantor }}</div>
              <div v-if="music.type">
                <div class="stamp">{{music.type}}</div>
              </div>
              <div  v-else>
                <div class="stamp">Raf</div>
              </div>
            </td>
            <td>{{ music.titulo }}</td>
            <td>{{ music.cod }}</td>
            <td class="text-center">
              <v-btn icon @click="removeFavorite(index, music.type)">
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
      dbTypes: ['raf', 'berzek'],
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
    removeFavorite(index, type = 'raf') {
      let db = JSON.parse(localStorage[type]);

      db.forEach(music => {
        if (music.cod == this.db[index].cod) {
          music.favorite = false;
          return true;
        }
      });
      //remove do front
      this.db.splice(index, 1);

      localStorage[type] = JSON.stringify(db);
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
    let dbs = [];
    this.dbTypes.forEach(db => {
      dbs = dbs.concat(JSON.parse(localStorage[db]).filter(music => {
        return music.favorite == true;
      }));
    });
    this.db = dbs;
  }
};
</script>

<style>
</style>