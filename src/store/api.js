// this is aliased in webpack config based on server/client build
import api from 'create-api'

// warm the front page cache every 15 min
if (api.cachedIds) {
  warmCache()
}

function warmCache () {
  // fetchItems((api.cachedIds.customers || []).slice(0, 30))
  // setTimeout(warmCache, 1000 * 60 * 15)
}

export function fetchCustomers () {
  const child = 'customers';
  const cache = api.cachedItems
  if (cache && cache.has(child)) {
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise((resolve, reject) => {
      api.child(child).on('value', snapshot => {
        let list = [];
        snapshot.forEach(function(item) {
          list.push(item.val());
        });
        // mark the timestamp when this item is cached
        // if (list) list.__lastUpdated = Date.now()
        cache && cache.set(child, list)
        resolve(list)
      }, reject)
    })
  }
}

export function fetchBills () {
  const child = 'bills';
  const cache = api.cachedItems
  if (cache && cache.has(child)) {
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise((resolve, reject) => {
      api.child(child).on('value', snapshot => {
        console.log(snapshot)
        let list = [];
        snapshot.forEach(function(item) {
          list.push(item.val());
        });
        // mark the timestamp when this item is cached
        // if (list) list.__lastUpdated = Date.now()
        cache && cache.set(child, list)
        console.log(list)
        resolve(list)
      }, reject)
    })
  }
}
