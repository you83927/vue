<template>
<h1>隱私設定</h1>
<form action="">

    <div  class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
        <label class="form-check-label" for="flexSwitchCheckDefault">Nick Name</label>
    </div>
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" >
        <label class="form-check-label" for="flexSwitchCheckDefault">Gender</label>
</div>
<div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" >
    <label class="form-check-label" for="flexSwitchCheckDefault">Birthday</label>
</div>
<div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"  >
    <label class="form-check-label" for="flexSwitchCheckDefault">Email</label>
</div>
<button type="submit" class="btn btn-info" @click="showUserDetial">送出</button>

</form>
</template>
    
<script setup>
     import { ref ,computed} from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    const router = useRouter();

const user = ref({});
  
const showNickName = ref(false);
showNickName.value = user.value.showNickName

const fetchUserData = async () => {

  const response = await axios.get('http://localhost:8080/user/detial', {withCredentials:true});
    user.value =response.data.data
    
}
fetchUserData()

const genderString = computed(() => {
  if( user.value.gender===1){
    return "男"
  }
  if( user.value.gender===2){
    return "女"
  }
  if( user.value.gender===0){
    return "其他"
  }
  
});
const identityString = computed(() => {
  if( user.value.identity===0){
    return "管理員"
  }
  if( user.value.identity===1){
    return "普通會員"
  }
  if( user.value.identity===2){
    return "店主"
  }
  
})

const showUserDetial = ()=>{
  router.push({ name: "UserDetial"})
}


</script>
    
<style>
    
</style>