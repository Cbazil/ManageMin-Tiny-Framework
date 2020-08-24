(function(global, $){
        var ManageMin = function(username, email, password, type, loggedOn){
    return new ManageMin.fix(username, email, password, type, loggedOn);
  }
  
  var management = ["staff", "supervisor", "master"];
  var systemMessages = {
    loggedOn: "Logged On",
    loggedOff: "Logged Off"
  };
  ManageMin.prototype = {
    check: function(){
      if (this.loggedOn) {
        this.password = password || 'masterpass';
      } else {
        let hidden = [];
        for (i = 0; i < password.length; i++) {
          hidden.push("*");
        }
        this.password = hidden.join('');
      }
    }
    session: function () {
      return this.username + " [" + this.type + "]";
    },
    validate: function(){
      if(management.indexOf(this.type) === -1){
        throw "Not Authorised"
      }
      return this;
    },
    setManageType: function(type){
      this.type = type;
      
      this.validate();

      return this;
    },
    logOn: function(){
      this.loggedOn = true;
      
      return this;
    },
    logOff: function(){
      this.loggedOn = false;
      
      return this;
    },
    log: function(){
      if (console) {
        if (this.loggedOn) {
        console.log(systemMessages.loggedOn + ". " + this.session().toUpperCase());
        } else {
          console.log(systemMessages.loggedOff + ". " + this.session().toUpperCase());
        }
     };
     return this;
    }
  }
  ManageMin.fix = function(username, email, password, type, loggedOn) {
    var self = this;
    self.username = username || 'admin';
    self.email = email || 'admin@admin.com';
    self.type = type || 'staff';
    self.loggedOn = Boolean(loggedOn) || false;

    this.validate();
  }
  
  ManageMin.fix.prototype = ManageMin.prototype;
  
  global.ManageMin = global.M$ = ManageMin;
  
}(window, jQuery));