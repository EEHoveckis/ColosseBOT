// DIT BESTAND WORD ALLEEN ALS PLACEHOLDER GEBRUIKT
// DEZE FUNCTIES KAN JE VERANDEREN DOOR EEN FETCH IN DE DB
// DEZE BESTAND WORD GEBRUIKT IN "pages/api"
// DIT BESTAND BEVAT ALLEEN TEST DATA, GEEN DAADWERKELIJKE DATA

export interface IDataFines {
  reason: string;
  date: string;
  amount: number;
  number: number;
  playerName: string;
}

export const GetFines = () => {
  var data: IDataFines[] = [
    {
      reason: "Boete",
      amount: 150,
      number: 1,
      date: "Niet gekend.",
      playerName: "Lars",
    },
    {
      reason: "Boete",
      amount: 150,
      number: 2,
      date: "Niet gekend.",
      playerName: "Lars2",
    },
    {
      reason: "Boete",
      amount: 150,
      number: 3,
      date: "Niet gekend.",
      playerName: "",
    },
    {
      reason: "Boete",
      amount: 150,
      number: 4,
      date: "Niet gekend.",
      playerName: "",
    },
  ];

  return data;
};

const GetFinesByPlayer = (name: string) => {
  const totalData = GetFines();
  var fines = [];
  for (var i = 0; i < totalData.length; i++) {
    var el = totalData[i];
    if (el.playerName === name) fines.push(el);
  }
  return fines;
};

export const GetPlayer = (name: string) => {
  var data = [
    {
      name: "Lars",
      notes: ["Test"],
      fines: GetFinesByPlayer("Lars"),
      commands: ["huiszoeking"], // Huiszoeking, arrestatie bevel
    },
    {
      name: "Lars2",
      notes: ["Test2"],
      fines: GetFinesByPlayer("Lars2"),
      commands: ["Arrestatie bevel"], // Huiszoeking, arrestatie bevel
    },
  ];
  for (var i = 0; i < data.length; i++) {
    var el = data[i];
    if (el.name === name) return el;
  }
};

export const UpdateNotes = (content: string[], name: string) => {
  // DB HIER KOPPELEN
};

var authcodes: { name: string; code: string }[] = []; // HIER DB FETCH MAKEN

export const CreateAuthCode = (username: string) => {
  const codes = authcodes; // caching

  var _return = null;
  for (var i = 0; i < codes.length; i++) {
    var el = codes[i];
    if (el.name === username) _return = el;
  }

  if (_return !== null) return _return.code;

  const code =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  codes.push({
    name: username,
    code,
  });

  authcodes = codes;
  process.stdout.write(JSON.stringify(authcodes) + "\n");
  return code;
};
export const DestroyAuthCode = (authcode: string, username: string) => {
  const codes = authcodes; // caching
  for (var i = 0; i < authcode.length; i++) {
    var el = codes[i];
    if (
      el.name === username.replace(/"/g, "") &&
      el.code === authcode.replace(/"/g, "")
    ) {
      codes.splice(i);
    }
  }
  process.stdout.write(JSON.stringify(codes) + "\n");
  authcodes = codes;
};
export const ValidateAuthCode = (code: string, username: string): boolean => {
  const codes = authcodes; // caching
  process.stdout.write(JSON.stringify(codes) + "\n");
  for (var i = 0; i < codes.length; i++) {
    var el = codes[i];
    if (
      el.name === username.replace(/"/g, "") &&
      el.code === code.replace(/"/g, "")
    )
      return true;
    else false;
  }
  return false;
};
