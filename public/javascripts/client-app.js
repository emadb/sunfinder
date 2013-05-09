$(function(){

    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(setPosition);
    }

    function setPosition(position)
    {
        var lat = $('#lat').val(position.coords.latitude);
        var lon = $('#lon').val(position.coords.longitude);
    }

	$('#go').click(function(){
        var button = this;
        $(button).attr('disabled','disabled')
		var lat = $('#lat').val();
		var lon = $('#lon').val();
        var km = $('#km').val();

		$.get('/weather?lat=' + lat + '&lon=' + lon + '&km=' + km, function(response){
			$('#items').html('');
			$(response).each(function(i, item){
                if (item.name.length > 0){
                    var element = '<li>' + item.name + '&nbsp;&nbsp;<span class="label label-info">' + item.condition + '&nbsp;&nbsp;</span><small>' + item.clouds +'</small></li>';
                    $('#items').append(element);
                    $(button).removeAttr('disabled');
                }
            });
		});

		return false;
	})
})