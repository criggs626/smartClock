rawElement = document.querySelector("#dZUpload");
var myDropzone = rawElement.dropzone;
$(document).ready(function () {
    Dropzone.autoDiscover = false;
    $("#dZUpload").dropzone({
        url: "upload.php",
        addRemoveLinks: true,
        maxFiles: 1,
        acceptedFiles: ".jpg,.gif,.png",
        success: function (file, data) {
            $("#finalMessage").html("You're file has been uploaded successfully, just wait a few seconds for the image to update! Click anywhere to close.")
            $("#load").show();
        }
    });
});

$("#load").click(function () {
    $("#load").hide();
    location.reload();
});

$('#month').click(function () {
    var month = $("#month").val();
    if (month == "02") {
        $("#days").attr("max", 28);
    } else if (["01", "03", "05", "07", "08", "10", "12"].indexOf(month) != -1) {
        $("#days").attr("max", 31);
    } else {
        $("#days").attr("max", 30);
    }

});

$("#newEvent").click(function () {
    hour = parseInt($("#hour").val()) + parseInt($("#ampm").val());
	if(parseInt($("#days").val())<=parseInt($("#days").attr("max")) && parseInt($("#minute").val())<=parseInt($("#minute").attr("max"))){
    if (hour < 10) {
        hour = "0" + hour;
    }
    ;

    day = $("#days").val()
    if (day[1] == null) {
        day = "0" + day;
    }
    ;

    minute = $("#minute").val();
    if (minute[1] == null) {
        minute = "0" + minute;
    }
    ;

    time = $("#month").val() + '/' + day + '/' + $("#year").val() + " " + hour + ":" + minute;
    var data = {
        name: $("#name").val(),
        location: $("#location").val(),
        dtime: time
    }
    console.log(data);
    $.ajax({
        type: "POST",
        url: "php/event.php",
        data: data,
        success: function (data) {
            console.log(data);
            $("#finalMessage").html("You're event has been added! Click anywhere to close.");
            $("#load").show();
        },
        error: function (data) {
            console.log("error");
        }
    });
	}
	else{alert("Incorrect Date or Minute field. Re-Enter then try again");}

});
$.get('php/getEvents.php', function (data) {
    table('myTable', 5, JSON.parse(data));
});

$("#delete").click(function () {
    var result = [];
    $('input[type=checkbox]').each(function () {
        if (this.checked) {
            result.push($(this).val());
        }
    });
    console.log(result);

    var data = {
        id: result
    }
    $.ajax({
        type: "POST",
        url: "php/delete.php",
        data: data,
        success: function (data) {
            console.log(data);
            $("#finalMessage").html("Deleting events. Click anywhere to close.");
            $("#load").show();
        },
        error: function (data) {
            console.log("error");
        }
    });
});

$("#locale").click(function(){
	var city="";
	if($("#city").val()){
		city=$("#city").val()
	}
	else{
		city="St.Petersburg";
	}
	    var data = {
        location:city
    }
	    $.ajax({
        type: "POST",
        url: "php/city.php",
        data: data,
        success: function (data) {
            console.log(data);
            $("#finalMessage").html("Changed your city for the weather just wait for it to update. Click anywhere to close.");
            $("#load").show();
        },
        error: function (data) {
            console.log("error");
        }
    });
	
});