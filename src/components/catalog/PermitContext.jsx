import React, { createContext, useState } from 'react';


export const PermitContext = createContext();


export const PermitProvider = ({ children }) => {
 
  const [permitsData, setPermitsData] = useState([
    { id: 1, location: 'Germany', description: 'Permit to deliver things in Germany', duration: 2, price: 100, img: '/assets/Flag_of_Germany.svg.png' },
    { id: 2, location: 'France', description: 'Permit to deliver things in France', duration: 5, price: 300, img: '/assets/Flag_of_France.svg.png' },
    { id: 3, location: 'Italy', description: 'Permit to deliver things in Italy', duration: 1, price: 50, img: '/assets/Flag_of_Italy.svg.png' },
    { id: 4, location: 'Spain', description: 'Permit to deliver things in Spain', duration: 13, price: 150, img: '/assets/spain1.webp' },
    { id: 5, location: 'Belgium', description: 'Permit to deliver things in Belgium', duration: 1, price: 325, img: '/assets/Flag_of_Belgium.svg.png' },
  ]);

  return (
    <PermitContext.Provider value={{ permitsData: permitsData, setPermitsData: setPermitsData }}>
      {children}
    </PermitContext.Provider>
  );
};
