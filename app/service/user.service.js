export class registerService {
  
    constructor() {}
  
    LOCAL_STORAGE_KEY = 'records';
  
    saveLocal(access) {
      let register = localStorage.getItem(this.LOCAL_STORAGE_KEY);
  
      register = register ? JSON.parse(register) : [];
  
      register.push(access);
  
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(register));
  
      return register;
  }
}
