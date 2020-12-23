var app = new Vue({
  el: "#vue_main",
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
