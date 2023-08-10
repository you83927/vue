<template>
            
<main class="form-signin w-100 m-auto">
  <form @submit.prevent="login">
    <!-- <img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> -->
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="userName">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="passWord">
      <label for="floatingPassword">Password</label>
    </div>
    
    <div class="checkbox mb-3">
      <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit" >Sign in</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
</form>
</main>
</template>

<script setup>
// import axios from 'axios';
// import { ref } from 'vue';

// const URL = import.meta.env.VITE_API_JAVAURL;

// const loginName = ref('');
// const loginPwd = ref('');

// const login = async () => {
//   const requestData = {
//     loginName: loginName.value,
//     loginPwd: loginPwd.value
//   };
//   console.log(requestData);

//   try {
//     const response = await axios.post(`http://localhost:8080/user/login`, requestData);
//     console.log(response);
//     if (response.data.msg === 'login success') {
//       // 登录成功，处理页面跳转或其他逻辑
//     } else {
//       alert('Login failed: ' + response.data.msg);
//     }
//   } catch (error) {
//     console.error('An error occurred:', error);
//     alert('An error occurred during login.');
//   }
// };
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const URL = import.meta.env.VITE_API_JAVAURL

const userName = ref('');
const passWord = ref('');

const router = useRouter();

const login = async  () => {
    const user = {
  userName: userName.value,
  passWord: passWord.value
};

  try {
  const response = await axios.post('http://localhost:8080/user/login', user, {withCredentials:true})
  if (response.data.data === 'login success') {
    // localStorage.setItem('user', JSON.stringify(user))
    console.log(response);
      router.push({ path: '/' });
    } else {
      alert('Login failed: ' + response.data);
    }
  } catch (error) {
    console.error('An error occurred:', error);
    alert('An error occurred during login.');
  }
    // .then((res) => {
    //   console.log(res);
    //     console.log(res.data);
    //   if (res.data.data === 'login success') {
       
    //     router.push( 'userDetial' );
    //   }else {
    //          // 登录失败，可以弹出错误提示等
    //          alert('Login failed: ' + res.data);
    //      }
    // })
    // .catch((error) => {
    //     console.log(error.response.data.msg);
    // });
};
</script>

    
<style>
    
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
</style>