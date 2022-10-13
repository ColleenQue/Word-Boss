(function ($)
{

    $('#moreChildren').click(function(){

        //console.log('hi');
        //var new_input="<input type='text' name='childName' class='childName' placeholder='childName'><br>"
        var new_input="<div class='d-flex flex-row align-items-center mb-4'><i class='fas fa-user fa-lg me-3 fa-fw'></i>\
        <div class='form-outline flex-fill mb-0'><input type='text' class='form-control' name='childName' placeholder='childName'/>\
        </div></div>";
        $("#namesOfChildren").append(new_input);
    });
})(window.jQuery)