// import { useState, useEffect } from 'react';
// import styles from '@styles/SearchComponent.module.css';

// const SearchComponent = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const homeRes = await fetch('/moviesfull.json'); // Fetch home.json

//         if (!homeRes.ok) {
//           throw new Error('Network response was not ok.');
//         }

//         const homeData = await homeRes.json();

//         setResults(homeData); // Set results from homeData
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const filteredResults = results.filter(item =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className={styles.searchContainer} style={{ marginTop: '55px' }}>
//       <input
//         type="text"
//         className={styles.searchInput}
//         placeholder="Search..."
//         value={searchQuery}
//         onChange={e => setSearchQuery(e.target.value)}
//       />
//       {searchQuery && (
//         <ul className={styles.dropdownList}>
//           {filteredResults.map((item, index) => (
//             <li key={index} className={styles.dropdownItem}>
//               <a href={item.siteurl}>
//                 <img src={item.image} alt={item.name} className={styles.thumbnail} />
//                 {item.name}
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchComponent;

import { useState, useEffect } from 'react';
import styles from '@styles/SearchComponent.module.css';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeRes = await fetch('/moviesfull.json'); // Fetch home.json

        if (!homeRes.ok) {
          throw new Error('Network response was not ok.');
        }

        const homeData = await homeRes.json();

        setResults(homeData); // Set results from homeData
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredResults = results.filter(item =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.searchContainer} style={{ marginTop: '55px' }}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <ul className={styles.dropdownList}>
          {filteredResults.map((item, index) => (
            <li key={index} className={styles.dropdownItem}>
              <a href={item.siteurl}>
                <img src={item.image} alt={item.name} className={styles.thumbnail} />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
