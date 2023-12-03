export class registerService {
  
    constructor() {}
  
    // Constante para a chave do armazenamento local
    LOCAL_STORAGE_KEY = 'records';
  
    saveLocal(access) {
      // Obtendo usuários do armazenamento local
      let register = localStorage.getItem(this.LOCAL_STORAGE_KEY);
  
      // Verificando se há relatórios existentes
      register = register ? JSON.parse(register) : [];
  
      // Adicionando o novo usuário ao array
      register.push(access);
  
      // Salvando os usuários atualizados no armazenamento local
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(register));
  
      // Retornando os usuários atualizados
      return register;
  }
}
