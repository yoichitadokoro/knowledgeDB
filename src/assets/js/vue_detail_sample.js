var app = new Vue({
  el: "#vue_res",
  async mounted(){
    const data = await window.api.invoke("get_detail","get_detail")
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
    async btn_search_keyword(){
      const data = await window.api.invoke("search_keyword",this.keyword);
      location.href = "search_sample.html"
    },
  }
});
