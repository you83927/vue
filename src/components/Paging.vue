<template>
            <nav><ul class="pagination">
<li class="page-item" v-for="(value, index) in totalPages" :key="index" @click="clickHandler(value)">
        <a :class="{ 'currentPage': datas.start + 1 === value, 'page-link': true }">{{ value }}</a>
</li></ul></nav>
</template>
    
<script setup >
const props = defineProps({
  totalPages: Number,
  thePage: Number,
});
const emit = defineEmits(["childClick"])
const clickHandler = page => {
    emit("childClick", page)
}



</script>
    
<style scoped>
    .pagination li {
    cursor: pointer;
}
.currentPage {
    background-color: lightblue;
}



</style>