<template>

<div class="common-layout">

  <el-container>
      <el-aside width="200px">

        <el-scrollbar>
        <el-menu >
          <el-menu-item @click="showMain('detial')">資料</el-menu-item>
          <!-- <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>Navigator One
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="1-1">Option 1</el-menu-item>
              <el-menu-item index="1-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="1-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>Option4</template>
              <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu> -->
          <el-menu-item @click="showMain('article')">我的文章</el-menu-item>
          <!-- <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>Navigator Two
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="2-1">Option 1</el-menu-item>
              <el-menu-item index="2-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>Option 4</template>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu> -->
         
        </el-menu>
      </el-scrollbar>






      </el-aside>
      <el-main>
        <div v-if="aaa=='detial'">

          <h1>基本資料</h1>
          <div class="user-photo-container1">
            <img :src="decodedPhoto"  alt="User Photo" class="user-photo mx-auto d-block" >
            
            
          </div>
          
          
          <ul class="list-group list-group-flush" v-if="user">
            <li class="list-group-item" >使用者 : {{ user.username}}</li>
            <li class="list-group-item">身份 : {{ identityString}}</li>
            
            <li class="list-group-item" v-if="showNickName" >暱稱 : {{showNickName}}</li>
            <li class="list-group-item" v-else-if="showNickName==''" >暱稱 : {{showNickName}}</li>
            
            <li class="list-group-item" v-if="genderString=='男'">性別 : {{ genderString}}</li>
            <li class="list-group-item" v-else-if="genderString=='女'">性別 : {{ genderString}}</li>
            <li class="list-group-item" v-else-if="genderString==''">性別 : {{ genderString}}</li>
            
            
            
            <li class="list-group-item" v-if="showBirthday">生日 : {{ showBirthday}}</li>
          <li class="list-group-item" v-else-if="showBirthday==''">生日 : {{ showBirthday}}</li>
          
          
          <li class="list-group-item" v-if="showEmail">信箱 : {{ showEmail}}</li>
          <li class="list-group-item" v-else-if="showEmail==''">信箱 : {{ showEmail}}</li>
          
        </ul>
        
        <div v-else>
          Loading user data...
</div>
<el-button type="info" plain class="btn btn-info m-3"  @click="showModify">編輯基本資料</el-button>
<el-button type="warning" plain class="btn btn-info" @click="showPrivacySetting">更改密碼</el-button>

</div>

<div v-else-if="aaa=='article'">

  <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
    <div class="demo-input-size">
      <el-input
      v-model="Rinput"
      class="w-50 m-2"
      size="large"
      placeholder="Please Input"
      :prefix-icon="Search"
      @input="searchRestaurant(bbb)"
      /> 
      <el-button type="primary" @click="changeType(0)">食譜</el-button>
    <el-button type="success" @click="changeType(1)">食記</el-button>
    <el-button style="float: right;" class="m-3"><i class='bx bx-edit'></i></el-button>

    </div>

    <div v-if="bbb==1">
    <div class="scrollable-container" ref="AdataList" @scroll="handleScroll(bbb)">
        <ul >
          <li v-for="article in articles" :key="article[0].id" style="list-style-type: none;">
            
            <div class="accordion m-3" :id="article[0].id">
              <div class="accordion-item" >
                
    <el-card class="box-card" :id="'heading-' + article[0].id" >
      
      <div class="" >
        <el-button type="info" plain  @click="deleteFavoriteArticle(article[0].id)" style="float: right;" :icon="Delete"/>
      </div>
      
      
      <div class="card-header"  style="display: flex;">
        
        <div style="flex: 1;">
          <div class="d-flex align-items-center justify-content-between m-3">
            <a href="" style="font-size:xx-large"> 
              {{ article[0].title.length > 20? article[0].title.substring(0, 20) + `...` : article[0].title }}
     
            </a>
          </div>
        </div>
        <div style="flex ;" >
          <div  class="user-photo-container2">
            <a @click="goToOrderUser(article[1].id)">
              <img :src="article[1].photo" alt="" class="user-photo mx-auto d-block">
            </a>
          </div>
        </div>
        
        
        <div style="flex ;" class="m-3">
          <div   style="font-size:x-large">
            <a  @click="goToOrderUser(article[1].id)">
              {{article[1].username}}
            </a>
          </div>
          
          <div   style="font-size:smaller">
            {{article[1].nickname}}
          </div>
        </div>
        <div style="flex ;">
          <div class="m-3" >
            <a >
              {{ article[0].type ==1 ?"#食記":"#食譜"}}
            </a>
          </div>
        </div>
        
        <div style="flex ;">
          <div class="m-3" >
            {{ article[0].createdDate }}
          </div>
        </div>
        
        
      </div>
      <div class="accordion-body" style="font-size:larger;">
        {{ article[0].context.length > 20? article[0].context.substring(0, 20) + `...` : article[0].context }}
      </div>
      
    </el-card>
    
  </div>
</div>

</li>
</ul>



</div>
</div>


    <div v-else-if="bbb==0">
    <div class="scrollable-container" ref="AdataList" @scroll="handleScroll(bbb)">
        <ul >
          <li v-for="article in articles" :key="article[0].id" style="list-style-type: none;">
            
            <div class="accordion m-3" :id="article[0].id">
              <div class="accordion-item" >
                
    <el-card class="box-card" :id="'heading-' + article[0].id" >
      
      <div class="" >
        <el-button type="info" plain  @click="deleteFavoriteArticle(article[0].id)" style="float: right;" :icon="Delete"/>
      </div>
      
      
      <div class="card-header"  style="display: flex;">
        
        <div style="flex: 1;">
          <div class="d-flex align-items-center justify-content-between m-3">
            <a href="" style="font-size:xx-large"> 
              {{ article[0].title.length > 20? article[0].title.substring(0, 20) + `...` : article[0].title }}
     
            </a>
          </div>
        </div>
        <div style="flex ;" >
          <div  class="user-photo-container2">
            <a @click="goToOrderUser(article[1].id)">
              <img :src="article[1].photo" alt="" class="user-photo mx-auto d-block">
            </a>
          </div>
        </div>
        
        
        <div style="flex ;" class="m-3">
          <div   style="font-size:x-large">
            <a  @click="goToOrderUser(article[1].id)">
              {{article[1].username}}
            </a>
          </div>
          
          <div   style="font-size:smaller">
            {{article[1].nickname}}
          </div>
        </div>
        <div style="flex ;">
          <div class="m-3" >
            <a >
              {{ article[0].type ==1 ?"#食記":"#食譜"}}
            </a>
          </div>
        </div>
        
        <div style="flex ;">
          <div class="m-3" >
            {{ article[0].createdDate }}
          </div>
        </div>
        
        
      </div>
      <div class="accordion-body" style="font-size:larger;">
        {{ article[0].context.length > 20? article[0].context.substring(0, 20) + `...` : article[0].context }}
      </div>
      
    </el-card>
    
  </div>
</div>

</li>
</ul>



</div>
</div>
</div>



</div>

</el-main>
</el-container>
</div>
</template>
    
<script setup>
    import { ref, onMounted,computed ,nextTick} from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import {axiosPost,axiosGet,axiosPut,axiosDelete} from '../global'
    import {
  Search,
  Iphone,
  Delete,
  Location,
  OfficeBuilding,
  Tickets,
  User,
} from '@element-plus/icons-vue'
    
    const URL = import.meta.env.VITE_API_JAVAURL
    
    const aaa = ref('detial')
    const bbb = ref(1)
    const x = ref('')

    const router = useRouter();
    
    const user = ref({});
    const photo = ref("")

    const articles = ref([]);
    const articleUser = ref('');
    const Rinput = ref('')
    const AdataList = ref(null);
    const articlesitems = ref([]);
    const isLoading = ref(true);
    let searchTimeout = null;

    
    const fetchUserData = async () => {
      const a = sessionStorage.getItem('userId')
      console.log(a);
      const response = await axiosGet('http://localhost:8080/user/detial', {withCredentials:true});
      user.value =response
    // console.log(user.value.photo);
      if(user.value.photo==null){
        photo.value ="/img/noImage.jpg"
      }else{
        photo.value = decodeURIComponent(atob(user.value.photo))
        console.log(photo.value);
      }
      changeType(1)

    //   const  response1 = await axiosGet('http://localhost:8080/user/findArticlceByUserId',{withCredentials:true ,params:{userId:a,title:'',type:1,page:0,size:4}});
    //   console.log(response1);   
    //   isLoading.value = false;
    //   articles.value = response1.content;
    //   articlesitems.value = response1.pageable
    //   articles.value.forEach((article)=>{
    //     console.log(article[1].username);
    //   articleUser.value = article[1]
    //   // console.log(decodeURIComponent(atob(article[1].photo)));
    //   if(article[1].photo==null){
    //     article[1].photo ="/img/noImage.jpg"
        
    //   }else{
    //     // article[1].photo ="/img/noImage.jpg"
    //     article[1].photo = atob(article[1].photo)
    //   }
    // })
};
fetchUserData()

const showMain = (index)=>{
  aaa.value = index
}

const changeType = async (type)=>{
  const a = sessionStorage.getItem('userId')
  const  response1 = await axiosGet('http://localhost:8080/user/findArticlceByUserId',{withCredentials:true ,params:{userId:a,title:'',type:type,page:0,size:4}});
      console.log(response1);   
      isLoading.value = false;
      articles.value = response1.content;
      articlesitems.value = response1.pageable
      articles.value.forEach((article)=>{
        console.log(article[1].username);
      articleUser.value = article[1]
      // console.log(decodeURIComponent(atob(article[1].photo)));
      if(article[1].photo==null){
        article[1].photo ="/img/noImage.jpg"
        
      }else{
        // article[1].photo ="/img/noImage.jpg"
        article[1].photo = atob(article[1].photo)
      }
    })
  bbb.value = type
}

const deleteFavoriteArticle = async(aId)=>{
  if(aId!=null){
    const confirmed = window.confirm("确定要删除吗？");
    if (confirmed){

      const a = sessionStorage.getItem('userId')
      console.log(a);
      console.log(aId);
      const response = await axiosDelete('http://localhost:8080/user/delete/article',{withCredentials:true,params:{userId:a,articleId:aId}})
       window.setTimeout(function () {
             window.location.reload();
      },1000)
    }  
  }
}

const searchRestaurant = async(type)=>{ 
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  //     清空已加载的数据和页码
  //     if (tab === 'restaurant') {
  //   restaurants.value = [];
  //   restaurantsitems.value = { pageNumber: 0 };
  // } else if (tab === 'article') {
    articles.value = [];
    articlesitems.value = { pageNumber: 0 };
  // } else if (tab === 'food') {
  //   foods.value = [];
  //   foodsitems.value = { pageNumber: 0 };
  // }
  

  searchTimeout = setTimeout(async () => {
    const a = sessionStorage.getItem('userId')
    const  response = await axiosGet('http://localhost:8080/user/findArticlceByUserId',{withCredentials:true ,params:{userId:a,title:Rinput.value,type:type,page:0,size:4}});
    //  const  response = await axiosGet('http://localhost:8080/user/favorite/articlesByTitle', { withCredentials: true, params: { userId: a, title: Rinput.value, page: 0, size: 3 } });
     console.log(response.content);
      articles.value = response.content;
      articles.value.forEach((article)=>{
        console.log(article[1].username);
      articleUser.value = article[1]
      // console.log(decodeURIComponent(atob(article[1].photo)));
      if(article[1].photo==null){
        article[1].photo ="/img/noImage.jpg"
        
      }
      else{
        // article[1].photo ="/img/noImage.jpg"
        article[1].photo = atob(article[1].photo)
      }
    })
      isLoading.value = false;
    
    // 将滚动位置重置到顶部
    // nextTick(() => {
    //   const list = tab === 'article' ? AdataList.value : (tab === 'restaurant' ? RdataList.value : FdataList.value);
    //   if (list) {
    //     list.scrollTop = 0;
    //   }
    // });

      
  }, 1000); // 延遲一秒後執行查詢
}

const handleScroll =async (type) => {
  const a = sessionStorage.getItem('userId')
  console.log(type);
  x.value = !type?(type==0?type:1):(type==0?type:1)
  console.log(x.value);
  const list = AdataList.value;
if (list) {
  // console.log(list);
  const threshold = 10;
  const isAtBottom =list.scrollTop + list.clientHeight + threshold >= list.scrollHeight;
  // console.log(isAtBottom);
  // console.log(isLoading.value);
  if (isAtBottom && !isLoading.value) {
    isLoading.value = true; 
    try {
          const pageToLoad = articlesitems.value.pageNumber++
          // console.log(pageToLoad);
          // console.log(a);
          // console.log(Rinput.value);
          console.log(x.value);
          const response = await axiosGet('http://localhost:8080/user/findArticlceByUserId',{withCredentials:true ,params:{userId:a,title:Rinput.value,type:x.value,page:pageToLoad+1,size:4}});
          // const response = await axiosGet('http://localhost:8080/user/favorite/articlesByTitle',{withCredentials:true, params:{userId:a,title:Rinput.value,page: pageToLoad+1,size:3}})
          console.log(response);
          // articles.value = response.content;
       
          
    //       articles.value.forEach((article)=>{
    //         console.log(article);
    //     console.log(article[1].username);
    //   articleUser.value = article[1]
    //   // console.log(decodeURIComponent(atob(article[1].photo)));
    //   // console.log(article[1].photo);
    //   if(article[1].photo==null){
    //     article[1].photo ="/img/noImage.jpg"
        
    //   }
    //   else{
    //     // article[1].photo ="/img/noImage.jpg"
    //     // article[1].photo = atob(article[1].photo)
    //   }
    // })

    const newArticles = response.content.map(article => {
      articleUser.value = article[1]
          if (article[1].photo == null) {
            article[1].photo = "/img/noImage.jpg";
          } else {
            article[1].photo = atob(article[1].photo);
          }
          return article;
        });
        console.log(newArticles);
     articles.value = [...articles.value,...newArticles]; 
          console.log(articles.value);
          // articles.value = [];
          // articlesitems.value = { pageNumber: 0 };


      

  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
    }
  }




};  


const genderString = computed(() => {
  if( user.value.gender===1){
    return "男"
  }
  if( user.value.gender===2){
    return "女"
  }
  if( user.value.gender==null || user.value.gender===0){
    return null
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

const showEmail = computed(()=>{

  if(user.value.email==null ||user.value.email==""){
    return null
}
  return user.value.email
})


const showNickName = computed(()=>{
if(user.value.nickname==null ||user.value.nickname==""){
  return null
}
return user.value.nickname
})

const showBirthday = computed(()=>{
if(user.value.birthday==null ||user.value.birthday=="0001-01-01"){
  return null
}
return user.value.birthday
})


const decodedPhoto = computed(() => {
  if (user.value.photo && user.value.photo !== null) {
    return decodeURIComponent(atob(user.value.photo));
  } else {
    return "/img/noImage.jpg";
  }
  // if(user.value.photo==null ){
  //   const noImage = "/img/noImage.jpg"
  //   return noImage
  // }

  // if (user.value.photo) {
  //   try {
  //     return decodeURIComponent(atob(user.value.photo));
  //   } catch (error) {
  //     console.error("Error decoding photo:", error);
  //     return null; // Return a default value or handle the error in your own way
  //   }
  // } else {
  //   return null; // Return a default value or handle the case where photo is not available
  // }
});

const showModify = ()=>{
  router.push({ name: "UserModify"})
}

const showPrivacySetting = ()=>{
  router.push({name:"PrivacySetting"})
}

const goToOrderUser = async(userId)=>{

const response = await axiosPost('http://localhost:8080/user/findOtherUsersById/'+userId,{withCredentials:true})

console.log(response);
showMain("detial")
}

</script>
    
<style>
    .circular-image {
  width: 8rem;
  border: 2px solid #8f8686;
  margin-top: 5px;
  border-radius: 50%; /* Set the border-radius to 50% for a circular shape */
  display: block;
  margin: 0 auto;
}
  .user-photo-container1 {
    width: 8rem;
    height: 8rem;
    border: 1px solid #8f8686;
    border-radius: 50%; /* 添加圆形边框 */
    overflow: hidden; /* 隐藏超出容器的部分 */
    margin: 5px;
  }

  .user-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
   
  }
</style>