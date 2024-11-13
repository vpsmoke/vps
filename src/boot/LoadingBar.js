import { LoadingBar } from 'quasar'

LoadingBar.setDefaults({
  // return a Boolean which has the meaning of
  // "should this URL trigger LoadingBar?"
  size: '4px',
  hijackFilter(url) {
    console.log('LoadingBar url', url)
    const list = [/no_loading/].filter((i) => i.test(url))
    const verif = Boolean(list.length)
    const deveAcionar = !verif
    return deveAcionar
  },
})
