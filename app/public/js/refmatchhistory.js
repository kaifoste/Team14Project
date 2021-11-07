const SomeApp = {
    data() {
      return {
        referees: [],
        selectedReferee: null,
        assignments: [],
        selectedAssignment: null
      }
    },
    computed: {},
    methods: {
        fetchAssignmentsData(s) {
          console.log("Fetching offer data for ", s);
          fetch('/api/assignment/?referees=' + s.refereeId)
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.assignments = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });
      },
      fetchRefereesData() {
        fetch('/api/referee/')
        .then( response => response.json() )
        .then( (responseJson) => {
            console.log(responseJson);
            this.referees = responseJson;
        })
        .catch( (err) => {
            console.error(err);
        })
    },
    selectReferees(s) {
      if (s == this.selectedReferee) {
          return;
      }
      this.selectedReferee = s;
      this.assignments = [];
      this.fetchAssignmentsData(this.selectedReferee);
      },
        postNewMatch(evt) {        
          console.log("Posting!", this.matchForm);
  
          fetch('api/match/create.php', {
              method:'POST',
              body: JSON.stringify(this.matchForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.matches = json;
              
              // reset the form
              this.matchForm = {};
            });
        },
  },
    created() {
        this.fetchRefereesData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#matchHistoryApp');