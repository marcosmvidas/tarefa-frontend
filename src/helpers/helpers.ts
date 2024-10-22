export const formateMoeda = (numero: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(numero);
  };
  
  export const formatDateLong = (date: string | Date | undefined): string => {
    if (!date) return '';
    const dateObject = new Date(date);
    
    if (isNaN(dateObject.getTime())) {
      return 'Data inválida';
    }
  
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return dateObject.toLocaleDateString('pt-BR', options);
  };

  export const formatDateShort = (date: string | Date | undefined): string => {
    if (!date) return ''; // Retorna vazio se a data não for válida
    const dateObject = new Date(date);
    
    if (isNaN(dateObject.getTime())) {
      return 'Data inválida'; // Retorna mensagem se a data for inválida
    }
    
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();
    
    return `${year}/${month}/${day}`;
    // return `${day}/${month}/${year}`;
  };
    
  
  export const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };
  