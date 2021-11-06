const SomeApp = {
    data() {
      return {
        assignments: [],
        referees: [],
        matches: [],
        assignmentForm:{},
        selectedAssignment: null,
      }
    },
    computed: {},
    methods: {
        fetchAssignmentsData() {
            fetch('/api/assignment/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.assignments = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
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
        selectAssignments(s) {
          if (s == this.selectedAssignment) {
              return;
          }
          this.selectedAssignment = s;
          this.assignments = [];
          this.fetchAssignmentsData(this.selectedAssignments);
      },
      postAssignment(evt) {
        if (this.selectedAssignment === null) {
            this.postNewAssignment(evt);
        } else {
            this.postEditAssignment(evt);
        }
      },
        postNewAssignment(evt) {        
          console.log("Posting!", this.assignmentForm);
  
          fetch('api/assignment/create.php', {
              method:'POST',
              body: JSON.stringify(this.assignmentForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.assignments = json;
              
              // reset the form
              this.assignmentForm = {};
            });
        },
        postEditAssignment(evt) {        
        //   this.matchForm.field = this.selectedMatch.field;        
          console.log("Updating!", this.assignmentForm);
  
          fetch('api/assignment/update.php', {
              method:'POST',
              body: JSON.stringify(this.assignmentForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.assignments = json;
              
              this.resetAssignmentForm();
            });
        },
        postDeleteAssignment(o) {
          if (!confirm("Are you sure you want to delete the assignment?")) {
              return;
          }
          
          fetch('api/assignment/delete.php', {
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
              this.assignments = json;
              
              this.resetAssignmentsForm();
            });
        },
        selectAssignmentForEdit(o) {
          this.selectedAssignment = o;
          this.assignmentForm = Object.assign({}, this.selectedAssignment);
      },
        resetAssignmentForm() {
          this.selectedAssignment = null;
          this.assignmentForm = {};
        },
        },
    created() {
        this.fetchAssignmentsData();
        this.fetchRefereesData();
        this.fetchMatchesData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#assignmentApp');