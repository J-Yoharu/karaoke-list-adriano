<template>
  <v-container>
    <v-row dense class="d-flex justify-content-center">
      <v-col cols="12" lg="8">
        <v-text-field
          rounded
          outlined
          dense
          autocomplete="off"
          v-model="search"
          @keyup="autoComplete"
          @keyup.enter="selectFirstAndSearch()"
          placeholder="Música ou Cantor"
          label="Pesquisar"
          :append-icon="icons.mdiMagnify"
          hide-details
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" lg="8">
        <v-list class="col-12 position-absolute p-0 mt-1" style="z-index: 3">
          <v-list-item
            dense
            class="border-bottom"
            v-for="(music, index) in autoCompleteValue.slice(0, 10)"
            :key="index"
            @click="searchMusic(music)"
          >
            {{ music.data }} ({{ music.label }})
          </v-list-item>

          <div v-if="autoCompleteValue.length === 0 && search.length > 1">
            <v-list-item class="d-flex justify-center">
              Não achamos nenhum cantor ou música com o nome de
              <span class="font-weight-bold">: "{{ search }}". </span>
            </v-list-item>
            <!-- <v-list-item>Você não quis dizer</v-list-item> -->
          </div>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiMagnify } from "@mdi/js";

export default {
  props: ["data"],
  data() {
    return {
      icons: {
        mdiMagnify
      },
      search: "",
      autoCompleteValue: "",
      autoCompleteData: []
    };
  },
  methods: {
    searchMusic(music) {
      this.clearAutoComplete();
      this.$emit("loading", false);
      const result = this.filter(music);
      this.$emit("search", result);
      this.$emit("loading", false);
    },
    selectFirstAndSearch() {
      let music = this.autoCompleteValue[0];
      if (music) {
        this.searchMusic(music);
        return;
      }
    },
    filter(music) {
      return this.data.filter(song => {
        return song[music.type] === music.data;
      });
    },
    undecorate(string) {
      if (string != undefined) {
        string = string
          .toLowerCase()
          .trim()
          .replace(/\s/g, "");
        string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return string;
      }
      return false;
    },
    autoComplete() {
      this.autoCompleteShow = true;
      if (this.search.length == 0) {
        this.autoCompleteValue = "";
        return false;
      }
      // Atribui o autoCompleteValue correspondente do input se encontrado
      let result = [];
      let search = this.undecorate(this.search);
      this.autoCompleteData.forEach(music => {
        if (music.search.startsWith(search)) {
          result.push(music);
        }
      });
      this.autoCompleteValue = result;
    },
    clearAutoComplete() {
      this.autoCompleteValue = [];
      this.search = "";
    },
    loadAutoCompleteData() {
      if (this.data == null) {
        return;
      }
      this.$emit("loading", true);
      //Retira cantores repeditos;
      var singer = [];
      const musics = [];

      this.data.forEach(music => {
        singer.includes(music.cantor) ? false : singer.push(music.cantor);
        musics.push({
          search: this.undecorate(music.titulo),
          data: music.titulo,
          type: "titulo",
          label: "Música"
        });
      });
      singer = singer.map(singer => {
        return {
          search: this.undecorate(singer),
          data: singer,
          type: "cantor",
          label: "Cantor"
        };
      });

      this.autoCompleteData.push(...singer);
      this.autoCompleteData.push(...musics);
      this.$emit("loading", false);
    }
  },

  created() {
    this.loadAutoCompleteData();
  },
  watch: {
    data() {
      //demora para passar o data, então tem que deixar
      //monitorando para chamar a funcao de carregar o autocomplete.
      this.loadAutoCompleteData();
    }
  }
};
</script>

<style>
</style>