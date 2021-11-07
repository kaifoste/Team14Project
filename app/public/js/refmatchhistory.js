const SomeApp = {
    data() {
      return {
        matches: [],
        matchForm:{},
        selectedMatch: null,
        referees: [],
        refereeForm:{},
        selectedReferee: null,  
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
        selectMatches(s) {
          if (s == this.selectedMatch) {
              return;
          }
          this.selectedMatch = s;
          this.matches = [];
          this.fetchMatchesData(this.selectedMatch);
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
      this.referees = [];
      this.fetchRefereesData(this.selectedReferee);
  },
      postMatches(evt) {
        if (this.selectedMatch === null) {
            this.postNewMatch(evt);
        } else {
            this.postEditMatch(evt);
        }
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
        postEditMatch(evt) {        
        this.matchForm.matchId = this.selectedMatch.matchId;        
          console.log("Updating!", this.matchForm);
  
          fetch('api/match/update.php', {
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
              
              this.resetMatchForm();
            });
        },
        selectMatchForEdit(o) {
          this.selectedMatch = o;
          this.matchForm = Object.assign({}, this.selectedMatch);
      },
  },
    created() {
        this.fetchMatchesData();
        this.fetchRefereesData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#matchHistoryApp');