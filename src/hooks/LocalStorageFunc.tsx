// Para guardar un objeto en localStorage
export const GuardarEnLocalStorage = (clave: string, valor: any) => {
  try {
    const valorString = JSON.stringify(valor);
    localStorage.setItem(clave, valorString);
    console.log(`Objeto guardado en localStorage con clave: ${clave}`);
  } catch (error) {
    console.error('Error al guardar objeto en localStorage:', error);
  }
};

// Para obtener un objeto de localStorage
export const ObtenerDeLocalStorage = (clave: string) => {
  try {
    const valorString = localStorage.getItem(clave);
    if (valorString) {
      const valor = JSON.parse(valorString);
      console.log(`Objeto obtenido de localStorage con clave: ${clave}`);
      return valor;
    }
    return null;
  } catch (error) {
    console.error('Error al obtener objeto de localStorage:', error);
    return null;
  }
};

// Ejemplo de uso
// const objeto = { nombre: 'Ejemplo', edad: 25 };
// guardarEnLocalStorage('miObjeto', objeto);

// const objetoRecuperado = obtenerDeLocalStorage('miObjeto');
// console.log('Objeto recuperado:', objetoRecuperado);
