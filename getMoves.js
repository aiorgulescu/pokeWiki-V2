class Type{

    constructor()
    {
        this.typeData = {};
    }

    async setTypeData()
    {
        try {
            let res = await fetch("types.json");
            let data = await res.json();

            this.typeData = data
        } catch (error) {
            console.log(error);
        }
        
    }
    
    async getMoveIcon(type)
    {
        await this.setTypeData();
        return this.getMoveType(type, this.typeData);
    }

    async getPokemonType(type)
    {
        await this.setTypeData();
        return this.getPokemonTypeHelper(type, this.typeData);
    }

    getMoveType(type, icons)
    {
        switch(type)
        {
            case "normal":
                    return icons.normal.Icon;

                case "fire":
                    return icons.fire.Icon;
        
                case "water":
                    return icons.water.Icon;

                case "grass":
                    return icons.grass.Icon;

                case "electric":
                    return icons.electric.Icon;

                case "ice":
                    return icons.ice.Icon;

                case "fighting":
                    return icons.fighting.Icon;

                case "poison":
                    return icons.poison.Icon;

                case "ground":
                    return icons.ground.Icon;

                case "flying":
                    return icons.flying.Icon;

                case "psychic":
                    return icons.psychic.Icon;

                case "bug":
                    return icons.bug.Icon;

                case "rock":
                    return icons.rock.Icon;

                case "ghost":
                    return icons.ghost.Icon;

                case "dark":
                    return icons.dark.Icon;

                case "dragon":
                    return icons.dragon.Icon;

                case "steel":
                    return icons.steel.Icon;

                case "fairy":
                    return icons.fairy.Icon;

                default:
                    break;
        }
    }

    getPokemonTypeHelper(type, icons)
    {
        switch(type)
        {
            case "normal":
                    return [icons.normal.ImageBackground, icons.normal.Icon];

                case "fire":
                    return [icons.fire.ImageBackground, icons.fire.Icon];
        
                case "water":
                    return [icons.water.ImageBackground, icons.water.Icon];

                case "grass":
                    return [icons.grass.ImageBackground, icons.grass.Icon];

                case "electric":
                    return [icons.electric.ImageBackground, icons.electric.Icon];

                case "ice":
                    return [icons.ice.ImageBackground, icons.ice.Icon];

                case "fighting":
                    return [icons.fighting.ImageBackground, icons.fighting.Icon];

                case "poison":
                    return [icons.poison.ImageBackground, icons.poison.Icon];

                case "ground":
                    return [icons.ground.ImageBackground, icons.ground.Icon];

                case "flying":
                    return [icons.flying.ImageBackground, icons.flying.Icon];

                case "psychic":
                    return [icons.psychic.ImageBackground, icons.psychic.Icon];

                case "bug":
                    return [icons.bug.ImageBackground, icons.bug.Icon];

                case "rock":
                    return [icons.rock.ImageBackground, icons.rock.Icon];

                case "ghost":
                    return [icons.ghost.ImageBackground, icons.ghost.Icon];

                case "dark":
                    return [icons.dark.ImageBackground, icons.dark.Icon];

                case "dragon":
                    return [icons.dragon.ImageBackground, icons.dragon.Icon];

                case "steel":
                    return [icons.steel.ImageBackground, icons.steel.Icon];

                case "fairy":
                    return [icons.fairy.ImageBackground, icons.fairy.Icon];

                default:
                    break;
        }
    }

}