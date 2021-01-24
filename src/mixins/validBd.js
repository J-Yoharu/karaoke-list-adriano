export default {
  methods: {
    valid() {
      let db = localStorage.dbKaraoke;
      if (db === undefined || db === null) {
        console.log("não existe bd salvo, criando bd local...");
        this.loadSongs();
        return;
      }
      this.getCurrentVersion();
      console.log("existe bd local, validando versão...");
      return;
    },
    async loadSongs() {
      this.loading = true;
      this.$axios("./bd.json")
        .then((res) => {
          this.db = res.data.data.map((song) => {
            return {
              cantor: this.textFormat(song.cantor),
              titulo: this.textFormat(song.titulo),
              cod: this.textFormat(song.cod),
              favorite: false,
            };
          });
          localStorage.dbKaraoke = JSON.stringify(this.db);
          localStorage.karaokeVersion = res.data.version;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    textFormat(text) {
      return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
    },
    compareAndUpdate(current, update) {
      current.push(...update.splice(current.length, update.length));
      return current;
    },
    getCurrentVersion() {
      this.$axios("./bd.json").then((resp) => {
        let version = localStorage.karaokeVersion;
        if (version === undefined || version === null) {
          localStorage.karaokeVersion = resp.data.version;
          this.updateDb(resp.data.data);
          return;
        }
        if (resp.data.version == localStorage.karaokeVersion) {
          console.log("TÁ ATUALIZADO SEU DB!");
          this.db = JSON.parse(localStorage.dbKaraoke);

          return;
        }
        console.log("não tá atualizado seu bd, vamos atualizar...");
        localStorage.karaokeVersion = resp.data.version;
        this.updateDb(resp.data.data);
        console.log("Atualizado.");
      });
    },
    updateDb(newData) {
      let updatedDb = this.compareAndUpdate(
        JSON.parse(localStorage.dbKaraoke),
        newData
      );
      localStorage.dbKaraoke = JSON.stringify(updatedDb);
      this.db = JSON.parse(localStorage.dbKaraoke);
    },
  },
};
