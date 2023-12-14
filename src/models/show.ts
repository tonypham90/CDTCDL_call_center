import data from 'data/data';
// Purpose: TypeScript interfaces for Show model

interface IMetaData {
    totalCount: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}
interface IData {
    array: Array<any>;
}
interface baseShow {
    metadata: IMetaData;
    data: IData;
}

