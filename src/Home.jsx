import { SearchIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Pagination from './pagination';
import Spinner from './spinner';

function Home() {

  const [data, setData] = useState(null);
  const [apiUrl, setApiUrl] = useState('https://swapi.dev/api/people/?page=1');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchSwapi() {
      try {
        let response = await fetch(`${apiUrl}&search=${search}`)
        response = await response.json()
        console.log(response);
        setData(response)
      } catch (e) {
        console.error(e);
      }
    }
    fetchSwapi()
  }, [apiUrl, search])

  const handlePageChange = (newAPIURL) => {
    setData(null);
    setApiUrl(newAPIURL);
  }

  const getpageFromLink = () => {
    if (!data.previous) return 0;
    return (new URL(data?.previous))?.searchParams?.get('page');
  }

  if (!data) return <Spinner />
  return (
    <div className="Home mx-auto max-w-5xl p-5">
      <h1 className="text-4xl font-bold text-center uppercase py-4">
        Star Wars API
      </h1>

      <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
        <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
          <div className="w-full">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full bg-white border border-gray-200 py-3 pl-10 pr-3 placeholder-gray-400 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-semibold text-xl rounded-3xl shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
                placeholder="Search"
                type="search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
        <ul className="divide-y divide-gray-200 px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0 mx-auto">
          {data && data.results.map(person => (
            <li key={person.url}>
              <div className="flex space-x-3">
                <div className="flex-1 space-y-1">
                  <Link to={`user/${person.url.split('/')[5]}`} className="flex items-center justify-between p-4 hover:bg-slate-100/25 transition">
                    <h3 className="text-sm font-medium">{person.name}</h3>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Pagination onPageChange={handlePageChange} nextLink={data?.next} prevLink={data?.previous} count={data?.count} page={getpageFromLink()} />
    </div >
  );
}

export default Home;
