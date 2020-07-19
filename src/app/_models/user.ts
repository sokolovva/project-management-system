export class User {
   public id: string;
   public username: string;
   public password: string;
   public fullName?: string;
   public role: string;

   constructor(userObject: any) {
      if (userObject) {
         this.id = userObject.ID;
         this.username = userObject.username;
         this.password = userObject.password;
         this.fullName = userObject.fullName;
         this.role = userObject.role;
      }
   }

   public isAdmin(): boolean {
    return this.role === 'ADMIN';
   }

   public hasFullName(): boolean{
      return !!this.fullName;
   }
}
