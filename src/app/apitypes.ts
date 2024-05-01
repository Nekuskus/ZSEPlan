export type IndexType = {
    timestamp: number,
    zastepstwaUrl: string,
    oddzialy: IndexEntry[],
    nauczyciele: IndexEntry[],
    sale: IndexEntry[],
}

export type IndexEntry = {
    name: string,
    url: string
}