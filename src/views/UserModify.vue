<template>
  <div class="container">
  <main>
    <div class="py-5 text-center">
    </div>
    
    <div class="row g-5">
      
      <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">編輯資訊</h4>
        <form class="needs-validation"  @submit.prevent="modify" novalidate>
          <h2>上傳大頭貼</h2>
          <label for="uploadPhoto">
              <!-- 圖片容器 -->
          <div  class="user-photo-container">
            <!-- 用戶圖片 -->
            <img
              class="user-photo1 mx-auto d-block"
              :src="photo"
              v-if="photo"
              alt=""
            />
            <img
              class="user-photo1 mx-auto d-block"
              :src="photoUrl"
              v-else-if="photoUrl"
              alt=""
            />

            <img
              class="user-photo1 mx-auto d-block"
              src="/img/noImage.jpg"
              v-else
              alt=""
            />

            <!-- 浮水印圖片 -->
            <img
              class="watermark"
              src="/img/camera-plus-solid-60.png"
            />
          </div>
            <input type="file" id="uploadPhoto"  style="display: none" @change="upload">
          </label>
          
          <el-popconfirm title="確定刪除嗎?" 
                        confirm-button-text="Yes"
                        cancel-button-text="No"
                        @confirm="deletePhoto"
                        >
            <template #reference>
      <el-button type="danger" plain >刪除頭貼</el-button>
      <!-- <el-button>Delete</el-button> -->
    </template>
  </el-popconfirm>

          <div class="row g-3">
             
     

            <div class="col-12">
              <label for="username" class="form-label">使用者</label>
              <div class="input-group has-validation">
                <!-- <span class="input-group-text">@</span> -->
                <input type="text" class="form-control" id="username" placeholder="Username" v-model="user.username"  required disabled>
              <div class="invalid-feedback">
                  Your username is required.
                </div>
              </div>
            </div>

            <div class="col-12">
              <label for="email" class="form-label">信箱 <span class="text-body-secondary">(選填)</span></label>
              <input type="email" class="form-control" id="email" v-model.trim="user.email" placeholder="you@example.com">
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div class="col-12">
              <label for="nickName" class="form-label">暱稱<span class="text-body-secondary">(選填)</span></label>
              <input type="text" class="form-control" id="nickName" v-model.trim="user.nickname" placeholder="" required>
              <div class="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div class="col-12">
              <label for="birthday" class="form-label">生日<span class="text-body-secondary">(選填)</span></label>
              <input type="date" class="form-control" id="birthday" placeholder="Apartment or suite"  v-model="user.birthday">
            
               <!-- <el-date-picker v-model="user.birthday" id="birthday" type="date" placeholder="Pick a date"  /> -->
            
            </div>

            <div class="col-12">
          <label for="gender" class="form-label">性別 <span class="text-body-secondary">(選填)</span></label>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="gender" id="genderMale" value="male"  :checked="user.gender === 1 " @change="handleGenderChange(1)">
            <label class="form-check-label" for="genderMale">
              男
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="gender" id="genderFemale" value="female" :checked="user.gender === 2 " @change="handleGenderChange(2)">
            <label class="form-check-label" for="genderFemale">
              女
            </label>
          </div>
        </div>

   

          

        
          </div>

          <!-- <hr class="my-4">

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="same-address">
            <label class="form-check-label" for="same-address">Shipping address is the same as my billing address</label>
          </div>

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="save-info">
            <label class="form-check-label" for="save-info">Save this information for next time</label>
          </div> -->

          <hr class="my-4">


          <!-- <button class=" btn btn-primary btn-lg m-3" type="submit">編輯完成</button> -->
          <el-button type="primary" plain @click="modify">編輯完成</el-button>
          <!-- <button class=" btn btn-primary btn-lg " type="button" @click="back">返回</button> -->
          <el-button plain @click="back">返回</el-button>

        </form>
      </div>
    </div>
  </main>

  <!-- <footer class="my-5 pt-5 text-body-secondary text-center text-small">
    <p class="mb-1">&copy; 2017–2023 Company Name</p>
    <ul class="list-inline">
      <li class="list-inline-item"><a href="#">Privacy</a></li>
      <li class="list-inline-item"><a href="#">Terms</a></li>
      <li class="list-inline-item"><a href="#">Support</a></li>
    </ul>
  </footer> -->
</div>
</template>

<script setup>
    import { ref ,computed} from 'vue';
    import { useStore,mapGetters, mapActions } from 'vuex';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import {axiosPost,axiosGet,axiosPut,swalError} from '../global'
    
    const user = ref({
      gender: 0
    });
    
    const router = useRouter();

const photoUrl = ref('')

const photo = ref("")

const updateUser=ref("")

const store = useStore();

// 使用mapGetters來獲取getter中的狀態
const { getInformation } = mapGetters(['getInformation']);

// 使用mapActions來調用actions來更新狀態
const { setInformation } = mapActions(['setInformation']);



const handleGenderChange = (selectedGender) => {
  if (user.value.gender === selectedGender) {
    // If the selected gender is already the current user.gender
    user.value.gender = 0; // Reset to no gender
  } else {
    user.value.gender = selectedGender; // Set the selected gender
  }
};

    //抓user的資料
    const fetchUserData = async () => {
      const response = await axiosGet('http://localhost:8080/user/detial', {withCredentials:true});
      user.value =response
      if(user.value.photo===null){
        photo.value =null
        // photoUrl.value = decodeURIComponent((user.value.photo))
      }else{
        photoUrl.value = decodeURIComponent(atob(user.value.photo))
      }

      if(user.value.birthday==null || user.value.birthday=='0001-01-01'){
        user.value.birthday = null
       }
  //     try {
  //   const response = await axiosGet('http://localhost:8080/user/detial', { withCredentials: true });
  //   user.value = response;
  //   if (user.value.photo) {
  //     photoUrl.value = user.value.photo; // No need for decodeURIComponent or atob here
  //   } else {
  //     photoUrl.value = '/img/noImage.jpg';
  //   }
  // } catch (error) {
  //   console.error('Error fetching user data:', error);
  // }
    }
    fetchUserData()

// const decodedPhoto = computed(() => {
//   if(user.value.photo==null){
//     const noImage = "/noImage.jpg"
//     return noImage
//   }
//   if (user.value.photo) {
//     try {
//       return decodeURIComponent(atob(user.value.photo));
//     } catch (error) {
//       console.error("Error decoding photo:", error);
//       return null; // Return a default value or handle the error in your own way
//     }
//   } else {
//     return null; // Return a default value or handle the case where photo is not available
//   }
// });


const modify = async () => {
      // const updatedInfo = '新的資訊'; // 根據實際情況更新資訊
  
  console.log(123);
   updateUser.value= user.value

if(photo.value ==null || photo.value == "/img/noImage.jpg"){
  console.log(photo.value);
  updateUser.value.photo = ""
}else {
  updateUser.value.photo = btoa(photoUrl.value)
  }

  if(user.value.birthday==null || user.value.birthday==""){
    updateUser.value.birthday = '0001-01-01'
  }

  console.log( updateUser.value.birthday);
const response = await axiosPut('http://localhost:8080/user/modify', updateUser.value ,{withCredentials:true});

if(response=="更新成功"){

  const result = await store.dispatch('setInformation', updateUser.value);
  console.log(result); // 打印返回的值
showNotification()

  // window.setTimeout(function () {
  //   window.location.reload();
  // } ,1000)
  //   router.push({path:"/userDetial"})
  
}
  // return error
}


const showNotification = () => {
  const updatedFields = [];

  if (updateUser.value.username !== user.value.username) {
    updatedFields.push('Username');
  }
  if (updateUser.value.email !== user.value.email) {
    updatedFields.push('Email');
  }
  // 添加其他需要检查更新的字段

  if (updatedFields.length > 0) {
    alert(`已更新：${updatedFields.join(', ')}`)
    // ElMessage.success(`已更新：${updatedFields.join(', ')}`);
  }
}

// const handlePhotoChange = (event) => {
//   const selectedFile = event.target.files[0];

//   if (selectedFile) {
//     user.value.photo = selectedFile; // Update user's photo data
//       upload(); // Upload the selected photo

//     updatePhoto(formData);
//   }
// };


const upload = async (e) => {
  if(e.target.files[0] && e.target.files.length > 0){
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])

    
    reader.onload = (e)=>{
      const mime = e.target.result.split(',')[0].split(':')[1].split(';')[0]; // 获取MIME类型
        if(mime.startsWith('image/')){

          photo.value = e.target.result
          photoUrl.value  = e.target.result
          user.value.photo = e.target.result
          console.log( photo.value);
        }else{
          swalError('上傳格式錯誤,只能上傳圖片')
        }
    }
 
};
}
const deletePhoto = ()=>{
  photo.value = "/img/noImage.jpg"
}

//返回
const back = ()=>{
router.push({ name: "UserDetial"})
}


</script>

<style>
    .user-photo-container {
    position: relative; /* 讓容器成為定位上下文 */
    width: 8rem;
    height: 8rem;
  
    border: 1px solid #8f8686;
    border-radius: 50%;
    overflow: hidden;
    margin: 5px;
    cursor:pointer
  }

  .user-photo1 {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .watermark {
    position: absolute;
    top: 50%; /* 垂直置中 */
    left: 50%; /* 水平置中 */
    transform: translate(-50%, -50%); /* 將圖片的中心點設置為容器的中心 */
    width: 50%; /* 設置浮水印圖片的寬度 */
    opacity: 0.2;
  }
 .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }

      .b-example-divider {
        width: 100%;
        height: 3rem;
        background-color: rgba(0, 0, 0, .1);
        border: solid rgba(0, 0, 0, .15);
        border-width: 1px 0;
        box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
      }

      .b-example-vr {
        flex-shrink: 0;
        width: 1.5rem;
        height: 100vh;
      }

      .bi {
        vertical-align: -.125em;
        fill: currentColor;
      }

      .nav-scroller {
        position: relative;
        z-index: 2;
        height: 2.75rem;
        overflow-y: hidden;
      }

      .nav-scroller .nav {
        display: flex;
        flex-wrap: nowrap;
        padding-bottom: 1rem;
        margin-top: -1px;
        overflow-x: auto;
        text-align: center;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }

      .btn-bd-primary {
        --bd-violet-bg: #712cf9;
        --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

        --bs-btn-font-weight: 600;
        --bs-btn-color: var(--bs-white);
        --bs-btn-bg: var(--bd-violet-bg);
        --bs-btn-border-color: var(--bd-violet-bg);
        --bs-btn-hover-color: var(--bs-white);
        --bs-btn-hover-bg: #6528e0;
        --bs-btn-hover-border-color: #6528e0;
        --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
        --bs-btn-active-color: var(--bs-btn-hover-color);
        --bs-btn-active-bg: #5a23c8;
        --bs-btn-active-border-color: #5a23c8;
      }
      .bd-mode-toggle {
        z-index: 1500;
      }



</style>