
export type Player = {
    id: string | null,
    name: string,
    gameIds: string[],
    avatar: AvatarProps
}

export interface PlayerStub {
    name: string,
    avatar: AvatarProps | null
}

export type Card = {
    value: number
}

export type Vote = {
    id: string | null,
    gameId: string,
    roundId: string,
    player: Player,
    card: Card
}

export type RoundResult = {
    votes: [Vote],
    minVoteValue: number | null,
    maxVoteValue: number | null,
    minVotes: [Vote],
    maxVotes: [Vote],
    suggestedCard: Card | null,
    averageVote: number | null,
    variance: number | null
}

export type Round = {
    id: string | null,
    gameId: string,
    topic: string,
    started: string,
    ended: string,
    result: RoundResult
}

export type Game = {
    id: string | null,
    name: string,
    playableCards: Card[],
    hasPassword: boolean
}

export type PasswordNote = {
    password?: string
}

export type GameStub = {
    name: string,
    password: string | null,
    playableCards: Card[] | []
}

export type ApplicationInfo = {
    socketIO: {
        host: string,
        port: number
    }
}

export type AvatarProps = {
    backgroundColor: string,
    earrings: number | null,
    eyebrows: number,
    eyes: number,
    features: string[],
    glasses: number | null,
    hair: number | null,
    longHair: boolean,
    hairColor: string,
    mouth: number,
    skinColor: string
}