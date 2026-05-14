type TimingType = {
  day: string;
  open: string;
  close: string;
};
export type Courts = {
  _id : string,
  name: string,
  address:string,
  description:string,
  gameAvailable: string[];
  status: string;

}
export type EmpAssociate = {
  _id:string,
  name: string,

}

export type SingleVenueResponseType = {
  _id:string,
  name: string;
  description?: string;
  address: string;
  city: string;
  state: string;

  gameAvailable: string[];

  status: string;

  timing: TimingType[];

  facilities: string[];

  employeAssociated: EmpAssociate[];

  courts: Courts[];
};


export type EmpType = {
  _id:string,
  name: string,
  email: string,
  phone: string,
  password: string,
}


export type UserType = {
  _id:string,
  name: string,
  email: string,
  phone: string,
  password: string,
}
type Slot = {
      time: String,     // "06:00"
      price: Number,    // 400
      session: String,  // "morning"
    }


export type PlayerType = {
  _id: string;
  name: string;
};

export type TeamType = {
  player1: PlayerType | null;
  player2: PlayerType | null;
};


export type MatchMakingType = {
  _id?:string,
   createdBy: string,
    date: string;
    gameType: string;
    venue: string;
    court: string;
    duration: string;
    slots:Slot[]
    isPublic: boolean;
    status: string;
    maxPlayers: number;
    teamA: TeamType,
    teamB:TeamType
}

export type DecodedToken = {
  _id: string;
  name:string,
  email: string;
  roll: string;
  exp: number;
};