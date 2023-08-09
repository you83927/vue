import Swal from 'sweetalert2'
import axios from 'axios';
const axiosGet = async function (url, properties) {
  try {
    const res = await axios.get(url, properties);
    if (res.data.code === 1) {
      return res.data.data;
    } else if (res.data.code === 0) {
      swalError(res.data.msg);
      throw new Error(res.data.msg); // 拋出錯誤訊息
    }
  } catch (err) {
    swalError(err.message);
    console.log(err);
    throw err;
  }
};
const axiosPost = async function (url, requestBody, properties) {
  try {
    const res = await axios.post(url, requestBody, properties);
    if (res.data.code === 1) {
      return res.data.data;
    } else if (res.data.code === 0) {
      swalError(res.data.msg)
     throw new Error(res.data.msg); // 回傳錯誤訊息
    }
  }
  catch(err){
    swalError(err.message);
    console.log(err);
    throw err;
  }
};
const axiosDelete = async function (url, properties) {
  try {
    const res = await axios.delete(url, properties);
    if (res.data.code === 1) {
      swalSuccess(res.data.data);
      return res.data.data;
    } else if (res.data.code === 0) {
      swalError(res.data.msg);
      throw new Error(res.data.msg); // Throw an error message
    }
  } catch (err) {
    swalError(err.message);
    console.log(err);
    throw err;
  }
}
const axiosPut = async function(url, requestBody, properties) {
  try {
    const res = await axios.put(url, requestBody, properties);
    if (res.data.code === 1) {
      swalSuccess(res.data.data);
      return res.data.data;
    } else if (res.data.code === 0) {
      swalError(res.data.msg);
      throw new Error(res.data.msg); // Throw an error message
    }
  } catch (err) {
    swalError(err.message);
    console.log(err);
    throw err;
  }
}

const swalError = function (myTitle) {
  Swal.fire({
    position: "top",
    icon: "error",
    title: myTitle,
    showConfirmButton: false,
    timer: 2000,
    toast: true,
  });
};

const swalSuccess = function(myTitle){
  Swal.fire({
    position: "top",
    icon: "success",
    title: myTitle,
    showConfirmButton: false,
    timer: 2000,
    toast: true,
  });
}

export{axiosGet, axiosPost, axiosPut, axiosDelete, swalError, swalSuccess}
