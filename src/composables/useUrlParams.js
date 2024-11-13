import GLOBAL from 'src/utils/GLOBAL'

//
const { URLSearch } = GLOBAL

export default function useUrlParams() {
  const { pathname } = window.location

  function hasSearchParam(param) {
    return URLSearch.has(param)
  }

  function getSearchParam(param) {
    return URLSearch.get(param)
  }

  function setSearchParam(key, value) {
    console.log({ key, value })
    URLSearch.set(key, value)
    updateSearchParams()
  }

  function deleteSearchParam(key) {
    URLSearch.delete(key)
    updateSearchParams()
  }

  function updateSearchParams() {
    const newPath = `${pathname}?${URLSearch.toString()}`
    history.pushState(null, '', newPath)
  }

  return {
    hasSearchParam,
    getSearchParam,
    setSearchParam,
    deleteSearchParam,
    updateSearchParams,
  }
}
