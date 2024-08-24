<template>
  <div class="grid grid-cols-1 font-serif">
    <form action="" class="form flex justify-center mt-8">
      <div class="main-form-input">
        <strong>Sign Up</strong>
        <p class="text-center text-red-400 mt-8" v-if="userExist">{{userExist}}</p>
        <div class="form-group">
          <div class="text-left">Name</div>
          <input
            type="text"
            id="name" v-model="signUpForm.name"
            class="appearance-none px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100"
            placeholder="Enter your name"
            autocomplete="off"
          />
          <p v-if="errors.name" class="text-left text-red-400">{{errors.name[0]}}</p>

        </div>
        <div class="form-group">
          <div class="text-left">Email</div>
          <input
            type="email"
            id="email" v-model="signUpForm.email"
            class="px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100"
            placeholder="Enter your email"
            autocomplete="off"
          />
          <p v-if="errors.email" class="text-left text-red-400">{{errors.email[0]}}</p>
        </div>
        <div class="form-group">
          <div class="text-left">Password</div>
          <input
            type="password"
            id="password" v-model="signUpForm.password"
            class="px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100"
            placeholder="Enter your password"
          />
          <p v-if="errors.password" class="text-left text-red-400">{{errors.password[0]}}</p>

        </div>
        <div class="form-group flex justify-between">
          <button @click.prevent="submitSignupForm" class="rounded hover:rounded-xl bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4">
            Sign In
          </button>
          <router-link to="/"> Already have an account?<strong class="underline"> Login Here</strong></router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from '../../Router/routes';

export default {
  name: "SignupComponent",
  data(){
    return {
      signUpForm:{
        name:'',
        email:'',
        password:'',

      },
      errors:{},
      userExist:''
    }
  },
  methods:{
    async submitSignupForm(){
      const name = this.signUpForm.name;
      const email = this.signUpForm.email;
      const password = this.signUpForm.password;

      await axios.post("http://127.0.0.1:8000/api/user/register",{name,email,password})
      .then(response=>{
        this.errors = '';   
        alert(response.data.message);
        if(response.data.success == true && response.data.status == 200 ){
          this.userExist = response.data.message;
        } else{
          sessionStorage.setItem("access_token", response.data.access_token);
          router.push('/');
        }       
      }).catch((error)=>{
        if(error.response.data.status == 404){
          this.errors = error.response.data.errors; 
        }
        if(error.response && error.response.data.status == 500){
          // console.log(error.response.data.error);
          alert(error.response.data.error_msg);
        }      
      });
    }
  }
};
</script>
