setup.debugMenu = {
	cache_debug_div: {}
}

setup.debugMenu.event_list = {
	Main:[
		{
			link: [
				`test`, `Test`
			],
			widgets: [
				`<<set $molestationstart to 0>>`
			]
		},
		{
			link: [
				`CanvasModel Exemple`, `CanvasModel Example`
			],
			widgets: [
				``
			]
		},
		{
			link: [
				`Home`, `Bedroom`
			],
			widgets: [
				``
			]
		},
		{
			link: [
				`Wardrobe`, `Wardrobe`
			],
			widgets: [
				``
			]
		},
		{
			link: [
				`Strip`, function(){return V.passage}
			],
			widgets: [
				`<<undressclothes "wardrobe">>`
			]
		},
		{
			link: [
				`Strip to undies`, function(){return V.passage}
			],
			widgets: [
				`<<generalUndress wardrobe over_upper>>`,
				`<<generalUndress wardrobe over_lower>>`,
				`<<generalUndress wardrobe upper>>`,
				`<<generalUndress wardrobe lower>>`
			]
		},
		{
			link: [
				`Strip all`, function(){return V.passage}
			],
			widgets: [
				`<<undress "wardrobe">>`
			]
		},
		{
			link: [
				`Pass 1 minute`, function(){return V.passage}
			],
			widgets: [
				`<<pass 1>>`
			]
		},
		{
			link: [
				`Pass 15 minutes`, function(){return V.passage}
			],
			widgets: [
				`<<pass 15>>`
			]
		},
		{
			link: [
				`Pass 20 minutes`, function(){return V.passage}
			],
			widgets: [
				`<<pass 20>>`
			]
		},
		{
			link: [
				`Pass 1 hour`, function(){return V.passage}
			],
			widgets: [
				`<<pass 60>>`
			]
		},
		{
			link: [
				`Pass 3 hours`, function(){return V.passage}
			],
			widgets: [
				`<<pass 3 hours>>`
			]
		},
		{
			link: [
				`Pass 6 hours`, function(){return V.passage}
			],
			widgets: [
				`<<pass 6 hours>>`
			]
		},
		{
			link: [
				`Pass 12 hours`, function(){return V.passage}
			],
			widgets: [
				`<<pass 12 hours>>`
			]
		},
		{
			link: [
				`Pass 18 hours`, function(){return V.passage}
			],
			widgets: [
				`<<pass 18 hours>>`
			]
		},
		{
			link: [
				`Pass 23 hours`, function(){return V.passage}
			],
			widgets: [
				`<<pass 23 hours>>`
			]
		},
		{
			link: [
				`Pass 24 hours`, function(){return V.passage}
			],
			widgets: [
				`<<pass 24 hours>>`
			]
		},
		{
			link: [
				`Trust me`, function(){return V.passage}
			],
			widgets: [
				`<<set $enemytrust += 2000>>`,
				`<<set $enemyanger -= 1000>>`
			]
		},
		{
			link: [
				`Hate me`, function(){return V.passage}
			],
			widgets: [
				`<<set $enemytrust -= 2000>>`,
				`<<set $enemyanger += 1000>>`
			]
		},
		{
			link: [
				`Super Punch`, function(){return V.passage}
			],
			widgets: [
				`<<set $enemyhealth to 0>>`
			]
		},
		{
			link: [
				`Super Stroke`, function(){return V.passage}
			],
			widgets: [
				function(){return (`<<set $enemyarousal to ` + V.enemyarousalmax + `>>`)}
			]
		},
		{
			link: [
				`Scream`, function(){return V.passage}
			],
			widgets: [
				`<<set $alarm to 1>>`
			]
		},
		{
			link: [
				`Finish`, function(){return V.passage}
			],
			widgets: [
				`<<set $finish to 1>>`
			]
		},
		{
			link: [
				`Make Rape`, function(){return V.passage}
			],
			widgets: [
				`<<set $consensual to 0>>`
			]
		},
		{
			link: [
				`Make consensual`, function(){return V.passage}
			],
			widgets: [
				`<<set $consensual to 1>>`
			]
		},
		{
			link: [
				`Frigify`, function(){return V.passage}
			],
			widgets: [
				`<<set $enemyarousal to 0>>`
			]
		},
		{
			link: [
				`Roll over`, function(){return V.passage}
			],
			widgets: [
				function(){return (`<<set $position to ` + (V.position == "doggy") ? "doggy" : "missionary" ) + `>>`}
			],
			condition: function (){return (V.position == "doggy" || V.position == "missionary") ? 1 : 0}
		},
		{
			link: [
				`RNG 1`, function(){return V.passage}
			],
			widgets: [
				`<<set $rng to 1>>`
			]
		},
		{
			link: [
				`RNG 11`, function(){return V.passage}
			],
			widgets: [
				`<<set $rng to 11>>`
			]
		},
		{
			link: [
				`RNG 21`, function(){return V.passage}
			],
			widgets: [
				`<<set $rng to 21>>`
			]
		},
		{
			link: [
				`RNG 31`, function(){return V.passage}
			],
			widgets: [
				`<<set $rng to 31>>`
			]
		},
		{
			link: [
				`RNG 41`, function(){return V.passage}
			],
			widgets: [
				`<<set $rng to 41>>`
			]
		},
		{
			link: [
				`RNG 51`, function(){return V.passage}
			],
			widgets: [
				`<<set $rng to 51>>`
			]
		},
		{
			link: [
				`RNG 61`, function(){return V.passage}
			],
			widgets: [
				`<<set $rng to 61>>`
			]
		},
		{
			link: [
				`RNG 71`, function(){return V.passage}
			],
			widgets: [
				`<<set $rng to 71>>`
			]
		},
		{
			link: [
				`RNG 81`, function(){return V.passage}
			],
			widgets: [
				`<<set $rng to 81>>`
			]
		},
		{
			link: [
				`RNG 91`, function(){return V.passage}
			],
			widgets: [
				`<<set $rng to 91>>`
			]
		},
		{
			link: [
				`RNG reroll x1`, function(){return V.passage}
			],
			widgets: [
				`<<set $rng to random(1,100)>>`
			]
		},
		{
			link: [
				`RNG reroll x3`, function(){return V.passage}
			],
			widgets: [
				`<<run random(1,100)>>`,
				`<<run random(1,100)>>`,
				`<<set $rng to random(1,100)>>`
			]
		},
		{
			link: [
				`RNG reroll x5`, function(){return V.passage}
			],
			widgets: [
				`<<run random(1,100)>>`,
				`<<run random(1,100)>>`,
				`<<run random(1,100)>>`,
				`<<run random(1,100)>>`,
				`<<set $rng to random(1,100)>>` 
			]
		},
		{
			link: [
				`Wear sundress`, function(){return V.passage}
			],
			widgets: [
				`<<upperwear 1>>`
			]
		},
		{
			link: [
				`Wear swimsuit`, function(){return V.passage}
			],
			widgets: [
				`<<underlowerwear 6>>`
			]
		},
		{
			link: [
				`Testing Room`, `Testing Room`
			],
			widgets: [
				`<<upperstrip>>`,
				`<<lowerstrip>>`,
				`<<underlowerstrip>>`
			]
		},
		{
			link: [
				`End Event`, function(){return V.passage}
			],
			widgets: [
				`<<endevent>>`
			]
		},
		{
			link: [
				`Escape Vore`, function(){return V.passage}
			],
			widgets: [
				`<<set $vorestage to 0>>`
			]
		},
		{
			text_only: `\n`
		},
		{
			link: [
				`Make all beasts monster boys`, function(){return V.passage}
			],
			widgets: [
				`<<set $monsterchance to 100>>`,
				`<<set $monsterhallucinations to "f">>`,
				`<<set $beastmalechance to 100>>`,
				`<<set $cbchance to 0>>`
			]
		},
		{
			link: [
				`Make all beasts monster girls`, function(){return V.passage}
			],
			widgets: [
				`<<set $monsterchance to 100>>`,
				`<<set $monsterhallucinations to "f">>`,
				`<<set $beastmalechance to 0>>`,
				`<<set $dgchance to 0>>`
			]
		},
		{
			link: [
				`Make all beasts monster cuntboys`, function(){return V.passage}
			],
			widgets: [
				`<<set $monsterchance to 100>>`,
				`<<set $monsterhallucinations to "f">>`,
				`<<set $beastmalechance to 100>>`,
				`<<set $cbchance to 100>>`
			]
		},
		{
			link: [
				`Make all beasts monster dickgirls`, function(){return V.passage}
			],
			widgets: [
				`<<set $monsterchance to 100>>`,
				`<<set $monsterhallucinations to "f">>`,
				`<<set $beastmalechance to 0>>`,
				`<<set $dgchance to 100>>`
			]
		},
		{
			link: [
				`Make all beasts male animals`, function(){return V.passage}
			],
			widgets: [
				`<<set $monsterchance to 0>>`,
				`<<set $beastmalechance to 100>>`
			]
		},
		{
			link: [
				`Make all beasts female animals`, function(){return V.passage}
			],
			widgets: [
				`<<set $monsterchance to 0>>`,
				`<<set $beastmalechance to 0>>`
			]
		},
		{
			text_only: `\n`
		},
		{
			link: [
				`Spring`, function(){return V.passage}
			],
			widgets: [
				`<<set $season to "spring">>`
			]
		},
		{
			link: [
				`Summer`, function(){return V.passage}
			],
			widgets: [
				`<<set $season to "summer">>`
			]
		},
		{
			link: [
				`Autumn`, function(){return V.passage}
			],
			widgets: [
				`<<set $season to "autumn">>`
			]
		},
		{
			link: [
				`Winter`, function(){return V.passage}
			],
			widgets: [
				`<<set $season to "winter">>`
			]
		},
		{
			text_only: `\n`
		},
		{
			link: [
				`Enable basic Pregnancy features`, function(){return V.passage}
			],
			widgets: [
				`<<set $sexStats.anus.pregnancy.seenDoctor to 2>>`,
				`<<set $sexStats.anus.pregnancy.maxCount to 2>>`
			]
		},
		{
			link: [
				`Get Initial Mother Trait`, function(){return V.passage}
			],
			widgets: [
				`<<set $sexStats.anus.pregnancy.motherStatus to 1>>`
			]
		},
		{
			link: [
				`Fertilise New Eggs`, function(){return V.passage}
			],
			widgets: [
				`<<fertilise>>`
			]
		},
		{
			link: [
				`Pregnancy Progress Day`, function(){return V.passage}
			],
			widgets: [
				`<<pregProgressDay>>`
			]
		},
		{
			link: [
				`Pregnancy Progress Week`, function(){return V.passage}
			],
			widgets: [
				`<<pregProgressDay>>`,
				`<<pregProgressDay>>`,
				`<<pregProgressDay>>`,
				`<<pregProgressDay>>`,
				`<<pregProgressDay>>`,
				`<<pregProgressDay>>`,
				`<<pregProgressDay>>`,
				`<<pregProgressDay>>`
			]
		},
		{
			link: [
				function(){return `Set all pregnancy events to next ` + V.pass}, function(){return V.passage}
			],
			widgets: [
				`<<set _pregnancy to $sexStats.anus.pregnancy>>`,
				function(){return (T.pregnancy[0] == null ? "" : `<<set _pregnancy[0].timeLeft to 1>>`)},
				function(){return (T.pregnancy[1] == null ? "" : `<<set _pregnancy[1].timeLeft to 1>>`)},
				function(){return (T.pregnancy[2] == null ? "" : `<<set _pregnancy[2].timeLeft to 1>>`)},
				function(){return (T.pregnancy[3] == null ? "" : `<<set _pregnancy[3].timeLeft to 1>>`)},
			]
		},
		{
			text_only: `\nThese still require Fertilise`
		},
		{
			link: [
				`Get Pregnant with an eel`, function(){return V.passage}
			],
			widgets: [
				`<<impregnate "eels" 1000>>`
			]
		},
		{
			link: [
				`Get Pregnant with an slime`, function(){return V.passage}
			],
			widgets: [
				`<<impregnate "slimes" 1000>>`
			]
		},
		{
			link: [
				`Get Pregnant with an worm`, function(){return V.passage}
			],
			widgets: [
				`<<impregnate "worms" 1000>>`
			]
		},
		{
			link: [
				`Get Pregnant with an tentacle`, function(){return V.passage}
			],
			widgets: [
				`<<impregnate "tentacle" 1000>>`
			]
		},
		{
			text_only:`\n`
		},
		{
			link: [
				`Repair Pregnancy Objects`, function(){return V.passage}
			],
			widgets: [
				`<<prenancyObjectRepair>>`
			]
		},
		{
			link: [
				`Reset Pregnancy Objects`, function(){return V.passage}
			],
			widgets: [
				`<<unset $container>>`,
				`<<unset $sexStats.anus>>`,
				`<<physicalAdjustmentsInit>>`,
				`<<containersInit>>`
			]
		},
		{
			text_only: `\nVaginal Pregnancy<br>
						(New Pregnancy will only occur if not pregnant)\n`,
			condition: function(){return V.pregnancyTesting}
		},
		{
			link: [
				`Get Pregnant with humans`, function(){return V.passage}
			],
			widgets: [
				function() {if (V.sexStats.vagina.menstruation.currentState == "normal"){
						return `<<set $sexStats.vagina.sperm["Debug Man"] = {"type":"human", "count":[[4,1000]]}>>`}},
				function() {if (V.sexStats.vagina.menstruation.currentState == "normal"){
					return `<<set $sexStats.vagina.menstruation.currentDay to $sexStats.vagina.menstruation.stages[2]>>`}},
				function() {if (V.sexStats.vagina.menstruation.currentState == "normal"){
					return `<<menstruationCycle>>`}}
			],
			condition: function(){return V.pregnancyTesting}
		},
		{
			link: [
				`Get Pregnant with wolves`, function(){return V.passage}
			],
			widgets: [
				function() {if (V.sexStats.vagina.menstruation.currentState == "normal"){
						return `<<set $sexStats.vagina.sperm["Debug Wolf"] = {"type":"wolf", "count":[[4,1000]]}>>`}},
				function() {if (V.sexStats.vagina.menstruation.currentState == "normal"){
					return `<<set $sexStats.vagina.menstruation.currentDay to $sexStats.vagina.menstruation.stages[2]>>`}},
				function() {if (V.sexStats.vagina.menstruation.currentState == "normal"){
					return `<<menstruationCycle>>`}}
			],
			condition: function(){return V.pregnancyTesting}
		},
		{
			link: [
				`Get Robin Pregnant with PCs children`, function(){return V.passage}
			],
			widgets: [
				`<<set _sperm to ["pc"]>>`,
				`<<humanPregnancy "Robin" "pc" true>>`
			],
			condition: function(){return V.pregnancyTesting}
		},
		{
			link: [
				`Get Bailey Pregnant with Black wolf`, function(){return V.passage}
			],
			widgets: [
				`<<set _sperm to ["Black Wolf"]>>`,
				`<<wolfPregnancy "Bailey" "Black Wolf" true>>`
			],
			condition: function(){return V.pregnancyTesting}
		},
		{
			link: [
				`Enable Debug Lines`, function(){return V.passage}
			],
			widgets: [
				`<<set $debugLines to true>>`
			]
		},
		{
			link: [
				`Disable Debug Lines`, function(){return V.passage}
			],
			widgets: [
				`<<set $debugLines to false>>`
			]
		},
		{
			text_only: `\n`
		},
	],
	Events:[
		{
			link: [
				`Imprison Me`, `Underground Intro2`
			],
			widgets: [
				`<<generate1>>`,
				`<<person1>>`
			]
		},
		{
			link: [
				`Start Robin Event`, function(){return V.passage}
			],
			widgets: [
				`<<set $robindebt to 9>>`
			]
		},
		{
			link: [
				`School Start`, `Oxford Street`
			],
			widgets: [
				`<<pass 1 day>>`
			]
		},
		{
			link: [
				`Rape Me`, `Molestation`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $molestationstart to 1>>`
			]
		},
		{
			link: [
				`Double Rape Me`, `Forest Molestation`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $molestationstart to 1>>`
			]
		},
		{
			link: [
				`Gang Rape Me w/ Audience`, `The Pod`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $molestationstart to 1>>`
			]
		},
		{
			link: [
				`Sex Me [M]`, `Beach Day Encounter Sex`
			],
			widgets: [
				`<<endcombat>>`,
				`<<generateNPC 1 a m m>>`,
				`<<person1>>`,
				`<<set $sexstart to 1>>`
			]
		},
		{
			link: [
				`Sex Me [F]`, `Beach Day Encounter Sex`
			],
			widgets: [
				`<<endcombat>>`,
				`<<generateNPC 1 a f f>>`,
				`<<person1>>`,
				`<<set $sexstart to 1>>`
			]
		},
		{
			link: [
				`Gang Sex Me w/ Audience`, `Maths Lesson Gang Bang`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $sexstart to 1>>`
			]
		},
		{
			link: [
				`DP Test`, `DP Test`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $molestationstart to 1>>`
			]
		},
		{
			link: [
				`Choke Suffocate Test`, `Beach Day Encounter Sex`,
			],
			widgets: [
				`<<endcombat>>`,
				`<<generate1>>`,
				`<<person1>>`,
				`<<set $sexstart to 1>>`,
				`<<set $oxygen to 0>>`,
				`<<set $suffocating to 3>>`,
				`<<set $NPCList[0].righthand to "throat">>`,
				`<<set $neckuse to "hand">>`,
				`<<set $askedtochoke to 1>>`
			]
		},
		{
			link: [
				`Named NPC gangbang Test`,
				`Named NPC Gangbang Select`
			],
			widgets: [
				`<<endcombat>>`
			]
		},
		{
			link: [
				`NPC role select`, `NPC Role Select`
			],
			widgets: [
				`<<endcombat>>`
			]
		},
		{
			link: [
				`NPC clothing select`, `NPC Clothing Select`
			],
			widgets: [
				`<<endcombat>>`
			]
		},
		{
			link: [
				`Plantperson test`, `Plantperson Test`
			],
			widgets: [
				`<<endcombat>>`
			]
		},
		{
			link: [
				`Swarm`, `Sea Eels`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $molestationstart to 1>>`
			]
		},
		{
			link: [
				`Machine`, `Machine`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $molestationstart to 1>>`
			]
		},
		{
			link: [
				`Struggle`, `Struggle`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $struggle_start to 1>>`
			]
		},
		{
			link: [
				`Bus Rape`, `Bus move`
			],
			widgets: [
				`<<endcombat>>`,
				`<<generate1>>`,
				`<<person1>>`,
				`<<set $molestationstart to 1>>`
			]
		},
		{
			link: [
				`Monster Rape Me`, `Monster Test`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $molestationstart to 1>>`
			]
		},
		{
			link: [
				`Beast Rape Me`, "Street Dogs"
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $molestationstart to 1>>`,
				`<<beastNEWinit 3 dog>>`,
				`<<set $outside to 1>>`,
				`<<set $location to "town">>`,
				`<<set $bus to "domus">>`
			]
		},
		{
			link: [
				`Beast Gang Test`, `The Farm`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $molestationstart to 1>>`,
				`<<set $outside to 1>>`,
				`<<location "forest">>`,
				`<<set $bus to "forest">>`
			]
		},
		{
			link: [
				`Dolphin Sex Me`, `Sea Dolphins Sex`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $sexstart to 1>>`,
				`<<set $outside to 1>>`,
				`<<location to "sea">>`,
				`<<set $bus to "sea">>`
			]
		},
        {
            link: [
                `Cow Test`, `Cow Test Sex`
            ],
            widgets: [
                `<<endcombat>>`,
                `<<set $sexstart to 1>>`
            ]
        },
		{
			link: [
				`Tentacle Rape Me`, `Sea Tentacles`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $molestationstart to 1>>`
			]
		},
		{
			link: [
				`Bailey Test`, `Bus move`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $molestationstart to 1>>`,
				`<<npc Bailey>>`,
				`<<person1>>`
			]
		},
		{
			link: [
				`Leighton Office Spank`, `School Detention`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $detention to 55>>`
			]
		},
		{
			link: [
				`Enslave Me`, `Underground Intro`
			],
			widgets: [
				`<<endcombat>>`,
				`<<generate1>>`,
				`<<generate2>>`,
				`<<person1>>`
			]
		},
		{
			link: [
				`Work as a dancer`, `Brothel Dance`
			],
			widgets: [
				`<<endcombat>>`,
				`<<danceinit>>`,
				`<<set $dancing to 1>>`,
				`<<set $venuemod to 3>>`,
				`<<stress -4>>`,
				`<<tiredness 4>>`,
				`<<set $dancelocation to "brothel">>`
			]
		},
		{
			link: [
				`Eden Start`, `Eden Cabin`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $syndromeeden to 1>>`,
				`<<set $NPCName[$NPCNameList.indexOf("Eden")].lust to 0>>`,
				`<<set $edenshrooms to 0>>`,
				`<<set $edengarden to 0>>`,
				`<<set $edenspring to 0>>`,
				`<<set $wardrobes.edensCabin.unlocked to true>>`
			]
		},
		{
			link: [
				`Kylar Basement Rape`, `Kylar Basement Rape`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $molestationstart to 1>>`,
				`<<npc Kylar>>`,
				`<<person1>>`
			]
		},
		{
			link: [
				`Kylar Sex`, `Street Kylar Sex`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $sexstart to 1>>`,
				`<<set $location to "town">>`,
				`<<npc Kylar>>`,
				`<<person1>>`
			]
		},
		{
			link: [
				`Robin Sex Start`, `Bed Robin Sex`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $sexstart to 1>>`,
				`<<npc Robin>>`,
				`<<person1>>`
			]
		},
		{
			link: [
				`Briar Pay Refuse`, `Brothel Pay Refuse`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $molestationstart to 1>>`,
				`<<npc Briar>>`,
				`<<generate2>>`,
				`<<generate3>>`,
				`<<person1>>`
			]
		},
		{
			link: [
				`Leighton Sex`, `Head's Office Photoshoot Sex`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $sexstart to 1>>`,
				`<<set $phase to 1>>`,
				`<<npc Leighton>>`,
				`<<person1>>`
			]
		},
		{
			link: [
				`Leighton Forced`, `Head's Office Blackmail Rape`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $molestationstart to 1>>`,
				`<<npc Leighton>>`,
				`<<person1>>`
			]
		},
		{
			link: [
				`Avery Date`, `Domus Street`
			],
			widgets: [
				`<<set $averydate to 1>>`,
				`<<set $time to 1200>>`
			]
		},
		{
			link: [
				`Black Wolf Forced`, `Forest Wolf Molestation`
			],
			widgets: [
				/*`<<beastNNPCinit>>`,*/
				`<<endcombat>>`,
				`<<npc "Black Wolf">>`,
				`<<set $molestationstart to 1>>`
			]
		},
		{
			link: [
				`Police Pillory Start`, `Police Pillory Start`
			],
			widgets: [
				`<<set $crime to 5000>>`,
				`<<generate1>>`,
				`<<person1>>`
			]
		},
		{
			link: [
				`Hole in wall`, `Temple Arcade 2`
			],
			widgets: [
				``
			]
		},
		{
			link: [
				`Brothel Punishment`, `Brothel Punishment`
			],
			widgets: [
				``
			]
		},
		{
			link: [
				`Brothel Gloryhole`, `Brothel Gloryhole`
			],
			widgets: [
				``
			]
		},
		{
			link: [
				`Clothing Shop`, `Clothing Shop`
			],
			widgets: [
				``
			]
		},
		{
			link: [
				`Forest Shop`, `Forest Shop`
			],
			widgets: [
				``
			]
		},
		{
			link: [
				`Sea`, `Sea`
			],
			widgets: [
				`<<set $sea to 0>>`
			]
		},
		{
			link: [
				`Hospital`, `Hospital Foyer`
			],
			widgets: [
				``
			]
		},
		{
			link: [
				`Wolf Pack`, `Forest Wolf Cave`
			],
			widgets: [
				`<<set $wolfpacktrust to 12>>`
			]
		},
		{
			link: [
				`Halloween`, function(){return V.passage}
			],
			widgets: [
				`<<set $days to 47>>`,
				`<<set $monthday to 21>>`,
				`<<set $yeardays to 47>>`,
				`<<set $month to "october">>`
			]
		},
		{
			link: [
				`Full winter`, function(){return V.passage}
			],
			widgets: [
				`<<set $days to 92>>`,
				`<<set $yeardays to 92>>`,
				`<<set $monthday to 1>>`,
				`<<set $month to "december">>`
			]
		},
		{
			link: [
				`Christmas`, function(){return V.passage}
			],
			widgets: [
				`<<set $days to 110>>`,
				`<<set $yeardays to 110>>`,
				`<<set $monthday to 18>>`,
				`<<set $month to "december">>`
			]
		},
		{
			link: [
				`Blood moon`, function(){return V.passage}
			],
			widgets: [
				`<<set $monthday to 31>>`,
				`<<set $daystate to "night">>`,
				`<<set $hour to 21>>`,
				`<<set $minute to 0>>`,
				`<<set $time to 1260>>`,
				`<<set $moonstate to "evening">>`
			]
		},
		{
			link: [
				`Test`, function(){return V.passage}
			],
			widgets: [
				`<<set $month to "october">>`
			]
		},
		{
			link: [
				`Wake up`, `Ambulance rescue`
			],
			widgets: [
				`<<pass 1 hour>>`
			]
		},
		{
			link: [
				`Appointment`, `Hospital Foyer`
			],
			widgets: [
				`<<set $weekday to 6>>`,
				`<<set $time to 960>>`
			]
		},
		{
			link: [
				`Deep forest`, `Forest`
			],
			widgets: [
				`<<set $forest to 80>>`
			]
		},
		{
			link: [
				`Street Police Extreme`, `Street Police Extreme`
			],
			widgets: [
				`<pass 1 week>>`,
				`<<pass 1 week>>`,
				`<<npc Leighton>>`,
				`<<person1>>`
			]
		},
		{
			link: [
				`Brothel Show Swarm`, `Brothel Show Swarm`
			],
			widgets: [
				`<<leash 1>>`,
				`<<set $leftarm to "bound">>`,
				`<<set $rightarm to "bound">>`,
				`<<set $feetuse to "bound">>`,
				`<<set $sexstart to 1>>`,
				`<<set $rng to random(1,100)>>`,
				`<<npc Briar>>`,
				`<<person1>>`
			]
		},
		{
			link: [
				`Pussy Inspection`, `Pussy Inspection`
			],
			widgets: [
				`<<pass 1 week>>`,
				`<<pass 1 week>>`,
				`<<npc Leighton>>`,
				`<<person1>>`
			]
		},
		{
			link: [
				`Penis Inspection`, `Penis Inspection`
			],
			widgets: [
				`<<pass 1 week>>`,
				`<<pass 1 week>>`,
				`<<npc Leighton>>`,
				`<<person1>>`
			]
		},
		{
			link: [
				`Breast Inspection`, `Breast Inspection`
			],
			widgets: [
				`<<pass 1 week>>`,
				`<<pass 1 week>>`,
				`<<npc Leighton>>`,
				`<<person1>>`
			]
		},
		{
			link: [
				`Science Class Exposure`, `Science Event3`
			],
			widgets: [
				`<<set $scienceprogression to 3>>`,
				`<<set $delinquency to 600>>`
			]
		},
		{
			link: [
				`History Class Pillory`, `History Lesson Pillory`
			],
			widgets: [
				``
			]
		},
		{
			link: [
				`Alley Dog`, `Alley Dog`
			],
			widgets: [
				``
			]
		},
		{
			link: [
				`NNPC Parade`, `NNPC Parade`
			],
			widgets: [
				``
			]
		},
		{
			link: [
				`Beast Parade`, `Beast Parade`
			],
			widgets: [
				``
			]
		},
		{
			link: [
				`Beast Train`, `Beast Train`
			],
			widgets: [
				``
			]
		},
		{
			link: [
				`Demon Encounter`, `Demon Start`
			],
			widgets: [
				``
			]
		},
		{
			link: [
				`Temple Initiate`, `Temple`
			],
			widgets: [
				`<<inittemple>>`
			]
		},
		{
			link: [
				`Strip Club`, `Strip Club`
			],
			widgets: [
				`<<set $id to 1>>`,
				`<<set $wardrobes.stripClub.unlocked to true>>`
			]
		},
		{
			link: [
				`Asylum`, `Hospital Bed`
			],
			widgets: [
				`<<set $trauma to 4900>>`
			]
		},
		{
			link: [
				`Prison`, `Police Prison Intro Bailey`
			],
			widgets: [
				`<<npc Bailey>>`,
				`<<generate2>>`,
				`<<generate3>>`,
				`<<generate4>>`,
				`<<person2>>`,
				`<<neckwear 1>>`,
				`<<crimeup 5000>>`
			]
		},
		{
			link: [
				`Remy's Farm`, `Livestock Intro`
			],
			widgets: [
				``
			]
		},
		{
			link: [
				`Farmlands`, `Farmland`
			],
			widgets: [
				``
			]
		},
		{
			link: [
				`Museum`, `Museum`
			],
			widgets: [
				``
			]
		},
		{
			link: [
				`Beach Cave`, `Beach Cave`
			],
			widgets: [
				`<<set $cave to 0>>`,
				`<<beach_cave_init>>`
			]
		},
		{
			link: [
				`Stall Rent`, `Stall Rent`
			],
			widgets: [
				`<<set $time to 360>>`,
				`<<set $daystate to "dawn">>`
			]
		},
		{
			link: [
				`Estate`, `Estate`
			],
			widgets: [
				`<<estate_end>>`,
				`<<estate_init secret>>`
			]
		},
		{
			link: [
				`Stalk me`, `Street Stalk`
			],
			widgets: [
				`<<endcombat>>`,
				`<<generate1>>`,
				`<<person1>>`,
				`<<set $molestationstart to 1>>`
			]
		},
		{
			link: [
				`Bailey selling Robin`, `Orphanage`
			],
			widgets: [
				`<<set $renttime to 0>>`,
				`<<set $baileydefeatedchain to 3>>`,
				`<<set $robinpaid to 1>>`,
				`<<set $robinRentTest to 1>>`,
				`<<set $bus to "home">>`,
				`<<set $location to "home">>`
			]
		},
		{
			link: [
				`Summon the Wraith`, `Wraith Test Start`
			],
			widgets: [
				`<<endcombat>>`,
				`<<set $monthday to 31>>`,
				`<<set $daystate to "night">>`,
				`<<set $hour to 21>>`,
				`<<set $minute to 0>>`,
				`<<set $time to 1260>>`,
				`<<set $moonstate to "evening">>`
			]
		},
		{
			link: [
				`Possessed Fight`, `Possessed Fight Test`
			],
			widgets: [
				`<<set $control to 0>>`,
				`<<set $possessed to true>>`,
				function(){ if (!$wraith.will) return `<<set $wraith.will to random(1300, 1700)>>`}
			]
		},
		{
			text_only: "\n\nTurn beast into: "
		},
		{
			link: [
				`Creature`, function(){return V.passage}
			],
			widgets: [
				`<<set _xy to $enemyno-1>>`,
				`<<set $NPCList[_xy].type to "creature">>`
			]
		},
		{
			link: [
				`Dog`, function(){return V.passage}
			],
			widgets: [
				`<<set _xy to $enemyno-1>>`,
				`<<set $NPCList[_xy].type to "dog">>`
			]
		},
		{
			link: [
				`Wolf`, function(){return V.passage}
			],
			widgets: [
				`<<set _xy to $enemyno-1>>`,
				`<<set $NPCList[_xy].type to "wolf">>`
			]
		},
		{
			link: [
				`Dolphin`, function(){return V.passage}
			],
			widgets: [
				`<<set _xy to $enemyno-1>>`,
				`<<set $NPCList[_xy].type to "dolphin">>`
			]
		},
		{
			link: [
				`Bear`, function(){return V.passage}
			],
			widgets: [
				`<<set _xy to $enemyno-1>>`,
				`<<set $NPCList[_xy].type to "bear">>`
			]
		},
		{
			link: [
				`Boar`, function(){return V.passage}
			],
			widgets: [
				`<<set _xy to $enemyno-1>>`,
				`<<set $NPCList[_xy].type to "boar">>`
			]
		},
		{
			link: [
				`Pig`, function(){return V.passage}
			],
			widgets: [
				`<<set _xy to $enemyno-1>>`,
				`<<set $NPCList[_xy].type to "pig">>`
			]
		},
		{
			link: [
				`Lizard`, function(){return V.passage}
			],
			widgets: [
				`<<set _xy to $enemyno-1>>`,
				`<<set $NPCList[_xy].type to "lizard">>`
			]
		},
		{
			text_only: "\n\nSwarm Encounters:"
		},
		{
			link: [
				`Ruin Fish`, `Swarm Test`
			],
			widgets: [
				`<<set $molestationstart to 1>>`,
				`<<swarminit "fish" "container" "shaking" "shatter" "steady" 4 6>>`,
				`<<set $water to 1>>`
			]
		},
		{
			link: [
				`Lake Fish`, `Swarm Test`
			],
			widgets: [
				`<<set $molestationstart to 1>>`,
				`<<swarminit "fish" "swarm" "moving towards you" "encircle you" "fend off" 1 7>>`,
				`<<set $water to 1>>`
			]
		},
		{
			link: [
				`Forest Snakes`, `Swarm Test`
			],
			widgets: [
				`<<set $molestationstart to 1>>`,
				`<<swarminit "snakes" "swarm" "slithering" "slither" "keep back" 10 0>>`
			]
		},
		{
			link: [
				`Danube Spiders`, `Swarm Test`
			],
			widgets: [
				`<<set $molestationstart to 1>>`,
				`<<swarminit "spiders" "sac" "slipping" "break" "steady" 1 9>>`
			]
		},
		{
			link: [
				`Bath Slimes`, `Swarm Test`
			],
			widgets: [
				`<<set $molestationstart to 1>>`,
			   `<<swarminit "slimes" "slime mass" "moving towards you" "encircle you" "fend off" 8 0>>`
			]
		},
		{
			link: [
				`Trash Maggots`, `Swarm Test`
			],
			widgets: [
				`<<set $molestationstart to 1>>`,
				`<<swarminit "maggots" "swarm" "crawling" "crawl" "keep back" 2 8>>`
			]
		},
		{
			link: [
				`Science Worms`, `Swarm Test`
			],
			widgets: [
				`<<set $molestationstart to 1>>`,
				`<<swarminit "worms" "jar" "held above the terrarium" "fall into the terrarium" "block" 0 10>>`
			]
		},
		{
			link: [
				`Sea Eels`, `Swarm Test`
			],
			widgets: [
				`<<set $molestationstart to 1>>`,
				`<<swarminit "eels" "swarm" "moving towards you" "encircle you" "fend off" 1 9>>`,
				`<<set $water to 1>>`
			]
		},
		{
			link: [
				`Crate Worms`, `Swarm Test`
			],
			widgets: [
				`<<set $molestationstart to 1>>`,
				`<<swarminit "worms" "container" "shaking" "shatter" "steady" 1 9>>`
			]
		},
		{
			text_only: `\nEvent Debugging:`
		},
		{
			link: [
				`Test NPC Insertion`, `NPCInsertionAssert`
			],
			widgets: [
				``
			]
		},
		{
			link: [
				`Time Test`, `TimeTest`
			],
			widgets: [
				`<<set $prevPassage to $passage>>`,
				`<<set $timeDistortion to 5>>`
			]
		},
	],
	Character:[
		{
			link: [
				`Default allure`, function(){return V.passage}
			],
			widgets: [
				`<<set $alluretest to 0>>`
			],
			condition: function(){return V.alluretest >= 1}
		},
		{
			link: [
				`Become Alluring`, function(){return V.passage}
			],
			widgets: [
				`<<set $alluretest to 1>>`
			],
			condition: function(){return V.alluretest < 1}
		},
		{
			link: [
				`Become Unalluring`, function(){return V.passage}
			],
			widgets: [
				`<<set $alluretest to 2>>`
			],
			condition: function(){return V.alluretest < 1}
		},
		{
			link: [
				`Hide`, function(){return V.passage}
			],
			widgets: [
				`<<dontHideRevert>>`
			],
			condition: function(){return V.dontHide}
		},
		{
			link: [
				`Don't hide`, function(){return V.passage}
			],
			widgets: [
				`<<dontHideForNow>>`
			],
			condition: function(){return V.dontHide != true}
		},
		{
			text_only: "\n\n"
		},
		{
			link: [
				`All Fame`, function(){return V.passage}
			],
			widgets: [
				`<<set $fame += 4000>>`,
				`<<famescrap 1000>>`,
				`<<famebusiness 1000>>`,
				`<<famegood 1000>>`,
				`<<famepimp 1000>>`,
				`<<set $fameexhibitionism += 1000>>`,
				`<<set $famesex += 1000>>`,
				`<<set $famerape += 1000>>`,
				`<<set $famebestiality += 1000>>`,
				`<<set $fameprostitution += 1000>>`
			]
		},
		{
			link: [
				`Fame Sex`, function(){return V.passage}
			],
			widgets: [
				`<<set $fame += 4000>>`,
				`<<set $famesex += 4000>>`
			]
		},
		{
			link: [
				`Timer`, function(){return V.passage}
			],
			widgets: [
				`<<set $timer -= 60>>`
			]
		},
		{
			link: [
				`Size Up`, function(){return V.passage}
			],
			widgets: [
				`<<set $devlevel += 1>>`
			]
		},
		{
			link: [
				`Full Lewd Characteristics`, function(){return V.passage}
			],
			widgets: [
				`<<set $promiscuity += 100>>`,
				`<<set $exhibitionism += 100>>`,
				`<<set $deviancy += 100>>`
			]
		},
		{
			link: [
				`Exhibitionism`, function(){return V.passage}
			],
			widgets: [
				`<<set $exhibitionism += 20>>`
			]
		},
		{
			link: [
				`Promiscuity`, function(){return V.passage}
			],
			widgets: [
				`<<set $promiscuity += 20>>`
			]
		},
		{
			link: [
				`Deviancy`, function(){return V.passage}
			],
			widgets: [
				`<<set $deviancy += 20>>`
			]
		},
		{
			link: [
				`Beauty`, function(){return V.passage}
			],
			widgets: [
				`<<set $beauty += 10000>>`
			]
		},
		{
			link: [
				`Physique`, function(){return V.passage}
			],
			widgets: [
				`<<set $physique += 2000>>`
			]
		},
		{
			link: [
				`Awareness up`, function(){return V.passage}
			],
			widgets: [
				`<<set $awareness += 200>>`
			]
		},
		{
			link: [
				`Awareness down`, function(){return V.passage}
			],
			widgets: [
				`<<set $awareness -= 200>>`
			]
		},
		{
			link: [
				`Purity Up`, function(){return V.passage}
			],
			widgets: [
				`<<set $purity += 500>>`
			]
		},
		{
			link: [
				`Purity Down`, function(){return V.passage}
			],
			widgets: [
				`<<set $purity -= 500>>`
			]
		},
		{
			text_only: "\n\n"
		},
		{
			link: [
				`Pain Up`, function(){return V.passage}
			],
			widgets: [
				`<<set $pain += 50>>`
			]
		},
		{
			link: [
				`Pain Down`, function(){return V.passage}
			],
			widgets: [
				`<<set $pain -= 200>>`
			]
		},
		{
			link: [
				`Stress`, function(){return V.passage}
			],
			widgets: [
				`<<set $stress += 5000>>`
			]
		},
		{
			link: [
				`Destress`, function(){return V.passage}
			],
			widgets: [
				`<<set $stress -= 5000>>`
			]
		},
		{
			link: [
				`Traumatise me`, function(){return V.passage}
			],
			widgets: [
				`<<set $trauma += 2000>>`
			]
		},
		{
			link: [
				`DeTraumatise me`, function(){return V.passage}
			],
			widgets: [
				`<<set $trauma -= 2000>>`
			]
		},
		{
			link: [
				`Arousal max`, function(){return V.passage}
			],
			widgets: [
				`<<arousal $arousalmax>>`
			]
		},
		{
			link: [
				`Arousal zero`, function(){return V.passage}
			],
			widgets: [
				`<<arousal 0>>`
			]
		},
		{
			link: [
				`Booze`, function(){return V.passage}
			],
			widgets: [
				`<<alcohol 60>>`
			]
		},
		{
			link: [
				`Drugged`, function(){return V.passage}
			],
			widgets: [
				`<<set $drugged += 600>>`
			]
		},
		{
			link: [
				`Hallucinogen`, function(){return V.passage}
			],
			widgets: [
				`<<set $hallucinogen += 600>>`
			]
		},
		{
			text_only: "\n\n"
		},
		{
			link: [
				`Sunlight`, function(){return V.passage}
			],
			widgets: [
				`<<set $weather to "clear">>`
			]
		},
		{
			link: [
				`Wash`, function(){return V.passage}
			],
			widgets: [
				`<<wash>>`
			]
		},
		{
			text_only: "\n\n"
		},
		{
			link: [
				`Seduction`, function(){return V.passage}
			],
			widgets: [
				`<<set $seductionskill += 200>>`
			]
		},
		{
			link: [
				`Skulduggery`, function(){return V.passage}
			],
			widgets: [
				`<<set $skulduggery += 200>>`
			]
		},
		{
			link: [
				`Swimming Skill`, function(){return V.passage}
			],
			widgets: [
				`<<set $swimmingskill += 100>>`
			]
		},
		{
			text_only: "\n\n"
		},
		{
			link: [
				`Crime Up`, function(){return V.passage}
			],
			widgets: [
				`<<set $crime += 500>>`
			]
		},
		{
			link: [
				`Crime Down`, function(){return V.passage}
			],
			widgets: [
				`<<set $crime -= 500>>`
			]
		},
		{
			text_only: "\n\n"
		},
		{
			link: [
				`Reset NPC[0]'s Hand`, function(){return V.passage}
			],
			widgets: [
				`<<set $NPCList[0].lefthand to 0>>`,
				`<<set $NPCList[0].righthand to 0>>`
			]
		},
		{
			text_only: "\n\n"
		},
		{
			link: [
				`Chastity Belt`, function(){return V.passage}
			],
			widgets: [
				`<<genitalswear 1>>`
			]
		},
		{
			link: [
				`Chastity Cage`, function(){return V.passage}
			],
			widgets: [
				`<<genitalswear 2>>`
			]
		},
		{
			link: [
				`Collar`, function(){return V.passage}
			],
			widgets: [
				`<<leash 21>>`
			]
		},
		{
			link: [
				`Bind`, function(){return V.passage}
			],
			widgets: [
				`<<set $leftarm to "bound">>`,
				`<<set $rightarm to "bound">>`
			]
		},
		{
			link: [
				`UnBind`, function(){return V.passage}
			],
			widgets: [
				`<<unbind>>`
			]
		},
		{
			text_only: "\n\n"
		},
		{
			link: [
				`Breasts up`, function(){return V.passage}
			],
			widgets: [
				`<<set $breastsize += 1>>`
			]
		},
		{
			link: [
				`Breasts down`, function(){return V.passage}
			],
			widgets: [
				`<<set $breastsize -= 1>>`
			]
		},
		{
			link: [
				`Butt up`, function(){return V.passage}
			],
			widgets: [
				`<<set $bottomsize -= 1>>`
			]
		},
		{
			link: [
				`Penis up`, function(){return V.passage}
			],
			widgets: [
				`<<set $penissize += 1>>`
			]
		},
		{
			link: [
				`Penis down`, function(){return V.passage}
			],
			widgets: [
				`<<set $penissize -= 1>>`
			]
		},
		{
			link: [
				`Balls up`, function(){return V.passage}
			],
			widgets: [
				`<<set $ballssize += 1>>`
			]
		},
		{
			link: [
				`Balls down`, function(){return V.passage}
			],
			widgets: [
				`<<set $ballssize -= 1>>`
			]
		},
		{
			text_only: "\n\n"
		},
		{
			link: [
				`Money`, function(){return V.passage}
			],
			widgets: [
				`<<set $money += 500000>>`
			]
		},
		{
			link: [
				`Grow hair`, function(){return V.passage}
			],
			widgets: [
				`<<set $hairlength += 100>>`
			]
		},
		{
			link: [
				`Grow fringe`, function(){return V.passage}
			],
			widgets: [
				`<<set $fringelength += 100>>`
			]
		},
		{
			link: [
				`Chest Parasite`, function(){return V.passage}
			],
			widgets: [
				`<<parasite nipples urchin>>`
			]
		},
		{
			link: [
				`Penis Parasite`, function(){return V.passage}
			],
			widgets: [
				`<<parasite penis urchin>>`
			]
		},
		{
			link: [
				`Chastity Parasite`, function(){return V.passage}
			],
			widgets: [
				`<<set $analchastityparasite to "worms">>`
			]
		},
		{
			link: [
				`Month`, function(){return V.passage}
			],
			widgets: [
				`<<set $monthday += 31>>`,
				`<<day>>`
			]
		},
		{
			text_only: "\n\n"
		},
		{
			link: [
				`Delinquency`, function(){return V.passage}
			],
			widgets: [
				`<<set $delinquency += 1000>>`
			]
		},
		{
			link: [
				`Detention`, function(){return V.passage}
			],
			widgets: [
				`<<set $detention += 10>>`
			]
		},
		{
			link: [
				`School Skills`, function(){return V.passage}
			],
			widgets: [
				`<<set $school += 8000>>`,
				`<<set $science += 800>>`,
				`<<set $maths += 800>>`,
				`<<set $english += 800>>`,
				`<<set $history += 800>>`,
				`<<set $sciencetrait to 4>>`,
				`<<set $mathstrait to 4>>`,
				`<<set $englishtrait to 4>>`,
				`<<set $historytrait to 4>>`
			]
		},
		{
			link: [
				`School Exam Skill`, function(){return V.passage}
			],
			widgets: [
				`<<set $science_exam += 1000>>`,
				`<<set $maths_exam += 1000>>`,
				`<<set $english_exam += 1000>>`,
				`<<set $history_exam += 1000>>`
			]
		},
		{
			link: [
				`All Skills`, function(){return V.passage}
			],
			widgets: [
				`<<set $school += 448>>`,
				`<<set $science += 112>>`,
				`<<set $maths += 112>>`,
				`<<set $english += 112>>`,
				`<<set $history += 112>>`,
				`<<set $skulduggery += 112>>`,
				`<<set $danceskill += 112>>`,
				`<<set $swimmingskill += 112>>`,
				`<<set $bottomskill += 112>>`,
				`<<set $seductionskill += 112>>`,
				`<<set $handskill += 112>>`,
				`<<set $feetskill += 112>>`,
				`<<set $chestskill += 112>>`,
				`<<set $thighskill += 112>>`,
				`<<set $oralskill += 112>>`,
				`<<set $analskill += 112>>`,
				`<<set $vaginalskill += 112>>`,
				`<<set $penileskill += 112>>`
			]
		},
		{
			link: [
				`All Skills Super`, function(){return V.passage}
			],
			widgets: [
				`<<set $school += 4000>>`,
				`<<set $science += 1000>>`,
				`<<set $maths += 1000>>`,
				`<<set $english += 1000>>`,
				`<<set $history += 1000>>`,
				`<<set $sciencetrait to 4>>`,
				`<<set $mathstrait to 4>>`,
				`<<set $englishtrait to 4>>`,
				`<<set $historytrait to 4>>`,
				`<<set $skulduggery += 1000>>`,
				`<<set $danceskill += 1000>>`,
				`<<set $swimmingskill += 1000>>`,
				`<<set $bottomskill += 1000>>`,
				`<<set $seductionskill += 1000>>`,
				`<<set $handskill += 1000>>`,
				`<<set $feetskill += 1000>>`,
				`<<set $chestskill += 1000>>`,
				`<<set $thighskill += 1000>>`,
				`<<set $oralskill += 1000>>`,
				`<<set $analskill += 1000>>`,
				`<<set $vaginalskill += 1000>>`,
				`<<set $penileskill += 1000>>`
			]
		},
		{
			link: [
				`Status`, function(){return V.passage}
			],
			widgets: [
				`<<set $cool += 400>>`
			]
		},
		{
			link: [
				`Status Down`, function(){return V.passage}
			],
			widgets: [
				`<<set $cool -= 400>>`
			]
		},
		{
			text_only: "\n\n"
		},
		{
			link: [
				`Destroy Swimming Outfits`, function(){return V.passage}
			],
			widgets: [
				`<<set $upperschoolswimsuitno to 0>>`,
				`<<set $lowerschoolswimsuitno to 0>>`,
				`<<set $schoolswimshortsno to 0>>`
			]
		},
		{
			link: [
				`Towels`, function(){return V.passage}
			],
			widgets: [
				`<<clothesontowel>>`
			]
		},
		{
			link: [
				`Towels Please`, function(){return V.passage}
			],
			widgets: [
				`<<towelup>>`
			]
		},
		{
			link: [
				`Submission`, function(){return V.passage}
			],
			widgets: [
				`<<set $submissive += 250>>`
			]
		},
		{
			link: [
				`Defiance`, function(){return V.passage}
			],
			widgets: [
				`<<set $submissive -= 250>>`
			]
		},
		{
			text_only: "\n\n"
		},
		{
			link: [
				`Robin Love`, function(){return V.passage}
			],
			widgets: [
				`<<npcincr Robin love 100>>`,
				`<<npcincr Robin lust 100>>`
			]
		},
		{
			link: [
				`Robin Note`, function(){return V.passage}
			],
			widgets: [
				`<<set $robinnote to 1>>`
			]
		},
		{
			link: [
				`Robin Romance`, function(){return V.passage}
			],
			widgets: [
				`<<set $robinromance to 1>>`
			]
		},
		{
			text_only: "\n\n"
		},
		{
			link: [
				`Sex Statistics Up`, function(){return V.passage}
			],
			widgets: [
				`<<set $orgasmstat += 2000>>`,
				`<<set $ejacstat += 2000>>`,
				`<<set $moleststat += 2000>>`,
				`<<set $rapestat += 1000>>`,
				`<<set $beastrapestat += 500>>`,
				`<<set $tentaclerapestat += 200>>`,
				`<<set $swallowedstat += 100>>`,
				`<<set $prostitutionstat += 10>>`
			]
		},
		{
			text_only: "\n\n"
		},
		{
			link: [
				`Almost Destroy Lowerclothes`, function(){return V.passage}
			],
			widgets: [
				`<<set $worn.lower.integrity to 1>>`
			]
		},
		{
			link: [
				`Almost Destroy Upperclothes`, function(){return V.passage}
			],
			widgets: [
				`<<set $worn.upper.integrity to 1>>`
			]
		},
		{
			link: [
				`Almost Destroy Underclothes`, function(){return V.passage}
			],
			widgets: [
				`<<set $worn.under_lower.integrity to 1>>`
			]
		},
		{
			link: [
				`Almost Destroy Underupperclothes`, function(){return V.passage}
			],
			widgets: [
				`<<set $worn.under_upper.integrity to 1>>`
			]
		},
		{
			link: [
				`Damage Lowerclothes`, function(){return V.passage}
			],
			widgets: [
				`<<set $worn.lower.integrity -= 200>>`
			]
		},
		{
			link: [
				`Damage Upperclothes`, function(){return V.passage}
			],
			widgets: [
				`<<set $worn.upper.integrity -= 200>>`
			]
		},
		{
			link: [
				`Damage Underupperclothes`, function(){return V.passage}
			],
			widgets: [
				`<<set $worn.under_upper.integrity -= 200>>`
			]
		},
		{
			link: [
				`Damage Underclothes`, function(){return V.passage}
			],
			widgets: [
				`<<set $worn.under_lower.integrity -= 200>>`
			]
		},
		{
			link: [
				`Damage Chastity`, function(){return V.passage}
			],
			widgets: [
				`<<set $worn.genitals.integrity -= 5000>>`
			]
		},
		{
			text_only: "\n\n"
		},
		{
			link: [
				`Wolf off`, function(){return V.passage}
			],
			widgets: [
				`<<set $wolfgirl to 0>>`
			]
		},
		{
			link: [
				`Wolf up`, function(){return V.passage}
			],
			widgets: [
				`<<set $wolfgirl += 1>>`
			]
		},
		{
			link: [
				`Wolf build up`, function(){return V.passage}
			],
			widgets: [
				`<<set $wolfbuild += 40>>`
			]
		},
		{
			link: [
				`Wolf build down`, function(){return V.passage}
			],
			widgets: [
				`<<set $wolfbuild -= 40>>`
			]
		},
		{
			link: [
				`Angel build up`, function(){return V.passage}
			],
			widgets: [
				`<<set $angelbuild += 40>>`
			]
		},
		{
			link: [
				`Angel build down`, function(){return V.passage}
			],
			widgets: [
				`<<set $angelbuild -= 40>>`
			]
		},
		{
			link: [
				`Demon build up`, function(){return V.passage}
			],
			widgets: [
				`<<set $demonbuild += 40>>`
			]
		},
		{
			link: [
				`Demon build down`, function(){return V.passage}
			],
			widgets: [
				`<<set $demonbuild -= 40>>`
			]
		},
		{
			link: [
				`Undertemp off`, function(){return V.passage}
			],
			widgets: [
				`<<set $undertemp to 0>>`
			]
		},
		{
			link: [
				`Goo Me`, function(){return V.passage}
			],
			widgets: [
				`<<drench both 5>>`
			]
		},
		{
			link: [
				`Goo Me Small`, function(){return V.passage}
			],
			widgets: [
				`<<drench both 1>>`
			]
		},
		{
			link: [
				`Drench me`, function(){return V.passage}
			],
			widgets: [
				`<<set $upperwet to 200>>`,
				`<<set $lowerwet to 200>>`,
				`<<set $underupperwet to 200>>`,
				`<<set $underlowerwet to 200>>`
			]
		},
		{
			link: [
				`Drench over-outfit only`, function(){return V.passage}
			],
			widgets: [
				`<<set $overupperwet to 200>>`,
				`<<set $overlowerwet to 200>>`
			]
		},
		{
			link: [
				`Drench middle-outfit only`, function(){return V.passage}
			],
			widgets: [
				`<<set $upperwet to 200>>`,
				`<<set $lowerwet to 200>>`
			]
		},
		{
			link: [
				`Drench under-outfit only`, function(){return V.passage}
			],
			widgets: [
				`<<set $underupperwet to 200>>`,
				`<<set $underlowerwet to 200>>`
			]
		},
		{
			link: [
				`Soak me in water`, function(){return V.passage}
			],
			widgets: [
				`<<water>>`
			]
		},
		{
			link: [
				`Bully Timer`, function(){return V.passage}
			],
			widgets: [
				`<<set $bullytimer to 100>>`,
				`<<set $bullytimeroutside to 100>>`
			]
		},
		{
			link: [
				`Whitney Lower Dominance`, function(){return V.passage}
			],
			widgets: [
				`<<npcincr Whitney dom -20>>`
			]
		},
		{
			link: [
				`Whitney Raise Dominance`, function(){return V.passage}
			],
			widgets: [
				`<<npcincr Whitney dom 20>>`
			]
		},
		{
			link: [
				`Whitney Love`, function(){return V.passage}
			],
			widgets: [
				`<<npcincr Whitney love 20>>`,
				`<<npcincr Whitney lust 20>>`
			]
		},
		{
			link: [
				`Whitney Romance`, function(){return V.passage}
			],
			widgets: [
				`<<set $whitneyromance to 1>>`
			]
		},
		{
			link: [
				`Pub Whore`, function(){return V.passage}
			],
			widgets: [
				`<<set $pubwhore += 10>>`
			]
		},
		{
			link: [
				`Make Creature`, function(){return V.passage}
			],
			widgets: [
				`<<beasttype bear>>`
			]
		},
		{
			link: [
				`Full Spray`, function(){return V.passage}
			],
			widgets: [
				`<<set $spraymax to 5>>`,
				`<<spray 5>>`
			]
		},
		{
			text_only: "\n\n"
		},
		{
			link: [
				`Unlock all seeds`, function(){return V.passage}
			],
			widgets: [
				`<<run unlockAllSeeds()>>`
			]
		},
		{
			link: [
				`Unlock all pills`, function(){return V.passage}
			],
			widgets: [
				`<<run window.getAllPills()>>`
			]
		}
	],
	Favourites: []
};

window.returnEventList = function(){
	return setup.debugMenu.event_list
}

window.getNameAndPassage = function(section, index){
	if (typeof setup.debugMenu.event_list[section][index].link[0] == "function")
		T.link_name = setup.debugMenu.event_list[section][index].link[0]();
	else
		T.link_name = setup.debugMenu.event_list[section][index].link[0];
	if (typeof setup.debugMenu.event_list[section][index].link[1] == "function")
		T.link_passage = setup.debugMenu.event_list[section][index].link[1]();
	else
		T.link_passage = setup.debugMenu.event_list[section][index].link[1];
}

window.runWidgetsInsideLink = function(section, index){
	let widget = 0;
	for (widget in setup.debugMenu.event_list[section][index].widgets)
		new Wikifier(null, (typeof setup.debugMenu.event_list[section][index].widgets[widget] == "function") ? setup.debugMenu.event_list[section][index].widgets[widget]() : setup.debugMenu.event_list[section][index].widgets[widget]);
}

window.changeBorderColor = function(){
	let inputVal = document.getElementById("formChangeColor")
	$(inputVal).toggleClass("searchBorderColour")
}

var categories = ["debugEventsMain", "debugEventsCharacter", "debugEventsEvents"]
var categories2 = ["debugMain", "debugCharacter", "debugEvents", "debugFavourites", "debugAdd"]

window.researchEvents = function(default_value){
	$(function(){
		var needle = (default_value != undefined) ? default_value : document.getElementById('searchEvents').value;
		let list_events = [document.getElementById("debugEventsMain").getElementsByTagName("div"), document.getElementById("debugEventsMain").getElementsByTagName("br"), document.getElementById("debugEventsCharacter").getElementsByTagName("div"), document.getElementById("debugEventsCharacter").getElementsByTagName("br"), document.getElementById("debugEventsEvents").getElementsByTagName("div"), document.getElementById("debugEventsEvents").getElementsByTagName("br")];

		if (default_value != undefined)
			document.getElementById('searchEvents').value = default_value
		needle = needle.toLowerCase()
		for (let i1 = 0; i1 < list_events.length; i1++){
			for (let i2 = 0; i2 < list_events[i1].length; i2++){
				let haystack = list_events[i1][i2].getAttribute("name")
				
				if (haystack != null){
					haystack = haystack.toLowerCase()
					if (haystack.contains(needle) == false)
						list_events[i1][i2].style.display = 'none'
					else
						list_events[i1][i2].style.display = ''
				}
			}
		}
		if (needle != undefined && needle.length > 0){
			document.getElementById("debugMain").classList.remove("hidden")
			document.getElementById("debugCharacter").classList.remove("hidden")
			document.getElementById("debugEvents").classList.remove("hidden")
			document.getElementById("debugFavourites").classList.add("hidden")
			document.getElementById("debugAdd").classList.add("hidden")
		}
		else if (V.debugMenu[2] != undefined && V.debugMenu[2].length > 0 && needle.length == 0) {
			for (let divToHide of categories2){
				if (divToHide != V.debugMenu[1])
					document.getElementById(divToHide).classList.add("hidden")
				else
					document.getElementById(divToHide).classList.remove("hidden")
			}
		}
		if ((V.debugMenu[1] == "debugAdd" || V.debugMenu[1] == "debugFavourites") && (needle == "" || needle == undefined)){
			document.getElementById(V.debugMenu[1]).classList.remove("hidden")
		}
		V.debugMenu[2] = needle
		window.toggleClassDebug(V.debugMenu[1]+"Button", "bg-color")
		window.cacheDebugDiv()
	});
}

window.addFavouriteIcon = function(section, index, id){
	$(function(){
		if (V.debug_favourite == undefined){
			V.debug_favourite = []
		}
		window.syncFavourites()
		var input = document.createElement("input");
		var parent = document.getElementById(id);
		
		input.type = "image"
		input.className = "heart"
		input.src = "img/ui/heart_favourite.svg"
		for (let i = 0; i < V.debug_favourite.length; i++){
			if (V.debug_favourite[i].link[0] == setup.debugMenu.event_list[section][index].link[0])
				input.classList.toggle('liked'); // on load up if already favourite set heart red
		}
		input.setAttribute("onclick","window.onClickFavourite('"+section+"',"+index+",'"+id+"');");
		if (parent != null)
			parent.appendChild(input);
	});
}

window.onClickFavourite = function(section, index, id) {
	$(function(){
	window.syncFavourites()
	let element_clicked = document.getElementById(id).children[1];
	if (element_clicked.classList.contains("liked")){
		for (let i = 0; i < V.debug_favourite.length; i++){
			if (V.debug_favourite[i].link[0] == setup.debugMenu.event_list[section][index].link[0])
				V.debug_favourite.splice(i, 1); // remove from favourites
		}
		setup.debugMenu.event_list.Favourites = V.debug_favourite // sync constant to ephemere variable
		element_clicked.classList.toggle('liked'); // removes favourites css
	}
	else{
		let fav_object = {
			link: setup.debugMenu.event_list[section][index].link,
			widgets: setup.debugMenu.event_list[section][index].widgets,
			condition: (setup.debugMenu.event_list[section][index].condition != undefined) ? setup.debugMenu.event_list[section][index].condition : 1
		}
		V.debug_favourite.push(fav_object) // constant variable
		setup.debugMenu.event_list.Favourites = V.debug_favourite
		element_clicked.classList.toggle('liked'); // add favourites
	}
	if (section == "Favourites"){
		let to_search = document.getElementById("Favourites-"+index).children[0].text;
		let break_signal = 0;
		for (let cat of ["debugEventsEvents", "debugEventsMain", "debugEventsCharacter"]){
			let div_search = document.getElementById(cat).children
			for (let div of div_search){
				if (div.getAttribute("name") == to_search){
					div.children[1].classList.remove("liked")
					break_signal = 1
					break
				}
			}
			if (break_signal)
				break
		}
	}
	new Wikifier(null, `<<debugFavourites "replace">>`)
	});
	window.cacheDebugDiv();
}

window.syncFavourites = function(){
	setup.debugMenu.event_list.Favourites = V.debug_favourite
}

window.cacheDebugDiv = function(){
	$(function(){
	if (document.getElementById("debugOverlay") != null){
		let div = document.getElementById("debugOverlay").outerHTML
		setup.debugMenu.cache_debug_div.debugOverlay = div;
	}
	});
}

window.loadCachedDebugDiv = function (){
	$(function(){
	if (typeof setup.debugMenu.cache_debug_div.debugOverlay != undefined)
		document.getElementById("debugWindow").innerHTML += setup.debugMenu.cache_debug_div.debugOverlay
	window.patchDebugMenu()
	});
}

window.debugCreateLinkAndRedirect = function (section, index, id){
	$(function(){
	let target = document.getElementById(id).children[0]
	if (typeof $._data($(target).get(0), "events") == "undefined" || $._data($(target).get(0), "events").length == 0){
		let passage_title = (typeof setup.debugMenu.event_list[section][index].link[0] == "function") ? setup.debugMenu.event_list[section][index].link[0]() : setup.debugMenu.event_list[section][index].link[0]
		let passage_name = (typeof setup.debugMenu.event_list[section][index].link[1] == "function") ? setup.debugMenu.event_list[section][index].link[1]() : setup.debugMenu.event_list[section][index].link[1]
		let widgets = ''

		for (let widget of setup.debugMenu.event_list[section][index].widgets)
			widgets += (typeof widget == "function") ? widget() : widget
		let new_link = new Wikifier(null, `<<link [[`+passage_title+`|`+passage_name+`]]>>` + widgets + `<</link>>`)
		new_link.output.children[0].click()
	}
	});
}

window.addonClickDivPassage = function (section, index, id){
	$(function(){
		let target = document.getElementById(id).children[0]

		target.setAttribute("onclick", "window.debugCreateLinkAndRedirect("+"'"+section+"'"+","+index+","+"'"+section+"-"+index+"'"+");");
	});
}

window.toggleClassDebug = function(selected, mode) {
	$(function(){
	if (document.getElementById(selected) == null)
		return
	var list = ["debugMain", "debugCharacter", "debugEvents", "debugFavourites", "debugAdd"]
	if (mode == "bg-color"){
		for (let div of list){
			if (div+"Button" == selected)
				document.getElementById(selected).classList.add("bg-color-debug-selected");
			else
				document.getElementById(div+"Button").classList.remove("bg-color-debug-selected");	
		}
	}
	else if (mode == "hideWhileSearching"){
		if (selected == "debugFavourites" || selected == "debugAdd"){
			for (let div of list)
				(div != "debugFavourites" || div != "debugAdd") ? document.getElementById(div).classList.add("hidden") : document.getElementById(div).classList.remove("hidden");
		}
		else{
			for (let div of list)
				(div == "debugFavourites" || div == "debugAdd") ? document.getElementById(div).classList.add("hidden") : document.getElementById(div).classList.remove("hidden");
		}
	}
	else if (mode == "classicHide"){
		for (let div of list)
				(div != selected) ? document.getElementById(div).classList.add("hidden") : document.getElementById(div).classList.remove("hidden");
	}
});
}

window.patchDebugMenu = function (){
	$(function(){
		let catg = ["debugEventsMain", "debugEventsCharacter", "debugEventsEvents", "debugEventsFavourites"]
		let break_if_all_good;

		for (let cat of catg){
			let haystack = document.getElementById(cat);
			if (haystack == null)
				return;
			else
				haystack = haystack.children
			for (let i = 0; i < haystack.length; i++){
				let value = haystack[i].id
				
				break_if_all_good = 0;
				if (haystack[i].children.length < 1)
					break
				if (haystack[i].children.length < 2)
					window.addFavouriteIcon(value.split('-')[0],value.split('-')[1],value)
				else
					break_if_all_good += 1;
				if (haystack[i].children[0].getAttribute("onclick") == null)
					haystack[i].children[0].setAttribute("onclick","window.debugCreateLinkAndRedirect('"+value.split('-')[0]+"',"+value.split('-')[1]+",'"+value+"');");
				else
					break_if_all_good += 1;
				if (break_if_all_good == 2)
					break
			}
		}
		document.getElementById("MainDebugInfo").innerHTML =
		"Allure: "+V.allure+"<br>Rng: "+V.rng+"<br>Danger: "+V.danger+"<br>Passage: "+V.passage+"<br>"
		window.cacheDebugDiv()
	});
}

window.checkEventCondition = function(){
	$(function(){
		for (let section of ["Character", "Events", "Favourites", "Main"]){
			let ev = setup.debugMenu.event_list[section]
			for (let i in ev){
				if (ev[i].hasOwnProperty("condition")){
					if ((typeof ev[i].condition == "function" && ev[i].condition() == 1) || ((typeof ev[i].condition != "function" && ev[i].condition == 1))){
						if (document.getElementById(section+'-'+i) == null)
							return
						document.getElementById(section+'-'+i).classList.remove("condhide")
					}
					else{
						if (document.getElementById(section+'-'+i) == null)
							return
						document.getElementById(section+'-'+i).classList.add("condhide")
					}
				}
			}
		}
	});
}

window.addDebugForm = function(){
	$(function(){
	let op = ''
	if (V.debug_custom_events == undefined)
		V.debug_custom_events = {Main:[], Character:[], Events:[]}
	for (let section of ["Main", "Character", "Events"]){
		for (let ev of V.debug_custom_events[section])
			op += "<option value=" +'"'+ev.link[0]+'" '+">"+ev.link[0]+"</option>";
	}
	if (document.getElementById("debugEventsAdd") != null)
		document.getElementById("debugEventsAdd").innerHTML = `
		<abbr>Event Title:</abbr>
		<div class="addevent-content-search-content" id="formChangeColor2" style="">
			<input name="addEvents" id="addEventsTitle" placeholder="Event Title..." onfocusout="" onfocus="" oninput="" />
		</div>
		<abbr title="For dynamic allocation, you can enter a function that will be saved !\nFor example function(){return V.passage}">Passage Name*:</abbr>
		<div class="addevent-content-search-content" id="formChangeColor3" style="">
			<input name="addEvents" id="addEventsPassage" placeholder="Passage name..." onfocusout="" onfocus="" oninput="" />
		</div>
		<span>Widgets:</span>
		<div class="addevent-content-search-content" style="max-height:unset;" id="formChangeColor4" style="">
			<input name="addEvents" id="addEventsWidgets" placeholder="<<set $allure = 5>><<set $rng to 3>>..." onfocusout="" onfocus="" oninput="">
		</div>
		<span>Category:</span><br>
		<select name="catlist" id="debugCatList">
			<option value="Events">Events</option>
			<option value="Main">Main</option>
			<option value="Character">Character</option>
		</select><br><br>
		<button type="button" onclick="window.submitNewDebugPassage()">Submit</button><br><br>
		<div id="debugAddResult"></div>
		<div id="debugRemovePassage">
			<h3>Remove passages from the Menu</h3>
			<select name="catlist" id="debugEvList">
			`+
			op
			+
			`</select><br><br>
			<button type="button" id="button-remove" onclick="window.removeDebugCustomPassage()">Remove</button><br><br>
			<div id="debugRemoveResult"></div>
		</div>
	`
	});
}

window.submitNewDebugPassage = function() {
	let input_list = [document.getElementById("addEventsTitle"), document.getElementById("addEventsPassage"), document.getElementById("addEventsWidgets"), document.getElementById("debugCatList")]
	let sigerror = 0;

	for (let element of input_list){
		if ((element.id == "addEventsTitle" || element.id == "addEventsPassage" || element.id == "debugCatList") && element.value.length < 1){
			element.setCustomValidity("Fill this value!");
			element.reportValidity();
			document.getElementById("debugAddResult").innerHTML = ''
			sigerror = 1
		}
		if (element.id == "addEventsWidgets" && element.value.length > 0){
			let match = element.value.match('<<.+>>{0,}')

			if (match == null || match[0] != match.input){
				element.setCustomValidity("Unvalid widget format. Valid : <<widget @params>>");
				element.reportValidity();
				document.getElementById("debugAddResult").innerHTML = ''
				sigerror = 1
			}
		}
	}
	for (let section of ["Character", "Events", "Favourites", "Main"]){
		for (let ev of setup.debugMenu.event_list[section]){
			if (ev.hasOwnProperty("link") && ev.link[0] == input_list[0].value){
				input_list[0].setCustomValidity("This event title already exists. It needs to be unique!");
				input_list[0].reportValidity();
				document.getElementById("debugAddResult").innerHTML = ''
				sigerror = 1
			}
		}
	}
	if (sigerror == 0){
		if (V.debug_custom_events == undefined)
			V.debug_custom_events = {Main:[], Character:[], Events:[]}
		let event_title = input_list[0].value
		let passage_name = input_list[1].value.match(/function{1}[ \t]{0,1}\(\)[ \t]{0,2}{.*return.*}[;]{0,1}/g) == null ? input_list[1].value : eval("("+input_list[1].value.match(/function{1}[ \t]{0,1}\(\)[ \t]{0,2}{.*return.*}[;]{0,1}/g)[0]+")")
		let new_obj = {
			link: [
				event_title, passage_name
			],
			widgets: [
				input_list[2].value
			]
		}
		V.debug_custom_events[input_list[3].value].unshift(new_obj)
		setup.debugMenu.event_list[input_list[3].value].unshift(new_obj)
		document.getElementById("debugAddResult").innerHTML = '<span style="color: #5eac5e;">Event Added<br>Click any blue regular link in-game<br>for changes to apply.<br>(No reload, No links in debug menu)</span>'
		setup.debugMenu.cache_debug_div = {}
	}
}

window.syncDebugAddedEvents = function(){
	if (V.debug_custom_events == undefined)
		V.debug_custom_events = {Main:[], Character:[], Events:[]}
	for (let section of ["Main", "Character", "Events"]){
		if (V.debug_custom_events.hasOwnProperty(section) == false)
			V.debug_custom_events[section] = []
		for (let ev of V.debug_custom_events[section])
			setup.debugMenu.event_list[section].unshift(ev)
	}
}

window.removeDebugCustomPassage = function() {
	let selected_for_removal = document.getElementById("debugEvList").value
	let exit_code = 0
	for (let section of ["Main", "Character", "Events"]){
		for (let ev in V.debug_custom_events[section]){
			if (V.debug_custom_events[section][ev].link[0] == selected_for_removal)
				V.debug_custom_events[section].splice(ev, 1)
			for (let ev2 in setup.debugMenu.event_list[section]){
				if (setup.debugMenu.event_list[section][ev2].hasOwnProperty("link") && setup.debugMenu.event_list[section][ev2].link[0] == selected_for_removal){
					setup.debugMenu.event_list[section].splice(ev2, 1)
					document.getElementById("debugRemoveResult").innerHTML = '<span style="color: #5eac5e;">Event Removed<br>Click any blue regular link in-game<br>for changes to apply.<br>(No reload, No links in debug menu)</span>'
					let op = '<br>'
					for (let section of ["Main", "Character", "Events"]){
						for (let ev of V.debug_custom_events[section])
							op += "<option value=" +'"'+ev.link[0]+'" '+">"+ev.link[0]+"</option>";
					}
					document.getElementById("debugEvList").innerHTML = op
					setup.debugMenu.cache_debug_div = {}
					exit_code = 1
					break
				}
			}
			if (exit_code == 1)
				break
		}
		if (exit_code == 1)
			break
	}
}