<template>
<div >
    <p class="display-1">Atualizações</p>
    <p>As mais recentes internacionais!!!</p>
  <List :searchable="false" :db="db" :loadingAllDb="true"/>
</div>
</template>

<script>
export default {
    data(){
        return {
            db: [],
            qtdLastMusics: 80,
        }
    },
    created(){
        let db = JSON.parse(localStorage.raf)
        this.db = db.slice(db.length - this.qtdLastMusics, db.length);
    },
    components:{
        List: () => import("@/components/List.vue")
    }
}
</script>

<style>

</style>