<template>
       <h2>Favorite</h2>

<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Article</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Restaurant</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Food</button>
  </li>

</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
       <div v-if="activeTab === 'article'">
          <!-- 在这里放置展示文章数据的代码 -->
          <ul>
            <li v-for="article in articles" :key="article.id">{{ article.title }}</li>
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
            <li v-for="food in foods" :key="food.id">{{ food.name }}</li>
          </ul>
        </div>
  </div>
</div>

</template>
    
<script setup >
    import { ref, onMounted } from 'vue';
import axios from 'axios';

const activeTab = ref('article'); // 初始选中的选项卡类型，默认为文章
const articles = ref([]);
const restaurants = ref([]);
const foods = ref([]);

// 在组件加载时获取文章数据
onMounted(async () => {
  try {
       let response;
    if (activeTab.value === 'article') {
      response = await axios.get('http://localhost:8080/user/favorite/articles');
      console.log(response.data.data);
      articles.value = response.data.data;
    } else if (activeTab.value === 'restaurant') {
      response = await axios.get('http://localhost:8080/user/favorite/restaurants');
      restaurants.value = response.data.data;
    } else if (activeTab.value === 'food') {
      response = await axios.get('http://localhost:8080/user/favorite/foods');
      foods.value = response.data.data;
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
});

// 切换选项卡时更新数据
const changeTab = (tab) => {
  activeTab.value = tab;
  // 在这里调用相应的接口获取数据并更新对应的数据数组
  // ...
};
</script>
    
<style scoped>
    
</style>