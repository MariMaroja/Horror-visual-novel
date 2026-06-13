const story = {
    start: {
        text: () => {"You arrive at the old house. Rain falls heavily outside."},
        choices: [
            {
                text: "Enter the house",
                next: "hall"
            }
        ]
    },
    hall: {
        text: () => {"A letter lies on the floor. It seems addressed to you."},
        choices: [
            {
                text: "Read the letter",
                next: "letter"
            },
            {
                text: "Ignore it",
                next: "storageRoom"
            }
        ]
    },
    letter: {
        text: () => {"Read the letter"},
        action: () =>
        {
            player.readLetter = true;
        },
        next: "letter"
    },
    storageRoom: {
        text: "A dusty storage room sits beside the staircase.",
        choices: [
            {
                text: "Search the room",

                action: () =>
                {
                    player.rustyKey = true;
                },

                next: "keyFound"
            },

            {
                text: "Leave",
                next: "stairs"
        
            }
        ]
    },
    keyFound: {
        text: "You find an old rusty key hidden beneath a broken box.",
        choices: [
            {
                text: "Continue",
                next: "stairs"
            }
        ]
    },
    stairs: {
        text: () => {"You stand at the bottom of the staircase."},
        choices: [
            {
                text: "Go upstairs",
                next: "upstairs"
            }

        ]
    },
    upstairs: {
        text: () => {if (player.readLetter) {return "You notice a red door at the end of the corridor.";}

        return "The corridor feels strangely empty.";},
        choices: [
            {
                text: "Continue",
                next: "decision"
            },
            {
                text: "Inspect the mirror",
                next: "mirrorRoom"
            }
        ]
    },
    decision: {
        text: () => {
            if (player.readLetter)
            {
                return "The red door stands before you.";
            }

            return "You find an old wooden door.";
        },
        choices: () => { [
            {
                text: "Open the door",
                next: "badEnding"
            },
            {
                text: "Walk away",
                next: "goodEnding"
            }
        ];
        if (player.rustyKey){
            options.push({
                text: "Use Rusty Key",
                next: "secretEnding"
            });
        }
        return options;}
    },
    mirrorRoom: {
        text: "The mirror shows someone standing behind you.",
        choices: [
            {
                text: "Turn around",
                next: "badEnding"
            },
            {
                text: "Keep looking",
                next: "secretEnding"
            }
        ]
    },
    badEnding: {
        text: "As the door opens, something smiles from the darkness. BAD ENDING.",
        choices: [{
            text: "Credits",
            next: "credits"
        }]
    },
    goodEnding: {
        text: "You leave the corridor behind. Whatever was there remains trapped. GOOD ENDING.",
        choices: [{
            text: "Credits",
            next: "credits"
        }]
    },
    secretEnding: {
        text: "The rusty key fits a hidden lock behind the red door. Inside, you find dozens of letters written to future victims. SECRET ENDING.",
        choices: [{
            text: "Credits",
            next: "credits"
        }]
    },
    credits: {
        text: "Echoes in the Dark\n\nDeveloped by Mariana Maroja\n\nThank you for playing.",
        choices: []
    }
}