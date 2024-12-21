const StatusPokemon = require("../models/pokemonModel")
const {fetchPokemon} = require("../services/fetch")
exports.test = (req,res)=>{
    console.log("hola controller")
    res.status(200).send("hola desde controller")
}
exports.createPokemonStatus = async (req,res)=>{
    try{
        const status = await StatusPokemon.create({
            pokemon_id: req.body.pokemon_id,
            view: req.body.view,
            catch: req.body.catch,
            in_team: req.body.in_team
        })
        res.status(201).json(status)
    }catch (error){
        console.error(error)
        return res.status(500).json({error})
    }
}
exports.getPokemonStates = async (req,res)=>{
    try{
        const status = await StatusPokemon.find({})
        res.status(200).json(status)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error})
    }
    
}
exports.getPokemonByPokemonId = async(req,res)=>{
    try{
        const pokemon_id = req.params.pokemon_id;
        let statusPokemon = await StatusPokemon.findOne({"pokemon_id":pokemon_id})
        
        if(!statusPokemon){
            let newStatusPokemon ={
                pokemon_id:pokemon_id,
                view:false,
                catch:false,
                in_team:false
            }
            pokemon = await fetchPokemon(pokemon_id,newStatusPokemon)
            console.log(pokemon,"Mensaje segundo pokemon")
            return res.status(200).json(pokemon)
        }else{
            
            pokemon = await fetchPokemon(pokemon_id,statusPokemon)
            res.status(200).json(pokemon)
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({error})
    }
}
exports.catchPokemonByPokemonId = async(req,res)=>{
    const pokemon_id = req.params.pokemon_id;
    const pokemonStatusId = req.body.pokemon_id
    if(pokemon_id==pokemonStatusId){
    try{
        const pokemonStatusView = req.body.view
        const pokemonStatusCacth = req.body.catch
        let pokemon = await StatusPokemon.findOne({"pokemon_id":pokemon_id})
        if(!pokemon){
            return res.status(400).json({message:"bad request, pokemon not view yet"})
        }
        else if(pokemon.view != pokemonStatusView){
            return res.status(400).json({message:"bad request,inconsistent data"})
        }else if(pokemon.catch){
            return res.status(200).json(pokemon)
        }else{
            pokemon = await StatusPokemon.findOneAndReplace({"pokemon_id":pokemon_id},{
                pokemon_id: pokemon_id,
                view:true,
                catch: true,
            },{new:true}
            )
            return res.status(200).json(pokemon)
        }
    }catch(error){
        console.error(error)
        return res.status(500).json({error})
    }
    }else{
        return res.status(400).json({message:"bad request, pokemon_id in body diferent pokemon_id in params"})
    }
}
exports.inTeamPokemonByPokemonId = async (req,res)=>{
    const pokemon_id = req.params.pokemon_id;
    const pokemonStatusId = req.body.pokemon_id
    if(pokemon_id==pokemonStatusId){
    try {
        const pokemon_id = req.params.pokemon_id
        const pokemon = await StatusPokemon.findOne({"pokemon_id":pokemon_id})
        
        const newPokemon = await StatusPokemon.findOneAndReplace ({"pokemon_id":pokemon_id},{
            pokemon_id: pokemon_id,
            view: true,
            catch: true,
            in_team:!pokemon.in_team
        },{new:true})
        return res.status(200).json(newPokemon)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error})
    }
}else{
    return res.status(400).json({message:"bad request, pokemon_id in body diferent pokemon_id in params"})
}
}