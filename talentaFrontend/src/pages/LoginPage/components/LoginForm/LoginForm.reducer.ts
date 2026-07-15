
export interface VerifyOtpFormState{
 seconds:number;
 minutes:number;
}

export type VerifyOtpFormAction=|{type:"set_seconds";seconds:number}|
{type:"set_minutes";minutes:number}


export const initialState:VerifyOtpFormState  = {
  seconds: 0,
  minutes:1,
};

export const reducer=(state: VerifyOtpFormState, action: VerifyOtpFormAction): VerifyOtpFormState=> {
  switch (action.type) {
    case "set_seconds":
      return { ...state, seconds: action.seconds };
    case "set_minutes":
      return { ...state, minutes: action.minutes }
    default:
      throw Error("Unknown action received");
  }

}
