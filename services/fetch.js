exports.fetchPokemon = async (pokemon_id, pokemonStatus)=>{
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}`)
        let pokemon= await response.json()
        pokemon = {
            pokemon_id: pokemonStatus.pokemon_id,
            view: pokemonStatus.view,
            catch: pokemonStatus.catch,
            in_team: pokemonStatus.in_team,
            name : pokemon.name,
            image: pokemon.sprites.front_default,
            types: pokemon.types.map(p=> p.type.name).join(", ")
        }
        
        return pokemon

    }catch (error){
        console.log(error)
        return error
    }
}