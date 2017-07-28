if $('body').hasClass('.procedure_form'){
  var requirement_count = 0;

  $('#new_req').on('click', function(){
    requirement_count += 1;

    $('.list').append(
        "<tr class='list-item'>" +
        "<td><p>Requirement #{requirement_count}</p></td>
        "<td><input type='text'></td></tr>"
      )
  });
}