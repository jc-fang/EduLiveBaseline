userID = ''

function isValidId(id) {
    return (id != '');
}

function isValidName(name) {
    return (name != '');
}

function isStreamerId(id) {
    return (id.slice(0,13)==='cscedustream_');
}

// function isAudienceId(id) {
//     return (id[0]!='s' && id[0]!='S');
// }


function getUserId() {
    return userID;
}

function getCurrentTime() {
    var d = new Date();
    var n = d.getTime();
    return n
}




$("#login-btn").click(function () {
	userID = $("input[name=id]").val();
  name = $("input[name=preferredName]").val();
  console.log(name)
	firebase.database().ref('user/' + userID + '/Time'+ '/login').once("value").then(function (snapshot) {
		if (snapshot.val() == null) {

			if (isValidId(userID)) {


        if (isValidName(name)) {


  				$('.alert').hide();

          firebase.database().ref('user/' + userID + '/Time' + '/login').set(getCurrentTime())
          firebase.database().ref('user/' + userID + '/name').set(name);




          if (isStreamerId(userID)) {
            window.location.href = "consent_streamer.html#" + userID;
          } else{
            window.location.href = "consent_audience.html#" + userID;
          }

  			} else {
          console.log('no name')
  				//$('.alert').hide();
          $('.alert-danger').hide()
          $('#input-invalid-alert').hide()
  				$('#input-name-invalid-alert').show()

  			}

				// $('.alert').hide();
        //
				// firebase.database().ref('user/' + userID + '/Time' + '/login').set(getCurrentTime());
        // if (isStreamerId(userID)) {
        //   //window.location.href = "consent_streamer.html#" + userID;
        // } else{
        //   //window.location.href = "consent_audience.html#" + userID;
        // }


			} else {
				//$('.alert').hide();
        $('#input-name-invalid-alert').hide();
        $('.alert-danger').hide()
				$('#input-invalid-alert').show()
        console.log("no id")
			}
		} else {
			// $("#login-btn").prop("disabled", true)
			$('.alert').hide()
			$('.alert-danger').show()
		}
	})
})
