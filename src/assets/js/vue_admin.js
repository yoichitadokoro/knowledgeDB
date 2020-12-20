var app = new Vue({
  el: "#admin",
  data() {
    return {
      message: "VUE admin",
      test2: [],
    }
  },
  methods:{
    async createtable(){
      const data = await window.api.invoke("createtable","from js createtable");
      console.log(data)
      this.message = data
    },
  }
});
