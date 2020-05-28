const vod_url = "http://online.smartsoft.ro:3333/api/vod"
const menu_url = "http://online.smartsoft.ro:3333/api/static/menu"

export async function getMenuItems() {
  try {
    const response = await fetch(menu_url)
    const result = await response.json();

    return result.data;
  } catch (err) {
    throw `Error fetching menu items: ${err}`
  }
}

export async function getPopularAssets() {
  try {
    const response = await fetch(`${vod_url}/popular`)
    const result = await response.json();

    return result.data;
  } catch(err) {
    throw `Error fetching popular assets: ${err}`
  }
}

export async function getCategories() {
  try {
    const response = await fetch(`${vod_url}/category`)
    const result = await response.json();

    return result.data;
  } catch (err) {
    throw `Error fetching categories: ${err}`
  }
}

export async function getMoviesByCategory(categoryId, page = 0) {
  try {
    const response = page > 0 ? await fetch(`${vod_url}/category/${categoryId}/assets?page=${page}`) : 
      await fetch(`${vod_url}/category/${categoryId}/assets`)
    const result = await response.json()

    return result.data;
  } catch (err) {
    throw `Error fetching movies: ${err}`
  }
}

export async function getAssetDetails(assetId) {
  try {
    const response = await fetch(`${vod_url}/asset/${assetId}`)
    const result = await response.json();

    return result.data
  } catch (err) {
    throw `Error fetching asset details: ${err} `
  }
}

export async function getAssetVideos(assetId) {
  try {
    const response = await fetch(`${vod_url}/asset/${assetId}/videos`)
    const result = await response.json();

    return result.data
  } catch (err) {
    throw `Error fetching asset videos: ${err} `
  }
}

