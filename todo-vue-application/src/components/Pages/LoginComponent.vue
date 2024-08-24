<template>
  <div class="grid grid-cols-1 font-serif">
    <form action="" class="form flex justify-center mt-8">
      <div class="main-form-input">
        <strong>Login With Your Account</strong> 
        <p v-if="authError" class="text-center text-red-400">{{ authError }}</p>

        <div class="form-group">
          <div class="text-left">Email</div>
          <input
            type="email"
            v-model="loginForm.email"
            id="email"
            name="email"
            class="px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100"
            placeholder="Enter your email"
            autocomplete="off"
          />
          <p v-if="errors.email" class="text-left text-red-400">
            {{ errors.email[0] }}
          </p>
        </div>
        <div class="form-group">
          <div class="text-left">Password</div>
          <input
            type="password"
            id="password"
            v-model="loginForm.password"
            name="password"
            class="px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100"
            placeholder="Enter your password"
          />
          <p v-if="errors.password" class="text-left text-red-400">
            {{ errors.password[0] }}
          </p>
        </div>
        <div class="form-group flex justify-between">
          <button
            @click.prevent="submitLoginForm"
            class="rounded hover:rounded-xl bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
          >
            Sign In
          </button>
          <router-link to="/signup">
            Don't have an account?
            <strong class="underline"> Sign up</strong></router-link>          
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../../Router/routes";

export default {
  name: "LoginComponent",
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      errors: {},
      authError: '',
    };
  },
  methods: {
    async submitLoginForm() {
      const email = this.loginForm.email;
      const password = this.loginForm.password;
      await axios.post("http://127.0.0.1:8000/api/user/login", { email, password })
        .then((response) => {
          // console.log(response.data.data.name);
          this.errors = "";
          alert(response.data.message);
          sessionStorage.setItem('access_token', response.data.access_token);
          sessionStorage.setItem("logedUser", response.data.data.name);
          sessionStorage.setItem("logedUserId", response.data.data.id);

          setTimeout(() => {
            router.push("/user/homepage");            
          }, 1000);
        })
        .catch((error) => {
          this.errors = '';
          this.authError = '';
          if (error.response && error.response.data.status == 404) {
            if(error.response.data.error){
              this.authError = error.response.data.error;
            }
            // Fields errors
            if(error.response.data.errors){   
              this.errors = error.response.data.errors;
            }
          }
          if (error.response && error.response.data.status == 401) {
            this.authError = error.response.data.error;
          }
        });
    },
  },
};
</script>
<style scoped>
input {
  padding: 10px;
  width: 100%;
}

.main-form-input {
  width: 500px;
  padding: 20px;
  box-shadow: 0px 1px 5px 5px #cccccc;
  border-radius: 20px;
}
.form-group {
  margin: 10px;
}
</style>
