setup.hair = {
    hairtype: [
        {
            name: "default",
            list: ["default", "loose", "straight", "swept left", "curl", "defined curl", "neat", "curly side up", "heart braid", "ruffled"],
            devolve_into: ["ruffled"]
        },
        {
            name: "single tail",
            list: ["flat ponytail", "ponytail", "side tail left", "side tail right"],
            devolve_into: ["ponytail"]
        },
        {
            name: "double tail",
            list: ["pigtails", "twintails", "curly pigtails", "sailor buns", "loop braid"],
            devolve_into: ["twintails"]
        },
        {
            name: "single braid",
            list: ["braid left", "braid right"],
            devolve_into: ["braid left"]
        },
        {
            name: "double braid",
            list: ["twin braids"],
            devolve_into: ["twin braids"]
        },
        {
            name: "short",
            list: ["messy", "short", "short spiky"],
            devolve_into: ["messy", "short spiky"]
        },
        {
            // immune to being ruined (because devolve list is empty)
            name: "special",
            list: ["dreads", "bubble tails"],
            devolve_into: []
        }
    ],
    fringetype: [
        {
            name: "default",
            list: ["default", "thin flaps", "wide flaps", "hime", "loose", "messy", "overgrown", "ringlets", "split", "straight", "swept left", "back", "parted", "flat", "quiff", "straight curl", "ringlet curl", "curtain", "trident"],
            devolve_into: ["messy", "trident", "thin flaps"]
        }
    ]
}