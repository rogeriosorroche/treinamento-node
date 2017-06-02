$('body').on('submit', function(event) {

    let $origin = $(event.target);
    
    if ($origin.attr('method') == '_DELETE') {

        event.preventDefault();
        
        $.ajax({
            url:$origin.attr('action'),
            type: 'DELETE',
            data: {id:$origin.attr('data-id')},
            success: function(result) {
                $origin.closest('tr')
                       .remove();
            },
            error: function(result) {
                console.log(result);
            }
        });

    }

});
