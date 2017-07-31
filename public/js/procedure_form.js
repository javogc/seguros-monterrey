var requirement_hash = {}
var current_requirement = 0;

$(function(){
  var requirement_count = 0;

  $('#new_req').on('click', function(){
    requirement_count += 1;

    $('.list').append(
        "<tr class='list-item' id='requirement_" + requirement_count + "'>" +
        "<td><input style='width: 100%' type='text'></td>" +
        "<td><a class='btn btn-danger delete' id='delete_" + requirement_count + 
        "' href='#' role='button'>X</a></td>" +
        "<td><a class='btn btn-success dependencies' id='dependencies_" + 
        requirement_count + "' data-target='#dependency_modal' data-toggle='modal'" + 
        ">Dependencias</a></td></tr>"
      )

    requirement_hash['requirement_' + requirement_count] = { id: requirement_count, dependencies: [] };
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
    delete requirement_hash['requirement_' + id];

    for(key in requirement_hash){
      if (requirement_hash[key]['dependencies'].includes(id)) {
        requirement_hash[key]['dependencies'].pop(id)
      }
    }

    $('#requirement_' + id).remove();
  });

  $('body').on('click', '#register_dependencies', function(e){
    $.each($('.dep_item'), function () {
      id = this.id.split('_')[1];
      if(this.children[0].children[0].checked && !requirement_hash['requirement_' + current_requirement]['dependencies'].includes(id)){
        requirement_hash['requirement_' + current_requirement]['dependencies'].push(id)  
      }
      else if (requirement_hash['requirement_' + current_requirement]['dependencies'].includes(id)) {
        requirement_hash['requirement_' + current_requirement]['dependencies'].pop(id)
      }
    });
  });

  $('#submit').on('click', function(e){
    var procedure = {};
    procedure['name'] = $("#proc_name").val();
    procedure['requirements'] = [];

    for (key in requirement_hash){
      var temp = {};
      temp['name'] = $('#' + key + ' td input').val();
      temp['id'] = requirement_hash[key].id
      temp['dependencies'] = requirement_hash[key].dependencies
      procedure.requirements.push(temp);
    }
  });
});


function load_dependencies (){
  for(key in requirement_hash){
    id = key.split('_')[1];
    name = $('#' + key + ' td input').val();

    if (name === ""){
      name = "Sin nombre";
    }

    if(key != 'requirement_' + current_requirement){
      if (requirement_hash['requirement_' + current_requirement]['dependencies'].includes(id)){
        $('.dep_list').append(
          "<tr class='dep_item' id='dep_" + id + "'>" +
          "<td><input type='checkbox' checked='true'>" + name + "</input></td>"
        )
      }
      else {
        $('.dep_list').append(
          "<tr class='dep_item' id='dep_" + id + "'>" +
          "<td><input type='checkbox'>" + name + "</input></td>"
        )
      }
    }
  }
}