(function ($)
{
    $("#moreChildren").click(function(){
        //console.log('hi');
        var new_input="<input type='text' name='childName' class='childName' placeholder='childName'><br>"
        $("#namesOfChildren").append(new_input);
    });
})(window.jQuery)