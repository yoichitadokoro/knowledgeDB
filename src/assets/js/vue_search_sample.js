var app = new Vue({
  el: "#vue_res",
  async mounted(){
    const data = await window.api.invoke("get_query","get_query")
    this.query = data
    console.log(data)
  },
  data() {
    return {
      keyword:'',
      query:'',
    }
  },
  methods:{
    async btn_detail(id1){
      const data = await window.api.invoke("search_detail",id1);
      location.href = "detail_sample.html"
    },
    async btn_edit(id1){
      const data = await window.api.invoke("edit_set",id1);
      console.log('Edit')
    },
    async btn_delete(id1){
      const data = await window.api.invoke("delete_set",id1);
      console.log('Delete')
    }
  }
});
