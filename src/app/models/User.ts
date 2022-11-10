export class User {

  private _pass: String;
  private _mail:String;
  private _isAdmin:boolean;


  constructor( mail: String, pass: String, isAdmin: boolean) {
    this._pass = pass;
    this._mail = mail;
    this._isAdmin = isAdmin;
  }

  get mail(): String {
    return this._mail;
  }


  get pass(): String {
    return this._pass;
  }

  get isAdmin(): boolean {
    return this._isAdmin;
  }
}
