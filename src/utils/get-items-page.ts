interface ItemsData<T> {
    totalItems: number
    items: Array<T>
}

export async function getItemsPage<T>(
    { page = 1, perPage = 10, maxPerPage = 100 },
    getItemsData: (skip: number, take: number) => Promise<ItemsData<T>>
) {
    let itemsPerPage: number

    if (perPage < 1) {
        itemsPerPage = 1
    } else if (perPage > maxPerPage) {
        itemsPerPage = maxPerPage
    } else {
        itemsPerPage = perPage
    }

    let pageNumber: number

    if (page < 1) {
        pageNumber = 1
    } else {
        pageNumber = page
    }

    const skip = itemsPerPage * (pageNumber - 1)
    const take = itemsPerPage

    const { totalItems, items } = await getItemsData(skip, take)

    const pages = Math.ceil(totalItems / itemsPerPage)

    return {
        page: pageNumber,
        pages,
        perPage: itemsPerPage,
        totalItems,
        items
    }
}
