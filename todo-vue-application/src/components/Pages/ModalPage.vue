<template>
    <div>
        <!-- Button to open the modal -->
        <!-- <button @click="openModal" class="px-4 py-2 bg-blue-500 text-white rounded">Open Modal</button>   -->
        <!-- Modal -->
        <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
          <div class="bg-white w-5/12 rounded-lg p-4">
            <!-- other modal content -->
            <div class="flex justify-between p-4">
            <h2 class="text-lg font-semibold mb-4">Modal </h2>
  
              <button class="text-gray-600 hover:text-gray-800 hover:text-2xl focus:outline-none" @click="closeModal">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <!-- end other -->
            <!-- Modal content -->
            <h2 class="text-lg font-semibold mb-4">Modal Title</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            
            <!-- Close button -->
            <!-- <button @click="closeModal" class="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button> -->
          </div>
        </div>    
        <!-- Background overlay -->
        <div v-if="isModalOpen" class="fixed inset-0 bg-black opacity-50 z-40">Helooo</div>
      </div>

</template>

<script>
export default{
    name:"ModalPage",
    data(){
        return {
            isModalOpen: false,
        }
    },
    methods: {
      openModal() {
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
    },
}
</script>