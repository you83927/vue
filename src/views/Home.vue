<template>
       <h2>Favorite</h2>

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
  <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
       <div v-if="activeTab === 'article'">
          <!-- 在这里放置展示文章数据的代码 -->
          <ul >
            <li v-for="article in articles" :key="article.id" style="list-style-type: none;">
              <div class="accordion" :id="article.id">
  <div class="accordion-item">
    <h2 class="accordion-header" :id="'heading-' + article.id">
      <div class="d-flex align-items-center justify-content-between">
        {{ article.title }}
        <button :id="'accordion-button-' + article.id" class="accordion-button collapsed scaled-button"  type="button" :data-bs-toggle="'collapse'"
        :data-bs-target="'#collapse-' + article.id"
        :aria-expanded="false"
        :aria-controls="'collapse-' + article.id"
        >
      </button>
    </div>
    </h2>
    <div :id="'collapse-' + article.id" class="accordion-collapse collapse" :aria-labelledby="'heading-' + article.id">
      <div class="accordion-body">
        {{ article.context}}
      </div>
    </div>
  </div>
</div>

            </li>
          </ul>
      
        </div>
  </div>




  <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
       <div v-if="activeTab === 'restaurant'">
          <!-- 在这里放置展示餐厅数据的代码 -->
          <ul>
            <li v-for="restaurant in restaurants" :key="restaurant.id">{{ restaurant.name }}</li>
          </ul>
        </div>
  </div>
  <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
       <div v-if="activeTab === 'food'">
          <!-- 在这里放置展示食物数据的代码 -->
          <ul>
            <li v-for="food in foods" :key="food.id">{{ food.foodType }}</li>
          </ul>
        </div>
  </div>
</div>

</template>
    
<script setup >
    import { ref, onMounted } from 'vue';
import axios from 'axios';
import {axiosPost,axiosGet,axiosPut} from '../global'

const activeTab = ref('article'); // 初始选中的选项卡类型，默认为文章
const articles = ref([]);
const restaurants = ref([]);
const foods = ref([]);

onMounted(async () => {
  await fetchData(activeTab.value);
});
// 在组件加载时获取文章数据
const fetchData = async (tab) => {
  try {
       let response;
       console.log(activeTab.value);
    if (activeTab.value === 'article') {
      response = await axiosGet('http://localhost:8080/user/favorite/articles',{withCredentials:true});
      console.log(response);
      articles.value = response;
    } else if (activeTab.value === 'restaurant') {
      response = await axiosGet('http://localhost:8080/user/favorite/restaurants',{withCredentials:true});
      console.log(response);
      restaurants.value = response;
    } else if (activeTab.value === 'food') {
      response = await axiosGet('http://localhost:8080/user/favorite/foods',{withCredentials:true});
      console.log(response);
      foods.value = response;
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// 切换选项卡时更新数据
const changeTab = (tab) => {
  activeTab.value = tab;
  fetchData(tab);
};

</script>
    
<style scoped>
    .scaled-button {
      transform: scale(0.8); /* 调整缩放值 */
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  background-color: lightskyblue; /* 为了演示，添加背景颜色 */
  width: 24px; /* 设置按钮宽度 */
  height: 24px; /* 设置按钮高度 */
}

.d-flex div {
  flex-grow: 1;
  display: flex;
  align-items: center;
}
</style>