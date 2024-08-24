<template>
  <div class="grid grid-cols-1 font-serif">
    <div
      class="ml-2 mr-2 home-content mb-4 shadow shadow-md p-5 shadow-gray-400 w-10/10 text-justify"
    >
      <div class="flex justify-around">
        <strong><h1 class="text-2xl">Post Lists</h1></strong>
        <h2 class="uppercase"><strong>Loged User - </strong> {{logedUser}}</h2>
        
        <button @click="openModal('Create Post')" title="Create Post" class="rounded hover:rounded-xl bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4">
          <i class="fas fa-pencil-square "></i>
          Create Post 
        </button>

        <router-link to="" @click.prevent.once="Logout">
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
            <tr class="text-md px-6 py-3 border-2"
              v-for="(list, index) in Lists"
              :key="index">
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
                  <i title="Delete Post" class="fas fa-trash bg-red-700 text-white p-2 shadow shadow-gray-800 rounded-full mx-1"></i>
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
            <!-- <input type="text" v-model="postForm.id" /> -->
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
import router from "@/Router/routes";
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
      logedUser:'',
    };
  },
  
  async mounted() {
    // ============= Get all post ===========
    this.getPost();
    this.logedUser = sessionStorage.getItem('logedUser');
  },
  methods: {
    async openModal(title, id=0) {
      this.isModalOpen = true;
      this.modalTitle = title;
      this.postForm.id = id;

      if(title === "Create Post" && id === 0){
        this.postForm.postTitle = '';
        this.postForm.postDescription = '';
        this.errors.title = '';
        this.errors.description = '';        
      }
      else if(title === "Edit Post" && id>0){
        this.EditForm(id);
      }

    },
      closeModal() {
        this.isModalOpen = false;
      },
    openDeleteModal(title, id){
      this.deleteModalVisible = true;
      this.modalTitle = title;
      this.postForm.id = id;
    },

    closeDeleteModal() {
      this.deleteModalVisible = false;
    },
    async getPost(){
      let user_id = sessionStorage.getItem("logedUserId");
       await axios.get("http://127.0.0.1:8000/api/user/postlist/"+user_id
       ,{
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          },
       }
       )
      .then(response => {   
         this.Lists = response.data.data;
        })
        .catch((error) => {
          if(error.response){
            // console.log(error.response.data);
            alert(error.response.data.error);
          }
          if(error.response && error.response.data.status == 401){
              alert(error.response.data.error);
              router.push("/");
          }               
        });
    },


    // ============  formHandler Funtion ===========

    formHandler(post_title){
      if(post_title === "Create Post" ){       
        this.createPost();
      }
      else if(post_title === "Edit Post"){
        this.updatePost(); 
      }
      else if(post_title === "Delete Post"){
        this.deletePost();
      }
    },
    // ============ End formHandler Funtion ===========
    

    // ============  create Post Funtion ===========
    async createPost() {

        const title = this.postForm.postTitle;
        const desc = this.postForm.postDescription;
        const logedUserid = sessionStorage.getItem("logedUserId");
        
        await axios.post('http://127.0.0.1:8000/api/user/create-post',
        { user_id:logedUserid,title:title,description:desc},
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          },
        })
        .then(response => {
          alert(response.data.message);
          this.getPost();
          this.isModalOpen = false;
        })
        .catch((error) => {
          if(error.response.data.errors){
            this.errors.title = error.response.data.errors.title;
            this.errors.description = error.response.data.errors.description;
          }             
          else if (error.response.data.status === 401) {
            alert(error.response.data.error);
          }
          else if (error.response.data.status === 400) {
            alert(error.response.data.errors);
            this.errors = error.response.data.error;
          }
          
        });
    },
    // ============ End create Post Funtion ===========

    EditForm(editId){
      axios.get(`http://127.0.0.1:8000/api/user/edit/${editId}`,{
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          },
      })
        .then(response => {
          this.postForm.postTitle       = response.data.data.title;
          this.postForm.postDescription = response.data.data.description;
        })
        .catch((error) => {
          alert(error.response.data.error);
          this.isModalOpen = false;
        });

    },    

    // ============ Update Funtion ===========
    updatePost() {
      console.log("edit Post func");
        const title = this.postForm.postTitle;
        const description = this.postForm.postDescription;
        const id = this.postForm.id;

        axios.put(`http://127.0.0.1:8000/api/user/update-post/${id}`,
        { title,description},
        {
          headers: {
                Authorization: "Bearer " + sessionStorage.getItem("access_token"),
              },
        })
        .then(response => {
          alert(response.data.message);
          this.getPost();
          this.isModalOpen = false;
        })
        .catch((error) => {
          // console.log("error " ,error.response);
          alert(error.response.data.error);
        });
    },
    // ============ End Edit Funtion ========


    // ============ deletePost Funtion ===========
    deletePost() {
        const id = this.postForm.id;        
        axios.delete(`http://127.0.0.1:8000/api/user/delete-post/${id}`,{
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("access_token"),
              },
        })
        .then(response => {
          alert(response.data.message);
          this.getPost();
          this.deleteModalVisible = false;
        })
        .catch((error) => {
          alert(error.response.data.error);
          router.push("/");
        });
    },

    // ============ End logout Post Funtion ========

    Logout(){
        axios.post('http://127.0.0.1:8000/api/user/logout',null,
        {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("access_token")
              },
        })
        .then(response => {
          alert(response.data.message);
          console.log(response);
          setTimeout(() => {        
            sessionStorage.removeItem('access_token'); 
            sessionStorage.removeItem('logedUser'); 
            sessionStorage.removeItem('logedUserId');  
            router.push("/");
          }, 1000);
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
    }
    // ============ End logout Funtion ========

  },
};
</script>
