export default {
  methods: {
    valid(type = 'raf') {
      let db = localStorage[type];
      if (db === undefined || db === null) {
        console.log("não existe bd salvo, criando bd local...");
        this.loadSongs(type);
        return;
      }
      this.getCurrentVersion(type);
      console.log("existe bd local, validando versão...");
      return;
    },
    async loadSongs(type) {
      this.loading = true;
      this.$axios(`./bd_${type}.json`)
        .then((res) => {
          this.db = res.data.data.map((song) => {
            return {
              cantor: this.textFormat(song.cantor),
              titulo: this.textFormat(song.titulo),
              cod: this.textFormat(song.cod),
              favorite: false,
              type,
            };
          });
          localStorage[type] = JSON.stringify(this.db);
          localStorage[`${type}_version`] = res.data.version;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    textFormat(text) {
      if(typeof text == 'number') text = text.toString();
      return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
    },
    compareAndUpdate(current, update) {
      current.push(...update.splice(current.length, update.length));
      return current;
    },
    getCurrentVersion(type) {
      this.$axios(`./bd_${type}.json`).then((resp) => {
        let version = localStorage[`${type}_version`];
        if (version === undefined || version === null) {
          localStorage[`${type}_version`] = resp.data.version;
          this.updateDb(resp.data.data, type);
          return;
        }
        if (resp.data.version == localStorage[`${type}_version`]) {
          console.log("TÁ ATUALIZADO SEU DB!");
          this.db = JSON.parse(localStorage[type]);

          return;
        }
        console.log("não tá atualizado seu bd, vamos atualizar...");
        localStorage[`${type}_version`] = resp.data.version;
        this.updateDb(resp.data.data, type);
        console.log("Atualizado.");
      });
    },
    updateDb(newData, type) {
      let updatedDb = this.compareAndUpdate(
        JSON.parse(localStorage[type]),
        newData
      );
      localStorage[`${type}_version`] = JSON.stringify(updatedDb);
      this.db = JSON.parse(localStorage[type]);
    },
  },
};
