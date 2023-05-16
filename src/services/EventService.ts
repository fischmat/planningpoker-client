import { infoService } from "./InfoService";
import io from "socket.io-client";
import type { Player, Round, Vote } from "./Model";
import { sha512 } from "js-sha512";
import PubSub from 'pubsub-js'

export const eventService = {
  socket: createSocket(),

  async enterGame(gameId: string, password: string | null) {
    const s = await this.socket;

    // Send command to enter the game
    const command: EnterGameCommand = {
      gameId: gameId,
      passwordHash: password ? sha512(password) : null
    };
    emitEvent(s, EnterGameCommandId, command);
  },

  async leaveGame(gameId: string) {
    const s = await this.socket;

    const command: LeaveGameCommand = { gameId: gameId };
    emitEvent(s, LeaveGameCommandId, command);
  },

  onPlayerJoined(callback: (event: PlayerJoinedEvent) => any) {
    PubSub.subscribe(PlayerJoinedEventId, (_, e) => callback(e));
  },

  onPlayerLeft(callback: (event: PlayerLeftEvent) => any) {
    PubSub.subscribe(PlayerLeftEventId, (_, e) => callback(e));
  },

  onRoundStarted(callback: (event: RoundStartedEvent) => any) {
    PubSub.subscribe(RoundStartedEventId, (_, e) => callback(e));
  },

  onRoundEnded(callback: (event: RoundEndedEvent) => any) {
    PubSub.subscribe(RoundEndedEventId, (_, e) => callback(e));
  },

  onVoteSubmitted(callback: (event: VoteSubmittedEvent) => any) {
    PubSub.subscribe(VoteSubmittedEventId, (_, e) => callback(e));
  },

  onVoteRevoked(callback: (event: VoteSubmittedEvent) => any) {
    PubSub.subscribe(VoteSubmittedEventId, (_, e) => callback(e));
  },

  onError(callback: (event: ErrorEvent) => any) {
    PubSub.subscribe(ErrorEventId, (_, e) => callback(e));
  },
};

async function createSocket(): Promise<any> {
  const config = (await infoService.getInfo()).socketIO;
  const socket = io(
    `ws://${config.host}:${config.port}`
  );
  socket.on("connect", () => {
    console.log("Socket.IO connection established.");
  });
  socket.on("disconnect", () => {
    console.warn("Socket.IO disconnected.")
  })
  return socket;
}

function emitEvent(socket: any, eventId: string, event: any) {
  const eventJson = JSON.stringify(event);
  socket.emit(eventId, eventJson);
}

// Socket.IO commands

type EnterGameCommand = {
  gameId: string,
  passwordHash: string | null
}
const EnterGameCommandId = "enterGame";

type LeaveGameCommand = {
  gameId: string
}
const LeaveGameCommandId = "leaveGame";

// Socket.IO events

type GameEnteredEvent = {
  gameId: string,
  roomId: string
}
const GameEnteredEventId = "gameEntered";

export type ErrorEvent = {
  message: string
}
const ErrorEventId = "error";

export type PlayerJoinedEvent = {
  gameId: string,
  player: Player
}
const PlayerJoinedEventId = "playerJoined";

export type PlayerLeftEvent = {
  gameId: string,
  player: Player
}
const PlayerLeftEventId = "playerLeft";

export type RoundStartedEvent = {
  gameId: string,
  round: Round
}
const RoundStartedEventId = "roundStarted";

export type RoundEndedEvent = {
  gameId: string,
  round: Round
}
const RoundEndedEventId = "roundEnded";

export type VoteSubmittedEvent = {
  gameId: string,
  round: Round,
  vote: Vote
}
const VoteSubmittedEventId = "voteSubmitted";

export type VoteRevokedEvent = {
  gameId: string,
  round: Round,
  vote: Vote
}
const VoteRevokedEventId = "voteRevoked";