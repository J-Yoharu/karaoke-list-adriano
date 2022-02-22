<template>
  <v-footer>
    <v-container fluid class="text-center">
      <v-row no-gutters>
        <v-col cols="12" lg="6">
          <p>Tenha uma lista de música para videokê sempre com você!!!</p>
        </v-col>
        <v-col class="text-center" cols="12" lg="2">
          <div class="d-flex align-center justify-center">
            <a
              href="https://api.whatsapp.com/send?phone=5511975953154&text=Gostaria%20de%20alugar%20uma%20m%C3%A1quina%20com%20voc%C3%AA!"
              target="_blank"
            >
              <v-icon
                v-text="icons.mdiWhatsapp"
                size="40"
                color="light-green"
              ></v-icon>
              <h4>(11)9 7595-3154</h4>
            </a>
          </div>
        </v-col>
        <v-col cols="12" lg="3">
          <div>RAF Atualizado até o pacote {{ versions.raf }}</div>  
          <!-- <div>Berzek Atualizado até o pacote {{ versions.berzek }}</div>   -->
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" class="justify-center">
          © {{ new Date().getFullYear() }} Copyright
          <div>
            <v-icon v-text="icons.mdiGithub"></v-icon>
            <a href="https://github.com/j-yoharu" target="_blank">J-Yoharu</a> /
            <a href="https://github.com/japostulo" target="_blank">Japostulo</a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import { mdiWhatsapp, mdiGithub } from "@mdi/js";

export default {
  data() {
    return {
      icons: {
        mdiWhatsapp,
        mdiGithub
      },
      versions: {}
    };
  },
  async mounted() {
    let rafBd = await fetch("./bd_raf.json", { method: "GET" }).then(resp => {
      return resp.json();
    });
    let berzekBd = await fetch("./bd_berzek.json", { method: "GET" }).then(resp => {
      return resp.json();
    });
    this.versions = {
      raf: rafBd.version,
      berzek: berzekBd.version
    }
  }
};
</script>

<style>
</style>