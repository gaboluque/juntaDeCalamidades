import React, { useState } from 'react';

const colors = [
  '#ffffff',
  '#457b9d',
  '#ffb703',
  '#8ac926',
  '#f94144',
];

const LogIn = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length && color) onSubmit(username, color);
    else alert("Por favor, ingresa un nombre de usuario y un color");
  }

  const handleChangeColor = (color) => () => {
    setColor(color);
  }

  return (
    <div className="bg-black p-3 md:p-10 w-full md:w-1/2 m-auto mt-32">
      <h3 className="text-2xl text-center mb-10">
        Deja tus pensamientos más crudos y oscuros, habla desde tus tripas, grita tu dolor y tu tristeza, todas almas rotas nos unen nuestras heridas, nuestras grietas son similares y nuestra sangre toda siempre es rojas
        <br/>
        <br/>
        Entra
      </h3>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text"
               placeholder="Nombre de usuario"
               className="w-full bg-black border-2 border-gray-200 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-6 py-3"/>
        <div className="colors-container flex h-20 justify-between m-5">
          {colors.map((c) => (
            <div key={c} className={`w-10 h-10`}
                 style={{ backgroundColor: c, border: color === c ? '4px solid blue' : 'none' }}
                 onClick={handleChangeColor(c)} />
          ))}
        </div>
        <div className="flex right-0 justify-center items-center inset-y-0 sm:flex">
          <button type="submit"
                  className="inline-flex items-center justify-center px-4 py-3 transition duration-500 ease-in-out bg-white text-black focus:outline-none">
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

LogIn.propTypes = {};

LogIn.defaultProps = {};


export default LogIn;