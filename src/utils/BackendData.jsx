export const root = "https://map_api-1-g2903164.deta.app"
export const endpoints = ["map_data", "crime_score", "offense_total", "offense_by_area", "?"]

export const fetchDataPoints = async () => {    
    const endpoint = endpoints[0]

    const promises = []
    const data_points = []
    
    const pointsPerFetch = 0
    const totalFetches = 9
    
    for (let skip = 0; skip < pointsPerFetch * totalFetches; skip += pointsPerFetch) {
        promises.push(new Promise(async (res, rej) => {
            try {
                const queryParams = {skip, limit: pointsPerFetch};
                const queryString = new URLSearchParams(queryParams).toString();
                const url = `${root}/${endpoint}?${queryString}`;
                const response = await fetch(url);
                const json_data = await response.json();
                data_points.push(...json_data)
                res(json_data)
            } catch (error) {
                rej(error)
            }
        }))
    }

    await Promise.all(promises)
    return data_points
}

export const fetchCrimeScores = async () => {
    const endpoint = endpoints[1]
    const url = `${root}/${endpoint}`
    const response = await fetch(url)
    const json_data = await response.json();
    return json_data
}

export const fetchTotalOffenses = async () => {
    const endpoint = endpoints[2]
    const url = `${root}/${endpoint}`
    const response = await fetch(url)
    const json_data = await response.json();
    return json_data
}

export const fetchOffensesByArea = async () => {
    const endpoint = endpoints[3]
    const url = `${root}/${endpoint}`
    const response = await fetch(url)
    const json_data = await response.json();
    return json_data
}

export const fetchTotalCrimeGraph = async () => {
    const endpoint = endpoint[4]
    const url = `${root}/${endpoint}`
    const response = await fetch(url)
    return response
}

export const fetchAllData = async () => {
    const data = {}
    const fetchers = [fetchDataPoints, fetchCrimeScores, fetchTotalOffenses, fetchOffensesByArea]
    const promises = []

    for (let i = 0; i < endpoints.length; i++) {
        promises.push(new Promise(async (res, rej) => {
            try {
                let fetchedData = await fetchers[i]()
                data[endpoints[i]] = fetchedData
                res(fetchedData)
            } catch (error) {
                rej(error)
            }
        }))
    }

    await Promise.all(promises)
    return data
}