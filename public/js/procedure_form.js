var dependency_hash = {}
var current_requirement = 0;

$(function(){
  var requirement_count = 0;

  $('#new_req').on('click', function(){
    requirement_count += 1;

    $('.list').append(
        "<tr class='list-item' id='req_" + requirement_count + "'>" +
        "<td><input style='width: 100%' type='text'></td>" +
        "<td><a class='btn btn-danger delete' id='delete_" + requirement_count + 
        "' href='#' role='button'>X</a></td>" +
        "<td><a class='btn btn-success dependencies' id='dependencies_" + 
        requirement_count + "' data-target='#dependency_modal' data-toggle='modal'" + 
        ">Dependencias</a></td></tr>"
      )

    dependency_hash['requirement_' + requirement_count] = {};
  });

  $('body').on('click', '.dependencies', function(e){
    current_requirement = this.id.split('_')[1];
    load_dependencies();
  });

  $('#dependency_modal').on('hidden.bs.modal', function(){
    $('.dep_item').remove();
  });

  $('body').on('click', '.delete', function(e){
    var id = this.id.split('_')[1];
    delete dependency_hash['requirement_' + id];

    for(key in dependency_hash){
      delete dependency_hash[key]['requirement_' + id];
    }

    $('#req_' + id).remove();
  });

  $('body').on('click', '#register_dependencies', function(e){
    $('.dep_item').each(
      dependency_hash['requirement_' + current_requirement][this.id]
    );
  });

  // $('#submit').on('click', function(e){
  //   var hash = {};
  //   var requirements = [];

  //   hash['procedure_name'] = $('#proc_name').value();

  //   for (item, index in ('.list-item input')){
  //     requirements.append(item.value);
  //   }

  //   hash['requirements'] = requirements;
  // });
});


function load_dependencies (){
  // todo cargar requerimientos != al que diste click en el modal
  for(key in dependency_hash){
    id = key.split('_')[1];
    if(key != 'requirement_' + current_requirement){
      if (key in dependency_hash['requirement_' + current_requirement]){
        $('.dep_list').append(
          "<tr class='dep_item' id='dep_" + id + "'>" +
          "<td><input type='checkbox' checked='true'> Requirement " + id + "</input></td>"
        )
      }
      else {
        $('.dep_list').append(
          "<tr class='dep_item' id='dep_" + id + "'>" +
          "<td><input type='checkbox'>Requirement " + id + "</input></td>"
        )
      }
    }
  }
}