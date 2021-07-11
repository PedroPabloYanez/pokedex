$(document).ready(function(){
    // llamada de kistado de pokemones
    getPokemon('https://pokeapi.co/api/v2/pokemon')
});

// extraemos cada pokemon y asignamos url de los proximos 20 pokemones
function getPokemon(url){
   $.ajax(url)
    .done(function(data){
        data.results.forEach(function(pokemon) {
            addPokemon(pokemon);
        });
        $('#more-pokemons').attr('data-next', data.next)
    }) 
}

// mostramos el nombre de cada pokemon y el btn de ver más
function addPokemon(pokemon){
    $('#pokedex').append('<li>' + pokemon.name + '</li>' + 
                        '<button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#pokemon-data" data-pokemon='+ pokemon.name +'> Quiero saber más de este pokemon' + '</button>')
}

// traemos la info de cada pokemon al click
function getPokemonData(pokemon){
    let url_pok = "https://pokeapi.co/api/v2/pokemon/" 
    $.ajax(url_pok + pokemon)
        .done(function(data){
            $('#pokemon-data-name').text(data.name)
            data.types.forEach(function(tipo){
                $('#pokemon-types').append('<li>' +tipo.type.name+ '</li>')
                getPokemonGeneration(tipo.type.url)
            })
            data.abilities.forEach(function(habilidad){
                $('#pokemon-abilities').append('<li>' +habilidad.ability.name+ '</li>')
            })

            let count=0
            data.moves.forEach(function(move){
                count++;
                if(count < 6){
                    $('#pokemon-moves').append('<li>' + move.move.name + '</li>')
                    
                }   
            })

        })
        $('#pokemon-moves').empty()
        $('#pokemon-data-name').empty()
        $('#pokemon-types').empty()
        $('#pokemon-generations').empty()
        $('#pokemon-abilities').empty()
}

function getPokemonGeneration(url){
    $.ajax(url)
        .done(function(data){
            $('#pokemon-generations').append('<li>' +data.generation.name + '</li>')
        })
}

// recibimos el click para traer los proximos 20 pokemones
$('#more-pokemons').click(function(){
    getPokemon(this.dataset.next);
});

// recibimos el click del div general para identificar el pokemon target
$('#pokedex').click(function(event){
    if(event.target.dataset.pokemon){
        getPokemonData(event.target.dataset.pokemon)
    }
})

// 1. traer los datos preliminares de los 20 pokemones para mostrarlos en cards. - DONE
// 2. darle funcionamiento al btn que trae los 20 pokemones siguientes. - DONE
// 3. Crear modal con sus ids para mostrar la info de cada pokemon. - DONE
// 4. Crear la funcion que traiga esa info por cada pokemones - DONE
    // mostrar titulo de pokemons - DONE
    // mostrar tipo, habilidades, generaciones, movimientos por cada pokemon