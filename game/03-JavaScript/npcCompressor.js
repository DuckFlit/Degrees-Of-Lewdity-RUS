/**
 * Version 1.1.0
 *
 * The npcCompressor function takes in an NPC object like those stored in NPCList and created using the $basenpc values.
 * 
 * The NPC code is the concatenation of the following strings:
 * - TYPE - npc.type index
 * - SPECIAL_TYPE - The following types are checked for separately as they are a renaming of a type: [centaur, harpy, bull]
 * - GENDER_AND_PRONOUN - npc.gender, npc.pronoun. These values are concatenated and an index for that combination is used.
 * - PENIS_SIZE - npc.penissize
 * - PENIS_DESC - npc.penisdesc index
 * - BREAST_SIZE - npc.breastsize 
 * - INSECURITY - npc.insecurity index
 * - SIZE - npc.size index
 * - AGE - 1 for adult, 0 for teen
 * - [ SKIN_COLOUR ] - (for humans) npc.skincolour, 0 for white, 1 for black
 * - [ MONSTER ] - (for beasts) npc.monster, 1 for monsters, 0 for beasts
 * - DESCRIPTION - npc.description index. The list used for the index is changed based on the npc's gender, age, and if they are a beast.
 * - ".a" PREGNANCY_AVOIDANCE - npc.pregnancyAvoidance (raw value)
 * - [ ".p" PREGNANCY_TIMER ] - npc.pregnancyTimer (raw value) can be both positive and negative
 * - [ ".t" EVENT_TIMER ] - npc.eventTimer (raw value) only positive
 * - [ ".n" ] - indicates there's no ".p" or ".t" section
 * 
 * "Index" is the index in an array of predefined values for that field.
 * Skin_colour and monster occupy the same place in the npc_data array with monster being the priority input.
 * If there is no timer present when their respective functions are called, it will add them to the NPC code.
 * The value of a timer can be any number but 0. 
 * 
 * All of the above numeric values are concatenated into a string before the [".a", ".n", ".t", ".p"] values are added.
 * This numeric string then has its zeros reduced. This only occurs when the number of consecutive zeros is 3 or more.
 * Zeros are converted to [0..9]"|" for a number of zeros less than 10 and [2..9]">" is added behind to the previous conversion for a number of zeros greater than 10.
 * In the case of zeros less than 18, no number is added in front of the ">".
 * 
 * Once all the zeros have been reduced, the remaining numeric values are encoded alphanumerical
 * Alphanumerical encoding converts integers to base 64 using [0..9][a..z][A..Z][_+] for values 0...63
 * The converter takes into account the maximum number possible and will only compress batches of 15 characters at once.
 * 
 * npcDecompressor will take this coded string and return it as an object that contains all of the stored values.
 * In order for the NPC to be ready for use, a new NPC should be generated and the following function should be used: mergeNPCData()
 * 
 * To add items to the code created by compressing a NPC, add the relevant checks before the ".a" occurs.
 * If a values needs to be accessed at all times it should be added as a ".[a..zA..Z]" to the end of the NPC code.
 * This is not recommended as more functions to get, change, and remove this value must also be added.
 * 
 * NOTE: An NPC generated this way does not have a name. The name should be the key used to store the NPC string and then be added once the NPC has been decompressed.
 * 
 * RELEVANT FUNCTIONS:
 * - changeCNPCPregnancyAvoidance() - changes a compressed npc's pregnancy avoidance. The range is 1 to 100.
 * - getCNPCPregnancyAvoidance() - returns a compressed npc's pregnancy avoidance.
 * - changeCNPCPregnancyTimer() - changes a compressed npc's pregnancy timer. A positive value means that the NPC was impregnated by the player, while a negative value means the NPC was impregnated by an NPC.
 * - getCNPCPregnancyTimer() - returns a compressed npc's pregnancy timer.
 * - removeCNPCPregnancyTimer() - removes a compressed npc's pregnancy timer.
 * - changeCNPCEventTimer() - changes a compressed npc's event timer. Must be positive.
 * - getCNPCEventTimer() - returns a compressed npc's event timer.
 * - removeCNPCEventTimer() - removes a compressed npc's event timer.
 * 
 * ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * The childCompressor function takes in an NPC object like those created using the $basebaby values.
 * 
 * The NPC code is the concatenation of the following strings:
 * - TYPE - child.type index
 * - SPECIAL_TYPE - The following types are checked for separately as they are a renaming of a type: [centaur, harpy, bull]
 * - GENDER - child.gender index
 * - BEAST_TRANSFORMATION - child.beastTransformation index
 * - DIVINE_TRANSFORMATION - child.divineTransformation index
 * - MONSTER - (for beasts) npc.monster, 1 for monsters, 0 for beasts or human
 * - SIZE - child.features.size index
 * - HAIR_COLOUR - child.features.hairColour index
 * - EYE_COLOUR - child.features.eyeColour index
 * - SKIN_COLOUR - child.features.skinColour index
 * - CLOTHES - child.features.clothes index
 * - IDENTICAL - child.features.identical value as 1 for true, 0 for false
 * - BIRTHID - child.birthId
 * - BIRTHLOCATION - child.birthLocation index
 * - LOCATION - child.location index
 * - CONCEIVEDLOCATION - child.conceivedLocation index
 * - MOTHER - child.mother - The final value is created based on if the parent is a named, human npc, or beast npc
 * - FATHER - child.father - The final value is created based on if the parent is a named, human npc, or beast npc
 * - ".c" CONCEIVED - child.conceived the date of conception saved in DDMMYYYY format
 * - ".b" BORN - child.born the date of birth saved in DDMMYYYY format
 * - ".i" CHILDID - child.childId - this should be in the format motherID + "." + kid number for this child  + "|" + fatherID + "." + kid number for this child
 * 
 * "Index" is the index in an array of predefined values for that field
 * The concatenated string created from this is compressed by the same functions the npcCompressor uses. 
 * Read the explanation in the npc section above for how those work or look at the functions for a more detailed breakdown. 
 * 
 * childDecompressor will take this coded string and return it as an object that contains all of the stored values.
 * In order for the child to be ready for use, a new child should be generated and the following function should be used: mergeNPCData()
 * 
 * NOTE: An child generated this way does not have a name. The name should be the key used to store the child string and then be added once the child has been decompressed.
 * 
 * RELEVANT FUNCTIONS:
 * - convertToDMYFormat() - converts a date in DDMMYYYY format to {day:#, month:[# or string], year:#} format.
 * - convertToDDFormat() - converts a date in {day:#, month:[# or string], year:#} format to DDMMYYYY format.
 * - getCChildConceptionDate() - returns the compressed child's conceived date.
 * - changeCChildConceptionDate() - changes the compressed child's conceived date. The date must be passed in DDMMYYYY format.
 * - removeCChildConceptionDate() - removes the compressed child's conceived date.
 * - getCChildBirthDate() - returns the compressed child's born date. 
 * - changeCChildbirthDate() - changes the compressed child's born date. The date must be passed in DDMMYYYY format.
 * - removeCChildBirthDate() - removes the compressed child's born date.
 * - getCChildId() - returns the compressed child's childId.
 * - changeCChildId() - changes the compressed child's childId. childId should be in [0..9]+.[0..9]+|[0..9]+.[0..9]+ format. If a values is unknown, it should be set to [-1].
 * 
 * ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * 
 * Updating the version:
 *      0.0. +1     for minor bug fixes
 *      0. +1 .0    for larger additions or subtractions such as adding/removing a key or a new function
 *      +1 .0.0     for overhauls that need to restructure the entire code base.
 * 
 * Changes:
 *  1.0.0: The initial version.
 * 	1.1.0: Added the conceivedLocation Key to the child compressor.
 * 
 */



const {npcCompressor, npcDecompressor, childCompressor, childDecompressor } = (function(){

    const compressorVersion = 1;
	const typeList = ["human","dog","cat","pig","wolf","dolphin","lizard","bear","boar","creature","horse","fox","hawk","cow","spider","plant"];
    const beastList = ["dog","cat","pig","wolf","dolphin", "lizard","bear","boar","creature","horse", "fox","hawk","cow","spider"];
	const insecurityList = ["none","vagina","penis","ethics","weak","skill","looks"];
	const genproList = ["mm", "fm", "hm", "mf", "ff", "hf"]; /* stores gender first, pronoun second. */
	const breastdescList = ["nipple","budding","tiny","small","pert","modest","full","large","ample","massive","huge","gigantic","enormous"];
	const sizeList = ["tiny", "small", "normal", "large"];
    const skinColourList = ["white","black","light", "medium", "dark", "ylight", "ymedium", "ydark"];
	const noClawList = ["dog","pig","wolf","dolphin","boar","fox","hawk","cow","bull"];
	const teenFDescList = ["slight","lithe","lean","thin","slender","lissome","slim","taut","graceful","trim","mousy","cute","fit","petite","toned","shapely","robust","plump","wide-eyed","vulgar","minor demon"];
	const teenMDescList = ["slight","lithe","lean","thin","slender","lissome","slim","taut","graceful","trim","mousy","cute","fit","petite","toned","shapely","robust","plump","wide-eyed","brutish","minor demon"];
	const adultFDescList = ["slight","lithe","lean","thin","slender","lissome","slim","taut","petite","trim","muscular","curvy","toned","plump","plush","shapely","robust","voluptuous","lush","vulgar","demon"];
	const adultMDescList = ["petite","slight","slim","thin","slender","lanky","lissome","lithe","trim","lean","taut","plump","toned","bulky","broad","robust","rugged","muscular","burly","brutish","demon"];
    const beastDescList = ["large","large","fat","enormous","bottlenose","scaly","brown","hairy","strange","huge","large","fierce","huge","slimy"];
    const penisDescList = {
        human: ["none","tiny penis", "penis", "thick cock","hefty cock","big cock","large cock","veiny cock","meaty cock", "massive cock","huge cock","humongous cock","immense cock","gigantic cock","enormous cock"],
        beast: ["knotted penis","spiked penis","penis","knotted penis","strange penis","penis","penis","penis","penis","equine cock","knotted penis","avian cock","bovine cock","arachnid penis"]
    };
	const teenHealthList = [125,175,150,150,150,175,150,200,200,200,125,200,250,125,250,200,250,250,200,300,400];
	const adultFHealthList = [125,175,150,150,150,175,150,200,125,200,275,200,250,250,200,200,250,200,200,350,600];
	const adultMHealthList = [125,125,150,150,150,150,175,175,200,200,200,200,250,250,250,250,275,275,275,400,600];
    const beastHealthList = [200,150,200,300,200,250,500,300,200,500,200,150,400];

    const motherFatherList = ["Unknown","pc","Avery","Bailey","Briar","Charlie","Darryl","Doren","Eden","Gwylan","Harper","Jordan","Kylar","Landry","Leighton","Mason","Morgan","River","Robin","Sam","Sirris","Whitney","Winter","Black Wolf","Niki","Quinn","Remy","Alex","Great Hawk","Wren","Sydney","Ivory Wraith"];

    //child items
    const hairColourList =  {
        human:["red", "jetblack", "black", "brown", "softbrown", "lightbrown", "burntorange", "blond", "softblond", "platinumblond", "ashyblond", "strawberryblond", "ginger", "dark brown"],
        wolf:["gray", "brown", "tan", "white", "black"]
    };
    const eyeColourList = ["purple", "dark blue", "light blue", "amber", "hazel", "green", "lime green", "red", "pink", "grey", "light grey"];
    const monthNameList = ["","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const tformList = {
        beast: ["none", "cat", "cow", "wolf", "bird"],
        divine: ["none", "angel", "devil"]
    }
    
    //All of these list will need to be expanded on in the future.
	const locationList = ['unknown', 'home', 'wolf_cave', 'hospital', 'alley', 'beach', 'sea', 'school', 'schoolgrounds', 'pool', 'town', 'temple', 'spa', 'arcade', 'cafe', 'museum',
	'docks', 'compound', 'landfill', 'underground', 'drain', 'sewers', 'brothel', 'strip_club', 'pub', 'estate', 'kylarmanor', 'pound', 'factory',
	'park', 'parkmens', 'parkwomens', 'parkcafe', 'parktree', 'forest', 'cabin', 'lake', 'lake_ruin', 'moor', 'castle', 'tower', 'cliff',
	'farm', 'plains', 'alex_farm', 'alex_cottage', 'riding_school', 'asylum', 'prison', 'tentworld', 'dance_studio', 'adult_shop', 'shopping_centre', 'police_station',
	'changingroom', 'starfish', 'promenade', 'backyard', 'garden', 'seabeach', 'searocks', 'seadocks', 'seacliffs', 'coastpath', 'seapirates',
	'residential', 'domus', 'barb', 'danube', 'commercial', 'connudatus', 'high', 'nightingale', 'oxford', 'industrial', 'mer', 'elk', 'harvest'];

    const childClothingList = ["naked", "clothed"]

    //base 64 conversion string.
    const table = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_+";
    const base = table.length;
    

     /**
     * @desc Takes in a passed NPC object and turns them into a coded string for the values that are required to make them again.
     * @param {Object} passedNPC The NPC the user wants to compress. The NPC should be an object with all keys.
     * @returns {string} The NPC as a coded string.
     */
    function npcCompressor(passedNPC) {
        //values to encode before all '.' values 
        let npc_data = [];
        let npc_code = "";

        // Pre-processing
        let npcType = passedNPC.type;
        let beast = (npcType !== "human" && npcType !== "plant");
        let monster = 0;

        if (beast) {
            //Catches the alternate names that we've added because nothing can be simple
            if (npcType.includes("boy") || npcType.includes("girl")) {
                npcType = npcType.replace(/boy|girl/,"");
                monster = 1;
            }
            if (npcType  == "centaur") {npcType  = "horse"; monster = 1;}
            else if (npcType == "harpy") {npcType  = "hawk"; monster = 1;}
            else if (npcType == "bull") {npcType  = "cow"; monster = 1;}
        }

        let npcTypeIndex = typeList.indexOf(npcType);
		if (npcTypeIndex === -1) throw new Error("An invalid NPC type: " + npcType + ", was passed!");

        let genderPronoun = genproList.indexOf(passedNPC.gender + passedNPC.pronoun);
        if (genderPronoun === -1) genderPronoun = 0;

        let penisSize = (passedNPC.gender != "f" && passedNPC.penissize) ? passedNPC.penissize : 0;
        let penisDesc = !passedNPC.penisdesc ? (passedNPC.gender != "f" ? 2 : 0) : 
            (beast ? penisDescList.beast.indexOf(passedNPC.penisdesc) : penisDescList.human.indexOf(passedNPC.penisdesc));
        if (penisDesc === -1) penisDesc = 0;
        let breastSize = passedNPC.breastsize ? passedNPC.breastsize : 0;

        let insecurityIndex = insecurityList.indexOf(passedNPC.insecurity);
        if (insecurityIndex === -1) insecurityIndex = 0;

        let sizeIndex = passedNPC.size ? sizeList.indexOf(passedNPC.size) : 2;
        let adult = passedNPC.adult ? passedNPC.adult : 0;
        let skin = passedNPC.skincolour ? skinColourList.indexOf(passedNPC.skincolour) : 0;

        let descriptionIndex = 0;
        if (beast) {
            descriptionIndex = beastDescList.indexOf(passedNPC.description)
        }
        else {
            // description for non-beast NPCs
			let descriptionList = (passedNPC.teen === 1 ? 
				(passedNPC.pronoun === "f" ? teenFDescList : teenMDescList) :
				(passedNPC.pronoun === "f" ? adultFDescList : adultMDescList)
			);
            descriptionIndex = descriptionList.indexOf(passedNPC.description);
        }

        //assigns all the values to their correct order. The number of items for beast and human type NPCs should be kept equal.
        npc_data[0] = npcTypeIndex < 10 ? "0" + npcTypeIndex : npcTypeIndex; //can be above 10
        npc_data[1] = genderPronoun;
        npc_data[2] = penisSize;
        npc_data[3] = penisDesc < 10 ? "0" + penisDesc : penisDesc; //can be above 10
        npc_data[4] = breastSize < 10 ? "0" + breastSize : breastSize; //can be above 10
        npc_data[5] = insecurityIndex < 10 ? "0" + insecurityIndex : insecurityIndex; //can be above 10
        npc_data[6] = sizeIndex;
        npc_data[7] = adult;
        npc_data[8] = monster ? monster : skin;
        npc_data[9] = descriptionIndex < 10 ? "0" + descriptionIndex : descriptionIndex; //can be above 10

        npc_code =  (compressorVersion < 10 ? '~' : '') +  reduceZeros( compressorVersion.toString() + npc_data.join("") );

        //The pregnancy avoidance that the NPC has. Adds .a and then the avoidance value. Ranges between 1 to 100
        if (!passedNPC.pregnancyAvoidance) passedNPC.pregnancyAvoidance = 0;
        npc_code += ".a" + passedNPC.pregnancyAvoidance;

        /**
         * @checks Any timers that the NPC has. Types are none (.n), pregnant (.p), or event (.t).
         * @addedValue Adds the timer type and then the value of the timer. A valid timer requires a value other than 0.
         * @notes For pregnancy, NPCs that are pregnant with kids not from the PC have a negative pregnancy timer. The final end value is the same just negative.
         */
        if (!(passedNPC.pregnancyTimer || passedNPC.eventTimer)) {
            npc_code += ".n";
        }
        else {
            if (passedNPC.pregnancyTimer) {
                npc_code += ".p" + passedNPC.pregnancyTimer;
            }
            if (passedNPC.eventTimer) {
                npc_code += ".t" + passedNPC.eventTimer;
            }
        }

        return npc_code;

    }


    /**
     * @desc Takes in a passed coded string and turns them into a NPC with the required key values.
     * @param {string} passedNPC The npc code as a string that you want returned as an object.
     * @returns {Object} The passed npc as an object with all relevent key's filled.
     */
    function npcDecompressor(passedNPC) {

        let npcItems = {};
        let expandedNPC;
        let position = passedNPC.indexOf(".");
        if (passedNPC[0] === '~') expandedNPC = "0" + expandZeros(passedNPC.slice(1,position)) + passedNPC.slice(position);
        else expandedNPC = expandZeros(passedNPC.slice(0,position)) + passedNPC.slice(position);
        let cVersion = Number(expandedNPC.slice(0,2));
        position = 2;

        //Sets the type of NPC
        let npcType = typeList[Number(expandedNPC.slice(position, position + 2))];
        let beast = !(npcType === "human" || npcType === "plant") ? beastList.indexOf(npcType): 0;
        position+=2;

        //sets gender, pronoun, and genitals of the NPC
        let gpCombo = genproList[expandedNPC[position]];

        const gender = gpCombo[0];
        const pronoun = gpCombo[1];
        const notNone = (npcType === "human" ? "clothed" : 0);
        const vagina = (gender === "m" ? "none" : notNone);
        const penis = (gender === "f" ? "none" : notNone);
        position++;

        let penissize = Number(expandedNPC[position]);
        position++;

        let penisdesc = (penis === "none" ? "none" : (beast ? penisDescList.beast[Number(expandedNPC.slice(position, position + 2))] : penisDescList.human[Number(expandedNPC.slice(position, position + 2))]));
        position+=2;

        //Sets the breast size of the NPC
        let breastsize = Number(expandedNPC.slice(position, position + 2));
        let breastdesc = breastdescList[breastsize] + (breastsize > 0 ? " breast" : "");
        let breastsdesc = breastdesc +"s"
        position+=2;

        //Sets the insecurities of the NPC
        let insecurity = insecurityList[Number(expandedNPC.slice(position, position + 2))];
        position+=2;

        //Sets the physical size of the NPC
        let size = sizeList[expandedNPC[position]];
        position++;

        //sets the ages range of the npc
        let adult = Number(expandedNPC[position]);
        let teen = 1 - adult;
        position++;

        //sets the monster status or skin color depending on NPC type
        let monster, claws, skincolour;
        if (beast) {
            monster = Number(expandedNPC[position]) !== 0 ? "monster" : 0;

            //assign the correct claw type first
            if (["cow", "horse", "pig", "boar"].includes(npcType)) {
                claws = "hooves";
            } 
            else if (["dolphin"].includes(npcType)) {
                claws = "flippers"; 
            } 
            else if (["hawk"].includes(npcType)) {
                claws = "talons"
            } 
            else {
                claws = "claws";
            }

            if (npcType === "cow" && gender === "m") npcType = "bull";

			if (monster != 0) {
                //removes the claws on the monsters than don't keep them.
                if (noClawList.includes(npcType)) claws = null;

				switch (npcType) {
					case "horse": npcType = "centaur"; break;
					case "hawk": npcType = "harpy"; break;
					default: npcType += (gender === "m" ? "boy" : "girl"); break;
				}
			}

        }
        else {
            skincolour = skinColourList[Number(expandedNPC[position])];
        } 
        position++

        let health, healthmax, description, fullDescription;

        //Sets the description and health of the NPC
        if (beast) {
            health = beastHealthList[beast];
            healthmax = health;
            description = beastDescList[beast];
            fullDescription = description + (!monster ? (gender === "m" ? " male " : " female ") : " ") + npcType;
        }
        else {
            let descType;
            let healthType;

            if (teen === 1) {
                healthType = teenHealthList;
                descType = (pronoun === "f" ? teenFDescList : teenMDescList);
            } else {
                healthType = (pronoun === "f" ? adultFHealthList : adultMHealthList);
                descType = (pronoun === "f" ? adultFDescList : adultMDescList);
            }

            description = descType[Number(expandedNPC.slice(position, position + 2))];
            health = healthType[Number(expandedNPC.slice(position, position + 2))];
            healthmax = health;


            //Sets the full description of the NPC
            const plant = (npcType === "plant" ? " plant" : " ");
            const man = (pronoun === "m" ? (teen === 1 ? "boy" : "man") : (teen === 1 ? "girl" : "woman"));
            fullDescription = description + plant + man;
        }
        position+=2;


        if(cVersion > 1) throw new Error("This should be unreachable.");


        //preg avoidance
		let pregnancyAvoidance = passedNPC.match(/\.a(\d+)/);
		pregnancyAvoidance = pregnancyAvoidance ? Number(pregnancyAvoidance[1]) : 1;

		//preg timer
        let pregnancyTimer = passedNPC.match(/\.p(-?\d+)/);
		pregnancyTimer = pregnancyTimer ? Number(pregnancyTimer[1]) : 0;

		//event timer
        let eventTimer = passedNPC.match(/\.t(\d+)/);
        eventTimer = eventTimer ? Number(eventTimer[1]) : 0;


        npcItems.type = npcType;
        npcItems.gender = gender;
        npcItems.pronoun = pronoun;
        npcItems.vagina = vagina;
        npcItems.penis = penis;
        npcItems.penissize = penissize;
        npcItems.penisdesc = penisdesc;
        npcItems.breastsize = breastsize;
        npcItems.breastdesc = breastdesc;
        npcItems.breastsdesc = breastsdesc;
        npcItems.insecurity = insecurity;
        npcItems.size = size;
        npcItems.adult = adult;
        npcItems.teen = teen;
        npcItems.monster = monster ? monster : 0;
        npcItems.claws = claws ? claws : null;
        npcItems.skincolour = skincolour ? skincolour : null;
        npcItems.health = health;
        npcItems.healthmax = healthmax;
        npcItems.description = description;
        npcItems.fullDescription = fullDescription;
        npcItems.pregnancyAvoidance = pregnancyAvoidance;
        npcItems.pregnancyTimer = pregnancyTimer;
        npcItems.eventTimer = eventTimer;

        if(!npcItems.claws) delete npcItems.claws;
        if(!npcItems.skincolour) delete npcItems.skincolour;

        return npcItems;
    }


    /**
     * @desc Takes in a passed child object and turns them into a coded string for the values that are required to make them again.
     * @param {Object} passedChild The child the user wants to compress. The child should be an object with all keys.
     * @param {boolean} bothDates If true, both the conception and birth date will be added to the end of the compressed string. If false, it will add the more relevant one.
     * @returns {string} The child as a coded string.
     */
    function childCompressor(passedChild, bothDates = true) {
        let child_data = [];
        let child_code = "";
        let monster;

        //should only be humans and wolves atm. Still set up to take in all the other types though. 
        let childType = passedChild.type;
        let beast = (childType !== "human" && childType !== "plant");

        if (beast) {
            //Catches the alternate names that we've added
            if (childType.includes("boy") || childType.includes("girl")) {
                childType = childType.replace(/boy|girl/,"");
                monster = 1;
            }
            if (childType  == "centaur") {childType  = "horse"; monster = 1;}
            else if (childType == "harpy") {childType  = "hawk"; monster = 1;}
            else if (childType == "bull") {childType  = "cow"; monster = 1;}
        }
        
        let childTypeIndex = typeList.indexOf(childType);
		if (childTypeIndex === -1) throw new Error("An invalid child type: " + childType + ", was passed!");

        let gender = ["m", "f", "h"].indexOf(passedChild.gender);
        if (gender < 0) gender = 1;  

        //beast transforms and divine transforms
        let tformBeast =  passedChild.features.beastTransform ? tformList.beast.indexOf(passedChild.features.beastTransform) : 0 ;
        let tformDivine = passedChild.features.divineTransform ? tformList.divine.indexOf(passedChild.features.divineTransform)  : 0;

        monster = monster ? monster : (passedChild.features.monster ? 1 : 0);

        let size = passedChild.features.size ? sizeList.indexOf(passedChild.features.size) : 2;

        let hairType = Object.keys(hairColourList).includes(childType) ? childType : "human";
        let hair = passedChild.features.hairColour ? hairColourList[hairType].indexOf(passedChild.features.hairColour) : 0;

        let eyes = passedChild.features.eyeColour ? eyeColourList.indexOf(passedChild.features.eyeColour) : 7;
        let skin = passedChild.features.skinColour ? skinColourList.indexOf(passedChild.features.skinColour) : 2;
        if (skin === -1) skin = 2;

        let clothes = passedChild.features.clothes ? childClothingList.indexOf(passedChild.features.clothes) : 0; //make sure this can take in other types once clothing is more developed.
        if (clothes === -1) clothes = 0;

        let twinplets = passedChild.features.identical ? 1 : 0;

        let birthID = passedChild.birthId;
        if(!birthID || birthID < 0) throw new Error("The child compressor was passed a child with an invalid birth ID of: " + birthID);
        birthID = "" + birthID.toString().length + birthID;

        let birthLocation = locationList.indexOf(passedChild.birthLocation);
        if (birthLocation < 0) birthLocation = 0;

        let childLocation = locationList.indexOf(passedChild.location);
        if (childLocation < 0) childLocation = 0;

		let conceivedLocation = locationList.indexOf(passedChild.conceivedLocation);
        if (conceivedLocation < 0) conceivedLocation = 0;

        let mother, father, parentTemp, parentTempList;

        //mothers
        if(!!passedChild.mother) {
            //Order for checks goes: named => human npc => beast npc

            if(motherFatherList.includes(passedChild.mother)) {
                mother = motherFatherList.indexOf(passedChild.mother);
                mother = mother.toString().padStart(3, "0");
            }
            else if(!beast) {

                if (passedChild.mother.includes("girl")) {mother = 0; parentTempList = teenFDescList;}
                else {mother = 40; parentTempList = adultFDescList;}

                parentTemp = passedChild.mother.replace(/ .*/,'');
                parentTempList = parentTempList.indexOf(parentTemp);
                parentTempList = parentTempList;
                
                mother = "1" + (parentTempList + mother);
            }
            else {
                parentTemp =  passedChild.mother.match(/\w+$/)[0];
                parentTempList = typeList.indexOf(parentTemp);
                mother = "2" + parentTempList.toString().padStart(2,"0");
            }

        }
        else {mother = "000"}

       //fathers
       if(!!passedChild.father) {
            //Order for checks goes: named => human npc => beast npc

            if(motherFatherList.includes(passedChild.father)) {
                father = motherFatherList.indexOf(passedChild.father);
                father = father.toString().padStart(3, "0");
            }
            else if(!beast) {

                if (passedChild.father.includes("boy")) {father = 0; parentTempList = teenMDescList;}
                else {father = 40; parentTempList = adultMDescList;}

                parentTemp = passedChild.father.replace(/ .*/,'');
                parentTempList = passedChild.father.indexOf(parentTemp);
                parentTempList = parentTempList;
                
                father = "1" + (parentTempList + father);
            }
            else {
                parentTemp =  passedChild.mother.match(/\w+$/)[0];
                parentTempList = typeList.indexOf(parentTemp);
                father = "2" + parentTempList.toString().padStart(2,"0");
            }

        }
        else {father = "000"}


        //assigns all the values to their correct order.
        child_data[0] = childTypeIndex  < 10 ? "0" + childTypeIndex : childTypeIndex; //preplan this having 2 palces.
        child_data[1] = gender;
        child_data[2] = tformBeast < 10 ? "0" + tformBeast : tformBeast;
        child_data[3] = tformDivine < 10 ? "0" + tformDivine : tformDivine;
        child_data[4] = monster;
        child_data[5] = size;
        child_data[6] = hair < 10 ? "0" + hair : hair; //needs 2 places
        child_data[7] = eyes < 10 ? "0" + eyes : eyes; //needs 2 places
        child_data[8] = skin; //shouldn't need another digit but double check
        child_data[9] = clothes < 10 ? "0" + clothes : clothes; //preplan this having 2 palces.
        child_data[10] = twinplets;
        child_data[11] = birthID; // this can have up to 10 places. 9 for the id and 1 for the id length.
        child_data[12] = birthLocation < 10 ? "0" + birthLocation : birthLocation; //preplan this having 2 palces.
        child_data[13] = childLocation < 10 ? "0" + childLocation : childLocation; //preplan this having 2 palces.
		child_data[13] = conceivedLocation < 10 ? "0" + conceivedLocation : conceivedLocation; //preplan this having 2 palces.
        child_data[14] = mother;
        child_data[15] = father;

        child_code =  (compressorVersion < 10 ? '~' : '') +  reduceZeros( compressorVersion.toString() + child_data.join("") );

        //Currently we have both dates added if they are there.
        let day, month, year, conceivedDate, birthDate;

        if (!!passedChild.conceived) {
            conceivedDate = "";
            day = passedChild.conceived.day;
            if (day < 10) day = "0" + day;

            month = monthNameList.indexOf(passedChild.conceived.month);
            if (month < 10) month = "0" + month;

            year = passedChild.conceived.year;
            year = year.toString().padStart(4,"0");

            conceivedDate +=".c" + day + month + year;
        }
        else {
            conceivedDate +=".c" + "00000000";
        }

        if (!!passedChild.born) {
            birthDate = "";
            day = passedChild.born.day;
            if (day < 10) day = "0" + day;

            month = monthNameList.indexOf(passedChild.born.month);
            if (month < 10) month = "0" + month;

            year = passedChild.born.year;
            year = year.toString().padStart(4,"0");

            birthDate +=".b" + day + month + year;
        }
        else {
            //birthDate +=".b" + "00000000";
        }

        if (bothDates) {
            if (conceivedDate) child_code += conceivedDate;
            if (birthDate) child_code += birthDate;
        }
        else {
            if (birthDate) child_code += birthDate;
            else child_code += conceivedDate;
        }

        //this should be in the format motherID + "." + birth number for this child  + "|" + fatherID + "." + birth number for this child
        let childId = passedChild.childId;

        child_code +=".i" + childId;

        return child_code;
    }


    /**
     * @desc Takes in a passed coded string and turns them into a child with the required key values.
     * @param {string} passedChild The child code as a string that you want returned as an object.
     * @param {string} passedName The name of the Child that is being decompressed.
     * @returns {Object} The passed child as an object with all relevent key's filled.
     */
    function childDecompressor(passedChild, passedName = null) {
        let childItems = {};
        let expandedChild;

        //get version number
        let position = passedChild.indexOf(".");
        if (passedChild[0] === '~') expandedChild = "0" + expandZeros(passedChild.slice(1,position)) + passedChild.slice(position);
        else expandedChild = expandZeros(passedChild.slice(0,position)) + passedChild.slice(position);
        let cVersion = Number(expandedChild.slice(0,2));
        position = 2;

        //extract indexes from uncompressed string and get their values.
        let childType = typeList[Number(expandedChild.slice(position, position + 2))];
        let beast = !(childType === "human" || childType === "plant")
        position +=2;

        let gender = ["m", "f", "h"][Number(expandedChild[position])];
        position++;

        let beastTransform = tformList.beast[Number(expandedChild.slice(position, position + 2))];
        position +=2;

        let divineTransform = tformList.divine[Number(expandedChild.slice(position, position + 2))];
        position +=2;

        //we change the child type later, not at this stage because the mother and father code needs it as is.
        let monster = Number(expandedChild[position]) ? "monster" : 0 ;
        position++;

        let size = sizeList[Number(expandedChild[position])];
        position++;

        let hairType = Object.keys(hairColourList).includes(childType) ? childType : "human";
        let hairColour = hairColourList[hairType][Number(expandedChild.slice(position, position + 2))];
        position +=2;

        let eyeColour = eyeColourList[Number(expandedChild.slice(position, position + 2))];
        position +=2;

        let skinColour = skinColourList[Number(expandedChild[position])];
        position ++;

        let clothes = childClothingList[Number(expandedChild.slice(position, position + 2))];
        position +=2;

        let identical = Number(expandedChild[position]) === 1 ? true : false;
        position ++;

        let birthTemp = Number(expandedChild[position]);
        position ++;

        let birthId = Number(expandedChild.slice(position, position + birthTemp));
        position+=birthTemp;

        let birthLocation = locationList[Number(expandedChild.slice(position, position + 2))];
        position +=2;

        let location = locationList[Number(expandedChild.slice(position, position + 2))];
        position +=2;

		let conceivedLocation = locationList[Number(expandedChild.slice(position, position + 2))];
        position +=2;

        let parentTemp, parentTempList;

        //mother
        let mother = Number(expandedChild[position]);
        position ++;

        if (mother === 0) {
            mother = motherFatherList[Number(expandedChild.slice(position, position + 2))];
        }
        else if (mother === 1) {
            parentTemp = Number(expandedChild.slice(position, position + 2));

            if (parentTemp >= 40) {mother = " woman"; parentTemp -=40; parentTempList = adultFDescList;}
            else {mother = " girl"; parentTempList = teenFDescList;}

            mother = parentTempList[parentTemp] + mother;
        }
        else if (mother === 2) {
            parentTemp = Number(expandedChild.slice(position, position + 2));
            mother = " female " + typeList[parentTemp];
            parentTempList = beastDescList[parentTemp - 1];
            mother = parentTempList + mother;
        }
        position +=2;

        motherKnown = !mother.includes("Unknown");

        //father
        let father = Number(expandedChild[position]);
        position ++;

        if (father === 0) {
            father = motherFatherList[Number(expandedChild.slice(position, position + 2))];
        }
        else if (father === 1) {
            parentTemp = Number(expandedChild.slice(position, position + 2));
            if (parentTemp >= 40) {father = " man"; parentTemp -=40; parentTempList = adultMDescList;}
            else {father = " boy"; parentTempList = teenMDescList;}

            father = parentTempList[parentTemp] + father;
        }
        else if (father === 2) {
            parentTemp = Number(expandedChild.slice(position, position + 2));
            father = " male " + typeList[parentTemp];
            parentTempList = beastDescList[parentTemp - 1];
            father = parentTempList + father;
        }
        position +=2;

        fatherKnown = !father.includes("Unknown");

        if (beast) {
            if (childType === "cow" && gender === "m") type = "bull";

			if (monster) {
				switch (childType) {
					case "horse": childType = "centaur"; break;
					case "hawk": childType = "harpy"; break;
					default: childType += childType + (gender === "m" ? "boy" : "girl"); break;
				}
			}

            if (!childType) childType = childType;

        }
        else {
            const man = gender === "m" ? "boy" : "girl";
            childType = childType + (childType === "plant" ? man : "");
        }
        

        if(cVersion > 1) throw new Error("This should be unreachable.");

        let check;

        check = expandedChild.match(/\.c\d+/);
        check = check ? check[0].slice(2) : "00000000";
        let conceived = convertToDMYFormat(check);
        conceived.month = monthNameList[conceived.month];

        check = expandedChild.match(/\.b\d+/);
        check = check ? check[0].slice(2) : "00000000";
        let born = convertToDMYFormat(check);
        born.month = monthNameList[born.month];

        check = expandedChild.match(/\.i-?\d+\.-?\d+\|-?\d+\.-?\d+/);
        if (check) check = check[0].slice(2);
        else {
            check = `A child with either no childId or an invalid Id was passed to the decompressor. Passed value: ${expandedChild.match(/\.i.*/)}`;
            throw new Error(check); 
        } 
        let childId = check;


        //assignemnt of values
        childItems = {
            "type": childType, gender, birthId, conceivedLocation, birthLocation, location, mother, motherKnown, father, fatherKnown, conceived, born, childId,
            features: {beastTransform, divineTransform, monster, size, hairColour, eyeColour, skinColour, clothes, identical}
        }

        if (passedName) {childItems.name = passedName;}


        return childItems
    }


    //converts the passed number from base 10 to base 64. If the number you need converted is bigger than the allowable max integer number, store than number as a string and pass it the same way you would a number.
    function toBase64(passedNum) {
        if (!isFinite(passedNum)) return String(passedNum);
        if (passedNum === 0) return "0";
        if (passedNum < 0) return "-"+toBase64(-passedNum);
        
        if (passedNum.toString().length > 15) return toBase64(passedNum.toString().slice(0,15)) + "!" + toBase64(passedNum.toString().slice(15));

        var str = "", r;

        while (passedNum) {
            r = passedNum % base;
            passedNum -= r;
            passedNum /= base;
            str = table.charAt(r) + str;
        }

        return str;
    }


    //converts the passed string from base 64 to base 10.
    function fromBase64(passedStr) {
        if (passedStr.length === 0 || passedStr === "0") return 0;
        if (passedStr === "NaN" || passedStr === "Infinity") return Number(passedStr);
        if (passedStr[0] === "-") return -fromBase64(passedStr.slice(1));

        if (passedStr.indexOf("!") >= 0) return "" + fromBase64( passedStr.slice(0,passedStr.indexOf("!")) ) + fromBase64( passedStr.slice(passedStr.indexOf("!")+1) );

        var num = 0, r;

        while (passedStr.length) {
            r = table.indexOf(passedStr.charAt(0));
            passedStr = passedStr.substring(1);
            num *= base;
            num +=r
        }

        return num;
    }


    //Takes groups of 3 or more zeros and reduces them down to the number of zeros and a "|". If the number of consecutive zeros is greater than 9, a ">" is added with a value in front of it for the number of 9s it represents (27 = 3>).
    //It then passes the result to the base 10 to base 64 converter above and finishes compressing it.
    function reduceZeros(passedNumber) {
        if (isNaN(passedNumber)) return passedNumber;
        if (passedNumber === 0) return "0";
        let result = String(passedNumber);
        
        result = result.replace(/0{3,}/g, (zeros) =>  '' + zeros.length % 9 + '|' + (zeros.length > 9 ? (zeros.length > 17 ? Math.floor(zeros.length / 9 ) + '>' : '>') : '') );
        result = result.replace(/[0-9]{2,}/g, (number) => toBase64(number) );

        return result;
    }


    //Converts the condensed zeros back to the correct number of zeros. It then passes the result to the base 64 to base 10 converter above and finishes decompressing it.
    function expandZeros(passedString) {
        if (passedString.length === 0 || passedString === "0") return 0;
        if (passedString === "NaN" || passedString === "Infinity") return Number(passedStr);
        let result = passedString;
    
        result = result.replace(/[a-zA-Z0-9_+]+/g, (group) => fromBase64(group));
        result = result.replace(/([0-9]+)>/g,(_str, p1) => "0".repeat( Number(p1) * 9 ));
        result = result.replace(/>/g,"9|");
        result = result.replace(/!/g,"");
        result = result.replace(/([0-9])\|/g, (_str, p1) => p1 > 0 ? "0".repeat( Number(p1)) : "0".repeat(9) ) ;
    
        return result;
    }

    return { npcCompressor, npcDecompressor, childCompressor, childDecompressor };
})();
window.npcCompressor = npcCompressor;
window.npcDecompressor = npcDecompressor;
window.childCompressor = childCompressor;
window.childDecompressor = childDecompressor;


/**
 * @desc Takes in a coded NPC string and modifies the NPC's pregnancy avoidance.
 * @param {string} passedNPC The NPC code that is to be modified.
 * @param {number} incriment The amount added to the pregnancy avoidance.
 * @returns {string} The passed NPC code with the changed pregnancy avoidance.
 */
function changeCNPCPregnancyAvoidance(npcString, increment) {
    return npcString.replace(/\.a(\d+)/, (_str, p1) => ".a" + Math.max(1, Math.min(100, (Number(p1) + increment))) );
}
window.changeCNPCPregnancyAvoidance = changeCNPCPregnancyAvoidance;
DefineMacroS("changeCNPCPregnancyAvoidance", changeCNPCPregnancyAvoidance);


/**
 * @desc Takes a compressed NPC and returns the current event timer value.
 * @param {String} npcString The compressed NPC string.
 * @returns {number} The current value of the event timer. Returns 0 if there is no timer.
 */
 function getCNPCPregnancyAvoidance(npcString) {
    let match = npcString.match(/\.a(\d+)/);
    return (match ? Number(match[1]) : 0);
}
window.getCNPCPregnancyAvoidance = getCNPCPregnancyAvoidance;
DefineMacro("getCNPCPregnancyAvoidance", getCNPCPregnancyAvoidance);


/**
 * @desc Takes in a coded NPC string and modifies the NPC's pregnancy timer. If not timer is present it will add it.
 * @param {string} npcString The NPC code that is to be modified.
 * @param {number} incriment The amount of time added to the pregnancy timer.
 * @returns {string} The passed NPC code with the changed pregnancy timer.
 */
 function changeCNPCPregnancyTimer(npcString, increment) {
    //There is no timer, replace the no timer value (.n) with the pregnancy timer if the passed value isn't 0.
    if (npcString.indexOf(".n") > 0 && increment != 0) return npcString.replace(/\.n/, ".p" + increment);

    //The pregnancy timer is present so its value is changed. removes the timer if the new value is 0.
    if (npcString.indexOf(".p") > 0) return npcString.replace(/\.p(-?\d+)/, (_str, p1) => (Number(p1) + increment) != 0 ? ".p" + (Number(p1) + increment) : (npcString.indexOf(".t") > 0 ? "" : ".n"));

    //There is an event timer present. Places the pregnancy timer before the event timer.
    if (npcString.indexOf(".t") > 0) return npcString.replace(/\.t\d+/, (_str) =>  increment != 0 ? ".p" + increment + _str : _str);

    //If none of these work, returns the passed value unchanged.
    return npcString;
}
window.changeCNPCPregnancyTimer = changeCNPCPregnancyTimer;
DefineMacroS("changeCNPCPregnancyTimer", changeCNPCPregnancyTimer);


/**
 * @desc Takes a compressed NPC and returns the current pregnancy timer value.
 * @param {String} npcString The compressed NPC string.
 * @returns {number} The current value of the pregnancy timer. Returns 0 if there is no timer.
 */
 function getCNPCPregnancyTimer(npcString) {
    let match = npcString.match(/\.p(-?\d+)/);
    return (match ? Number(match[1]) : 0);
}
window.getCNPCPregnancyTimer = getCNPCPregnancyTimer;
DefineMacro("getCNPCPregnancyTimer", getCNPCPregnancyTimer);

//remove preg timer
function removeCNPCPregnancyTimer(npcString) {
    //There is an event timer present
    if (npcString.indexOf(".t") > 0)return npcString.replace(/\.p-?\d+/, '')

    //No other timers
    return npcString.replace(/\.p-?\d+/, ".n");
}
window.removeCNPCPregnancyTimer = removeCNPCPregnancyTimer;
DefineMacro("removeCNPCPregnancyTimer", removeCNPCPregnancyTimer);


/**
 * @desc Takes in a coded NPC string and modifies the NPC's event timer. Adds the timer if it's not present.
 * @param {string} npcString The NPC code that is to be modified.
 * @param {number} incriment The amount of time added to the event timer.
 * @returns {string} The passed NPC code with the changed event timer.
 */
function changeCNPCEventTimer(npcString, increment) {
    //There is no timer, replace the no timer value (.n) with the event timer (.t) if the passed value isn't 0.
    if (npcString.indexOf(".n") > 0 && increment != 0) return npcString.replace(".n", ".t" + increment);

    //The event timer is present so its value is changed.
    if (npcString.indexOf(".t") > 0) return npcString.replace(/\.t(\d+)/, (_str, p1) => (Number(p1) + increment) != 0 ? ".t" + (Number(p1) + increment) : (npcString.indexOf(".p") > 0 ? "" : ".n"));

    //The pregnancy timer is present, add the event timer after the pregnancy timer
    if (npcString.indexOf(".p") > 0) return npcString.replace(/\.p(-?\d+)/, (_str) => _str +  (increment != 0 ? ".t" + increment : "") );

    //If none of these work, returns the passed value unchanged.
    return npcString;
}
window.changeCNPCEventTimer = changeCNPCEventTimer;
DefineMacroS("changeCNPCEventTimer", changeCNPCEventTimer);


/**
 * @desc Takes a compressed NPC and returns the current event timer value.
 * @param {String} npcString The compressed NPC string.
 * @returns {number} The current value of the event timer. Returns 0 if there is no timer.
 */
 function getCNPCEventTimer(npcString) {
    let match = npcString.match(/\.t(\d+)/);
    return (match ? Number(match[1]) : 0);
}
window.getCNPCEventTimer = getCNPCEventTimer;
DefineMacro("getCNPCEventTimer", getCNPCEventTimer);


//remove event timer
function removeCNPCEventTimer(npcString) {
    //There is another timer present
    if (npcString.indexOf(".p") > 0) {return npcString.replace(/\.t(\d+)/, "")}

    //No other timers
    return npcString.replace(/\.t(\d+)/, ".n");
}
window.removeCNPCEventTimer = removeCNPCEventTimer;
DefineMacro("removeCNPCEventTimer", removeCNPCEventTimer);


/**
 * @desc Takes in the passed NPCs and overwrites identical keys in the first NPC with the keys from the second NPC. Any keys not included in the first NPC, but are included the second NPC, will be added by the second NPC.
 * @param {Object} generatedNPC The newly generated NPC that is going to be replaced by the decompressed NPC.
 * @param {Object} decompressedNPC The decompressed NPC.
 * @returns {Object} Returns a NPC object created from the second NPC overwriting identical keys in the first NPC.
 */
function mergeNPCData(generatedNPC, decompressedNPC) {
    return {...generatedNPC, ...decompressedNPC};
}
window.mergeNPCData = mergeNPCData;
DefineMacro("mergeNPCData", mergeNPCData);


/**
 * @desc Turns a date saved as a string to an object.
 * @param {string} dateString The date in ddmmyyyy format.
 * @param {boolean} stringMonth If true, then returns the month as it's string equivalent.
 * @returns The passed date in {day:#, month:#, year:#} format. Values will be numbers. Month will be a string if stringMonth is true.
 */
const convertToDMYFormat = (dateString, stringMonth = false) => {
    let day = Number(dateString.slice(0,2));
    let month = Number(dateString.slice(2,4));
    let year = Number(dateString.slice(4));
    
    if (stringMonth) month = ["","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].indexOf(month);

    return {day:day, month:month, year:year};
};
window.convertToDMYFormat = convertToDMYFormat;
DefineMacro("convertToDMYFormat", convertToDMYFormat);


/**
 * @desc Turns a date saved as an object to a string.
 * @param {Object} dateObject The passed date in {day:#, month:#, year:#} format.
 * @returns The date in ddmmyyyy format.
 */
const convertToDDFormat = ({day, month, year}) => {
    if (isNaN(month)) month = ["","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].indexOf(month);

    return "" + (day < 10 ? "0" + day : day) + (month < 10 ? "0" + month : month) + year.toString().padStart(4,"0");
};
window.convertToDDFormat = convertToDDFormat;
DefineMacro("convertToDDFormat", convertToDDFormat);

/**
 * @desc Takes in a compressed child string and returns the child's conception date.
 * @param {string} childString A string that contains a compressed child's information.
 * @param {boolean} asString If true, returns the date in ddmmyyyy format.
 * @returns RSeturns the date in {day:#, month:#, year:#} format. returns null if there is no conception date or an invalid date on the passed string.
 */
function getCChildConceptionDate(childString, asString = false) {
    let check = childString.match(/\.c\d+/);
    check = check ? check[0].slice(2) : null;

    if (check && !asString) return convertToDMYFormat(check);
    else return check;
}
window.getCChildConceptionDate = getCChildConceptionDate;
DefineMacro("getCChildConceptionDate", getCChildConceptionDate);

/**
 * @desc Changes the conception date of the passed child string to the passed date. Adds the conceptino date if it is not present.
 * @param {string} childString A string that contains a compressed child's information.
 * @param {*} date The new date. can be in ddmmyyyy, {day:#, month:String, year:#}, or {day:#, month:#, year:#} format.
 * @returns The child string with the new date in place of the old one.
 */
function changeCChildConceptionDate(childString, date) {
    if (typeof date === "object") date = convertToDDFormat(date);

    if (childString.includes(".c")) childString = childString.replace(/.c\d+/, ".c" + date);
    else childString = childString.slice(0, childString.indexOf(".")) + ".c" + date + childString.slice(childString.indexOf("."));

    return childString;
}
window.changeCChildConceptionDate = changeCChildConceptionDate;
DefineMacro("changeCChildConceptionDate", changeCChildConceptionDate);


/**
 * @desc Removes the conceptino date from the child string if it is present.
 * @param {string} childString A string that contains a compressed child's information.
 * @returns The child string with without the conception date.
 */
function removeCChildConceptionDate(childString) {
    if (childString.includes(".c")) childString = childString.replace(/.c\d+/, "")
    return childString
}
window.removeCChildConceptionDate = removeCChildConceptionDate;
DefineMacro("removeCChildConceptionDate", removeCChildConceptionDate);


/**
 * @desc Takes in a compressed child string and returns the child's birth date.
 * @param {string} childString A string that contains a compressed child's information.
 * @returns Returns the date in {day:#, month:#, year:#} format. returns null if there is no birth date or an invalid date on the passed string.
 */
function getCChildBirthDate(childString) {
    let check = childString.match(/\.b\d+/);
    check = check ? check[0].slice(2) : null;

    if (check && !asString) return convertToDMYFormat(check);
    else return check;
}
window.getCChildBirthDate = getCChildBirthDate;
DefineMacro("getCChildBirthDate", getCChildBirthDate);


/**
 * @desc Changes the birth date of the passed child string to the passed date. Adds the birth date if it is not present.
 * @param {string} childString A string that contains a compressed child's information.
 * @param {*} date The new date. can be in ddmmyyyy, {day:#, month:String, year:#}, or {day:#, month:#, year:#} format.
 * @returns The child string with the new date in place of the old one.
 */
function changeCChildbirthDate(childString, date) {
    if (typeof date === "object") date = convertToDDFormat(date);

    if (childString.includes(".b")) childString = childString.replace(/.b\d+/, ".b" + date);
    else childString = childString.slice(0, childString.indexOf(".")) + ".b" + date + childString.slice(childString.indexOf("."));

    return childString;
}
window.changeCChildbirthDate = changeCChildbirthDate;
DefineMacro("changeCChildbirthDate", changeCChildbirthDate);


/**
 * @desc Removes the birth date from the child string if it is present.
 * @param {string} childString A string that contains a compressed child's information.
 * @returns The child string with without the birth date.
 */
function removeCChildBirthDate(childString) {
    if (childString.includes(".b")) childString = childString.replace(/.b\d+/, "")
    return childString
}
window.removeCChildBirthDate = removeCChildBirthDate;
DefineMacro("removeCChildBirthDate", removeCChildBirthDate);


/**
 * @desc Takes in a compressed child string and returns the child's childId.
 * @param {string} childString A string that contains a compressed child's information.
 * @returns Returns null if there is no child ID or an invalid Id on the passed string. 
 */
function getCChildId(childString) {
    let check = childString.match(/\.i-?\d+\.-?\d+\|-?\d+\.-?\d+/);
    check = check ? check[0].slice(2) : null;
    return check;
}
window.getCChildId = getCChildId;
DefineMacro("getCChildId", getCChildId);


/**
 * @desc 
 * @param {string} childString A string that contains a compressed child's information.
 * @param {string} id The new id that will be used. Pass a full id: x.x|x.x, a partial id: x.x, or a singe number for both, single parent, or single value respectively.
 * @param {number} parentChoice 0: Changes entire Id, 1: just the mother's Id, 2: just the father's Id.
 * @param {number} birthNumber 0 for nothing, 1 for the parent, 2 for the birth number
 */
function changeCChildId(childString, id, parentChoice = 0, birthNumber = 0) {
    let cId = getCChildId(childString);

    if(!cId) return childString;

    if (parentChoice == 0) childString = childString.replace(".i" + cId, ".i" + id);

    else if (parentChoice == 1) {
        if (birthNumber == 2) childString = childString.replace(/\.-?\d+\|/, "." + id + "|");
        else if (birthNumber == 1) childString = childString.replace(/\.i-?\d+/, ".i" + id);
        else childString = childString.replace(/\.i-?\d+\.-?\d+/, ".i" + id);
    }
    else if (parentChoice == 2) {
        if (birthNumber == 2) childString = childString.replace(/\.-?\d+$/, "." + id);
        else if (birthNumber == 1) childString = childString.replace(/\|-?\d+\./, "|" + id + ".");
        else childString = childString.replace(/-?\d+\.-?\d+$/, id);
    }
    
    return childString;
}
window.changeCChildId = changeCChildId;
DefineMacro("changeCChildId", changeCChildId);




/**
 * @desc takes in an object that contains npcs or children objects and compares them before and after compression.
 * @param {Object} npcList An object that contains at least one npc or child object.
 * @param {boolean} result If true, returns an array containing whether each passed npc/child is correctly compressed.
 * @param {boolean} detail Prints basic details to the console if true.
 * @param {boolean} verboseDetail Prints more extensive details to the console if true.
 * @returns 
 */
function compressionVerifier(npcList, result = true, detail = false, verboseDetail = false) {
    let npcAsString = "";
    let returnOutput = [];
    let decompressedNPCString, currentNPC, type, textOutput, name, startTime, endTime, compressTime, decopmressTime, compressTimeAvg, decopmressTimeAvg;
    // const { performance } = require('perf_hooks');

    const {compareKeys, findDiffKeys, compareValues, findDiffValue, findByteSize, trun} = (function() {

        //compares the keys of two objects to see if they are the same.
        function compareKeys(a, b) {
            var aKeys = Object.keys(a);
            var bKeys = Object.keys(b);
        
            aKeys.forEach(key => {
                if (typeof a[key] == "object") aKeys = aKeys.concat(Object.keys(a[key]));
            })
        
            bKeys.forEach(key => {
                if (typeof b[key] == "object") bKeys = bKeys.concat(Object.keys(b[key]));
            })

			aKeys = aKeys.sort();
			bKeys = bKeys.sort();

            return JSON.stringify(aKeys) === JSON.stringify(bKeys);
        }
        
        //finds the different keys between two objects
        function findDiffKeys(a, b) {
            let list = []
            var aKeys = Object.keys(a).sort();
            var bKeys = Object.keys(b).sort();
        
            aKeys.forEach(key => {
                if (!bKeys.includes(key)) list.push( ("second list missing key: " + key).padEnd(38) + "\n");
            });
        
            bKeys.forEach(key => {
                if (!aKeys.includes(key) && !list.includes(key)) list.push(("first list missing key: " + key).padEnd(38) + "\n");
            });
        
            return list;
        }
        
        //compares the values of two objects to see if they are the same.
        function compareValues(a, b) {
            let equal = true;
        
            if (compareKeys(a,b)) { 
                Object.keys(a).forEach(key => {
                    if (typeof a[key] == "object") equal = compareValues(a[key], b[key]);
                    else if (a[key] != b[key] ) equal = false;
                });
            }
            else {
                equal = false;
            }
        
            return equal
        }
        
        //finds the values that are different between two objects with the same keys
        function findDiffValue(a, b) {
            let list = []
        
            Object.keys(a).forEach(key => {
                if (typeof a[key] == "object") findDiffValue(a[key], b[key]);
                else if (a[key] != b[key] ) {
                    console.log(("missing key / key value: " + key).padEnd(38))
                    list.push((key + ": a: " + a[key] +" b: " + b[key]).padEnd(38) + "\n");
                }
            });
        
            return list;
        }

        //finds the size of a passed string or object.
        function findByteSize(input) {
            let str = null;
            if (typeof input == "string") str = input;
            else str = JSON.stringify(input);
            const bytes = new TextEncoder().encode(str).length;
            return bytes;
        }

        //truncates a value to the desired number of places.
        function trun(value, places) {
            return Math.floor( value *10**places ) / 10**places;
        }

        return {compareKeys, findDiffKeys, compareValues, findDiffValue, findByteSize, trun};
    })();

    Object.keys(npcList).forEach(key => {
        currentNPC = npcList[key];

        // if (verboseDetail) {compressTime = 0; decopmressTime = 0; compressTimeAvg = 0; decopmressTimeAvg = 0;}        

        if (Object.keys(currentNPC).includes("childId")) {
            name = currentNPC.name;
            type = "Child";

            // if (verboseDetail) startTime = performance.now()
            npcAsString = childCompressor(currentNPC);
            // if (verboseDetail) {endTime = performance.now(); compressTime = endTime - startTime; compressTimeAvg += compressTime;}
            
            // if (verboseDetail) startTime = performance.now()
            decompressedNPCString = childDecompressor(npcAsString, name);
            // if (verboseDetail) {endTime = performance.now(); decopmressTime = endTime - startTime; decopmressTimeAvg += decopmressTime;}
            
        }
        else {
            type = "NPC";
            // if (verboseDetail) startTime = performance.now()
            npcAsString = npcCompressor(currentNPC);
            // if (verboseDetail) {endTime = performance.now(); compressTime = endTime - startTime; compressTimeAvg += compressTime;}

            // if (verboseDetail) startTime = performance.now()
            decompressedNPCString = npcDecompressor(npcAsString);
            // if (verboseDetail) {endTime = performance.now(); decopmressTime = endTime - startTime; decopmressTimeAvg += decopmressTime;}
        }

        if (detail) {
            console.log("-".repeat(70));
            console.log(("Testing " + type + ":").padEnd(21," ") + key);
        }
        
        if (verboseDetail) {
            console.log("Compressed string:   " + npcAsString);
            let cSize = findByteSize(npcAsString);
            let dSize = findByteSize(currentNPC);
            console.log("compressed size:     " + cSize);
            console.log("decompressed size:   " +  dSize);
            console.log("size reduction:      " + trun( (1 - cSize/dSize)*100, 2) + "%");
            // console.log("compression time:    " + trun(compressTime, 3).toString().padEnd(5, " ") + " miliseconds")
            // console.log("decompression time:  " + trun(decopmressTime, 3).toString().padEnd(5, " ") + " miliseconds")
        }

        if (!compareKeys(currentNPC,decompressedNPCString)) {
            if (detail) console.log("keys");
            textOutput = "" + findDiffKeys(currentNPC,decompressedNPCString);
            returnOutput.push(false);
        }
        else if (!compareValues(currentNPC,decompressedNPCString)) {
            if (detail) console.log("values");
            textOutput = "" + findDiffValue(currentNPC,decompressedNPCString);
            returnOutput.push(false);
        }
        else {
            textOutput = "All keys and their values match for " + type + " " + key;
            returnOutput.push(true);
        }

        if (detail) {console.log(textOutput); console.log();}

    });

    // if (verboseDetail) {
    //     var count = Object.keys(npcList).length;
    //     console.log("-".repeat(70));
    //     console.log("average compression time:    " + trun(compressTimeAvg/count, 5).toString().padEnd(7, " ") + " miliseconds")
    //     console.log("average edcompression time:  " + trun(decopmressTimeAvg/count, 5).toString().padEnd(7, " ") + " miliseconds")
    //     console.log();
	// // (type + " " + key).padEnd(15," ") + 
    // }

    if (result) return returnOutput;
}
window.compressionVerifier = compressionVerifier;
DefineMacro("compressionVerifier", compressionVerifier);
