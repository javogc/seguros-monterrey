$(function(){
  var klass = $('.index').attr('id');

  garciac.log_in('ukko', '12345', function(){
    garciac.index(klass).success(function(response){
      switch (klass) {
        case 'users':
          user_index(response);
          break;
        case 'procedures':
          procedure_index(response);
          break;
      }
    });
  });

  garciac.index(klass).error(function(response){
    console.log(response);
  });
});

function user_index (response){
  $.each(response, function(){
    $('.list').append(
        "<tr><td>" + this.id + "</td>" +
        "<td>" + this.name + "</td>" +
        "<td>  </td>" +
        "<td>  </td>" +
        "<td>  </td>" +
        "<td style='text-align: center'><a href='#'><span class='glyphicon glyphicon-trash' /></a></td>" +
        "<td style='text-align: center'><a href='#'><span class='glyphicon glyphicon-pencil' /></a></td></tr>"
      )
  });
}


function procedure_index (response){
  $.each(response, function(){
    $('.list').append(
      "<tr><td>" + this.id + "</td>" +
      "<td>" + this.name + "</td>" +
      "<td style='text-align: center'><a href='#'><span class='glyphicon glyphicon-trash' /></a></td>" +
      "<td style='text-align: center'><a href='#'><span class='glyphicon glyphicon-pencil' /></a></td></tr>"
      )
  });
}