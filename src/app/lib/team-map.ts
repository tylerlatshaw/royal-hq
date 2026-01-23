import { TeamConferenceDivision } from "./types";

export const teamColorMap: Record<string, string> = {
    "adirondack-thunder": "#C8242F",
    "allen-americans": "#979899",
    "atlanta-gladiators": "#FDB619",
    "bloomington-bison": "#51C0E8",
    "cincinnati-cyclones": "#DE0E2C",
    "florida-everblades": "#00703C",
    "fort-wayne-komets": "#F47820",
    "greensboro-gargoyles": "#8f00e8",
    "greenville-swamp-rabbits": "#CF5E28",
    "idaho-steelheads": "#C1CCCC",
    "indy-fuel": "#CE102C",
    "iowa-heartlanders": "#A7A8A9",
    "jacksonville-icemen": "#A3A3BB",
    "kalamazoo-wings": "#E03A3E",
    "kansas-city-mavericks": "#F15F24",
    "maine-mariners": "#E3E3E3",
    "norfolk-admirals": "#FCC039",
    "orlando-solar-bears": "#FFD200",
    "rapid-city-rush": "#CD2036",
    "reading-royals": "#8349ff",
    "savannah-ghost-pirates": "#35D32F",
    "south-carolina-stingrays": "#C4112E",
    "tahoe-knight-monsters": "#007485",
    "toledo-walleye": "#FEC324",
    "trois-rivieres-lions": "#CFC8C8",
    "tulsa-oilers": "#7B212D",
    "utah-grizzlies": "#B1790C",
    "wheeling-nailers": "#FBB41B",
    "wichita-thunder": "#CEE5F6",
    "worcester-railers": "#A0A2A8",
};

export function resolveTeamColor(
    name: string,
    color?: string | null
) {
    return (
        teamColorMap[name] ??
        color ??
        ["#ffffff"]
    );
}

export const TEAM_META_BY_SLUG: Record<string, TeamConferenceDivision> = {
    "adirondack-thunder": { conference: "Eastern", division: "North" },
    "allen-americans": { conference: "Western", division: "Mountain" },
    "atlanta-gladiators": { conference: "Eastern", division: "South" },
    "bloomington-bison": { conference: "Western", division: "Central" },
    "cincinnati-cyclones": { conference: "Western", division: "Central" },
    "florida-everblades": { conference: "Eastern", division: "South" },
    "fort-wayne-komets": { conference: "Western", division: "Central" },
    "greensboro-gargoyles": { conference: "Eastern", division: "North" },
    "greenville-swamp-rabbits": { conference: "Eastern", division: "South" },
    "idaho-steelheads": { conference: "Western", division: "Mountain" },
    "indy-fuel": { conference: "Western", division: "Central" },
    "iowa-heartlanders": { conference: "Western", division: "Central" },
    "jacksonville-icemen": { conference: "Eastern", division: "South" },
    "kalamazoo-wings": { conference: "Western", division: "Central" },
    "kansas-city-mavericks": { conference: "Western", division: "Mountain" },
    "maine-mariners": { conference: "Eastern", division: "North" },
    "norfolk-admirals": { conference: "Eastern", division: "North" },
    "orlando-solar-bears": { conference: "Eastern", division: "South" },
    "rapid-city-rush": { conference: "Western", division: "Mountain" },
    "reading-royals": { conference: "Eastern", division: "North" },
    "savannah-ghost-pirates": { conference: "Eastern", division: "South" },
    "south-carolina-stingrays": { conference: "Eastern", division: "South" },
    "tahoe-knight-monsters": { conference: "Western", division: "Mountain" },
    "toledo-walleye": { conference: "Western", division: "Central" },
    "trois-rivieres-lions": { conference: "Eastern", division: "North" },
    "tulsa-oilers": { conference: "Western", division: "Mountain" },
    "utah-grizzlies": { conference: "Western", division: "Mountain" },
    "wheeling-nailers": { conference: "Eastern", division: "North" },
    "wichita-thunder": { conference: "Western", division: "Mountain" },
    "worcester-railers": { conference: "Eastern", division: "North" }
};
