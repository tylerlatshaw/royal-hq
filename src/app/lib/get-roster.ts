import "server-only";
import { Player } from "./types";
import { countryToAlpha2 } from "country-to-iso";

const ENDPOINT = "https://gql.eliteprospects.com/";
const NATIONALITY_VARIANTS: { nationality: string, variants: string[] }[] = [{
  nationality: "IE", // Ireland
  variants: ["IRE"]
}, {
  nationality: "CH", // Switzerland
  variants: ["SUI", "SWI"]
}, {
  nationality: "LV", // Latvia
  variants: ["LAT"]
}, {
  nationality: "DE", // Germany
  variants: ["GER"]
}];

type Roster = {
  data: {
    tableData: {
      edges: {
        player: PlayerRes,
        jerseyNumber: number | null
      }[]
    },
    footerData: {
      edges: {
        playersByPositions: {
          position: Position,
          players: number
        }[],
        averageHeight: {
          imperial: string
        },
        averageWeight: {
          imperial: string
        },
        averageAge: string
      }[]
    }
  }
}

type PlayerRes = {
  id: string,
  firstName: string | null,
  lastName: string | null,
  name: string,
  status: "active" | "retired" | "deceased",
  position: Position | null,
  shoots: "L" | "R" | null,
  catches: "L" | "R" | null,
  dateOfBirth: string | null,
  age: number | null,
  placeOfBirth: string | null,
  nationality: {
    name: string,
    iso_3166_1_alpha_2: string
  } | null,
  weight: {
    imperial: number
  } | null,
  height: {
    imperial: string
  } | null,
  gameStatus: "healthy" | "injured" | "suspended",
  nhlRights: {
    team: {
      logo: {
        small: string,
        medium: string,
      } | null,
      name: string,
    },
    rights: "signed" | "unsigned"
  } | null,
  imageUrl: string | null,
  imageCopyright: string | null,
  eliteprospectsUrlPath: string | null
}

type Position = "G" | "D" | "F" | "C";

export async function getRoster(teamId: string, season: string) {

  if (teamId === process.env.ROYALS_TEAM_ID) {
    return getRoyalsRoster();
  } else {
    return getStandardRoster(teamId, season);
  }
}

async function getRoyalsRoster() {
  const baseUrl =
    process.env.BASE_URL ||
    process.env.URL ||
    "http://localhost:3000";

  const url = `${baseUrl}/api/league/get-royals-roster`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "user-agent": "netlify-cron/1.0",
      "x-api-key": process.env.INTERNAL_API_KEY!,
    },
  });

  const json = await res.json();
  return json;
}

async function getStandardRoster(teamId: string, season: string) {
  const query = {
    operationName: "Roster",
    variables: {
      team: teamId,
      season,
      sort: "player",
    },
    query: `query Roster($team: ID!, $season: String, $sort: String) {
      tableData: teamRoster(id: $team, season: $season, sort: $sort) {
        edges {
          player {
            id
            firstName
            lastName
            name
            status
            position
            shoots
            catches
            dateOfBirth
            age
            placeOfBirth
            nationality {
              name
              flagUrl { small medium }
              iso_3166_1_alpha_2
            }
            weight { imperial }
            height { imperial }
            gameStatus
            nhlRights {
              team { logo { small medium } name }
              rights
            }
            imageUrl
            imageCopyright
            eliteprospectsUrlPath
          }
          jerseyNumber
        }
      }
      footerData: teamSeasonComparison(id: $team, season: $season) {
        edges {
          playersByPositions { position players }
          averageHeight { imperial }
          averageWeight { imperial }
          averageAge
        }
      }
    }`,
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query),
    next: { revalidate: 300 }, // 5 minutes
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`EliteProspects roster error ${res.status}: ${text.slice(0, 200)}`);
  }

  const json: Roster = await res.json();

  if (!json.data) {
    throw new Error("EliteProspects roster response missing data");
  }

  const players: Player[] = [];

  json.data.tableData.edges.forEach(player => {
    const p = player.player;

    let playerAge: Player["age"];
    if (p.dateOfBirth) {
      const today = new Date();
      const birth = new Date(p.dateOfBirth);

      let age = today.getUTCFullYear() - birth.getUTCFullYear();

      const monthDiff = today.getUTCMonth() - birth.getUTCMonth();
      const dayDiff = today.getUTCDate() - birth.getUTCDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      playerAge = age;
    } else {
      playerAge = null;
    }

    let birthplace: Player["birthplace"];
    let nationality: Player["nationality"];

    if (p.placeOfBirth) {
      const stringArray = p.placeOfBirth.split(",");

      if (stringArray.length === 1) {
        const town = stringArray[0].trim();
        birthplace = {
          town: town,
          state: null,
          country: null,
        };

        nationality = countryToAlpha2(town);
      } else if (stringArray.length === 2) {
        const town = stringArray[0].trim();
        const country = stringArray[1].trim();
        birthplace = {
          town: town,
          state: null,
          country: country,
        };

        nationality = countryToAlpha2(resolveNationality(country));
      } else if (stringArray.length === 3) {
        const town = stringArray[0].trim();
        const state = stringArray[1].trim();
        const country = stringArray[2].trim();
        birthplace = {
          town: town,
          state: state,
          country: country,
        };

        nationality = countryToAlpha2(country);
      } else {
        const town = stringArray[0].trim();
        const state = stringArray[1].trim();
        const country = stringArray[stringArray.length - 1].trim();
        birthplace = {
          town: town,
          state: state,
          country: country,
        };

        nationality = countryToAlpha2(country);
      }
    } else {
      birthplace = {
        town: null,
        state: null,
        country: null,
      };

      if (p.nationality?.name) nationality = countryToAlpha2(p.nationality.name);
      else if (p.nationality?.iso_3166_1_alpha_2) nationality = p.nationality.iso_3166_1_alpha_2;
      else nationality = null;
    }

    let nhl: Player["nhlRights"];
    if (!p.nhlRights)
      nhl = null;
    else nhl = {
      team: {
        logo: {
          small: p.nhlRights.team.logo!.small,
          medium: p.nhlRights.team.logo!.medium,
        },
        name: p.nhlRights.team.name
      }
    };

    players.push({
      id: p.id,
      jerseyNumber: player.jerseyNumber,
      active: p.status === "active" ? "1" : "0",
      firstName: p.firstName,
      lastName: p.lastName,
      name: p.firstName + " " + p.lastName,
      phoneticName: null,
      position: p.position === "C" ? "F" : p.position,
      shoots: p.shoots,
      catches: p.catches,
      dateOfBirth: p.dateOfBirth,
      age: playerAge,
      birthplace: birthplace,
      hometown: {
        town: null,
        state: null,
        country: null
      },
      nationality: nationality,
      height: p.height?.imperial || null,
      weight: p.weight?.imperial || null,
      nhlRights: nhl,
      imageUrl: p.imageUrl
    });
  });

  return players;
}

function resolveNationality(value: string): string {
  const normalized = value.trim().toUpperCase();

  const match = NATIONALITY_VARIANTS.find(v =>
    v.variants.includes(normalized)
  );

  return match?.nationality ?? normalized;
}