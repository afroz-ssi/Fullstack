<template>
    <div class="grid grid-cols-1 font-serif">
      <form action="" class="form flex justify-center mt-8">
        <div class="main-form-input">
         <h3 class="font-"><strong>Edit User Post {{id}}</strong></h3> 
  
          <div class="form-group">
            <div class="text-left">Post Title</div>
            <input
              type="text"
              id="name"
              class="appearance-none px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100"
              placeholder="Enter Your Post Title"
              autocomplete="off"
            />
          </div>
          <div class="form-group">
            <div class="text-left">Description</div>
            <textarea
              type="text"
              id="desc"
              class="px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100"
              placeholder="Enter Your Post Description"
              autocomplete="off"></textarea>
          </div>
        
          <div class="form-group flex justify-between">
            <button
              class="rounded hover:rounded-xl bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4">
              Sign In
            </button>
            <router-link to="/login"> Already have an account?<strong class="underline"> Login Here</strong></router-link>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
import {useRoute} from 'vue-router';

  export default {
    name: "SignupComponent",
    data(){
        return {
            id:''
        }
    },
    mounted(){
        const route = useRoute();
        this.id = route.params.id;
        console.log("Mounted " ,route.params.id);
    }
  };
  </script>
  <style>
 
  </style>
  