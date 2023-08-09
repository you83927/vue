<template>
        <h2>Products</h2>
        <table class="table table-bordered">
        <thead> <tr><th>產品編號 </th> <th>產品名稱 </th><th>產品</th>                        <th>製造</th></tr></thead>
        <tbody>
            <tr v-for="{ id, name, price, make } in products" :key="id">
                <td>{{ id }}</td>
                <td>{{ name }}</td>
                <td>{{ price }}</td>
                <td>{{ make }}</td>
            </tr>
        </tbody>
    </table>
    <Paging :totalPages="totalPages" :thePage="datas.start + 1" @childClick="clickHandler"></Paging>
</template>
    
<script setup >
    import axios from 'axios'
import {  ref ,reactive} from 'vue'
import Paging from "../components/Paging.vue";
    const products=ref([])
    const totalPages = ref(0);
    const datas=reactive({
        "start" :0,
        "rows" : 5,
        "name":"",
        "sortOrder":"asc",
        "sortType":"id"
    })
const URL = import.meta.env.VITE_API_JAVAURL
    const loadProducts= async()=>{
        const API = `${URL}products/find`
        const response = await axios.post(API,datas)
        products.value = response.data.list
        console.log(response.value);
    
        totalPages.value = rows.value == 0 ? 1 : Math.ceil(response.data.count / rows.value)
        
    }



    const clickHandler = page => {
    datas.start = page - 1
    loadProducts()
}
loadProducts()


</script>
    
<style scoped>
    
</style>