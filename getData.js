class PokeData{

    constructor(name)
    {
        this.name = name;
        this.arr = [];
    }


    async setData()
    {
        let moves = [];

        try {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.name}`);
        let data = await res.json();

        this.arr.push(data.name);
        this.arr.push(data.types[0].type.name);


        let typeObject = await new Type();


        for (let i = 0; i < 2; i++)
        {
            let num = Math.floor(Math.random() * data.moves.length);

            let moveRes = await fetch(`${data.moves[num].move.url}`);
            let moveData = await moveRes.json();

            let moveType = moveData.type.name;
            let moveName = moveData.name;
            let moveDamage = moveData.power;

            moves.push({"name": moveName, "damage": moveDamage, "type": await typeObject.getMoveIcon(moveType)});
        }

        this.arr.push(moves);

        this.arr.push(data.height);
        this.arr.push(data.weight);
        this.arr.push(data.stats[0].base_stat);
        this.arr.push(data.sprites.front_default);
        this.arr.push(await typeObject.getPokemonType(data.types[0].type.name));

        return this.arr;
        } catch (error) {
            console.log(error);
        }
        

    }
    // setData(callback)
    // {
    //     let xhr = new XMLHttpRequest();

    //     xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${this.name}`, true);

    //     let arr = this.arr;

    //     xhr.onload = function(){
    //         if (this.status === 200)
    //         {
    //             let moves = [];

    //             let pokemon = JSON.parse(this.responseText);
            
                

    //             arr.push(pokemon.name);
    //             arr.push(pokemon.types[0].type.name);
            
    //             for (let i = 0; i < 2; i++)
    //             {
    //                 let moveXHR = new XMLHttpRequest();
    //                 let num = Math.floor(Math.random() * pokemon.moves.length)

    //                 moveXHR.open("GET", `${pokemon.moves[num].move.url}`, false);

    //                 let moveName = "";
    //                 let moveDamage = "";

    //                 moveXHR.onload = function()
    //                 {
    //                     if (this.status === 200)
    //                     {
    //                         let type = JSON.parse(this.responseText).type.name;
    //                         let moveObject = new Moves(type)
    //                         moveObject.loadIcons(getIcon, moveObject.getMoveType)
    //                         moveName = pokemon.moves[num].move.name;
    //                         moveDamage = JSON.parse(this.responseText).power;
    //                     }

    //                     function getIcon(icon)
    //                     {
    //                         moves.push({"name": moveName, "damage": moveDamage, "type": icon});
    //                     }

    //                 }
    //                 moveXHR.send();

    //             }

                

                
                

    //             let a = new getType(arr[1]);


    //             arr.push(moves);


    //             arr.push(pokemon.height);
    //             arr.push(pokemon.weight);
    //             arr.push(pokemon.stats[0].base_stat);
    //             arr.push(pokemon.sprites.front_default);

    //             a.getTypeData(getMoves);


    //             function getMoves(moves)
    //             {
    //                 callback(arr,moves);
    //             }


    //         }
    //         else
    //         {
    //             console.log("error");
    //         }
    //     }

    //     xhr.send();
    // }

    
    

    // getType();

    // getMoves();

    // getBackground();

    // getHeight();

    // getWeight();

    // getHP();

}