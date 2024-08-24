<template>
    <div class="grid grid-cols-1 font-serif">
      <div
        class="ml-2 mr-2 home-content mb-4 shadow shadow-md p-5 shadow-gray-400 w-10/10 text-justify"
      >
        <div class="flex justify-around">
          <strong><h1 class="text-2xl">Post Lists</h1></strong>
          <h2>User Name</h2>
          <router-link to="/login">  <strong class="underline"> After Login</strong></router-link>
          <router-link to="/user/logout" @click.prevent.once="Logout">
            <strong class="underline"> Logout</strong>
          </router-link>
  
        </div>
      </div>
      <div class="table-content">
        <div class="flex justify-center">
          <table class="table-auto w-10/12 border-2">
            <thead class="border border-cyan-200 w-6/12 bg-indigo-700 text-white">
              <tr class="border border-solid border-2 bold">
                <th class="text-md px-6 py-3 border-2">S.No</th>
                <th class="text-md px-6 py-3 border-2">Title</th>
                <th class="text-md px-6 py-3 border-2">Description</th>
                <th class="text-md px-6 py-3 border-2">Author</th>
                <th class="text-md px-6 py-3 border-2">
                  Action <i class="fas fa-thumbs-up"></i>
                </th>
              </tr>
            </thead>
            <tbody v-if="this.Lists.length > 0">
              <tr
                class="text-md px-6 py-3 border-2"
                v-for="(list, index) in Lists"
                :key="index"
              >
                <td class="text-md px-6 py-3 border-2">{{ index + 1 }}</td>
                <td class="text-md px-6 py-3 border-2">
                  {{ list.title }}
                </td>
                <td class="text-md px-6 py-3 border-2">{{ list.description }}</td>
                <td class="text-md px-6 py-3 border-2" v-if="list.user">
                  {{ list.user.name }}
                </td>
                <td class="text-md px-6 py-3 border-2" v-else></td>
                <td class="text-md px-6 py-3 flex">
                  <!-- :to="{ path: `/home/${list.id}` }" -->
                  <router-link to="" @click="openModal('Edit Post', list.id)" >
                    <i title="Edit Post" class="fas fa-edit bg-green-700 text-white p-2 shadow shadow-gray-800 rounded-full"
                    ></i>
                  </router-link>
                  <router-link to="" @click="openDeleteModal('Delete Post', list.id)">
                    <i
                      title="Delete Post"
                      data-id="list.id"
                      class="fas fa-trash bg-red-700 text-white p-2 shadow shadow-gray-800 rounded-full mx-1"
                    ></i>
                  </router-link>
                  <router-link to="" @click="openModal('Create Post')">
                    <i
                      title="Create Post"
                      class="fas fa-pencil-square bg-green-700 text-white p-2 shadow shadow-gray-800 rounded-full mx-1"
                    ></i>
                  </router-link>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td>No records ...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  
    <!-- Create Modal Start -->
    <div class="font-serif">
      <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-white w-5/12 rounded-lg p-4">
          <div class="modal-header flex justify-between">
            <h2 class="text-lg font-semibold">{{ modalTitle }}</h2>
            <button
              class="text-gray-600 hover:text-gray-800 hover:text-2xl focus:outline-none"
              @click="closeModal"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-content grid grid-cols-1 font-serif mt-2">
            <form class="form">
              <input type="text" v-model="postForm.id" />
              {{ postForm }}
              <div class="form-group">
                <div class="text-left">Post Title</div>
                <input
                  type="text"
                  id="name"
                  v-model="postForm.postTitle"
                  class="appearance-none px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100"
                  placeholder="Enter Your Post Title"
                  autocomplete="off"
                />
                <div v-if="errors.title" class="error text-left text-red-400">{{ errors.title[0] }}</div>
              </div>
              <div class="form-group">
                <div class="text-left">Description</div>
                <textarea
                  type="text"
                  id="desc"
                  v-model="postForm.postDescription"
                  class="px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100"
                  placeholder="Enter Your Post Description"
                  autocomplete="off"
                ></textarea>
                <div v-if="errors.description" class="error text-left text-red-400">{{ errors.description[0] }}</div>
  
              </div>
              <div class="form-group">
                <button
                  @click.prevent="formHandler(modalTitle)"
                  class="rounded hover:rounded-xl bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- Background overlay -->
      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-black opacity-50 z-40"
      ></div>
    </div>
  
  
     <!-- Create Delete Modal Start -->
     <div class="font-serif">
      <div v-if="deleteModalVisible" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-white w-5/12 rounded-lg p-4">
          <div class="modal-header flex justify-between">
            <h2 class="text-lg font-semibold">Delete Post</h2>
            <button
              class="text-gray-600 hover:text-gray-800 hover:text-2xl focus:outline-none"
              @click="closeDeleteModal"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-content grid grid-cols-1 font-serif mt-2">
              <div class="delete">
                <h1 class="text-3xl">Are You Sure ?</h1>
                <small>You will not be able to see this futher!. </small>
              </div>
              <div class="btn text-right flex justify-center mt-2">
                <button
                  @click="closeDeleteModal()"
                  class="rounded hover:rounded-xl bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4">
                 Cancel
                </button> &nbsp;
                <button
                @click.prevent="formHandler(modalTitle)"
                class="rounded hover:rounded-xl bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4">
                Yes, Delete It.
              </button>
              </div>
          </div>
        </div>
      </div>
      <div v-if="deleteModalVisible" class="fixed inset-0 bg-black opacity-50 z-40"></div>
    </div>
    
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: "HomeComponent",
    data() {
      return {
        Lists: [],
        isModalOpen: false,
        modalTitle:'',
        postForm: {
          id:'',
          postTitle:'',
          postDescription:'',
        },
        deleteModalVisible:false,
        errors: {
          title:'',
          description:''
        },
      };
    },
    async mounted() {
      // ============= Get all post ===========
      this.getPost();
    },
    methods: {
      async openModal(title, id=0) {
        this.isModalOpen = true;
        this.modalTitle = title;
        this.postForm.id = id;
  
        if(title === "Create Post" && id === 0){
          console.log(title + ' If');
          this.postForm.postTitle = '';
          this.postForm.postDescription = '';
          this.errors.title = '';
          this.errors.description = '';        
        }
        else if(title === "Edit Post" && id>0){
          console.log(title + ' Edit');
          this.EditForm(id);
        }
  
      },
      closeModal() {
        this.isModalOpen = false;
      },
      openDeleteModal(title, id=0){
        this.deleteModalVisible = true;
        this.modalTitle = title;
        this.postForm.id = id;
      },
  
      closeDeleteModal() {
        this.deleteModalVisible = false;
      },
      async getPost(){
        console.log("access Token " , localStorage.getItem("access_token"));          
         await axios.get("http://127.0.0.1:8000/api/postlist",{
          headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
         })
        .then(response => {   
           this.Lists = response.data.data;
          //  console.log(response);
          })
          .catch((error) => {
            if(error.response){
              console.log(error.response);
                 alert(error.response.data.error);
                 console.log("get post error");
            }         
          });
      },
  
  
      // ============  formHandler Funtion ===========
  
      formHandler(post_title){
        if(post_title === "Create Post" ){       
          this.createPost();
          console.log(post_title + ' Create Post');
        }
        else if(post_title === "Edit Post"){
          this.editPost(); // update post 
        }
        else if(post_title === "Delete Post"){
          this.deletePost();
        }
        console.log("form Handler");
      },
      // ============ End formHandler Funtion ===========
      
  
      // ============  create Post Funtion ===========
      async createPost() {
        
        console.log("createPost call");
        const title = this.postForm.postTitle;
          const postDescription = this.postForm.postDescription;
          const id = 2;//this.postForm.id;
          
          await axios.post('http://127.0.0.1:8000/api/create-post',{user_id:id,title:title,description:postDescription})
          .then(response => {
            console.log("create response", response.data);
            console.log(response);
            alert(response.data.message);
            this.getPost();
            this.isModalOpen = false;
          })
          .catch((error) => {
            console.log("error hai" ,error.response);
            this.errors.title = error.response.data.errors.title;
            this.errors.description = error.response.data.errors.description;
  
            // console.log("error " ,error.response.data.error);
            console.log(error.response.data.errors.title);
            console.log(error.response.data.errors.description);
  
            console.log(this.errors);
            if (error.response.data.status === 400) {
            alert(error.response.data.errors);
              this.errors = error.response.data.error;
              console.log(this.errors);
            }
            // this.isModalOpen = false;
          });
      },
      // ============ End create Post Funtion ===========
  
      EditForm(editId){
        axios.get(`http://127.0.0.1:8000/api/edit/${editId}`)
          .then(response => {
            this.postForm.postTitle       = response.data.data.title;
            this.postForm.postDescription = response.data.data.description;
          })
          .catch((error) => {
            // console.log("error " ,error.response.data.error);
            alert(error.response.data.error);
            this.isModalOpen = false;
          });
  
      },    
  
      // ============ Update Funtion ===========
      editPost() {
        console.log("edit Post func");
          const title = this.postForm.postTitle;
          const postDescription = this.postForm.postDescription;
          const id = this.postForm.id;
          
          axios.put(`http://127.0.0.1:8000/api/update-post/${id}`,{title:title,description:postDescription})
          .then(response => {
            console.log("put response", response.data.data);
            console.log(response);
            alert(response.data.message);
            this.getPost();
            this.isModalOpen = false;
          })
          .catch((error) => {
            console.log("error " ,error.response);
            alert(error.response.data.error);
          });
      },
      // ============ End Edit Funtion ========
  
  
      // ============ deletePost Funtion ===========
      deletePost() {
          const id = this.postForm.id;        
          axios.delete(`http://127.0.0.1:8000/api/delete-post/${id}`)
          .then(response => {
            // console.log("put response", response.data.data);
            alert(response.data.message);
            this.getPost();
            this.deleteModalVisible = false;
          })
          .catch((error) => {
            alert(error.response.data.error);
          });
      },
      Logout(){
          axios.get('http://127.0.0.1:8000/api/logout',{
  
          })
          .then(response => {
            // console.log("put response", response.data.data);
            alert(response.data.message);
            // this.getPost();
            // this.deleteModalVisible = false;
          })
          .catch((error) => {
            alert(error.response.data.error);
          });
      }
      // ============ End delete Post Funtion ========
  
    },
  };
  </script>
  
  <!-- 
      <div class="grid grid-cols-1 font-serif">
            <form action="" class="form flex justify-center">
              <div class="main-form-inputt">
                <div class="form-group">
                  <div class="text-left">Post Title</div>
                  <input type="text" id="name"
                    class="appearance-none px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100"
                    placeholder="Enter Your Post Title" autocomplete="off"
                  />
                </div>
                <div class="form-group">
                  <div class="text-left">Description</div>
                  <textarea type="text" id="desc"
                    class="px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100"
                    placeholder="Enter Your Post Description" autocomplete="off"></textarea>
                </div>
              
                <div class="form-group ">
                  <button class="rounded hover:rounded-xl bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4">
                    Sign In
                  </button>
                  <router-link to="/login"> Already have an account?<strong class="underline"> Login Here</strong></router-link>
                </div>
              </div>
            </form>
          </div>
  
   -->
  <!-- <tbody v-if="this.Lists.length > 0">
              <tr class="text-md px-6 py-3 border-2" v-for="(list,index) in Lists" :key="index">
                <td class="text-md px-6 py-3 border-2">{{index + 1}}</td>
                <td class="text-md px-6 py-3 border-2">{{list.first_name}} {{list.last_name}} 
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.                
                </td>
                <td class="text-md px-6 py-3 border-2">{{list.email}}</td>
                <td class="text-md px-6 py-3 border-2">
                  <img :src="list.avatar" class="rounded-full w-10 h-10" alt="">
                </td>
                <td class="text-md px-6 py-3 border-2">
                  <router-link :to="{path:`/home/${list.id}`}">
                    <i class="fas fa-pencil bg-green-700 text-white p-2 shadow shadow-gray-800 rounded-full"
                    ></i>
                  </router-link>
                  <router-link :to="{path:`/delete/${list.id}`}">
                    <i
                      class="fas fa-trash bg-red-700 text-white p-2 shadow shadow-gray-800 rounded-full mx-1"
                    ></i>
                  </router-link>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td> 
                  Loading ...           
                </td>
              </tr>
            </tbody> -->
  