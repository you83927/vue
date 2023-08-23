<template>
       <h2>Favorite</h2>
<!-- 標籤 -->
<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="article" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true" @click="changeTab('article')">Article</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="restaurant" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false" @click="changeTab('restaurant')">Restaurant</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="food" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false" @click="changeTab('food')">Food</button>
  </li>
</ul>

<div class="tab-content" id="myTabContent">
  <!-- 文章 -->
  <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
    <div class="demo-input-size">
      <el-input
      v-model="Rinput"
      class="w-50 m-2"
      size="large"
      placeholder="Please Input"
      :prefix-icon="Search"
      @input="searchRestaurant(activeTab)"
      /> 
    </div>
    <div class="scrollable-container" ref="AdataList" @scroll="handleScroll(activeTab)">
      <div v-if="activeTab === 'article'">
        <!-- 在这里放置展示文章数据的代码 -->
        <ul >
          <li v-for="article in articles" :key="article[1].id" style="list-style-type: none;">
            
            <div class="accordion m-3" :id="article[1].id">
              <div class="accordion-item" >
                
    <el-card class="box-card" :id="'heading-' + article[1].id" >
      
      <div class="" >
        <el-button type="info" plain  @click="deleteFavoriteArticle(article[1].id)" style="float: right;" :icon="Delete"/>
      </div>
      
      
      <div class="card-header"  style="display: flex;">
        
        <div style="flex: 1;">
          <div class="d-flex align-items-center justify-content-between m-3">
            <a href="" style="font-size:xx-large"> {{ article[1].title }}</a>
          </div>
        </div>
        <div style="flex ;" >
          <div  class="user-photo-container2">
            <a @click="goToOrderUser(article[0].id)">
              <img :src="article[0].photo" alt="" class="user-photo mx-auto d-block">
            </a>
          </div>
        </div>
        
        
        <div style="flex ;" class="m-3">
          <div   style="font-size:x-large">
            <a  @click="goToOrderUser(article[0].id)">
              {{article[0].username}}
            </a>
          </div>
          
          <div   style="font-size:smaller">
            {{article[0].nickname}}
          </div>
        </div>
        <div style="flex ;">
          <div class="m-3" >
            <a >
              {{ article[1].type ==1 ?"#食記":"#食譜"}}
            </a>
          </div>
        </div>
        
        <div style="flex ;">
          <div class="m-3" >
            {{ article[1].createdDate }}
          </div>
        </div>
        
        
      </div>
      <div class="accordion-body" style="font-size:larger;">
        {{ article[1].context.length > 20? article[1].context.substring(0, 20) + `...` : article[1].context }}
      </div>
      
    </el-card>
    
  </div>
</div>

</li>
</ul>
<!-- <h2 class="accordion-header" :id="'heading-' + article.id">
  <div class="d-flex align-items-center justify-content-between">
    <a href=""> {{ article.title }}</a>
    <button :id="'accordion-button-' + article.id" class="accordion-button collapsed scaled-button"  type="button" :data-bs-toggle="'collapse'"
    :data-bs-target="'#collapse-' + article.id"
    :aria-expanded="false"
    :aria-controls="'collapse-' + article.id"
    >
  </button>
</div>
</h2> -->
<!-- <div :id="'collapse-' + article.id" class="accordion-collapse collapse" :aria-labelledby="'heading-' + article.id">
  <div class="accordion-body">
    {{ article.context}}
  </div>
</div> -->

</div>
</div>
</div>
<!-- ----------------------------------------------------------------------------------------------------------------- -->


<!-- 餐廳 -->
<div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
  <div class="demo-input-size">
    <el-input
    v-model="Rinput"
    class="w-50 m-2"
    size="large"
    placeholder="Please Input"
    :prefix-icon="Search"
    @input="searchRestaurant(activeTab)"
  /> 
</div>
  <div class="scrollable-container" ref="RdataList" @scroll="handleScroll(activeTab)">
    <div v-if="activeTab === 'restaurant'">
      <!-- 在这里放置展示餐厅数据的代码 -->
      <ul>
        <li v-for="restaurant in restaurants" :key="restaurant.id">
          <el-button type="info" plain style="float: right;" :icon="Delete"  @click="deleteFavoriteRestaurant(restaurant.id)" />
        
  <el-descriptions
    class="margin-top"
  
    :column="3"
 
    border
  >
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <user />
          </el-icon>
          餐廳
        </div>
      </template>
      {{ restaurant.name }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <iphone />
          </el-icon>
          電話
        </div>
      </template>
      {{ restaurant.phone }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <location />
          </el-icon>
          google map連結
        </div>
      </template>
      <a :href="restaurant.url"><i class='bx bx-map-alt bx-sm' ></i></a>
    </el-descriptions-item>


    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <office-building />
          </el-icon>
          營業狀態
        </div>
      </template>
      <div v-if="restaurant.status==1">正常營業 </div>
      <div v-else-if="restaurant.status==2">暫時歇業</div>
      <div v-else>永久停業</div>
    </el-descriptions-item>
    
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <tickets />
          </el-icon>
          本站評價
        </div>
      </template>
      <el-rate
    v-model="restaurant.ourScore"
    disabled
    show-score
    text-color="#ff9900"
    score-template="{value} points"
    size="small"
  />
    </el-descriptions-item>

<el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <tickets />
          </el-icon>
          Google評價
        </div>
      </template>
      <el-rate
    v-model="restaurant.googleScore"
    disabled
    show-score
    text-color="#ff9900"
    score-template="{value} points"
    size="small"
  />
    </el-descriptions-item>


    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <tickets />
          </el-icon>
          店家官網
        </div>
      </template>
      <a :href="restaurant.website">{{ restaurant.website }}</a>
      
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <office-building />
          </el-icon>
          可否內用
        </div>
      </template>
      <div v-if="restaurant.dineIn==true"><i class='bx bx-check bx-sm'></i></div>
      <div v-else><i class='bx bx-x bx-sm'></i></div>
  
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <office-building />
          </el-icon>
          可否外帶
        </div>
      </template>
      <div v-if="restaurant.takeout==true"><i class='bx bx-check bx-sm'></i></div>
      <div v-else><i class='bx bx-x bx-sm'></i></div>
     
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <office-building />
          </el-icon>
          地址
        </div>
      </template>
       {{ restaurant.address }}
   
    </el-descriptions-item>
    
  </el-descriptions>
</li>




</ul>
        </div>
      </div>
  </div>
  <!-- ------------------------------------------------------------------------------------ -->

  <!-- 食物 -->
  <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
    <div class="demo-input-size">
    <el-input
    v-model="Rinput"
    class="w-50 m-2"
    size="large"
    placeholder="Please Input"
    :prefix-icon="Search"
    @input="searchRestaurant(activeTab)"
  /> 
</div>
    <div class="scrollable-container" ref="FdataList" @scroll="handleScroll(activeTab)">
       <div v-if="activeTab === 'food'">
        
        <!-- 在这里放置展示食物数据的代码 -->
        <ul>
        <el-row >
    <el-col
      v-for="food in foods"
      :key="food.id"
      :span="5"
      class="m-3"
    >
      <el-card  :body-style="{ padding: '10px' }" >
        <el-button type="info" plain style="float: right;" :icon="Delete"  @click="deleteFavoriteFoodType(food.id)" />
        <img
          :src="'public/foodImage/'+food.id+'.jpg'"
          class="image"
        
        />
        <div style="padding: 10px">
          <a href="" >
            <span>{{ food.foodType }}</span>
          </a>
          <div class="bottom">
            <!-- <time class="time">{{ currentDate }}</time> -->
            <!-- <el-button text class="button">Operating</el-button> -->
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
          </ul>
        </div>
        </div>
  </div>
  <!-- ------------------------------------------------------------------------------------ -->
</div>

</template>
    
<script setup >
    import { ref, onMounted,computed ,nextTick} from 'vue';
import axios from 'axios';
import {axiosPost,axiosGet,axiosPut,axiosDelete} from '../global'
import { useRouter } from 'vue-router';
import {
  Search,
  Iphone,
  Delete,
  Location,
  OfficeBuilding,
  Tickets,
  User,
} from '@element-plus/icons-vue'

const router = useRouter();

const activeTab = ref('article'); // 初始选中的选项卡类型，默认为文章
const articles = ref([]);
const restaurants = ref([]);
const foods = ref([]);

const articleUser = ref('');
const restaurant = ref('');
const food = ref('');
// location.reload()
let searchTimeout = null;
const Rinput = ref('')
const AdataList = ref(null);
const RdataList = ref(null);
const FdataList = ref(null);
const isLoading = ref(true);

const articlesitems = ref([]);
const restaurantsitems = ref([]);
const foodsitems = ref([]);

onMounted( () => {
  fetchData('restaurant');
       fetchData('food');
       fetchData('article');
});

// 在组件加载时获取文章数据
const fetchData = async (tab) => {
  const a = sessionStorage.getItem('userId')
  try {
       let response;
      //  console.log(activeTab.value);
    if (tab === 'article') {

      response = await axiosGet('http://localhost:8080/user/favorite/articlesByTitle',{withCredentials:true ,params:{userId:a,title:'',page:0,size:4}});
      console.log(response);   
      isLoading.value = false;
      articles.value = response.content;
      articlesitems.value = response.pageable
      articles.value.forEach((article)=>{
        console.log(article[0].username);
      articleUser.value = article[0]
      // console.log(decodeURIComponent(atob(article[1].photo)));
      if(article[0].photo==null){
        article[0].photo ="/img/noImage.jpg"
        
      }else{
        // article[1].photo ="/img/noImage.jpg"
        article[0].photo = atob(article[0].photo)
      }
    })


    

    } else if (tab === 'restaurant') {

      // response = await axiosGet('http://localhost:8080/user/favorite/restaurants',{withCredentials:true});
      const response = await axiosGet('http://localhost:8080/user/favorite/restaurantsByName',{withCredentials:true, params:{userId:a,name:'',page:0,size:3}})
      console.log(response);
      isLoading.value = false;
      restaurants.value = response.content;
      restaurantsitems.value = response.pageable
    } else if (tab === 'food') {
      const response = await axiosGet('http://localhost:8080/user/favorite/foodsByFoodtype',{withCredentials:true,params:{userId:a,foodType:'',page:0,size:10}});
      console.log(response);
      isLoading.value = false;
      foods.value = response.content;
      foodsitems.value = response.pageable
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
  
};
// 切换选项卡时更新数据
function changeTab(tab) {
  activeTab.value = tab;
  
  // 清空搜索栏的内容
  Rinput.value = '';

  // 切换到不同的选项卡时，重新获取数据
  if (tab === 'article') {
    fetchData('article');
  } else if (tab === 'restaurant') {
    fetchData('restaurant');
  } else if (tab === 'food') {
    fetchData('food');
  }

  // 将滚动位置重置到顶部
  nextTick(() => {
    const list = tab === 'article' ? AdataList.value : (tab === 'restaurant' ? RdataList.value : FdataList.value);
    if (list) {
      list.scrollTop = 0;
    }
  });
}

const goToOrderUser = async(userId)=>{
 const response = await axiosPost('http://localhost:8080/user/findOtherUsersById/'+userId,{withCredentials:true})
 const userDetial = await axiosGet('http://localhost:8080/user/detial', {withCredentials:true});

console.log(response.id);
console.log(userDetial.id);

if(response.id==userDetial.id){
  router.push({path:"/userDetial"})
}else{
  router.push({path:"/otherUsers/"+userId})
}

}

const deleteFavoriteArticle = async(aId)=>{
  if(aId!=null){
    const confirmed = window.confirm("确定要删除吗？");
    if (confirmed){

      const a = sessionStorage.getItem('userId')
      console.log(a);
      console.log(aId);
      const response = await axiosDelete('http://localhost:8080/user/favorite/delete/article',{withCredentials:true,params:{userId:a,articleId:aId}})
       window.setTimeout(function () {
             window.location.reload();
      },1000)
    }  
  }
}




const deleteFavoriteRestaurant = async(rId)=>{
  if(rId!=null){
    const confirmed = window.confirm("确定要删除吗？");
    if (confirmed){

      const a = sessionStorage.getItem('userId')
      console.log(a);
      console.log(rId);
      const response = await axiosDelete('http://localhost:8080/user/favorite/delete/restaurant',{withCredentials:true,params:{userId:a,restaurantId:rId}})
       window.setTimeout(function () {
             window.location.reload();
      },1000)
    }  
  }
}



const deleteFavoriteFoodType = async(fId)=>{
  if(fId!=null){
    const confirmed = window.confirm("确定要删除吗？");
    if (confirmed){

      const a = sessionStorage.getItem('userId')
      console.log(a);
      console.log(fId);
      const response = await axiosDelete('http://localhost:8080/user/favorite/delete/food',{withCredentials:true,params:{userId:a,foodId:fId}})
       window.setTimeout(function () {
             window.location.reload();
      },1000)
    }  
  }
}

const searchRestaurant = async(tab)=>{ 
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
      // 清空已加载的数据和页码
      if (tab === 'restaurant') {
    restaurants.value = [];
    restaurantsitems.value = { pageNumber: 0 };
  } else if (tab === 'article') {
    articles.value = [];
    articlesitems.value = { pageNumber: 0 };
  } else if (tab === 'food') {
    foods.value = [];
    foodsitems.value = { pageNumber: 0 };
  }
  

  searchTimeout = setTimeout(async () => {
    const a = sessionStorage.getItem('userId')
//  const response = await axiosGet('http://localhost:8080/user/favorite/restaurantsByName',{withCredentials:true, params:{userId:a,name:Rinput.value,page:0,size:3}})
// console.log(response.content);
// restaurants.value = response.content;

// isLoading.value = false;

let response;
    if (tab === 'restaurant') {
      response = await axiosGet('http://localhost:8080/user/favorite/restaurantsByName', { withCredentials: true, params: { userId: a, name: Rinput.value, page: 0, size: 3 } });
      restaurants.value = response.content;
      isLoading.value = false;
    } else if (tab === 'article') {
      response = await axiosGet('http://localhost:8080/user/favorite/articlesByTitle', { withCredentials: true, params: { userId: a, title: Rinput.value, page: 0, size: 3 } });
      articles.value = response.content;
      articles.value.forEach((article)=>{
        console.log(article[0].username);
      articleUser.value = article[0]
      // console.log(decodeURIComponent(atob(article[1].photo)));
      if(article[0].photo==null){
        article[0].photo ="/img/noImage.jpg"
        
      }
      // else{
      //   // article[1].photo ="/img/noImage.jpg"
      //   article[0].photo = atob(article[0].photo)
      // }
    })
      isLoading.value = false;
    } else if (tab === 'food') {
      response = await axiosGet('http://localhost:8080/user/favorite/foodsByFoodtype', { withCredentials: true, params: { userId: a, foodType: Rinput.value, page: 0, size: 10 } });
      foods.value = response.content;
      isLoading.value = false;
    }
    // 将滚动位置重置到顶部
    nextTick(() => {
      const list = tab === 'article' ? AdataList.value : (tab === 'restaurant' ? RdataList.value : FdataList.value);
      if (list) {
        list.scrollTop = 0;
      }
    });

      
  }, 1000); // 延遲一秒後執行查詢
}

const handleScroll =async (tab) => {
  const a = sessionStorage.getItem('userId')
  
  if(tab=="restaurant"){
  const list = RdataList.value;
  if (list) {
    // console.log(list);
    const threshold = 10;
    const isAtBottom =list.scrollTop + list.clientHeight + threshold >= list.scrollHeight;
    // console.log(isAtBottom);
    // console.log(isLoading.value);
    if (isAtBottom && !isLoading.value) {
      isLoading.value = true; 
      try {
        console.log(tab);
          const pageToLoad = restaurantsitems.value.pageNumber++
          console.log(pageToLoad);
          const response = await axiosGet('http://localhost:8080/user/favorite/restaurantsByName',{withCredentials:true, params:{userId:a,name:Rinput.value,page: pageToLoad+1,size:3}})
          console.log(response);
          restaurants.value = [...restaurants.value,...response.content];  
          console.log(restaurants.value);
          // restaurants.value = [];
          // restaurantsitems.value = { pageNumber: 0 };
          
          
          
        } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
}
}
}
if(tab=="article"){
  console.log(tab);
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
        console.log(tab);
          const pageToLoad = articlesitems.value.pageNumber++
          console.log(pageToLoad);
          const response = await axiosGet('http://localhost:8080/user/favorite/articlesByTitle',{withCredentials:true, params:{userId:a,title:Rinput.value,page: pageToLoad+1,size:3}})
          console.log(response);
          // articles.value = response.content;
          articles.value = [...articles.value,...response.content];  
          articles.value.forEach((article)=>{
        console.log(article[0].username);
      articleUser.value = article[0]
      // console.log(decodeURIComponent(atob(article[1].photo)));
      if(article[0].photo==null){
        article[0].photo ="/img/noImage.jpg"
        
      }
      // else{
      //   // article[1].photo ="/img/noImage.jpg"
      //   article[0].photo = atob(article[0].photo)
      // }
    })
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
}

if(tab=="food"){
  const list = FdataList.value;
  if (list) {
    // console.log(list);
    const threshold = 10;
    const isAtBottom =list.scrollTop + list.clientHeight + threshold >= list.scrollHeight;
    // console.log(isAtBottom);
    // console.log(isLoading.value);
    if (isAtBottom && !isLoading.value) {
      isLoading.value = true; 
      try {
        console.log(tab);
        if(tab=="food"){
          const pageToLoad = foodsitems.value.pageNumber++
          console.log(pageToLoad);
          const response = await axiosGet('http://localhost:8080/user/favorite/foodsByFoodtype',{withCredentials:true, params:{userId:a,foodType:Rinput.value,page: pageToLoad+1,size:3}})
          console.log(response);
          foods.value = [...foods.value,...response.content];  
          console.log(foods.value);
          // foods.value = [];
          //  foodsitems.value = { pageNumber: 0 };

        }


      

  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
    }
  }
}

};  
</script>
    
<style scoped>

.d-flex div {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 300px;
  height: 150px;
  display: block;
  object-fit: contain
}

.scrollable-container {
  max-height: 500px; /* 設定最大高度，超過會顯示滾動條 */
  overflow-y: auto; /* 添加垂直滾動條 */
}

.accordion-body .more {
    font-size: 16px; /* 這裡是你想要的字型大小 */
    font-family: Arial, sans-serif; /* 這裡是你想要的字型 */
    color: #333; /* 這裡是你想要的顏色 */
    /* 可以加入其他的 CSS 樣式，例如加粗、斜體等 */
  }
</style>