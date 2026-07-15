export type LoginFormType="emailPage"|"otpPage"

export interface LoginState{
  email:string;
  pageState:LoginFormType
}

export type LoginAction=|{type:"set_email";email:string}|
{type:"set_page_state";changedState:LoginFormType}


export const initialState: LoginState = {
  email: "",
  pageState:"emailPage",
};


export const reducer=(state: LoginState, action: LoginAction): LoginState=> {
  switch (action.type) {
    case "set_email":
      return { ...state, email: action.email };
    case "set_page_state":
      return { ...state, pageState: action.changedState }
    default:
      throw Error("Unknown action received");
  }
}
