let searchButton = document.getElementById("searchButton");
let addButon = document.getElementById("add");
let cancelButton = document.getElementById("cancel");
let pokeballButton = document.getElementById("pokeball-button");

let pokemon;
let teamCounter = 0;


loadPokemon();

searchButton.addEventListener("click", getInput);

addButon.addEventListener("click", () => addPokemon(pokemon[0].charAt(0).toUpperCase() + pokemon[0].slice(1), pokemon[5], pokemon[6], pokemon[2],true));
cancelButton.addEventListener("click", shrinkPage);
document.body.addEventListener("click", deleteError);
document.body.addEventListener("click", deleteTeamEntry);;
pokeballButton.addEventListener("click", displayTeam);
document.body.addEventListener("click", displayTeamMoves);


function getInput(e)
{
   let value = (document.getElementById("findPokemon").value).toLowerCase();

   if (document.getElementById("main-section").style.height == "550px")
   {
        displayError(`Error: please add or cancel "${pokemon[0].charAt(0).toUpperCase() + pokemon[0].slice(1)}" before searching again`);
   }
   else
   {
        doWork(value);

        
   }
    e.preventDefault();
}

async function doWork(value)
{
    try {
        let dataFetcher = new PokeData(value);

        let pokedata = await dataFetcher.setData();

        pokemon = pokedata;
        displayData(pokedata);
    } catch (error) {
        displayError("Error: pokemon does not exist. Please check your spelling");
        console.log(error)
    }
    
}



function shrinkPage()
{
    document.getElementById("main-section").style.transition = "height 1s";
    document.getElementById("main-section").style.height = "95px";
}

function displayData(pokemon)
{

    let name = pokemon[0].charAt(0).toUpperCase() + pokemon[0].slice(1);

    let hp = pokemon[5];
    let icon = pokemon[7][1];

    let sprite = pokemon[6];
    let background = pokemon[7][0];

    let height = (pokemon[3]/3).toFixed(2);
    let weight = pokemon[4];

    let moves = pokemon[2];

    addTitle(name, hp, icon);
    addSprite(sprite, background);
    addDescription(height,weight);
    addMoves(moves);




    document.getElementById("main-section").style.transition = "height 1s";
    document.getElementById("main-section").style.height = "550px";
}


function addTitle(name, hp, icon)
{
    document.getElementById("title-container").innerHTML = "";
    
    let nameTag = document.createElement("h3");
    nameTag.id = "title";
    nameTag.innerText = name;

    let hpTag = document.createElement("h3");
    hpTag.id = "hp";
    hpTag.innerText = hp;

    let iconTag = document.createElement("img");
    iconTag.id = "typeLogo"
    iconTag.src = icon;

    document.getElementById("title-container").append(nameTag);
    document.getElementById("title-container").append(iconTag);
    document.getElementById("title-container").append(hpTag);
}

function addSprite(sprite, background)
{
    document.getElementById("sprite-container").innerHTML = "";

    let spriteTag = document.createElement("img");
    spriteTag.id = "sprite";
    spriteTag.src = sprite;

    document.getElementById("sprite-container").style.backgroundImage = `url(${background})`;

    document.getElementById("sprite-container").append(spriteTag);
}

function addDescription(height, weight)
{

    document.getElementById("description-container").innerHTML = "";

    let heightTag = document.createElement("p");
    heightTag.innerText = `Height: ${height} ft`;

    let weightTag = document.createElement("p");
    weightTag.innerText = `Weight: ${weight} lbs`;

    document.getElementById("description-container").append(heightTag);
    document.getElementById("description-container").append(weightTag);
}

function addMoves(moves)
{

    document.querySelectorAll(".moveset-container").forEach(function(move)
    {
        move.remove();
    })

    moves.forEach(function(move)
    {
        let container = document.createElement("div");
        container.classList.add("moveset-container");

        let type = move.type;
        let name = move.name.charAt(0).toUpperCase() + move.name.slice(1);
        let damage = move.damage;

        let typeTag = document.createElement("img");
        typeTag.classList.add("damageType");
        typeTag.src = type;

        let nameTag = document.createElement("p");
        nameTag.classList.add("moveDescription");
        nameTag.innerText = name;

        let damageTag = document.createElement("p");
        damageTag.classList.add("moveDamage");
        damageTag.innerText = damage;

        container.append(typeTag);
        container.append(nameTag);
        container.append(damageTag);

        document.getElementById("card-content").append(container);
        
    });
}

function displayError(message)
{
    let errMsgContainer = document.createElement("div");
    errMsgContainer.classList.add("error-message-container");

    let errMsg = document.createElement("span");
    errMsg.classList.add("error-message");
    errMsg.innerHTML = `<p>${message}</p>`;
    
    let timesContainer = document.createElement("span");
    timesContainer.classList.add("error-exit");
    let timesIcon = document.createElement("i");
    timesIcon.classList.add("fas");
    timesIcon.classList.add("fa-times");

    timesContainer.append(timesIcon);

    errMsgContainer.append(errMsg);
    errMsgContainer.append(timesContainer);

    document.querySelector("footer").append(errMsgContainer);


    let test = document.querySelectorAll(".error-message-container")[document.querySelectorAll(".error-message-container").length - 1]

    test.style.transition = "opacity .6s";
    setTimeout(function() {
    test.style.opacity = 1;
    }, 500);

    setTimeout(function() {
        test.style.opacity = 0;
    }, 5000);

    setTimeout(function() {
        test.remove();
        }, 5500);
}

function deleteError(e)
{
    if (e.target.className === "fas fa-times")
    {
        e.target.parentElement.parentElement.remove();
    }
    

    e.preventDefault();
}

function deleteTeamEntry(e)
{
    if (e.target.className === "fas fa-times icon")
    {
        teamCounter--;
        let entries = document.querySelectorAll(".team-entry")

        for (let i = 0; i < entries.length; i++)
        {
            if (entries[i].isEqualNode(e.target.parentElement.parentElement))
            {
                removeStorage(i);
            }
        }

        e.target.parentElement.parentElement.remove();
    }

    e.preventDefault();
}
function displayTeam()
{


    if (document.getElementById("main-section").style.height == "550px")
    {
        displayError(`Error: please add or cancel before displaying team`);
    }
    else
    {
        if (document.getElementById("main-section").style.height != "1px")
        {
            document.getElementById("main-section").style.transition = "all 1s";
            document.getElementById("main-section").style.height = "1px";
            document.getElementById("main-section").style.opacity = "0";
    
            document.getElementById("team-showcase").style.transition = "height .5s, opacity 1s";
            document.getElementById("team-showcase").style.height = "500px";
            document.getElementById("team-showcase").style.opacity = "1";
    
        }
        else
        {
            if (document.getElementById("main-section").style.height > "95px")
            document.getElementById("main-section").style.transition = "all 1s";
            document.getElementById("main-section").style.height = "95px";
            document.getElementById("main-section").style.opacity = "1";
    
    
            document.getElementById("team-showcase").style.transition = "height 1s, opacity .5s";
            document.getElementById("team-showcase").style.height = "1px";
            document.getElementById("team-showcase").style.opacity = "0";
        }
    }
    
    
}

function displaySuccess(message)
{
    let succMsgContainer = document.createElement("div");
    succMsgContainer.classList.add("success-message-container");

    let succMsg = document.createElement("span");
    succMsg.classList.add("success-message");
    succMsg.innerHTML = `<p>${message}</p>`;
    
    let timesContainer = document.createElement("span");
    timesContainer.classList.add("success-exit");
    let timesIcon = document.createElement("i");
    timesIcon.classList.add("fas");
    timesIcon.classList.add("fa-times");

    timesContainer.append(timesIcon);

    succMsgContainer.append(succMsg);
    succMsgContainer.append(timesContainer);

    document.querySelector("footer").append(succMsgContainer);


    let test = document.querySelectorAll(".success-message-container")[document.querySelectorAll(".success-message-container").length - 1]

    test.style.transition = "opacity .6s";
    setTimeout(function() {
    test.style.opacity = 1;
    }, 500);

    setTimeout(function() {
        test.style.opacity = 0;
    }, 6000);

    setTimeout(function() {
        test.remove();
        }, 6500);
}

function addPokemon(name, hp, sprite, moves, isStoring)
{

    if (teamCounter < 6)
    {
        teamCounter++;
        if (isStoring === true)
        {
            storePokemon(name, hp, sprite, moves);
            displaySuccess(`Success! Added ${name} to your party! Click on the PokeBall to view your team`);
        }
        
        let teamEntry = document.createElement("div");
        teamEntry.classList.add("team-entry");

        let teamEntryContent = document.createElement("div");
        teamEntryContent.classList.add("team-entry-content");

        let teamEntrydropdown = document.createElement("i");
        teamEntrydropdown.classList.add("fas");
        teamEntrydropdown.classList.add("fa-caret-down");
        teamEntrydropdown.classList.add("dropdown");

        let teamEntryContentImage = document.createElement("div");
        teamEntryContentImage.classList.add("team-entry-content-image");

        let teamImage = document.createElement("img");
        teamImage.src = sprite;
        teamImage.classList.add("team-image");
        teamEntryContentImage.append(teamImage);

        let teamEntryName = document.createElement("p");
        teamEntryName.innerText = name;
        teamEntryName.classList.add("team-entry-name");

        let teamEntryIcon = document.createElement("i");
        teamEntryIcon.classList.add("fas");
        teamEntryIcon.classList.add("fa-times");
        teamEntryIcon.classList.add("icon");

        let teamEntryHPBar = document.createElement("div");
        teamEntryHPBar.classList.add("team-entry-hpbar");

        let hplabel = document.createElement("div");
        hplabel.innerText = "HP";
        hplabel.classList.add("hp-label");

        let hpbar = document.createElement("div");
        hpbar.classList.add("hp-bar");
        teamEntryHPBar.append(hplabel);
        teamEntryHPBar.append(hpbar);

        let teamEntryHPNumber = document.createElement("p");
        teamEntryHPNumber.innerText = `${hp}/${hp}`;
        teamEntryHPNumber.classList.add("team-entry-hpnumber");

        teamEntryContent.append(teamEntrydropdown);
        teamEntryContent.append(teamEntryContentImage);
        teamEntryContent.append(teamEntryName);
        teamEntryContent.append(teamEntryIcon);
        teamEntryContent.append(teamEntryHPBar);
        teamEntryContent.append(teamEntryHPNumber);


        teamEntry.append(teamEntryContent);

        for (let i = 0; i < moves.length; i++)
        {
            let teamEntryMove = document.createElement("div");
            teamEntryMove.classList.add("team-entry-move");

            let damageType = document.createElement("img");
            damageType.src = moves[i].type;

            let moveName = document.createElement("p");
            moveName.innerText = moves[i].name.charAt(0).toUpperCase() + moves[i].name.slice(1);;
            

            let moveDamage = document.createElement("p");
            moveDamage.innerText = moves[i].damage
            
            
            teamEntryMove.append(damageType);
            teamEntryMove.append(moveName);
            teamEntryMove.append(moveDamage);

            teamEntry.append(teamEntryMove);
        }

        document.getElementById("team-entry-container").append(teamEntry);

        
        

       
        
        shrinkPage();
    }
    else
    {
        displayError("Error: Team is full. Consider downsizing your team before attempting to add more pokemon");
    }

    
}

function storePokemon(name, hp, sprite, moves)
{

    let items = localStorage.getItem("items");

    if (items === null)
    {
        items = [];
    }
    else
    {
        items = JSON.parse(localStorage.getItem("items"));
    }

    items.push({name: name, hp: hp, sprite: sprite, moves: moves});

    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("counter", JSON.stringify(teamCounter));
}

function removeStorage(i)
{
    let items = JSON.parse(localStorage.getItem("items"));

    items.splice(i, 1);

    localStorage.setItem("items", JSON.stringify(items));
    console.log(teamCounter);
    localStorage.setItem("counter", JSON.stringify(teamCounter));
}

function loadPokemon()
{
    let items = JSON.parse(localStorage.getItem("items"));
    let counter = JSON.parse(localStorage.getItem("counter"));
    for (let i = 0; i < counter; i++)
    {
        addPokemon(items[i].name, items[i].hp, items[i].sprite, items[i].moves, false);
    }
}

function displayTeamMoves(e)
{
    if (e.target.className === "fas fa-caret-down dropdown")
    {
        console.log(e.target.parentNode.parentNode);
        if (e.target.parentNode.parentNode.style.height < "30%")
        {
            e.target.style.transform = "rotate(180deg)";
            e.target.style.transformOrigin = "20% 40%";
            e.target.parentNode.parentNode.style.transition = "height 1s";
            e.target.parentNode.parentNode.style.height = "30%";
        }
        else
        {
            e.target.style.transform = "rotate(360deg)";
            e.target.style.transformOrigin = "20% 40%";
            e.target.parentNode.parentNode.style.transition = "height 1s";
            e.target.parentNode.parentNode.style.height = "14%";
        }
        
    }
}