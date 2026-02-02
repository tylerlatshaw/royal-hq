export type LeagueResponse = {
    data: {
        leagueRosters: {
            league: League,
            teams: Team[]
        }[]
    }
};

export type LeagueData = {
    data: {
        league: League,
        teams: Team[]
    }
};

export type League = {
    slug: string,
    commonName: string | null,
    fullName: string | null,
    logo: {
        url: string | null,
        colors: string[] | null
    } | null,
    links: {
        eliteprospectsUrl: string,
        officialWebUrl: string,
        statsUrl: string,
        newsUrls: string[]
    } | null
}

export type Team = {
    id: string,
    name: string,
    logo: {
        small: string,
        medium: string,
        large: string | null,
        colors: string[] | null,
    } | null,
    founded: number | null,
    city: string | null,
    country: {
        slug: string,
        name: string,
        iso_3166_1_alpha_2: string | null,
    } | null,
    activeSeason: {
        slug: string,
        startYear: number,
        endYear: number,
    } | null,
    arena: {
        id: string,
        name: string,
        location: string | null,
        yearOfConstruction: number | null,
        capacity: number | null,
        infoAsHTML: string | null,
        imageUrl: string | null,
    } | null,
    secondaryArena: {
        id: string,
        name: string,
        location: string | null,
        yearOfConstruction: number | null,
        capacity: number | null,
        infoAsHTML: string | null,
    } | null,
    capHit: string | null,
    links: {
        officialWebUrl: string | null,
        facebook: string | null,
        x: string | null,
        instagram: string | null,
        youtube: string | null,
    } | null,
    slug: string,
    eliteprospectsUrlPath: string,
    conferenceDivision: TeamConferenceDivision,
}

export type Player = {
    id: string,
    jerseyNumber: number | null,
    active: string,
    firstName: string | null,
    lastName: string | null,
    name: string,
    phoneticName: string | null,
    position: Position | null,
    shoots: "L" | "R" | null,
    catches: "L" | "R" | null,
    dateOfBirth: string | null,
    age: number | null,
    birthplace: {
        town: string | null,
        state: string | null,
        country: string | null
    },
    hometown: {
        town: string | null,
        state: string | null,
        country: string | null
    },
    nationality: string | null,
    height: string | null,
    weight: number | null,
    nhlRights: {
        team: {
            logo: {
                small: string,
                medium: string,
            } | null,
            name: string,
        }
    } | null,
    imageUrl: string | null
}

export type Position = "G" | "D" | "F";

export type Transaction = {
    id?: string,
    player: string,
    team: string,
    detail: string,
    date: string,
    seenAt: string
};

export type TransactionRow = {
    id: string;
    team: string;
    player: string;
    detail: string;
    date: string;
};

export type Subscription = {
    firstName: string,
    lastName: string,
    email: string,
};

export type WebPushSubscription = {
    endpoint: string;
    keys: { p256dh: string; auth: string };
};

export type SubscribeBody = {
    subscription: WebPushSubscription;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
};

export type Conference = "Eastern" | "Western" | "Unknown" | "All";
export type Division = "North" | "South" | "Central" | "Mountain" | "Unknown" | "All";

export type TeamConferenceDivision = {
    conference: Conference;
    division: Division;
};
