const SomeApp = {
    data() {
      return {
        matches: [],
        matchForm:{},
        selectedMatch: null,
  
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
        //   this.matchForm.field = this.selectedMatch.field;        
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
        postDeleteMatch(o) {
          if (!confirm("Are you sure you want to delete the match?")) {
              return;
          }
          
          fetch('api/match/delete.php', {
              method:'POST',
              body: JSON.stringify(o),
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
        resetMatchForm() {
          this.selectedMatch = null;
          this.matchForm = {};
        },
        },
    created() {
        this.fetchMatchesData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#matchApp');