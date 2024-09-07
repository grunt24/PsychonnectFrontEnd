// // src/contexts/LoadingContext.jsx
// import React, { createContext, useState, useContext } from 'react';

// const LoadingContext = createContext({
//   isLoading: false,
//   showLoading: () => {},
//   hideLoading: () => {},
// });

// export const useLoading = () => useContext(LoadingContext);

// export const LoadingProvider = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const showLoading = () => setIsLoading(true);
//   const hideLoading = () => setIsLoading(false);

//   return (
//     <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
//       {children}
//     </LoadingContext.Provider>
//   );
// };
