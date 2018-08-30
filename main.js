let crudApi = axios.create({
  baseURL: "https://ih-crud-api.herokuapp.com"
})

crudApi.get('/characters')
.then(response => {
  console.log(response.data);
  $('.characters-list').html(`<ul></ul>`)
  for (let i = 0; i < response.data.length; i++) {
    createListItem({
      name: response.data[i].name,
      occupation: response.data[i].occupation,
      id: response.data[i].id,
    })
  }
})


$('.create-character').click(e => {
  e.preventDefault();
  let name = $('input[name=name]').val()
  let occupation = $('input[name=occupation]').val()
  let weapon = $('input[name=weapon]').val()
  let debt = $('select[name=debt]').val()

  $('input[name=name]').val('')
  $('input[name=occupation]').val('')
  $('input[name=weapon]').val('')
  $('select[name=debt]').val('')

  crudApi.post('/characters', {
    name,
    occupation,
    weapon,
    debt
  })
  .then(response => {
    console.log("Character created", response.data);
    createListItem(response.data)
  })
})

function createListItem(character) {
  $('.characters-list ul').append(`
    <li>
      ${character.name} - ${character.occupation} -
      <button class="delete" data-id="${character.id}" >Delete</button>
    </li>
  `)
  $('.characters-list ul button:last').click(function() {
    // let id = $(this).attr('data-id') // Same
    let id = $(this).data('id')
    crudApi.delete('/characters/'+id)
    .then(response => {
      console.log(response.data)
      // $(this).parent().remove()
      $(this).parent().css('color', 'red')
    })
  })
}
