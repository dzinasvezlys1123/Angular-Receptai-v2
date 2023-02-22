export class User{
    constructor(
        public email?:string,
        public id?:string,
        private _token?:string,
        private _tokenExpirationDate?:Date
    ){}

    get token(){
        // to access the token as it privet 
        if(!this?._tokenExpirationDate || this._tokenExpirationDate < new Date()){
            return null;
        }

        return this?._token
    }
}