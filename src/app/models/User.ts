export class User {

  private _password: String;
  private _mail:String;
  private _isAdmin:boolean;


  constructor(password: String, mail: String, isAdmin: boolean) {
    this._password = password;
    this._mail = mail;
    this._isAdmin = isAdmin;
  }

  get mail(): String {
    return this._mail;
  }


  get password(): String {
    return this._password;
  }

  get isAdmin(): boolean {
    return this._isAdmin;
  }
}
