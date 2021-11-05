const refereesApp = {
    data() {
      return {
        referees : [],
        "referees":{
            id: {},
            fname: {},
            lname: {},
            age: {},
            grade: {},
            rating: {},
        },
      }
    },
    computed: {},
    methods: {
        fetchRefereeData() {
            fetch('/api/referee/')
            .then( response => response.json())
            .then( (responseJson) => {
                  console.log(responseJson);
                  this.referees = responseJson;
              })
              .catch( (err) => {
                  console.error(err);
              })
          }
    },
    created() {
        this.fetchRefereeData()
    }
  }
  
  Vue.createApp(refereesApp).mount('#refereesList');