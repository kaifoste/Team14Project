const SomeApp = {
  data() {
    return {
      referees: [],
      refereeForm:{},
      selectedReferee: null,

    }
  },
  computed: {},
  methods: {
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
    postReferees(evt) {
      if (this.selectedReferee === null) {
          this.postNewReferee(evt);
      } else {
          this.postEditReferee(evt);
      }
    },
      postNewReferee(evt) {        
        console.log("Posting!", this.refereeForm);

        fetch('api/referee/create.php', {
            method:'POST',
            body: JSON.stringify(this.refereeForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.referees = json;
            
            // reset the form
            this.refereeForm = {};
          });
      },
      postEditReferee(evt) {        
      //   this.matchForm.field = this.selectedMatch.field;        
        console.log("Updating!", this.refereeForm);

        fetch('api/referee/update.php', {
            method:'POST',
            body: JSON.stringify(this.refereeForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.referees = json;
            
            this.resetRefereeForm();
          });
      },
      postDeleteReferee(o) {
        if (!confirm("Are you sure you want to delete the referee?")) {
            return;
        }
        
        fetch('api/referee/delete.php', {
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
            this.referees = json;
            
            this.resetRefereeForm();
          });
      },
      selectRefereeForEdit(o) {
        this.selectedReferee = o;
        this.refereeForm = Object.assign({}, this.selectedReferee);
    },
      resetRefereeForm() {
        this.selectedReferee = null;
        this.refereeForm = {};
      },
      },
  created() {
      this.fetchRefereesData();
  }

}

Vue.createApp(SomeApp).mount('#refereeApp');