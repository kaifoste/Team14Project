const SomeApp = {
    data() {
      return {
        matches: [],
      }
    },
    computed: {},
    methods: {
        fetchMatchesData() {
          fetch('/api/match/')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.matches = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
        },
    },
    created() {
        this.fetchMatchesData();
    },
  
  }
  
  Vue.createApp(SomeApp).mount('#matchApp');