export class User{
    public email:string ;
    public phone:number ;
    public coursesEnrolled:any;
    public username:string;
    public avatar:string;
    public userResponses:any ;
    private password:string
    constructor(email:string ,password:string,username:string , phone:number,avatar:string , coursesEnrolled:any , userResponses:any){
        this.email = email
        this.avatar = avatar
        this.phone = phone
        this.userResponses = userResponses
        this.coursesEnrolled = coursesEnrolled
        this.username = username
        this.password = password
    }
}